package com.fooddeliverysystem.devliverymanagementservice.repository;

import com.fooddeliverysystem.devliverymanagementservice.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
}
