package com.mmk.service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mmk.common.BenefitType;
import com.mmk.dao.CardHistoryDAO;
import com.mmk.dao.UserCardDAO;
import com.mmk.dao.UserDAO;
import com.mmk.dto.CardHistoryDTO;
import com.mmk.dto.CardSummaryDTO;
import com.mmk.dto.DailyStatisticsDTO;
import com.mmk.dto.MonthlySummaryDTO;
import com.mmk.entity.CardHistoryEntity;
import com.mmk.entity.UserCardEntity;
import com.mmk.entity.UserEntity;

@Service
public class CardHistoryServiceImpl implements CardHistoryService {

    @Autowired
    UserCardDAO userCardDAO;

    @Autowired
    UserDAO userDAO;

    @Autowired
    CardHistoryDAO cardHistoryDAO;

    @Autowired
    CodefService codefService;

    // DB에 있는 카드내역 불러오기
    public List<CardHistoryDTO> uploadCardHistory(int userNum, int month) {

        LocalDate today = LocalDate.now();
        LocalDate twoMonthsAgoFirstDay = today.minusMonths(month).withDayOfMonth(1);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
        String startDate = twoMonthsAgoFirstDay.format(formatter);

        UserEntity userEntity = userDAO.findByUserNum(userNum);
        UserCardEntity userCardEntity = userCardDAO.findByUserNumAndPrimaryCard(userEntity, "대표카드");
        int userCardId = userCardEntity.getUserCardId();

        List<CardHistoryEntity> entity = cardHistoryDAO.findRecentHistory(userCardId, startDate);
        entity.sort(Comparator.comparing(CardHistoryEntity::getResUsedDate));
        List<CardHistoryDTO> result = new ArrayList<>();

        for (CardHistoryEntity cardHistoryEntity : entity) {
            result.add(toDTO(cardHistoryEntity));
        }

        return result;
    }

