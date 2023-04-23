using Panaderia.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Panaderia.Data;

namespace Panaderia.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IngredientesController : ControllerBase
    {
        private readonly IngredientesDbContext _context;

        public IngredientesController(IngredientesDbContext context)
        {
            _context = context;
        }

        // GET: api/Ingredientes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Ingredientes>>> GetIngredientes()
        {
            var ingredientes = await _context.Ingredientes
            .Include(i => i.Marcas_Ingredientes)
            .ToListAsync();

            var ingredientesDtoList = ingredientes.Select(i => new Ingredientes
            {
                id_ingrediente = i.id_ingrediente,
                fk_marca_ingrediente = i.fk_marca_ingrediente,
                str_nombre_ingrediente = i.str_nombre_ingrediente,
                Marcas_Ingredientes = new Marcas_Ingredientes
                {
                    id_marca_ingrediente = i.Marcas_Ingredientes.id_marca_ingrediente,
                    str_nombre_marca = i.Marcas_Ingredientes.str_nombre_marca

                }
            }).ToList();

            return Ok(ingredientesDtoList);
        }

        // GET: api/Ingredientes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Ingredientes>> GetIngredientes(int id)
        {
            var ingredientes = await _context.Ingredientes
                .Include(i => i.Marcas_Ingredientes)
                .FirstOrDefaultAsync(i => i.id_ingrediente == id);

            if (ingredientes == null)
            {
                return NotFound();
            }

            var ingredientesDto = new Ingredientes
            {
                id_ingrediente = ingredientes.id_ingrediente,
                fk_marca_ingrediente = ingredientes.fk_marca_ingrediente,
                str_nombre_ingrediente = ingredientes.str_nombre_ingrediente,
                Marcas_Ingredientes = new Marcas_Ingredientes
                {
                    id_marca_ingrediente = ingredientes.Marcas_Ingredientes.id_marca_ingrediente,
                    str_nombre_marca = ingredientes.Marcas_Ingredientes.str_nombre_marca
                }
            };

            return Ok(ingredientesDto);
        }


        // PUT: api/Ingredientes/5
        [HttpPut("{id}")]

        public async Task<IActionResult> PutIngredientes(int id, Ingredientes ingredientes)
        {
            if (id != ingredientes.id_ingrediente)
            {
                return BadRequest();
            }

            _context.Entry(ingredientes).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!IngredientesExists(id))
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

        // POST: api/Ingredientes
        [HttpPost]
        public async Task<ActionResult<Ingredientes>> PostIngredientes(Ingredientes ingredientes)
        {
            _context.Ingredientes.Add(ingredientes);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetIngredientes", new { id = ingredientes.id_ingrediente }, ingredientes);
        }

        // DELETE: api/Ingredientes/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Ingredientes>> DeleteIngredientes(int id)
        {
            var ingredientes = await _context.Ingredientes.FindAsync(id);
            if (ingredientes == null)
            {
                return NotFound();
            }

            _context.Ingredientes.Remove(ingredientes);
            await _context.SaveChangesAsync();

            return ingredientes;
        }

        private bool IngredientesExists(int id)
        {
            return _context.Ingredientes.Any(e => e.id_ingrediente == id);
        }
    }
}