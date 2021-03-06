﻿using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Principal;
using System.ServiceModel.Security.Tokens;
using System.Threading.Tasks;
using ECS.Constants.Security;
using ECS.DTO.Sso;
using ECS.Models;
using ECS.Repositories;
using ECS.Repositories.Implementations;
using Microsoft.IdentityModel.Tokens;

namespace ECS.Security.AccessTokens.Jwt
{
    public class JwtManager : IJwtManager
    {

        #region Fields
        // Single repository to query users associated with tokens.
        private static AccountRepository _accountRepository;

        // Instance for Singleton Pattern
        private static JwtManager instance;
        #endregion

        private JwtManager()
        {
            _accountRepository = new AccountRepository();
        }

        public static JwtManager Instance
        {
            get
            {
                if (instance == null)
                {
                    instance = new JwtManager();
                }
                return instance;
            }
        }

        public string GenerateToken(List<AccountType> claims, int expireMinutes = 20)
        {
            var symmetricKey = Convert.FromBase64String(Secrets.AppAccessTokenSecret);
            var tokenHandler = new JwtSecurityTokenHandler();

            var _claims = new List<Claim>();
            var userName = claims[0].Username;
            foreach (var claim in claims)
            {
                if (claim.PermissionName.Equals(ClaimValues.Scholar) || claim.PermissionName.Equals(ClaimValues.Admin))
                {
                    _claims.Add(new Claim(ClaimTypes.Role, claim.PermissionName));
                }
                else
                {
                    _claims.Add(new Claim("PermissionName", claim.PermissionName));
                }
            }
            _claims.Add(new Claim(ClaimTypes.Name, userName));

            var now = DateTime.UtcNow;
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Issuer = "https://localhost:44311/",
                Subject = new ClaimsIdentity(_claims),
                IssuedAt = now,
                Expires = now.AddMinutes(Convert.ToInt32(expireMinutes)),
                NotBefore = now,
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(symmetricKey), SecurityAlgorithms.HmacSha256Signature),
            };

            var stoken = tokenHandler.CreateToken(tokenDescriptor);
            var token = tokenHandler.WriteToken(stoken);

