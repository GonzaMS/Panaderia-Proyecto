using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Panaderia.Data;
using Panaderia.Models;

namespace Panaderia.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Movimiento_stockController : ControllerBase
    {

        private readonly MovimientosDbContext _context;

        public Movimiento_stockController(MovimientosDbContext dbContext)
        {
            _context = dbContext;
        }

        // GET: api/Movimiento_stock
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Movimiento_stock>>> GetMovimiento_stock()
        {
            return await _context.Movimiento_stock.ToListAsync();
        }


        // GET: api/MarcasIngredientes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Movimiento_stock>> GetMovimiento_stock(int id)
        {
            var Movimiento_stock = await _context.Movimiento_stock.FindAsync(id);

            if (Movimiento_stock == null)
            {
                return NotFound();
            }

            return Movimiento_stock;
        }


        // POST: api/Movimiento_stock
        [HttpPost]
        public async Task<ActionResult<Movimiento_stock>> PostMovimiento_stock(Movimiento_stock Movimiento_stock)
        {
            _context.Movimiento_stock.Add(Movimiento_stock);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetMovimiento_stock), new { id = Movimiento_stock.id_transferencia_stock }, Movimiento_stock);
        }

        // PUT: api/Movimiento_stock/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMovimiento_stock(int id, Movimiento_stock Movimiento_stock)
        {
            if (id != Movimiento_stock.id_transferencia_stock)
            {
                return BadRequest();
            }

            _context.Entry(Movimiento_stock).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Movimiento_stockExist(id))
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

        // DELETE: api/Movimiento_stock/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMovimiento_stock(int id)
        {
            var Movimiento_stock = await _context.Movimiento_stock.FindAsync(id);
            if (Movimiento_stock == null)
            {
                return NotFound();
            }

            _context.Movimiento_stock.Remove(Movimiento_stock);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool Movimiento_stockExist(int id)
        {
            return _context.Movimiento_stock.Any(e => e.id_transferencia_stock == id);
        }

    }
}