﻿using System.Web.Http;
using System.Web.Http.Cors;
using ECS.Models;

namespace ECS.WebAPI.Controllers.v1
{
    [RoutePrefix("AccountAdmin")]
    [EnableCors("http://localhost:8080", "*", "GET, POST, PUT")]
    public class AccountAdminController : ApiController
    {
        // Edit other account information
        // ... look at scope document

        [HttpGet]
        public IHttpActionResult AllScholarAccountInformation()
        {
            return Ok("Get Account Information");
        }

        // Filter by username??

        [HttpPut]
        public IHttpActionResult ScholarAccountInformation(Account account)
        {
            // Check model binding

            // Update info in database.

            // Return successful response if update correctly.
            return Ok("Put Account Information");
        }

        [HttpPut]
        public IHttpActionResult AccountStatus()
        {
            return Ok("Get Account Status");
        }
    }
}