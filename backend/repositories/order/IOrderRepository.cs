public interface IOrderRepository
{
    Task AddAsync(Order order);
    Task<List<Order>> GetByUserIdAsync(int userId);
    Task<Order?> GetByIdAsync(int id);
    Task UpdateAsync(Order order);
    Task<List<Order>> GetAllAsync();
}