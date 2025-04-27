package com.fooddeliverysystem.ordermanagementservice.controller;

import com.fooddeliverysystem.ordermanagementservice.dto.OrderDTO;
import com.fooddeliverysystem.ordermanagementservice.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class OrderController {

    private final OrderService orderService;

    @PostMapping("/customer/{customerId}")
    @ResponseStatus(HttpStatus.CREATED)
    public OrderDTO createOrderForCustomer(
            @PathVariable Long customerId,
            @RequestBody OrderDTO orderDTO) {
        orderDTO.setCustomerId(customerId); // Set customer ID from path
        return orderService.createOrder(orderDTO);
    }

    @PutMapping("/{orderId}/customer/{customerId}")
    public OrderDTO updateOrderForCustomer(
            @PathVariable Long orderId,
            @PathVariable Long customerId,
            @RequestBody OrderDTO orderDTO) {
        orderDTO.setCustomerId(customerId);
        return orderService.updateOrder(orderId, orderDTO);
    }

    @GetMapping("/{orderId}/customer/{customerId}")
    public OrderDTO getCustomerOrder(
            @PathVariable Long orderId,
            @PathVariable Long customerId) {
        return orderService.getCustomerOrder(orderId, customerId);
    }

    @GetMapping("/customer/{customerId}")
    public List<OrderDTO> getOrdersByCustomer(@PathVariable Long customerId) {
        return orderService.getOrdersByCustomer(customerId);
    }

    @DeleteMapping("/{orderId}/customer/{customerId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void cancelCustomerOrder(
            @PathVariable Long orderId,
            @PathVariable Long customerId) {
        orderService.cancelCustomerOrder(orderId, customerId);
    }
}