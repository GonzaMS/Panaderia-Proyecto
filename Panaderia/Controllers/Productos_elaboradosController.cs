using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Panaderia.Data;
using Panaderia.Models;

namespace Panaderia.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Productos_elaboradosController : ControllerBase
    {
        private readonly ProductosDbContext _context;

        public Productos_elaboradosController(ProductosDbContext context)
        {
            _context = context;
        }

        // GET: api/Productos_elaborados
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Productos_elaborados>>> GetProductos_elaborados()
        {
            return await _context.Productos_elaborados.ToListAsync();
        }

        // GET: api/Productos_elaborados/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Productos_elaborados>> GetProductos_elaborados(int id)
        {
            var productos_elaborados = await _context.Productos_elaborados.FindAsync(id);

            if (productos_elaborados == null)
            {
                return NotFound();
            }

            return productos_elaborados;
        }

        // POST: api/Productos_elaborados
        [HttpPost]
        public async Task<ActionResult<Productos_elaborados>> PostProductos_elaborados(Productos_elaborados productos_elaborados)
        {
            _context.Productos_elaborados.Add(productos_elaborados);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProductos_elaborados", new { id = productos_elaborados.id_producto_elaborado }, productos_elaborados);
        }

        // PUT: api/Productos_elaborados/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProductos_elaborados(int id, Productos_elaborados productos_elaborados)
        {
            if (id != productos_elaborados.id_producto_elaborado)
            {
                return BadRequest();
            }

            _context.Entry(productos_elaborados).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Productos_elaboradosExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(productos_elaborados);
        }

        // DELETE: api/Productos_elaborados/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Productos_elaborados>> DeleteProductos_elaborados(int id)
        {
            var productos_elaborados = await _context.Productos_elaborados.FindAsync(id);
            if (productos_elaborados == null)
            {
                return NotFound();
            }

            _context.Productos_elaborados.Remove(productos_elaborados);
            await _context.SaveChangesAsync();

            return productos_elaborados;
        }

        private bool Productos_elaboradosExists(int id)
        {
            return _context.Productos_elaborados.Any(e => e.id_producto_elaborado == id);
        }

    }
}