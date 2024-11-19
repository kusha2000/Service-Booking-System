package com.kush.ServiceBookingSystem.services.client;

import com.kush.ServiceBookingSystem.dto.AdDTO;
import com.kush.ServiceBookingSystem.dto.AdDetailsForClientDTO;
import com.kush.ServiceBookingSystem.dto.ReservationDTO;
import com.kush.ServiceBookingSystem.entity.Reservation;
import com.kush.ServiceBookingSystem.entity.User;
import com.kush.ServiceBookingSystem.repository.AdRepository;
import com.kush.ServiceBookingSystem.repository.ResevationRepository;
import com.kush.ServiceBookingSystem.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.kush.ServiceBookingSystem.entity.Ad;
import com.kush.ServiceBookingSystem.enums.ReviewStatus;
import com.kush.ServiceBookingSystem.enums.ReservationStatus;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ClientServiceImpl implements ClientService {

    @Autowired
    private AdRepository adRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ResevationRepository resevationRepository;

    public List<AdDTO> getAllAds(){
        return adRepository.findAll().stream().map(Ad::getAdDto).collect(Collectors.toList());
    }

    public List<AdDTO> searchAdByName(String name){
        return adRepository.findAllByServiceNameContaining(name).stream().map(Ad::getAdDto).collect(Collectors.toList());    }


    public boolean bookService (ReservationDTO reservationDTO){
        Optional<Ad> optionalAd = adRepository.findById(reservationDTO.getAdId());
        Optional<User> optionalUser = userRepository.findById(reservationDTO.getUserId());
        if(optionalAd.isPresent() && optionalUser.isPresent()){
            Reservation reservation = new Reservation();
            reservation.setBookDate (reservationDTO.getBookDate());
            reservation.setReservationStatus (ReservationStatus.PENDING);
            reservation.setUser(optionalUser.get());
            reservation.setAd (optionalAd.get());
            reservation.setCompany (optionalAd.get().getUser()); reservation.setReviewStatus (ReviewStatus.FALSE);
            resevationRepository.save(reservation);
            return true;
        }
        return false;
    }

    public AdDetailsForClientDTO getAdDetailsByAdId(Long adId){
        Optional<Ad> optionalAd = adRepository.findById(adId);
        AdDetailsForClientDTO adDetailsForClientDTO=new AdDetailsForClientDTO();
        if(optionalAd.isPresent()){
            adDetailsForClientDTO.setAdDTO(optionalAd.get().getAdDto());
        }
        return adDetailsForClientDTO;
    }
    public List<ReservationDTO> getAllBookingsByUserId(Long userId){
        return resevationRepository.findAllByUserId(userId).stream().map(Reservation::getReservationDto).collect(Collectors.toList());

    }

}
