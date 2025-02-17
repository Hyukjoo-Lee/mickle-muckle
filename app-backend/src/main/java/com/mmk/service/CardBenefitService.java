package com.mmk.service;

import java.util.List;

import com.mmk.dto.CardBenefitDTO;

public interface CardBenefitService {
    List<CardBenefitDTO> getAllCardBenefitsByCardTitle(String cardTitle);

    List<CardBenefitDTO> registerCardBenefits(List<CardBenefitDTO> cardBenefitDTOs);

    // CODEF API 처리용
    CardBenefitDTO saveCardBenefit(CardBenefitDTO cardBenefitDTO);
}
