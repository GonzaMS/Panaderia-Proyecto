using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Panaderia.Data;
using Panaderia.Models;

[ApiController]
[Route("api/[controller]")]
public class Marcas_IngredientesController : ControllerBase
{
    private readonly Marcas_IngredientesDbContext _context;

    public Marcas_IngredientesController(Marcas_IngredientesDbContext dbContext)
    {
        _context = dbContext;
    }

    // GET: api/MarcasIngredientes
    // GET: api/MarcasIngredientes
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Marcas_Ingredientes>>> GetMarcasIngredientes()
    {
        var marcaIngrediente = await _context.Marcas_Ingredientes.Include(m => m.Ingredientes).ToListAsync();

        var marcasDtoList = marcaIngrediente.Select(m => new Marcas_Ingredientes
        {
            id_marca_ingrediente = m.id_marca_ingrediente,
            str_nombre_marca = m.str_nombre_marca,
            Ingredientes = m.Ingredientes.Select(i => new Ingredientes
            {
                id_ingrediente = i.id_ingrediente,
                fk_marca_ingrediente = i.fk_marca_ingrediente,
                str_nombre_ingrediente = i.str_nombre_ingrediente
            }).ToList()
        }).ToList();

        return Ok(marcasDtoList);
    }


    // GET: api/MarcasIngredientes/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Marcas_Ingredientes>> GetMarcasIngrediente(int id)
    {
        var marcas_Ingredientes = await _context.Marcas_Ingredientes
            .Include(m => m.Ingredientes)
            .FirstOrDefaultAsync(m => m.id_marca_ingrediente == id);

        if (marcas_Ingredientes == null)
        {
            return NotFound();
        }

        var marcasDto = new Marcas_Ingredientes
        {
            id_marca_ingrediente = marcas_Ingredientes.id_marca_ingrediente,
            str_nombre_marca = marcas_Ingredientes.str_nombre_marca,
            Ingredientes = marcas_Ingredientes.Ingredientes.Select(i => new Ingredientes
            {
                id_ingrediente = i.id_ingrediente,
                fk_marca_ingrediente = i.fk_marca_ingrediente,
                str_nombre_ingrediente = i.str_nombre_ingrediente
            }).ToList()
        };

        return Ok(marcasDto);
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
