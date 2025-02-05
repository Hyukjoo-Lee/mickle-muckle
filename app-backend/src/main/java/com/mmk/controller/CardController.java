package com.mmk.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mmk.common.ApiResponse;
import com.mmk.dto.UserCardCompanyDTO;
import com.mmk.dto.CardDTO;
import com.mmk.service.CardService;

@RestController
@RequestMapping("/card")
public class CardController {
    @Autowired
    private CardService cardService;

    // 마스터 카드 전체 조회
    @GetMapping("/all")
    public ResponseEntity<ApiResponse<List<CardDTO>>> getAllCards() {
        List<CardDTO> cardDTOs = cardService.getAllCards();
        if (cardDTOs.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse<>(404, "등록된 마스터 카드가 없습니다.", null));
        }
        return ResponseEntity.ok(new ApiResponse<>(200, "전체 마스터 카드 검색 성공", cardDTOs));
    }

    // 기관 코드로 카드 조회
    @GetMapping("/{organization}")
    public ResponseEntity<ApiResponse<List<CardDTO>>> getCardsByOrganization(
            @PathVariable String organization) {

        List<CardDTO> cardDTOs = cardService.getAllCardsByOrganizationCode(organization);

        if (cardDTOs.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse<>(404, "해당 기관 코드에 등록된 카드가 없습니다.", null));
        }
        return ResponseEntity.ok(new ApiResponse<>(200, "기관 코드별 카드 검색 성공", cardDTOs));
    }

    // 마스터 카드 생성
    @PostMapping("/create")
    public ResponseEntity<ApiResponse<CardDTO>> createCard(@RequestBody CardDTO cardDTO) {
        CardDTO createCard = cardService.createCard(cardDTO);
        ApiResponse<CardDTO> response = new ApiResponse<CardDTO>(201, "마스터 카드 생성 성공", createCard);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // Codef 카드, 혜택 저장
    @PostMapping("/saveCodefCard")
    public ResponseEntity<ApiResponse<UserCardCompanyDTO>> saveCodefCard(
            @RequestBody UserCardCompanyDTO userCardCompanyDTO) {
        UserCardCompanyDTO savedCard = cardService.saveCodefCard(userCardCompanyDTO);
        ApiResponse<UserCardCompanyDTO> response = new ApiResponse<>(201, "마스터 카드,혜택 생성 성공", savedCard);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    /**
     * 최근 카드 3개월 사용내역을 분석해서 사용자에게 적합한 카드 5개를 반환
     * 
     * @param userNum 로그인된 User Number (PK)
     * @return ResponseEntity<ApiResponse<List<CardDTO>>> 추천 카드 리스트
     */
    @GetMapping("/{userNum}/recommendations")
    public ResponseEntity<ApiResponse<List<CardDTO>>> getRecommendedCards(@PathVariable int userNum) {

        List<CardDTO> cardDTOs = cardService.getAllCards();

        if (cardDTOs.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse<>(404, "등록된 마스터 카드가 없습니다.", null));
        }

        // 사용자 사용 내역 분석하고 적합한 카드 추천
        List<CardDTO> recommnededCards = cardService.getRecommendedCards(userNum);

        System.out.println(recommnededCards);

        return null;
    }

}
