using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Panaderia.Data;
using Panaderia.Models;

[ApiController]
[Route("api/[controller]")]
public class Marcas_IngredientesController : ControllerBase
{
    private readonly IngredientesDbContext _context;

    public Marcas_IngredientesController(IngredientesDbContext dbContext)
    {
        _context = dbContext;
    }

    // GET: api/MarcasIngredientes
    // GET: api/MarcasIngredientes
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Marcas_Ingredientes>>> GetMarcasIngredientes()
    {
        return await _context.Marcas_Ingredientes.ToListAsync();
    }


    // GET: api/MarcasIngredientes/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Marcas_Ingredientes>> GetMarcasIngrediente(int id)
    {
        var marcaIngrediente = await _context.Marcas_Ingredientes.FindAsync(id);

        if (marcaIngrediente == null)
        {
            return NotFound();
        }

        return marcaIngrediente;
    }


    // POST: api/MarcasIngredientes
    [HttpPost]
    public async Task<ActionResult<Marcas_Ingredientes>> PostMarcaIngrediente(Marcas_Ingredientes marcaIngrediente)
    {
        _context.Marcas_Ingredientes.Add(marcaIngrediente);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetMarcasIngrediente), new { id = marcaIngrediente.id_marca_ingrediente }, marcaIngrediente);
    }

    // PUT: api/MarcasIngredientes/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutMarcaIngrediente(int id, Marcas_Ingredientes marcaIngrediente)
    {
        if (id != marcaIngrediente.id_marca_ingrediente)
        {
            return BadRequest();
        }

        _context.Entry(marcaIngrediente).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!MarcaIngredienteExists(id))
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

    // DELETE: api/MarcasIngredientes/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteMarcaIngrediente(int id)
    {
        var marcaIngrediente = await _context.Marcas_Ingredientes.FindAsync(id);
        if (marcaIngrediente == null)
        {
            return NotFound();
        }

        _context.Marcas_Ingredientes.Remove(marcaIngrediente);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool MarcaIngredienteExists(int id)
    {
        return _context.Marcas_Ingredientes.Any(e => e.id_marca_ingrediente == id);
    }
}
