package com.fooddeliverysystem.restaurentmanagemenetsystem.controller;

import com.fooddeliverysystem.restaurentmanagemenetsystem.dto.MenuItemDTO;
import com.fooddeliverysystem.restaurentmanagemenetsystem.dto.RestaurantDTO;
import com.fooddeliverysystem.restaurentmanagemenetsystem.service.RestaurantService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/restaurants")
@RequiredArgsConstructor
public class RestaurantController {

    private final RestaurantService restaurantService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public RestaurantDTO createRestaurant(@RequestBody RestaurantDTO restaurantDTO) {
        return restaurantService.createRestaurant(restaurantDTO);
    }


    @PostMapping("/{restaurantId}/menu-items")
    @ResponseStatus(HttpStatus.CREATED)
    public MenuItemDTO addMenuItem(@PathVariable Long restaurantId, @RequestBody MenuItemDTO menuItemDTO) {
        return restaurantService.addMenuItem(restaurantId, menuItemDTO);
    }

    @PutMapping("/{restaurantId}/menu-items/{menuItemId}")
    public MenuItemDTO updateMenuItem(@PathVariable Long restaurantId,
                                      @PathVariable Long menuItemId,
                                      @RequestBody MenuItemDTO menuItemDTO) {
        return restaurantService.updateMenuItem(restaurantId, menuItemId, menuItemDTO);
    }

    @DeleteMapping("/{restaurantId}/menu-items/{menuItemId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteMenuItem(@PathVariable Long restaurantId, @PathVariable Long menuItemId) {
        restaurantService.deleteMenuItem(restaurantId, menuItemId);
    }

    @PutMapping("/{restaurantId}/availability")
    public RestaurantDTO updateAvailability(@PathVariable Long restaurantId,
                                            @RequestParam boolean available) {
        return restaurantService.updateAvailability(restaurantId, available);
    }

    @GetMapping("/{restaurantId}/menu-items")
    public List<MenuItemDTO> getMenuItems(@PathVariable Long restaurantId) {
        return restaurantService.getMenuItems(restaurantId);
    }
}

