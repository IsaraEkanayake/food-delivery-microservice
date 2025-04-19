package com.fooddeliverysystem.ordermanagementservice.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderItemDTO {
    private Long id;
    private String productName;
    private Integer quantity;
    private Double price;
}