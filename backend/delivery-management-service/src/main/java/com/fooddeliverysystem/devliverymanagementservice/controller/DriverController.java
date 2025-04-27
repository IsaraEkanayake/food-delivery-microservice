package com.fooddeliverysystem.devliverymanagementservice.controller;

import com.fooddeliverysystem.devliverymanagementservice.dto.DriverDTO;
import com.fooddeliverysystem.devliverymanagementservice.service.DeliveryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/drivers")
@RequiredArgsConstructor
public class DriverController {

    private final DeliveryService deliveryService;

    @GetMapping("/test")
    public String test() {
        return "Driver Controller working!";
    }

    // Endpoint to register a new driver
    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public DriverDTO registerDriver(@RequestBody DriverDTO driverDTO) {
        return deliveryService.registerDriver(driverDTO);
    }

    // Endpoint to update driver's location and availability
    @PutMapping("/{driverId}/location")
    public DriverDTO updateDriverLocation(@PathVariable Long driverId,
                                          @RequestParam Double latitude,
                                          @RequestParam Double longitude,
                                          @RequestParam Boolean available) {
        return deliveryService.updateDriverLocation(driverId, latitude, longitude, available);
    }
}

