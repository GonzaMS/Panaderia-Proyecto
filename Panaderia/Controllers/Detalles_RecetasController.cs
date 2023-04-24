using Panaderia.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Panaderia.Data;

namespace Panaderia.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Detalles_ProductosController : ControllerBase
    {
        private readonly ProductosDbContext _context;

        public Detalles_ProductosController(ProductosDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Detalles_Productos>>> GetDetalles_Productos()
        {
            return await _context.Detalles_Productos.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Detalles_Productos>> GetDetalles_Productos(int id)
        {
            var detalles_Productos = await _context.Detalles_Productos.FindAsync(id);

            if (detalles_Productos == null)
            {
                return NotFound();
            }

            return detalles_Productos;
        }

        [HttpPost]
        public async Task<ActionResult<Detalles_Productos>> PostDetalles_Productos(Detalles_Productos detalles_Productos)
        {
            _context.Detalles_Productos.Add(detalles_Productos);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDetalles_Productos", new { id = detalles_Productos.id_detalle_producto }, detalles_Productos);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutDetalles_Productos(int id, Detalles_Productos detalles_Productos)
        {
            if (id != detalles_Productos.id_detalle_producto)
            {
                return BadRequest();
            }

            _context.Entry(detalles_Productos).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Detalles_ProductosExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Detalles_Productos>> DeleteDetalles_Productos(int id)
        {
            var detalles_Productos = await _context.Detalles_Productos.FindAsync(id);
            if (detalles_Productos == null)
            {
                return NotFound();
            }

            _context.Detalles_Productos.Remove(detalles_Productos);
            await _context.SaveChangesAsync();

            return detalles_Productos;
        }

        private bool Detalles_ProductosExists(int id)
        {
            return _context.Detalles_Productos.Any(e => e.id_detalle_producto == id);
        }
    }
}