using Panaderia.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Panaderia.Data;

namespace Panaderia.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArqueosController : ControllerBase
    {
        private readonly ArqueosDbContext _context;

        public ArqueosController(ArqueosDbContext context)
        {
            _context = context;
        }

        // GET: api/Arqueos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Arqueos>>> GetArqueos()
        {
            return await _context.Arqueos.ToListAsync();
        }

        // GET: api/Ingredientes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Arqueos>> GetArqueos(int id)
        {
            var arqueos = await _context.Arqueos.FindAsync(id);

            if (arqueos == null)
            {
                return NotFound();
            }

            return arqueos;
        }

        // POST: api/Aruqueos //Agregado
        [HttpPost]
        public async Task<ActionResult<Arqueos>> PostArqueos(Arqueos arqueos)
        {
            _context.Arqueos.Add(arqueos);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetArqueos", new { id = arqueos.id_arqueo }, arqueos);
        }


        // PUT: api/Arqueos/12
        [HttpPut("{id}")]

        public async Task<IActionResult> PutArqueos(int id, Arqueos arqueos)
        {
            if (id != arqueos.id_arqueo)
            {
                return BadRequest();
            }

            _context.Entry(arqueos).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ArqueosExists(id))
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

        // DELETE: api/Arqueos/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Arqueos>> DeleteArqueos(int id)
        {
            var arqueos = await _context.Arqueos.FindAsync(id);
            if (arqueos == null)
            {
                return NotFound();
            }

            _context.Arqueos.Remove(arqueos);
            await _context.SaveChangesAsync();

            return arqueos;
        }

        private bool ArqueosExists(int id)
        {
            return _context.Arqueos.Any(e => e.id_arqueo == id);
        }
    }
}