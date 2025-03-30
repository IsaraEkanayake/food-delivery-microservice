package com.fooddeliverysystem.devliverymanagementservice.model;

import lombok.*;
import jakarta.persistence.*;

@Entity
@Table(name = "drivers")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Driver {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String phone;

    // Current location coordinates
    private Double latitude;
    private Double longitude;

    // Indicates if the driver is available for new deliveries
    private Boolean available;
}
