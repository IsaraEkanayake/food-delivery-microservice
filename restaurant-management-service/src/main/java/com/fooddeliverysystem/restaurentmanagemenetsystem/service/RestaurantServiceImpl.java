package com.fooddeliverysystem.restaurentmanagemenetsystem.service;


import com.fooddeliverysystem.restaurentmanagemenetsystem.dto.MenuItemDTO;
import com.fooddeliverysystem.restaurentmanagemenetsystem.dto.RestaurantDTO;
import com.fooddeliverysystem.restaurentmanagemenetsystem.model.MenuItem;
import com.fooddeliverysystem.restaurentmanagemenetsystem.model.Restaurant;
import com.fooddeliverysystem.restaurentmanagemenetsystem.repository.MenuItemRepository;
import com.fooddeliverysystem.restaurentmanagemenetsystem.repository.RestaurantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import jakarta.persistence.*;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RestaurantServiceImpl implements RestaurantService {

    private final RestaurantRepository restaurantRepository;
    private final MenuItemRepository menuItemRepository;

    @Override
    public RestaurantDTO createRestaurant(RestaurantDTO restaurantDTO) {
        Restaurant restaurant = Restaurant.builder()
                .name(restaurantDTO.getName())
                .address(restaurantDTO.getAddress())
                .available(restaurantDTO.isAvailable())
                .build();
        restaurant = restaurantRepository.save(restaurant);
        restaurantDTO.setId(restaurant.getId());
        return restaurantDTO;
    }

    @Override
    public MenuItemDTO addMenuItem(Long restaurantId, MenuItemDTO menuItemDTO) {
        Restaurant restaurant = restaurantRepository.findById(restaurantId)
                .orElseThrow(() -> new EntityNotFoundException("Restaurant not found"));

        MenuItem menuItem = MenuItem.builder()
                .name(menuItemDTO.getName())
                .description(menuItemDTO.getDescription())
                .price(menuItemDTO.getPrice())
                .restaurant(restaurant)
                .build();
        menuItem = menuItemRepository.save(menuItem);
        menuItemDTO.setId(menuItem.getId());
        return menuItemDTO;
    }

    @Override
    public MenuItemDTO updateMenuItem(Long restaurantId, Long menuItemId, MenuItemDTO menuItemDTO) {
        Restaurant restaurant = restaurantRepository.findById(restaurantId)
                .orElseThrow(() -> new EntityNotFoundException("Restaurant not found"));

        MenuItem menuItem = menuItemRepository.findById(menuItemId)
                .orElseThrow(() -> new EntityNotFoundException("Menu item not found"));

        if (!menuItem.getRestaurant().getId().equals(restaurant.getId())) {
            throw new IllegalArgumentException("Menu item does not belong to the restaurant");
        }

        menuItem.setName(menuItemDTO.getName());
        menuItem.setDescription(menuItemDTO.getDescription());
        menuItem.setPrice(menuItemDTO.getPrice());
        menuItemRepository.save(menuItem);
        return menuItemDTO;
    }

    @Override
    public void deleteMenuItem(Long restaurantId, Long menuItemId) {
        Restaurant restaurant = restaurantRepository.findById(restaurantId)
                .orElseThrow(() -> new EntityNotFoundException("Restaurant not found"));

        MenuItem menuItem = menuItemRepository.findById(menuItemId)
                .orElseThrow(() -> new EntityNotFoundException("Menu item not found"));

        if (!menuItem.getRestaurant().getId().equals(restaurant.getId())) {
            throw new IllegalArgumentException("Menu item does not belong to the restaurant");
        }

        menuItemRepository.delete(menuItem);
    }

    @Override
    public RestaurantDTO updateAvailability(Long restaurantId, boolean available) {
        Restaurant restaurant = restaurantRepository.findById(restaurantId)
                .orElseThrow(() -> new EntityNotFoundException("Restaurant not found"));

        restaurant.setAvailable(available);
        restaurantRepository.save(restaurant);

        return RestaurantDTO.builder()
                .id(restaurant.getId())
                .name(restaurant.getName())
                .address(restaurant.getAddress())
                .available(restaurant.isAvailable())
                .build();
    }

    @Override
    public List<MenuItemDTO> getMenuItems(Long restaurantId) {
        return menuItemRepository.findByRestaurantId(restaurantId).stream()
                .map(item -> MenuItemDTO.builder()
                        .id(item.getId())
                        .name(item.getName())
                        .description(item.getDescription())
                        .price(item.getPrice())
                        .build())
                .collect(Collectors.toList());
    }
}
