package com.kush.ServiceBookingSystem.entity;

import com.kush.ServiceBookingSystem.dto.UserDto;
import com.kush.ServiceBookingSystem.enums.UserRole;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name="user")
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;

    private String password;

    private String name;

    private String lastname;

    private String phone;

    private UserRole role;

    public UserDto getDto(){
        UserDto userDto = new UserDto();
        userDto.setId(id);
        userDto.setName(name);
        userDto.setLastname(lastname);
        userDto.setEmail(email);
        userDto.setRole(role);

        return userDto;
    }
}
