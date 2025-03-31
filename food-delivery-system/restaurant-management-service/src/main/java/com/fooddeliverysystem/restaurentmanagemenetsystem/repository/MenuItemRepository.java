package com.fooddeliverysystem.restaurentmanagemenetsystem.repository;

import com.fooddeliverysystem.restaurentmanagemenetsystem.model.MenuItem;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MenuItemRepository extends JpaRepository<MenuItem, Long> {
    List<MenuItem> findByRestaurantId(Long restaurantId);
}
