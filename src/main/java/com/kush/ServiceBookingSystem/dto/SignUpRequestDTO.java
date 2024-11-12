package com.kush.ServiceBookingSystem.dto;

import lombok.Data;

@Data
public class SignUpRequestDTO {
    private Long id;

    private String email;

    private String password;

    private String name;

    private String lastname;

    private String phone;
}
