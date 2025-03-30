package com.fooddeliverysystem.restaurentmanagemenetsystem.service;

import com.fooddeliverysystem.restaurentmanagemenetsystem.dto.MenuItemDTO;
import com.fooddeliverysystem.restaurentmanagemenetsystem.dto.RestaurantDTO;

import java.util.List;

public interface RestaurantService {
    MenuItemDTO addMenuItem(Long restaurantId, MenuItemDTO menuItemDTO);
    MenuItemDTO updateMenuItem(Long restaurantId, Long menuItemId, MenuItemDTO menuItemDTO);
    void deleteMenuItem(Long restaurantId, Long menuItemId);
    RestaurantDTO updateAvailability(Long restaurantId, boolean available);
    List<MenuItemDTO> getMenuItems(Long restaurantId);

    RestaurantDTO createRestaurant(RestaurantDTO restaurantDTO);
}