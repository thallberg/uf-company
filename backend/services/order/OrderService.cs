public class OrderService : IOrderService
{
    private readonly IOrderRepository _orderRepo;
    private readonly IProductRepository _productRepo;

    public OrderService(IOrderRepository orderRepo, IProductRepository productRepo)
    {
        _orderRepo = orderRepo;
        _productRepo = productRepo;
    }

    public async Task CreateAsync(int userId, CreateOrderDto dto)
    {
        var order = new Order
        {
            UserId = userId,
            Items = new List<OrderItem>()
        };

        decimal total = 0;

        foreach (var item in dto.Items)
        {
            var product = await _productRepo.GetByIdAsync(item.ProductId);
            if (product == null)
                throw new Exception("Product not found");

            if (product.Stock < item.Quantity)
                throw new Exception("Not enough stock");

            product.Stock -= item.Quantity;
            await _productRepo.UpdateAsync(product);

            var orderItem = new OrderItem
            {
                ProductId = product.Id,
                Quantity = item.Quantity,
                Price = product.Price
            };

            total += product.Price * item.Quantity;
            order.Items.Add(orderItem);
        }

        order.TotalPrice = total;

        await _orderRepo.AddAsync(order);
    }

    // 👤 CUSTOMER
    public async Task<List<OrderResponseDto>> GetMyOrdersAsync(int userId)
    {
        var orders = await _orderRepo.GetByUserIdAsync(userId);

        return orders.Select(o => new OrderResponseDto
        {
            Id = o.Id,
            TotalPrice = o.TotalPrice,
            Status = o.Status,
            CustomerEmail = o.User.Email,

            Items = o.Items.Select(i => new OrderItemResponseDto
            {
                ProductId = i.ProductId,
                ProductName = i.Product.Name,
                Quantity = i.Quantity,
                Price = i.Price
            }).ToList()
        }).ToList();
    }

    // 👑 ADMIN
    public async Task<List<OrderResponseDto>> GetAllOrdersAsync()
    {
        var orders = await _orderRepo.GetAllAsync();

        return orders.Select(o => new OrderResponseDto
        {
            Id = o.Id,
            TotalPrice = o.TotalPrice,
            Status = o.Status,
            CustomerEmail = o.User.Email,

            Items = o.Items.Select(i => new OrderItemResponseDto
            {
                ProductId = i.ProductId,
                ProductName = i.Product.Name,
                Quantity = i.Quantity,
                Price = i.Price
            }).ToList()
        }).ToList();
    }

    public async Task UpdateStatusAsync(int orderId, string status)
    {
        var order = await _orderRepo.GetByIdAsync(orderId);

        if (order == null)
            throw new Exception("Order not found");

        var allowed = new[] { "Pending", "Completed", "Cancelled" };

        if (!allowed.Contains(status))
            throw new Exception("Invalid status");

        order.Status = status;

        await _orderRepo.UpdateAsync(order);
    }

    public async Task CancelOrderAsync(int orderId, int userId)
    {
        var order = await _orderRepo.GetByIdAsync(orderId);

        if (order == null)
            throw new Exception("Order not found");
            
        if (order.UserId != userId)
            throw new Exception("Unauthorized");

        if (order.Status != "Pending")
            throw new Exception("Cannot cancel this order");

        foreach (var item in order.Items)
        {
            var product = await _productRepo.GetByIdAsync(item.ProductId);

            if (product != null)
            {
                product.Stock += item.Quantity;
                await _productRepo.UpdateAsync(product);
            }
        }

        order.Status = "Cancelled";

        await _orderRepo.UpdateAsync(order);
    }
}