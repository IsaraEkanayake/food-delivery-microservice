package com.fooddeliverysystem.restaurentmanagemenetsystem.controller;

import com.fooddeliverysystem.restaurentmanagemenetsystem.dto.RestaurantDTO;
import com.fooddeliverysystem.restaurentmanagemenetsystem.dto.UserDTO;
import com.fooddeliverysystem.restaurentmanagemenetsystem.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    @GetMapping("/test")
    public String test() {
        return "Admin Controller working!";
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public UserDTO registerAdmin(@RequestBody UserDTO userDTO) {
        // Ensure the role is ADMIN regardless of what the client sends
        userDTO.setRole("ADMIN");
        return adminService.registerAdmin(userDTO);
    }

    @GetMapping("/users")
    public List<UserDTO> getAllUsers() {
        return adminService.getAllUsers();
    }

    @PutMapping("/restaurants/{restaurantId}/verify")
    public RestaurantDTO verifyRestaurant(@PathVariable Long restaurantId,
                                          @RequestParam boolean verified) {
        return adminService.verifyRestaurant(restaurantId, verified);
    }

    @PostMapping("/financial-transactions")
    @ResponseStatus(HttpStatus.OK)
    public void processFinancialTransaction(@RequestParam Long restaurantId,
                                            @RequestParam double amount) {
        adminService.processFinancialTransaction(restaurantId, amount);
    }
}
