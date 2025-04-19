package com.fooddeliverysystem.restaurentmanagemenetsystem.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MenuItemDTO {
    private Long id;
    private String name;
    private String description;
    private double price;
}