            return token;
        }

        public string GenerateToken(string username, int expireMinutes = 20)
        {
            var symmetricKey = Convert.FromBase64String(Secrets.AppAccessTokenSecret);
            var tokenHandler = new JwtSecurityTokenHandler();

            var now = DateTime.UtcNow;
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Issuer = "https://localhost:44311/",
                Subject = new ClaimsIdentity(new[]
                        {
                            new Claim(ClaimTypes.Name, username),
                            // TODO: @Kris Why is this hardcoded to be scholar only?
                            new Claim(ClaimTypes.Role, "Scholar")

                        }),
                IssuedAt = now,
                Expires = now.AddMinutes(Convert.ToInt32(expireMinutes)),
                NotBefore = now,
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(symmetricKey), SecurityAlgorithms.HmacSha256Signature),
            };

            var stoken = tokenHandler.CreateToken(tokenDescriptor);
            var token = tokenHandler.WriteToken(stoken);

            return token;
        }

        public ClaimsPrincipal GetExpiredPrincipal(string token)
        {
            try
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var jwtToken = tokenHandler.ReadToken(token) as JwtSecurityToken;

                if (jwtToken == null)
                    return null;

                var symmetricKey = Convert.FromBase64String(Secrets.AppAccessTokenSecret);

                var validationParameters = new TokenValidationParameters()
                {
                    RequireExpirationTime = true,
                    ValidateLifetime = false,
                    // Should be true?
                    ValidateIssuer = true,
                    ValidIssuer = "https://localhost:44311/",
                    ValidateAudience = false,
                    IssuerSigningKey = new SymmetricSecurityKey(symmetricKey)
                };

                var principal = tokenHandler.ValidateToken(token, validationParameters, out _);

                return principal;
            }

            catch (Exception)
            {
                return null;
            }
        }

        public ClaimsPrincipal GetPrincipal(string token)
        {
            try
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var jwtToken = tokenHandler.ReadToken(token) as JwtSecurityToken;

                if (jwtToken == null)
                    return null;

                var symmetricKey = Convert.FromBase64String(Secrets.AppAccessTokenSecret);

                var validationParameters = new TokenValidationParameters()
                {
                    RequireExpirationTime = true,
                    // Should be true?
                    ValidateIssuer = true,
                    ValidIssuer = "https://localhost:44311/",
                    ValidateAudience = false,
                    IssuerSigningKey = new SymmetricSecurityKey(symmetricKey)
                };

                var principal = tokenHandler.ValidateToken(token, validationParameters, out _);

                return principal;
            }

            catch (Exception)
            {
                return null;
            }
        }

        public bool ValidateExpiredToken(string token, out string username)
        {
            username = null;
            var simplePrinciple = GetExpiredPrincipal(token);
            ClaimsIdentity identity = null;

            try
            {
                identity = simplePrinciple.Identity as ClaimsIdentity;
            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex.Source + "\n" + ex.Message + "\n" + ex.StackTrace);
                return false;
            }

            if (identity == null)
            {
                return false;
            }

            if (!identity.IsAuthenticated)
            {
                return false;
            }

            var usernameClaim = identity.FindFirst(ClaimTypes.Name);
            username = usernameClaim?.Value;

            if (string.IsNullOrEmpty(username))
            {
                return false;
            }

            // Cannot use a ref or out string in a lambda expression, thus make a copy
            string tempUsername = string.Copy(username);

            // More validation to check whether username exists in system
            if (!_accountRepository.Exists(d => d.UserName == tempUsername))
            {
                return false;
            }

            return true;
        }

        public bool ValidateToken(string token, out string username)
        {
            username = null;
            var simplePrinciple = GetPrincipal(token);
            ClaimsIdentity identity = null;

            try
            {
                identity = simplePrinciple.Identity as ClaimsIdentity;
            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex.Source + "\n" + ex.Message + "\n" + ex.StackTrace);
                return false;
            }

            if (identity == null)
            {
                return false;
            }

            if (!identity.IsAuthenticated)
            {
                return false;
            }

            var usernameClaim = identity.FindFirst(ClaimTypes.Name);
            username = usernameClaim?.Value;

            if (string.IsNullOrEmpty(username))
            {
                return false;
            }

            // Cannot use a ref or out string in a lambda expression, thus make a copy
            string tempUsername = string.Copy(username);

            // More validation to check whether username exists in system
            if (!_accountRepository.Exists(d => d.UserName == tempUsername))
            {
                return false;
            }

            return true;
        }

        protected Task<IPrincipal> AuthenticateJwtToken(string token)
        {
            if (ValidateToken(token, out string username))
            {
                // based on username to get more information from database in order to build local identity  
                var claims = new List<Claim> {
                    new Claim(ClaimTypes.Name, username)  
                    // Add more claims if needed: Roles, ...  
                };
                var identity = new ClaimsIdentity(claims, "Jwt");
                IPrincipal user = new ClaimsPrincipal(identity);
                return Task.FromResult(user);
            }
            return Task.FromResult<IPrincipal>(null);
        }
        public Claim GetClaim(IPrincipal principal, string claimType)
        {
            // This line is called multiple times during execution... Figure out a way to get it out.
            var claimsPrincipal = (ClaimsPrincipal)principal;
            return claimsPrincipal.FindFirst(claimType);
        }

        public string GetClaimValue(IPrincipal principal, string claimType)
        {
            // This line is called multiple times during execution... Figure out a way to get it out.
            var claimsPrincipal = (ClaimsPrincipal)principal;
            return claimsPrincipal.FindFirst(claimType).Value;
        }
    }
}