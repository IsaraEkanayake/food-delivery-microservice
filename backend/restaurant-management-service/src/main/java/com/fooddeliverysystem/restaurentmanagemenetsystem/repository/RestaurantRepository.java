package com.fooddeliverysystem.restaurentmanagemenetsystem.repository;

import com.fooddeliverysystem.restaurentmanagemenetsystem.model.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {
}