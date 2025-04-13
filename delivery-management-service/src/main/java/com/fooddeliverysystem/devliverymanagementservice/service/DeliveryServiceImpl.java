package com.fooddeliverysystem.devliverymanagementservice.service;

import com.fooddeliverysystem.devliverymanagementservice.dto.DeliveryDTO;
import com.fooddeliverysystem.devliverymanagementservice.dto.DriverDTO;
import com.fooddeliverysystem.devliverymanagementservice.model.Delivery;
import com.fooddeliverysystem.devliverymanagementservice.model.DeliveryStatus;
import com.fooddeliverysystem.devliverymanagementservice.model.Driver;
import com.fooddeliverysystem.devliverymanagementservice.repository.DeliveryRepository;
import com.fooddeliverysystem.devliverymanagementservice.repository.DriverRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
public class DeliveryServiceImpl implements DeliveryService {

    private final DriverRepository driverRepository;
    private final DeliveryRepository deliveryRepository;

    @Override
    public DriverDTO registerDriver(DriverDTO driverDTO) {
        Driver driver = Driver.builder()
                .name(driverDTO.getName())
                .email(driverDTO.getEmail())
                .phone(driverDTO.getPhone())
                .latitude(driverDTO.getLatitude())
                .longitude(driverDTO.getLongitude())
                .available(driverDTO.getAvailable() != null ? driverDTO.getAvailable() : true)
                .build();
        driver = driverRepository.save(driver);
        driverDTO.setId(driver.getId());
        return driverDTO;
    }

    @Override
    public DriverDTO updateDriverLocation(Long driverId, Double latitude, Double longitude, Boolean available) {
        Driver driver = driverRepository.findById(driverId)
                .orElseThrow(() -> new EntityNotFoundException("Driver not found"));
        driver.setLatitude(latitude);
        driver.setLongitude(longitude);
        driver.setAvailable(available);
        driver = driverRepository.save(driver);
        return DriverDTO.builder()
                .id(driver.getId())
                .name(driver.getName())
                .email(driver.getEmail())
                .phone(driver.getPhone())
                .latitude(driver.getLatitude())
                .longitude(driver.getLongitude())
                .available(driver.getAvailable())
                .build();
    }

    @Override
    public DeliveryDTO assignDriver(Long orderId, Double orderLatitude, Double orderLongitude) {
        // Find all available drivers
        List<Driver> availableDrivers = driverRepository.findByAvailableTrue();
        if (availableDrivers.isEmpty()) {
            throw new EntityNotFoundException("No available drivers found");
        }

        // Calculate simple Euclidean distance (for demo purposes)
        Driver nearestDriver = availableDrivers.stream()
                .min(Comparator.comparing(driver ->
                        Math.pow(driver.getLatitude() - orderLatitude, 2) +
                                Math.pow(driver.getLongitude() - orderLongitude, 2)
                ))
                .orElseThrow(() -> new EntityNotFoundException("No available drivers found"));

        // Mark the driver as unavailable
        nearestDriver.setAvailable(false);
        driverRepository.save(nearestDriver);

        // Create a new delivery record
        Delivery delivery = Delivery.builder()
                .orderId(orderId)
                .driver(nearestDriver)
                .status(DeliveryStatus.ASSIGNED)
                .assignedTime(LocalDateTime.now())
                .build();
        delivery = deliveryRepository.save(delivery);

        return DeliveryDTO.builder()
                .id(delivery.getId())
                .orderId(delivery.getOrderId())
                .driverId(nearestDriver.getId())
                .status(delivery.getStatus())
                .assignedTime(delivery.getAssignedTime())
                .build();
    }

    @Override
    public DeliveryDTO updateDeliveryStatus(Long deliveryId, DeliveryStatus status) {
        Delivery delivery = deliveryRepository.findById(deliveryId)
                .orElseThrow(() -> new EntityNotFoundException("Delivery not found"));
        delivery.setStatus(status);
        if (status == DeliveryStatus.DELIVERED) {
            delivery.setDeliveredTime(LocalDateTime.now());
            // Optionally, mark driver as available again
            Driver driver = delivery.getDriver();
            driver.setAvailable(true);
            driverRepository.save(driver);
        }
        delivery = deliveryRepository.save(delivery);
        return DeliveryDTO.builder()
                .id(delivery.getId())
                .orderId(delivery.getOrderId())
                .driverId(delivery.getDriver().getId())
                .status(delivery.getStatus())
                .assignedTime(delivery.getAssignedTime())
                .deliveredTime(delivery.getDeliveredTime())
                .build();
    }

    @Override
    public Optional<DeliveryDTO> getDelivery(Long deliveryId) {
        return deliveryRepository.findById(deliveryId)
                .map(delivery -> DeliveryDTO.builder()
                        .id(delivery.getId())
                        .orderId(delivery.getOrderId())
                        .driverId(delivery.getDriver().getId())
                        .status(delivery.getStatus())
                        .assignedTime(delivery.getAssignedTime())
                        .deliveredTime(delivery.getDeliveredTime())
                        .build());
    }
}

