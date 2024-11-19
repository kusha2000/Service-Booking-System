package com.kush.ServiceBookingSystem.repository;

import com.kush.ServiceBookingSystem.entity.Ad;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdRepository extends JpaRepository<Ad, Long> {


    List<Ad> findAllByUserId(Long userId);


}
