package com.fooddeliverysystem.devliverymanagementservice.dto;

import com.fooddeliverysystem.devliverymanagementservice.model.DeliveryStatus;
import lombok.*;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DeliveryDTO {
    private Long id;
    private Long orderId;
    private Long driverId;
    private DeliveryStatus status;
    private LocalDateTime assignedTime;
    private LocalDateTime deliveredTime;
}
