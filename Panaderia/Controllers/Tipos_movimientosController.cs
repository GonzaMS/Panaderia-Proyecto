using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Panaderia.Data;
using Panaderia.Models;


namespace Panaderia.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Tipos_MovimientoController : ControllerBase
    {
        private readonly MovimientosDbContext _context;

        public Tipos_MovimientoController(MovimientosDbContext context)
        {
            _context = context;
        }

        // GET: api/Tipos_Movimientos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Tipos_movimientos>>> GetTipos_Movimientos()
        {
            return await _context.Tipos_Movimientos.ToListAsync();
        }

        // GET: api/TiposMovimientos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Tipos_movimientos>> GetTipos_Movimientos(int id)
        {
            var tipos_Movimientos = await _context.Tipos_Movimientos.FindAsync(id);

            if (tipos_Movimientos == null)
            {
                return NotFound();
            }

            return tipos_Movimientos;
        }

        // PUT: api/TiposMovimientos/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTipos_Movimientos(int id, Tipos_movimientos tipos_Movimientos)
        {
            if (id != tipos_Movimientos.id_tipo)
            {
                return BadRequest();
            }

            _context.Entry(tipos_Movimientos).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Tipos_MovimientosExists(id))
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

        // POST: api/TiposMovimientos
        [HttpPost]
        public async Task<ActionResult<Tipos_movimientos>> PostTipos_Movimientos(Tipos_movimientos tipos_Movimientos)
        {
            _context.Tipos_Movimientos.Add(tipos_Movimientos);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTipos_Movimientos", new { id = tipos_Movimientos.id_tipo }, tipos_Movimientos);
        }

        // DELETE: api/TiposMovimientos/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTipos_Movimientos(int id)
        {
            var tipos_Movimientos = await _context.Tipos_Movimientos.FindAsync(id);
            if (tipos_Movimientos == null)
            {
                return NotFound();
            }

            _context.Tipos_Movimientos.Remove(tipos_Movimientos);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool Tipos_MovimientosExists(int id)
        {
            return _context.Tipos_Movimientos.Any(e => e.id_tipo == id);
        }
    }
}