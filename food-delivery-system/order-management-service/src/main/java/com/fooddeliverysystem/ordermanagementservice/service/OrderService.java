package com.fooddeliverysystem.ordermanagementservice.service;

import com.fooddeliverysystem.ordermanagementservice.dto.CustomerDTO;
import com.fooddeliverysystem.ordermanagementservice.dto.OrderDTO;
import java.util.List;

public interface OrderService {
    CustomerDTO registerCustomer(CustomerDTO customerDTO);
    OrderDTO createOrder(OrderDTO orderDTO);
    OrderDTO updateOrder(Long orderId, OrderDTO orderDTO);
    OrderDTO getOrder(Long orderId);
    List<OrderDTO> getOrdersByCustomer(Long customerId);
}

