using Billing.Api.Helpers;
using Billing.Api.Models;
using Billing.Database;
using Billing.Repository;
using System;
using System.Linq;
using System.Web.Http;

namespace Billing.Api.Controllers
{
    [RoutePrefix("api/items")]
    public class ItemsController : BaseController
    {
        [Route("")]
        //[TokenAuthorization("user,admin")]
        public IHttpActionResult Get()
        {
            return Ok(UnitOfWork.Items.Get().ToList().Select(x => Factory.Create(x)).ToList());
        }

        [Route("product/{id}")]
        //[TokenAuthorization("user,admin")]
        public IHttpActionResult GetByProduct(int id)
        {
            return Ok(UnitOfWork.Items.Get().Where(x => x.Product.Id == id).ToList().Select(x => Factory.Create(x)).ToList());
        }

        [Route("invoice/{id}")]
        //[TokenAuthorization("user,admin")]
        public IHttpActionResult GetByInvoice(int id)
        {
            return Ok(UnitOfWork.Items.Get().Where(x => x.Invoice.Id == id).ToList().Select(x => Factory.Create(x)).ToList());
        }

        [Route("{id:int}")]
        //[TokenAuthorization("user,admin")]
        public IHttpActionResult Get(int id)
        {
            try
            {
                Item item = UnitOfWork.Items.Get(id);
                if (item == null)
                {
                    return NotFound();
                }
                else
                {
                    return Ok(Factory.Create(item));
                }
            }
            catch (Exception ex)
            {
                Helper.Log(ex.Message, "ERROR");
                return BadRequest(ex.Message);
            }
        }

        //Insert item
        [Route("")]
        //[TokenAuthorization("user,admin")]
        public IHttpActionResult Post(ItemModel model)
        {
            try
            {
                Item item = Factory.Create(model); //stvaranje novog itema
                UnitOfWork.Items.Insert(item); //ubacivanje itema
                UnitOfWork.Commit();            //komitanje
                return Ok(Factory.Create(item));
            }
            catch (Exception ex)
            {
                Helper.Log(ex.Message, "ERROR");
                return BadRequest(ex.Message);
            }
        }

        //Update item
        [Route("{id}")]
        //[TokenAuthorization("user,admin")]
        public IHttpActionResult Put(int id, ItemModel model)
        {
            try
            {
                Item item = Factory.Create(model);
                UnitOfWork.Items.Update(item, id);//updejtovanje itema po idu
                UnitOfWork.Commit();
                return Ok(Factory.Create(item));
            }
            catch (Exception ex)
            {
                Helper.Log(ex.Message, "ERROR");
                return BadRequest(ex.Message);
            }
        }

        [Route("{id}")]
        //[TokenAuthorization("admin")]
        public IHttpActionResult Delete(int id)
        {
            try
            {
                Item entity = UnitOfWork.Items.Get(id);
                if (entity == null) return NotFound();
                UnitOfWork.Items.Delete(id);
                UnitOfWork.Commit();
                return Ok();
            }
            catch (Exception ex)
            {
                Helper.Log(ex.Message, "ERROR");
                return BadRequest(ex.Message);
            }
        }
    }
}
