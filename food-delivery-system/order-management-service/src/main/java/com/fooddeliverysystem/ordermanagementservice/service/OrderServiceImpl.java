package com.fooddeliverysystem.ordermanagementservice.service;

import com.fooddeliverysystem.ordermanagementservice.dto.CustomerDTO;
import com.fooddeliverysystem.ordermanagementservice.dto.OrderDTO;
import com.fooddeliverysystem.ordermanagementservice.dto.OrderItemDTO;
import com.fooddeliverysystem.ordermanagementservice.model.Customer;
import com.fooddeliverysystem.ordermanagementservice.model.Order;
import com.fooddeliverysystem.ordermanagementservice.model.OrderItem;
import com.fooddeliverysystem.ordermanagementservice.model.OrderStatus;
import com.fooddeliverysystem.ordermanagementservice.repository.CustomerRepository;
import com.fooddeliverysystem.ordermanagementservice.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final CustomerRepository customerRepository;
    private final OrderRepository orderRepository;

    @Override
    public CustomerDTO registerCustomer(CustomerDTO customerDTO) {
        Customer customer = Customer.builder()
                .name(customerDTO.getName())
                .email(customerDTO.getEmail())
                .build();
        customer = customerRepository.save(customer);
        customerDTO.setId(customer.getId());
        return customerDTO;
    }

    @Override
    public OrderDTO createOrder(OrderDTO orderDTO) {
        // Validate customer
        Customer customer = customerRepository.findById(orderDTO.getCustomerId())
                .orElseThrow(() -> new EntityNotFoundException("Customer not found"));

        Order order = Order.builder()
                .orderDate(LocalDateTime.now())
                .status(OrderStatus.PENDING)
                .customer(customer)
                .build();

        if (orderDTO.getOrderItems() != null) {
            Order finalOrder = order;
            List<OrderItem> orderItems = orderDTO.getOrderItems().stream()
                    .map(itemDTO -> OrderItem.builder()
                            .productName(itemDTO.getProductName())
                            .quantity(itemDTO.getQuantity())
                            .price(itemDTO.getPrice())
                            .order(finalOrder)
                            .build())
                    .collect(Collectors.toList());
            order.setOrderItems(orderItems);
        }

        order = orderRepository.save(order);
        orderDTO.setId(order.getId());
        orderDTO.setOrderDate(order.getOrderDate());
        orderDTO.setStatus(order.getStatus());
        return orderDTO;
    }

    @Override
    public OrderDTO updateOrder(Long orderId, OrderDTO orderDTO) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new EntityNotFoundException("Order not found"));

        // Allow modifications only if the order is still pending
        if (order.getStatus() != OrderStatus.PENDING) {
            throw new IllegalStateException("Only pending orders can be modified");
        }

        if (orderDTO.getOrderItems() != null) {
            order.getOrderItems().clear();
            Order finalOrder = order;
            List<OrderItem> updatedItems = orderDTO.getOrderItems().stream()
                    .map(itemDTO -> OrderItem.builder()
                            .productName(itemDTO.getProductName())
                            .quantity(itemDTO.getQuantity())
                            .price(itemDTO.getPrice())
                            .order(finalOrder)
                            .build())
                    .collect(Collectors.toList());
            order.getOrderItems().addAll(updatedItems);
        }

        order = orderRepository.save(order);
        orderDTO.setId(order.getId());
        orderDTO.setOrderDate(order.getOrderDate());
        orderDTO.setStatus(order.getStatus());
        return orderDTO;
    }

    @Override
    public OrderDTO getOrder(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new EntityNotFoundException("Order not found"));

        OrderDTO orderDTO = OrderDTO.builder()
                .id(order.getId())
                .customerId(order.getCustomer().getId())
                .orderDate(order.getOrderDate())
                .status(order.getStatus())
                .build();

        if (order.getOrderItems() != null) {
            orderDTO.setOrderItems(order.getOrderItems().stream()
                    .map(item -> OrderItemDTO.builder()
                            .id(item.getId())
                            .productName(item.getProductName())
                            .quantity(item.getQuantity())
                            .price(item.getPrice())
                            .build())
                    .collect(Collectors.toList()));
        }

        return orderDTO;
    }

    @Override
    public List<OrderDTO> getOrdersByCustomer(Long customerId) {
        List<Order> orders = orderRepository.findByCustomerId(customerId);
        return orders.stream().map(order -> {
            OrderDTO orderDTO = OrderDTO.builder()
                    .id(order.getId())
                    .customerId(order.getCustomer().getId())
                    .orderDate(order.getOrderDate())
                    .status(order.getStatus())
                    .build();
            if (order.getOrderItems() != null) {
                orderDTO.setOrderItems(order.getOrderItems().stream()
                        .map(item -> OrderItemDTO.builder()
                                .id(item.getId())
                                .productName(item.getProductName())
                                .quantity(item.getQuantity())
                                .price(item.getPrice())
                                .build())
                        .collect(Collectors.toList()));
            }
            return orderDTO;
        }).collect(Collectors.toList());
    }
}

