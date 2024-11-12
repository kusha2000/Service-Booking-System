package com.kush.ServiceBookingSystem.services.authentication;

import com.kush.ServiceBookingSystem.dto.SignUpRequestDTO;
import com.kush.ServiceBookingSystem.dto.UserDto;

public interface AuthService {
    UserDto signupClient(SignUpRequestDTO signUpRequestDTO);
    UserDto signupCompany(SignUpRequestDTO signUpRequestDTO);
    Boolean presentByEmail(String email);
}
