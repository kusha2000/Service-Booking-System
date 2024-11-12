package com.kush.ServiceBookingSystem.services.authentication;

import com.kush.ServiceBookingSystem.dto.SignUpRequestDTO;
import com.kush.ServiceBookingSystem.dto.UserDto;
import com.kush.ServiceBookingSystem.entity.User;
import com.kush.ServiceBookingSystem.enums.UserRole;
import com.kush.ServiceBookingSystem.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private UserRepository userRepository;

    public UserDto signupClient(SignUpRequestDTO signUpRequestDTO){
        User user=new User();

        user.setName(signUpRequestDTO.getName());
        user.setLastname(signUpRequestDTO.getLastname());
        user.setEmail(signUpRequestDTO.getEmail());
        user.setPhone(signUpRequestDTO.getPhone());
        user.setPassword(new BCryptPasswordEncoder().encode(signUpRequestDTO.getPassword()));
        user.setRole(UserRole.CLIENT);

        return userRepository.save(user).getDto();
    }

    public Boolean presentByEmail(String email){
        return userRepository.findFirstByEmail(email) != null;
    }

    public UserDto signupCompany(SignUpRequestDTO signUpRequestDTO){
        User user=new User();

        user.setName(signUpRequestDTO.getName());
        user.setEmail(signUpRequestDTO.getEmail());
        user.setPhone(signUpRequestDTO.getPhone());
        user.setPassword(new BCryptPasswordEncoder().encode(signUpRequestDTO.getPassword()));
        user.setRole(UserRole.CLIENT);

        return userRepository.save(user).getDto();
    }
}