    // 카드내역 DB에 갱신
    @Override
    public void updateCardHistory(int userNum) {
        UserEntity userEntity = userDAO.findByUserNum(userNum);
        UserCardEntity userCardEntity = userCardDAO.findByUserNumAndPrimaryCard(userEntity, "대표카드");
        int userCardId = userCardEntity.getUserCardId();

        String recentDate = cardHistoryDAO.findMaxResUsedDate(userCardId);

        LocalDate today = LocalDate.now();
        LocalDate twoMonthsAgoFirstDay = today.minusMonths(2).withDayOfMonth(1);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");

        String startDate = twoMonthsAgoFirstDay.format(formatter);
        String endDate = today.format(formatter);

        if (recentDate != null && recentDate.compareTo(startDate) >= 0) {
            startDate = recentDate;
        }

        String result = codefService.getCardHistory(userCardEntity, startDate, endDate);

        try {
            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);

            String dataArrayJson = objectMapper.readTree(result).get("data").toString();
            List<CardHistoryDTO> cardHistoryDTOList = objectMapper.readValue(dataArrayJson,
                    new TypeReference<List<CardHistoryDTO>>() {
                    });

            for (CardHistoryDTO cardHistoryDTO : cardHistoryDTOList) {
                try {
                    if (cardHistoryDTO.getResMemberStoreType() == "") {
                        cardHistoryDTO.setResMemberStoreType("기타");
                    } else {
                        cardHistoryDTO.setResMemberStoreType(
                                BenefitType.determineFromCategory(cardHistoryDTO.getResMemberStoreType()).toString());
                    }
                    cardHistoryDTO.setUserCardId(userCardId);
                    cardHistoryDAO.save(toEntity(cardHistoryDTO));
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * 특정 사용자의 대표카드와 관련된 카드 거래 내역을 조회합니다.
     *
     * @param userNum 거래 내역을 조회할 사용자 번호
     * @return DailyStatisticsDTO 리스트를 반환합니다.
     */
    @Override
    public List<DailyStatisticsDTO> getCardHistoryByUserAndPrimaryCard(int userNum) {
        return cardHistoryDAO.findByUserNumAndPrimaryCard(userNum).stream()
                .map(cardDto -> {
                    DailyStatisticsDTO dailyDto = new DailyStatisticsDTO();
                    dailyDto.setResApprovalNo(cardDto.getResApprovalNo());
                    dailyDto.setResUsedDate(cardDto.getResUsedDate());
                    dailyDto.setResMemberStoreName(cardDto.getResMemberStoreName());
                    dailyDto.setResUsedAmount(cardDto.getResUsedAmount());
                    dailyDto.setResMemberStoreType(cardDto.getResMemberStoreType());

                    dailyDto.setSpendingTarget(cardDto.getUserCardEntity().getUserEntity().getSpendingTarget());
                    dailyDto.setUserCardId(cardDto.getUserCardEntity().getUserCardId());
                    dailyDto.setCardTitle(cardDto.getUserCardEntity().getCardEntity().getCardTitle());
                    dailyDto.setCardImg(cardDto.getUserCardEntity().getCardImgUrl());
                    dailyDto.setUserNum(cardDto.getUserCardEntity().getUserEntity().getUserNum());
                    return dailyDto;
                })
                .collect(Collectors.toList());
    }

    // 월별통계 - DB에 있는 최근 3개월 카드내역 불러오기
    @Override
    public List<MonthlySummaryDTO> uploadMonthlyHistory(int userNum) {
        List<CardHistoryDTO> data = uploadCardHistory(userNum, 2);
        List<MonthlySummaryDTO> result = monthlyHistoryProcess(data);
        return result;
    }

    // 월별통계 - DB 에서 불러온 내용 가공
    private List<MonthlySummaryDTO> monthlyHistoryProcess(List<CardHistoryDTO> cardHistoryDTOList) {
        try {
            Map<String, Map<String, Integer>> groupedData = cardHistoryDTOList.stream()
                    .collect(Collectors.groupingBy(
                            card -> card.getResUsedDate().substring(0, 6),
                            LinkedHashMap::new,
                            Collectors.groupingBy(
                                    card -> (card.getResMemberStoreType() != null
                                            && !card.getResMemberStoreType().isEmpty())
                                                    ? card.getResMemberStoreType()
                                                    : "기타",
                                    LinkedHashMap::new,
                                    Collectors.summingInt(card -> Integer.parseInt(card.getResUsedAmount())))));

            return groupedData.entrySet().stream()
                    .map(entry -> {
                        MonthlySummaryDTO summary = new MonthlySummaryDTO();
                        summary.setMonth(entry.getKey().substring(4) + "월");
                        summary.setCategoryTotals(entry.getValue());
                        return summary;
                    })
                    .collect(Collectors.toList());

        } catch (Exception e) {
            e.printStackTrace();
            return Collections.emptyList();
        }
    }

    // 목차별통계 - DB에 있는 최근 1개월 카드내역 불러오기
    @Override
    public List<MonthlySummaryDTO> uploadCategoryHistory(int userNum) {
        List<CardHistoryDTO> data = uploadCardHistory(userNum, 0);
        List<MonthlySummaryDTO> result = monthlyHistoryProcess(data);
        return result;
    }

    // 목차별통계 - DB에 있는 가공되지 않은 최근 1개월 카드내역 불러오기
    @Override
    public List<CardHistoryDTO> monthData(int userNum) {
        return uploadCardHistory(userNum, 0);
    }

    @Override
    public List<CardHistoryDTO> getMonthlyList(int userNum, String yearMonth) {
        // yearMonth는 yyyyMM 형식 (예: 202301)

        List<CardHistoryEntity> historyEntityList = cardHistoryDAO.findByPrimaryAndMonth(userNum, yearMonth); // 대표카드 일
                                                                                                              // 때만 합산,
                                                                                                              // yearmonth을
                                                                                                              // 조회

        List<CardHistoryDTO> historyDTOList = historyEntityList.stream()
                .map(this::toDTO)
                .collect(Collectors.toList());

        return historyDTOList;

    }

    @Override
    public List<CardSummaryDTO> getUserTopSpendingCategories(int userNum) {
        List<Object[]> cardHistoryEntities = cardHistoryDAO.getTopCategories(userNum);

        List<CardSummaryDTO> cardSummaryList = new ArrayList<>();

        // 쿼리문으로 받아온 Object를 리스트로 변환
        for (Object[] data : cardHistoryEntities) {
            String storeType = (String) data[0]; // 업종명
            int usedAmount = ((Number) data[1]).intValue(); // 사용 금액

            // CardSummaryDTO 객체 생성 후 리스트에 추가
            cardSummaryList.add(new CardSummaryDTO(storeType, usedAmount));
        }

        return cardSummaryList;
    }

    private CardHistoryDTO toDTO(CardHistoryEntity entity) {
        CardHistoryDTO dto = new CardHistoryDTO();
        dto.setResApprovalNo(entity.getResApprovalNo());

        dto.setResUsedDate(entity.getResUsedDate());
        dto.setResUsedTime(entity.getResUsedTime());
        dto.setResMemberStoreName(entity.getResMemberStoreName());
        dto.setResUsedAmount(entity.getResUsedAmount());
        dto.setResMemberStoreType(entity.getResMemberStoreType());

        dto.setUserCardId(entity.getUserCardEntity().getUserCardId());
        return dto;
    }

    private CardHistoryEntity toEntity(CardHistoryDTO dto) {
        CardHistoryEntity entity = new CardHistoryEntity();
        entity.setResApprovalNo(dto.getResApprovalNo());

        entity.setResUsedDate(dto.getResUsedDate());
        entity.setResUsedTime(dto.getResUsedTime());
        entity.setResMemberStoreName(dto.getResMemberStoreName());
        entity.setResUsedAmount(dto.getResUsedAmount());
        entity.setResMemberStoreType(dto.getResMemberStoreType());

        entity.setUserCardEntity(userCardDAO.findByUserCardId(dto.getUserCardId()));
        return entity;
    }

    // 임시 에러 처리
    @Override
    public int getMonthlyTotalAmount(int userNum, String yearMonth) {
        return 0;
    }

}