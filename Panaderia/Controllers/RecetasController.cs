using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Panaderia.Data;
using Panaderia.Models;

namespace Panaderia.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecetasController : ControllerBase
    {

        private readonly RecetasDbContext _context;

        public RecetasController(RecetasDbContext context)
        {
            _context = context;
        }

        // GET: api/Recetas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Recetas>>> GetRecetas()
        {
            //Mostramos la receta y los detalles de la receta
            return await _context.Recetas.ToListAsync();


        }

        // GET: api/Recetas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Recetas>> GetRecetas(int id)
        {
            var recetas = await _context.Recetas.FindAsync(id);

            if (recetas == null)
            {
                return NotFound();
            }

            return recetas;
        }

        // PUT: api/Recetas/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRecetas(int id, Recetas recetas)
        {
            if (id != recetas.id_receta)
            {
                return BadRequest();
            }

            _context.Entry(recetas).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RecetasExists(id))
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

        // POST: api/Recetas
        [HttpPost]
        public async Task<ActionResult<Recetas>> PostRecetas(Recetas recetas)
        {
            _context.Recetas.Add(recetas);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRecetas", new { id = recetas.id_receta }, recetas);
        }

        // DELETE: api/Recetas/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Recetas>> DeleteRecetas(int id)
        {
            var recetas = await _context.Recetas.FindAsync(id);
            if (recetas == null)
            {
                return NotFound();
            }

            _context.Recetas.Remove(recetas);
            await _context.SaveChangesAsync();

            return recetas;
        }

        private bool RecetasExists(int id)
        {
            return _context.Recetas.Any(e => e.id_receta == id);
        }
    }
}