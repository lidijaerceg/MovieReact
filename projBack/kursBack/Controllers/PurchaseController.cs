using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using projBack.DTOs;
using projBack.Entities;
using projBack.Helpers;
using System.ComponentModel;

namespace projBack.Controllers
{
    [ApiController]
    [Route("api/purchase")]
    public class PurchaseController : ControllerBase
    {
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;

        public PurchaseController(ApplicationDbContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        [HttpPost]
        public async Task<ActionResult<int>> Post([FromForm] PurchaseDTO purchaseDTO)
        {

            var purchase = mapper.Map<Purchase>(purchaseDTO);

           
            context.Add(purchase);
            await context.SaveChangesAsync();
            return NoContent();
        }

        [HttpGet("listPurchases")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "IsAdmin")]
        public async Task<ActionResult<List<PurchaseDTO>>> GetListUsers([FromQuery] PaginationDTO paginationDTO)
        {
            var queryable = context.Purchases.AsQueryable();
            await HttpContext.InsertarametersPaginationInHeader(queryable);
            var purchases = await queryable.OrderBy(x => x.Id).Paginate(paginationDTO).ToListAsync();
            var purchaseDTOs = mapper.Map<List<PurchaseDTO>>(purchases);
            return purchaseDTOs;
        }


    }
}
