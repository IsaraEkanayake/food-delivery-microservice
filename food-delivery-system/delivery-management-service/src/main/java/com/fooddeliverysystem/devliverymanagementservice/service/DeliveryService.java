package com.fooddeliverysystem.devliverymanagementservice.service;

import com.fooddeliverysystem.devliverymanagementservice.dto.DeliveryDTO;
import com.fooddeliverysystem.devliverymanagementservice.dto.DriverDTO;
import com.fooddeliverysystem.devliverymanagementservice.model.DeliveryStatus;

import java.util.Optional;

public interface DeliveryService {
    // Register a new driver
    DriverDTO registerDriver(DriverDTO driverDTO);

    // Update driver's current location and availability
    DriverDTO updateDriverLocation(Long driverId, Double latitude, Double longitude, Boolean available);

    // Automatically assign a driver to an order based on order location
    DeliveryDTO assignDriver(Long orderId, Double orderLatitude, Double orderLongitude);

    // Update the status of a delivery
    DeliveryDTO updateDeliveryStatus(Long deliveryId, DeliveryStatus status);

    // Get delivery details (for tracking)
    Optional<DeliveryDTO> getDelivery(Long deliveryId);
}

