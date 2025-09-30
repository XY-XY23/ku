package com.starnavigation.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UpdateUserRequest {

    @Email(message = "邮箱格式不正确")
    private String email;

    private String phone;

    @Size(max = 100, message = "昵称长度不能超过100个字符")
    private String nickname;

    private String avatar;

    @Size(min = 6, max = 100, message = "密码长度必须在6-100个字符之间")
    private String password;
}