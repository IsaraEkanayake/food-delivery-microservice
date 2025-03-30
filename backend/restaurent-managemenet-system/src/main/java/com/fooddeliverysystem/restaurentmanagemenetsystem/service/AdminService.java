package com.fooddeliverysystem.restaurentmanagemenetsystem.service;

import com.fooddeliverysystem.restaurentmanagemenetsystem.dto.RestaurantDTO;
import com.fooddeliverysystem.restaurentmanagemenetsystem.dto.UserDTO;

import java.util.List;

public interface AdminService {
    UserDTO registerAdmin(UserDTO userDTO);
    List<UserDTO> getAllUsers();
    RestaurantDTO verifyRestaurant(Long restaurantId, boolean verified);
    void processFinancialTransaction(Long restaurantId, double amount);
}