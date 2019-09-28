using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Requests;
using Sabio.Services;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/adver")]
    public class AdvertisersApiController : BaseApiController
    {
        private IAdvertiserService _service = null;
        public AdvertisersApiController(IAdvertiserService service, ILogger<AdvertisersApiController> logger) : base(logger)
        {
            _service = service;
        }
        [HttpPost]
        public ActionResult<ItemResponse<int>> Add(AdvertiserAddRequest model)
        {
            ObjectResult result = null;
            try
            {
                int id = _service.Add(model);
                ItemResponse<int> response = new ItemResponse<int>();
                response.Item = id;
                result = Created201(response);
            }
            catch (Exception ex)
            {
                base.Logger.LogError(ex.ToString());
                ErrorResponse response = new ErrorResponse(ex.ToString());

                result = StatusCode(500, response);
            }

            return result;
        }
        [HttpGet]
        public ActionResult<Paged<Advertisers>> GetAll(int pageIndex, int pageSize)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                Paged<Advertisers> page = _service.GetAllByPagination(pageIndex, pageSize);

                if (page == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resource not found.");
                }
                else
                {
                    response = new ItemResponse<Paged<Advertisers>> { Item = page };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.ToString());
            }

            return StatusCode(code, response);
        }

        [HttpGet("{id:int}")]
        public ActionResult<ItemResponse<Advertisers>> GetById(int id)
        {
            int iCode = 200;
            BaseResponse response = null;

            try
            {
                Advertisers opportunity = _service.GetById(id);

                if (opportunity == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("Application Resource not found.");
                }
                else
                {
                    response = new ItemResponse<Advertisers> { Item = opportunity };
                }
            }
            catch (Exception ex)
            {

                iCode = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse($"Generic Error: {ex.Message}");
            }

            return StatusCode(iCode, response);

        }
    }
}