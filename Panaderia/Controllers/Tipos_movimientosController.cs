using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Panaderia.Data;
using Panaderia.Models;

namespace Panaderia.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Tipos_movimientosController : ControllerBase
    {
        private readonly ProductosyMovimientosDbContext _context;

        public Tipos_movimientosController(ProductosyMovimientosDbContext context)
        {
            _context = context;
        }

        // GET: api/Tipos_movimientos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Tipos_movimientos>>> GetTipos_movimientos()
        {
            return await _context.Tipos_movimientos.ToListAsync();
        }

        // GET: api/Tipos_movimientos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Tipos_movimientos>> GetTipos_movimientos(int id)
        {
            var tipos_movimientos = await _context.Tipos_movimientos.FindAsync(id);

            if (tipos_movimientos == null)
            {
                return NotFound();
            }

            return tipos_movimientos;
        }

        // POST: api/Tipos_movimientos
        [HttpPost]
        public async Task<ActionResult<Tipos_movimientos>> PostTipos_movimientos(Tipos_movimientos tipos_movimientos)
        {
            _context.Tipos_movimientos.Add(tipos_movimientos);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTipos_movimientos", new { id = tipos_movimientos.id_tipo_movimiento }, tipos_movimientos);
        }

        // PUT: api/Tipos_movimientos/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTipos_movimientos(int id, Tipos_movimientos tipos_movimientos)
        {
            if (id != tipos_movimientos.id_tipo_movimiento)
            {
                return BadRequest();
            }

            _context.Entry(tipos_movimientos).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Tipos_movimientosExists(id))
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

        // DELETE: api/Tipos_movimientos/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Tipos_movimientos>> DeleteTipos_movimientos(int id)
        {
            var tipos_movimientos = await _context.Tipos_movimientos.FindAsync(id);
            if (tipos_movimientos == null)
            {
                return NotFound();
            }

            _context.Tipos_movimientos.Remove(tipos_movimientos);
            await _context.SaveChangesAsync();

            return tipos_movimientos;
        }

        private bool Tipos_movimientosExists(int id)
        {
            return _context.Tipos_movimientos.Any(e => e.id_tipo_movimiento == id);
        }
    }
}