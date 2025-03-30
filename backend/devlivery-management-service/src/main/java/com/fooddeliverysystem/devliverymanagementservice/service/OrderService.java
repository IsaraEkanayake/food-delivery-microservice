package com.fooddeliverysystem.devliverymanagementservice.service;

import com.fooddeliverysystem.devliverymanagementservice.dto.OrderLineItemDto;
import com.fooddeliverysystem.devliverymanagementservice.dto.OrderRequest;
import com.fooddeliverysystem.devliverymanagementservice.model.Order;
import com.fooddeliverysystem.devliverymanagementservice.model.OrderLineItem;
import com.fooddeliverysystem.devliverymanagementservice.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;

    public void placeOrder(OrderRequest orderRequest) {
        Order order = new Order();
        order.setOrderNumber(UUID.randomUUID().toString());

        List<OrderLineItem> orderLineItems = orderRequest.getOrderLineItemsDtoList()
                .stream()
                .map(this::mapToDto)
                .toList();

        order.setOrderLineItemsList(orderLineItems);

        orderRepository.save(order);
    }

    private OrderLineItem mapToDto(OrderLineItemDto orderLineItemDto) {
        OrderLineItem orderLineItem = new OrderLineItem();
        orderLineItem.setPrice(orderLineItem.getPrice());
        orderLineItem.setQuantity(orderLineItem.getQuantity());
        orderLineItem.setSkuCode(orderLineItem.getSkuCode());
        return orderLineItem;
    }
}
