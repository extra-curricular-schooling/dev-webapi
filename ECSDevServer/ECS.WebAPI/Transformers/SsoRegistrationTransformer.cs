﻿using System.Web.Http.Controllers;
using ECS.Constants.Security;
using ECS.DTO.Sso;
using ECS.Security.AccessTokens.Jwt;
using ECS.Security.Hash;
using ECS.WebAPI.Transformers.Interfaces;

namespace ECS.WebAPI.Transformers
{
    public class SsoRegistrationTransformer : ISsoRegistrationTransformer
    {
        public SsoRegistrationRequestDTO Fetch(HttpRequestContext context)
        {
            // TODO: @Scott Limit exposure to the heap by making this a direct connection to the Dto.

            // Read the Request Principal (User), and grab the necessary jwt claims.
            var username = SsoJwtManager.Instance.GetClaimValue(context.Principal, ClaimNames.Username);
            var password = SsoJwtManager.Instance.GetClaimValue(context.Principal, ClaimNames.Password);
            var passwordSalt = HashService.Instance.CreateSaltKey();
            var hashedPassword = HashService.Instance.HashPasswordWithSalt(passwordSalt, password, true);
            var roleType = SsoJwtManager.Instance.GetClaimValue(context.Principal, ClaimNames.RoleType);

            // Create Role based on Sso Input.
            IFactory factory = new RoleFactory();
            string role = (string) factory.Create(roleType);
            
            return new SsoRegistrationRequestDTO
            {
                Username = username,
                Password = password,
                PasswordSalt =  passwordSalt,
                HashedPassword = hashedPassword,
                RoleType = role
            };
        }
    }
}
