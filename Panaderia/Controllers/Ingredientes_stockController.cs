using Panaderia.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Panaderia.Data;


namespace Panaderia.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Ingredientes_stockController : ControllerBase
    {
        private readonly StocksDbContext _context;

        public Ingredientes_stockController(StocksDbContext context)
        {
            _context = context;
        }

        // GET: api/Ingredientes_stock
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Ingredientes_stock>>> GetIngredientes_stock()
        {
            return await _context.Ingredientes_stock.ToListAsync();
        }

        // GET: api/Ingredientes_stock/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Ingredientes_stock>> GetIngredientes_stock(int id)
        {
            var ingredientes_stock = await _context.Ingredientes_stock.FindAsync(id);

            if (ingredientes_stock == null)
            {
                return NotFound();
            }

            return ingredientes_stock;
        }
        // POST: api/Ingredientes_stock
        [HttpPost]
        public async Task<ActionResult<Ingredientes_stock>> PostIngredientes_stock(Ingredientes_stock ingredientes_stock)
        {
            _context.Ingredientes_stock.Add(ingredientes_stock);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetIngredientes_stock", new { id = ingredientes_stock.id_ingrediente_stock }, ingredientes_stock);
        }


        // PUT: api/Ingredientes_stock/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutIngredientes_stock(int id, Ingredientes_stock ingredientes_stock)
        {
            if (id != ingredientes_stock.id_ingrediente_stock)
            {
                return BadRequest();
            }

            _context.Entry(ingredientes_stock).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!IngredientesStockExists(id))
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
        public async Task<IActionResult> DeleteIngredientes_stock(int id)
        {
            var ingredientes_stock = await _context.Ingredientes_stock.FindAsync(id);
            if (ingredientes_stock == null)
            {
                return NotFound();
            }

            _context.Ingredientes_stock.Remove(ingredientes_stock);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        private bool IngredientesStockExists(int id)
        {
            return _context.Ingredientes_stock.Any(e => e.id_ingrediente_stock == id);
        }
    }
}