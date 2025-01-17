package com.mmk.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.mmk.entity.CardCompanyEntity;

@Repository
public class CardCompanyDAOImpl implements CardCompanyDAO {
    
    @Autowired
    private CardCompanyRepository cardCompanyRepository;

    @Override
    public boolean existsCompany(int userNum, String organization) {
        return cardCompanyRepository.existsByUserNumAndOrganization(userNum, organization);
    }

    @Override
    public void save(CardCompanyEntity cardCompanyEntity) {
        cardCompanyRepository.save(cardCompanyEntity);
    }
}
