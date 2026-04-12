public class OrderResponseDto
{
    public int Id { get; set; }
    public decimal TotalPrice { get; set; }
    public string Status { get; set; } = string.Empty;

    public string CustomerEmail { get; set; } = string.Empty;

    public List<OrderItemResponseDto> Items { get; set; } = new();
}