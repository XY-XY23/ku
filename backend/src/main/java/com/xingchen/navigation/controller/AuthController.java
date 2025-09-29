package com.xingchen.navigation.controller;

import com.xingchen.navigation.dto.*;
import com.xingchen.navigation.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<AuthResponse>> register(
            @Valid @RequestBody RegisterRequest request) {
        AuthResponse response = userService.register(request);
        return ResponseEntity.ok(ApiResponse.success("注册成功", response));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(
            @Valid @RequestBody LoginRequest request,
            HttpServletRequest httpRequest) {
        String ipAddress = getClientIP(httpRequest);
        AuthResponse response = userService.login(request, ipAddress);
        return ResponseEntity.ok(ApiResponse.success("登录成功", response));
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<UserDTO>> getCurrentUser(
            @AuthenticationPrincipal UserDetails userDetails) {
        UserDTO user = userService.getUserInfo(userDetails.getUsername());
        return ResponseEntity.ok(ApiResponse.success(user));
    }

    @PutMapping("/profile")
    public ResponseEntity<ApiResponse<UserDTO>> updateProfile(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody UserDTO userDTO) {
        UserDTO updatedUser = userService.updateUserProfile(userDetails.getUsername(), userDTO);
        return ResponseEntity.ok(ApiResponse.success("更新成功", updatedUser));
    }

    @GetMapping("/settings")
    public ResponseEntity<ApiResponse<String>> getUserSettings(
            @AuthenticationPrincipal UserDetails userDetails) {
        String settings = userService.getUserSettings(userDetails.getUsername());
        return ResponseEntity.ok(ApiResponse.success(settings));
    }

    @PostMapping("/settings")
    public ResponseEntity<ApiResponse<Void>> updateUserSettings(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody String settings) {
        userService.updateUserSettings(userDetails.getUsername(), settings);
        return ResponseEntity.ok(ApiResponse.success("设置保存成功", null));
    }

    private String getClientIP(HttpServletRequest request) {
        String xfHeader = request.getHeader("X-Forwarded-For");
        if (xfHeader == null) {
            return request.getRemoteAddr();
        }
        return xfHeader.split(",")[0];
    }
}