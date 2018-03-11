﻿using ECS.Models;
using ECS.Repositories;
using ECS.WebAPI.Services;
using System.Diagnostics;
using System.Web.Http;
using System.Web.Http.Controllers;

namespace ECS.WebAPI.Filters.AuthorizationFilters
{
    public class AuthorizationAttribute : AuthorizeAttribute
    {
        private TokenRepository _tokenRepository = new TokenRepository();

        protected override bool IsAuthorized(HttpActionContext actionContext)
        {
            string accessTokenFromRequest = "";
            if (actionContext.Request.Headers.Authorization != null)
            {
                // get the access token
                accessTokenFromRequest = actionContext.Request.Headers.Authorization.Parameter;

                if (JwtManager.ValidateToken(accessTokenFromRequest, out string username))
                {
                    Token accessToken = _tokenRepository.GetSingle(d => d.Name == "jwt" & d.Username == username);
                    if (accessToken != null)
                    {
                        string accessTokenStored = accessToken.Value;
                        if (accessTokenFromRequest == accessTokenStored)
                        {
                            return true;
                        }
                        else
                        {
                            return false;
                        }
                    }
                    else
                    {
                        return false;
                    }
                }
                else
                {
                    return false;
                }
            }
            else
            {
                return false;
            }            
        }

        protected override void HandleUnauthorizedRequest(HttpActionContext actionContext)
        {
            Debug.WriteLine("Running HandleUnauthorizedRequest in CustomAuthorizationFilterAttribute as principal is not authorized.");
            base.HandleUnauthorizedRequest(actionContext);
        }
    }
}