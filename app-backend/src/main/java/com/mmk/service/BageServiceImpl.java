package com.mmk.service;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mmk.dao.BadgeDAO;
import com.mmk.dao.UserDAO;
import com.mmk.dto.RankingDTO;
import com.mmk.entity.BadgeEntity;
import com.mmk.entity.UserEntity;

@Service
public class BageServiceImpl implements BadgeService {
    
    @Autowired
    private BadgeDAO badgeDAO;

    @Autowired
    private UserDAO userDAO;

    @Override
    public void save(int userNum, int badgeCount, String badgeDate, int currentMonthAmount, int previousMonthAmount, int ranking) {
        // 사용자 정보 조회
        UserEntity userEntity = userDAO.findByUserNum(userNum);
        // 뱃지 정보 저장을 위한 엔티티 생성
        BadgeEntity badgeEntity = new BadgeEntity();
        badgeEntity.setBadge(badgeCount);      // 뱃지 개수
        badgeEntity.setBadgeDate(badgeDate);   // 뱃지 발급 날짜 설정
        badgeEntity.setUserEntity(userEntity); // 사용자 설정
        badgeEntity.setCurrentMonthAmount(currentMonthAmount); // 저번 달
        badgeEntity.setPreviousMonthAmount(previousMonthAmount); // 저저번달
        badgeEntity.setRanking(ranking); // 순위

        // 뱃지 정보를 데이터베이스에 저장
        badgeDAO.save(badgeEntity); // BadgeDAO를 통해 저장
    }

    // 로그인한 유저 랭킹 정보
    @Override
    public RankingDTO getUserRanking(int userNum) {
        // 현재 날짜 기준으로 이전 달 계산
        String previousMonth = getPreviousMonth();

        // BadgeDAO를 통해 이전 달 배지 데이터 조회
        BadgeEntity badgeEntity = badgeDAO.getUserRanking(previousMonth, userNum);

        // BadgeEntity -> RankingDTO 변환
        return convertToDTO(badgeEntity);
    }

    // 랭킹 정보
    @Override
    public List<RankingDTO> getBadgesForPreviousMonth() {
        // 현재 날짜 기준으로 이전 달 계산
        String previousMonth = getPreviousMonth();

        // BadgeDAO를 통해 이전 달 배지 데이터 조회
        List<BadgeEntity> badgeEntities = badgeDAO.getBadgesForPreviousMonth(previousMonth);

        // BadgeEntity -> RankingDTO 변환 후 정렬 및 상위 100개 제한
        List<RankingDTO> list = badgeEntities.stream()
            .map(this::convertToDTO)
            .sorted((a, b) -> {
                int rankCompare = Integer.compare(a.getRanking(), b.getRanking());
                if (rankCompare == 0) {
                    return Double.compare(b.getCurrentMonthAmount(), a.getCurrentMonthAmount());
                }
                return rankCompare;
            })
            .limit(100)
            .collect(Collectors.toList());
        return list;
    }

    // 이전 달을 계산하는 메서드 (예: 2025년 1월 -> 2024년 12월)
    private String getPreviousMonth() {
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.MONTH, -1); // 한 달을 빼기
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMM");
        return sdf.format(calendar.getTime());
    }

    // Entity를 DTO로 변환하는 메서드
    private RankingDTO convertToDTO(BadgeEntity badgeEntity) {
        if (badgeEntity == null) return null; // null 체크 추가
        RankingDTO rankingDTO = new RankingDTO();
        rankingDTO.setBadgeNum(badgeEntity.getBadgeNum());
        rankingDTO.setBadgeDate(badgeEntity.getBadgeDate());
        rankingDTO.setBadge(badgeEntity.getBadge());
        rankingDTO.setUserNum(badgeEntity.getUserEntity().getUserNum());
        rankingDTO.setName(badgeEntity.getUserEntity().getName());
        rankingDTO.setUserId(badgeEntity.getUserEntity().getUserId());
        rankingDTO.setProfile(badgeEntity.getUserEntity().getProfile());
        rankingDTO.setRanking(badgeEntity.getRanking());
        rankingDTO.setCurrentMonthAmount(badgeEntity.getCurrentMonthAmount());
        rankingDTO.setPreviousMonthAmount(badgeEntity.getPreviousMonthAmount());
        return rankingDTO;
    }

    @Override
    public int calculateUserRank(int userNum) {
    // 현재 날짜 기준으로 이전 달 계산
    String previousMonth = getPreviousMonth();

    // 이전 달 모든 유저의 배지 데이터 조회
    List<BadgeEntity> badgeEntities = badgeDAO.getBadgesForPreviousMonth(previousMonth);
    System.out.println("badgeEntities" + badgeEntities);
    // 유저가 한 명밖에 없으면 1등 반환
    if (badgeEntities.size() == 1) {
        return 1;
    }

    // 뱃지 개수로 내림차순 정렬
    badgeEntities.sort((a, b) -> Integer.compare(b.getBadge(), a.getBadge()));

    // 해당 유저의 랭킹 계산
    for (int i = 0; i < badgeEntities.size(); i++) {
        if (badgeEntities.get(i).getUserEntity().getUserNum() == userNum) {
            return i + 1; // 인덱스는 0부터 시작하므로 +1
        }
    }

    // 해당 유저가 목록에 없으면 0등 (또는 -1 반환)
    return 0;
}

    @Override
    public boolean existsBadgeForUserAndDate(int userNum, String badgeDate) {
        return badgeDAO.existsByUserNumAndBadgeDate(userNum, badgeDate);

    }

}
