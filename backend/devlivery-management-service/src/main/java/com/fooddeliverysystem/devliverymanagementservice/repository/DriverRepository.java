package com.fooddeliverysystem.devliverymanagementservice.repository;

import com.fooddeliverysystem.devliverymanagementservice.model.Driver;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface DriverRepository extends JpaRepository<Driver, Long> {
    // Find all drivers who are available for assignment.
    List<Driver> findByAvailableTrue();
}

