package com.fooddeliverysystem.restaurentmanagemenetsystem.service;

import com.fooddeliverysystem.restaurentmanagemenetsystem.dto.RestaurantDTO;
import com.fooddeliverysystem.restaurentmanagemenetsystem.dto.UserDTO;
import com.fooddeliverysystem.restaurentmanagemenetsystem.model.Restaurant;
import com.fooddeliverysystem.restaurentmanagemenetsystem.model.User;
import com.fooddeliverysystem.restaurentmanagemenetsystem.repository.RestaurantRepository;
import com.fooddeliverysystem.restaurentmanagemenetsystem.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import jakarta.persistence.*;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {

    private final UserRepository userRepository;
    private final RestaurantRepository restaurantRepository;

    @Override
    public UserDTO registerAdmin(UserDTO userDTO) {
        // Create a new user and force the ADMIN role
        User user = User.builder()
                .username(userDTO.getUsername())
                .email(userDTO.getEmail())
                .role(User.Role.ADMIN)  // Using enum here (ensure your User model supports this)
                .build();
        user = userRepository.save(user);
        userDTO.setId(user.getId());
        return userDTO;
    }

    @Override
    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream()
                .map(user -> UserDTO.builder()
                        .id(user.getId())
                        .username(user.getUsername())
                        .email(user.getEmail())
                        .role(user.getRole().name())
                        .build())
                .collect(Collectors.toList());
    }

    @Override
    public RestaurantDTO verifyRestaurant(Long restaurantId, boolean verified) {
        Restaurant restaurant = restaurantRepository.findById(restaurantId)
                .orElseThrow(() -> new EntityNotFoundException("Restaurant not found"));
        // For example, verifying a restaurant could mean updating its availability.
        restaurant.setAvailable(verified);
        restaurantRepository.save(restaurant);
        return RestaurantDTO.builder()
                .id(restaurant.getId())
                .name(restaurant.getName())
                .address(restaurant.getAddress())
                .available(restaurant.isAvailable())
                .build();
    }

    @Override
    public void processFinancialTransaction(Long restaurantId, double amount) {
        // In a real system, integrate with a payment gateway or financial service.
        System.out.println("Processed transaction for restaurant " + restaurantId + " for amount: " + amount);
    }
}
