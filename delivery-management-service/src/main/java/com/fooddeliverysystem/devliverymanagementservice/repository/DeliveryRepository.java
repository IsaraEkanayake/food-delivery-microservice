package com.fooddeliverysystem.devliverymanagementservice.repository;

import com.fooddeliverysystem.devliverymanagementservice.model.Delivery;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DeliveryRepository extends JpaRepository<Delivery, Long> {
    // Additional query methods can be added here later
}
