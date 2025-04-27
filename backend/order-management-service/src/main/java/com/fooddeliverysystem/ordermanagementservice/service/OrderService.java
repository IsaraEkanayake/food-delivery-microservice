package com.fooddeliverysystem.ordermanagementservice.service;

import com.fooddeliverysystem.ordermanagementservice.dto.OrderDTO;
import com.fooddeliverysystem.ordermanagementservice.dto.OrderItemDTO;
import java.util.List;

public interface OrderService {
    OrderDTO createOrder(OrderDTO orderDTO);
    OrderDTO updateOrder(Long orderId, OrderDTO orderDTO);
    OrderDTO getCustomerOrder(Long orderId, Long customerId);
    List<OrderDTO> getOrdersByCustomer(Long customerId);
    void cancelCustomerOrder(Long orderId, Long customerId);
}