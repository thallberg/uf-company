public interface IOrderService
{
    Task CreateAsync(int userId, CreateOrderDto dto);
    Task<List<OrderResponseDto>> GetMyOrdersAsync(int userId);
    Task<List<OrderResponseDto>> GetAllOrdersAsync();
    Task UpdateStatusAsync(int orderId, string status);
    Task CancelOrderAsync(int orderId, int userId);
}