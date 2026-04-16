using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

[ApiController]
[Route("api/[controller]")]
public class ProductController : ControllerBase
{
    private readonly IProductService _service;

    public ProductController(IProductService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll(
        [FromQuery] int page = 1,
    [FromQuery] int pageSize = 10,
    [FromQuery] string? type = null,
    [FromQuery] bool? local = null,
    [FromQuery] string? search = null)
    {
        var result = await _service.GetPagedAsync(page, pageSize, type, local, search);
        return Ok(result);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> Get(int id)
    {
        var product = await _service.GetByIdAsync(id);
        if (product == null) return NotFound();

        return Ok(product);
    }

    [Authorize(Roles = "Admin")]
    [HttpPost]
    public async Task<IActionResult> Create(Product product)
    {
        await _service.CreateAsync(product);
        return Ok();
    }

    [Authorize(Roles = "Admin")]
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, Product product)
    {
        await _service.UpdateAsync(id, product);
        return Ok();
    }

    [Authorize(Roles = "Admin")]
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        await _service.DeleteAsync(id);
        return Ok();
    }

    [Authorize(Roles = "Admin")]
[HttpPost("bundle")]
public async Task<IActionResult> AddToBundle(ProductBundleDto dto)
{
    await _service.AddProductToBundleAsync(dto);
    return Ok();
}
}