package com.fooddeliverysystem.devliverymanagementservice.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DriverDTO {
    private Long id;
    private String name;
    private String email;
    private String phone;
    private Double latitude;
    private Double longitude;
    private Boolean available;
}

