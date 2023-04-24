using Panaderia.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Panaderia.Data;

namespace Panaderia.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class Movimientos_stockController : ControllerBase
    {
        private readonly MovimientosDbContext _context;

        public Movimientos_stockController(MovimientosDbContext context)
        {
            _context = context;
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<Movimientos_stock>>> GetMovimientos_Stock()
        {
            return await _context.Movimientos_Stocks.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Movimientos_stock>> GetMovimientos_Stock(int id)
        {
            var movimientos_Stock = await _context.Movimientos_Stocks.FindAsync(id);

            if (movimientos_Stock == null)
            {
                return NotFound();
            }

            return movimientos_Stock;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutMovimientos_Stock(int id, Movimientos_stock movimientos_Stock)
        {
            if (id != movimientos_Stock.id_movimiento)
            {
                return BadRequest();
            }

            _context.Entry(movimientos_Stock).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Movimientos_StockExists(id))
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

        [HttpPost]
        public async Task<ActionResult<Movimientos_stock>> PostMovimientos_Stock(Movimientos_stock movimientos_Stock)
        {
            _context.Movimientos_Stocks.Add(movimientos_Stock);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMovimientos_Stock", new { id = movimientos_Stock.id_movimiento }, movimientos_Stock);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Movimientos_stock>> DeleteMovimientos_Stock(int id)
        {
            var movimientos_Stock = await _context.Movimientos_Stocks.FindAsync(id);
            if (movimientos_Stock == null)
            {
                return NotFound();
            }

            _context.Movimientos_Stocks.Remove(movimientos_Stock);
            await _context.SaveChangesAsync();

            return movimientos_Stock;
        }

        private bool Movimientos_StockExists(int id)
        {
            return _context.Movimientos_Stocks.Any(e => e.id_movimiento == id);
        }

    }
}