package com.fooddeliverysystem.devliverymanagementservice.controller;

import com.fooddeliverysystem.devliverymanagementservice.dto.DeliveryDTO;
import com.fooddeliverysystem.devliverymanagementservice.model.DeliveryStatus;
import com.fooddeliverysystem.devliverymanagementservice.service.DeliveryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@RestController
@RequestMapping("/api/deliveries")
@RequiredArgsConstructor
public class DeliveryController {

    private final DeliveryService deliveryService;

    @GetMapping("/test")
    public String test() {
        return "Delivery Controller working!";
    }

    // Endpoint to assign a driver to an order based on order location
    @PostMapping("/assign")
    @ResponseStatus(HttpStatus.CREATED)
    public DeliveryDTO assignDriver(@RequestParam Long orderId,
                                    @RequestParam Double orderLatitude,
                                    @RequestParam Double orderLongitude) {
        return deliveryService.assignDriver(orderId, orderLatitude, orderLongitude);
    }

    // Endpoint to update delivery status (e.g., PICKED_UP, IN_TRANSIT, DELIVERED)
    @PutMapping("/{deliveryId}/status")
    public DeliveryDTO updateDeliveryStatus(@PathVariable Long deliveryId,
                                            @RequestParam DeliveryStatus status) {
        return deliveryService.updateDeliveryStatus(deliveryId, status);
    }

    // Endpoint for customers to track delivery details
    @GetMapping("/{deliveryId}")
    public Optional<DeliveryDTO> getDelivery(@PathVariable Long deliveryId) {
        return deliveryService.getDelivery(deliveryId);
    }
}
