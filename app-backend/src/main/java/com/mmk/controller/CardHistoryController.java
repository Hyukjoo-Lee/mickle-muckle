package com.mmk.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mmk.common.ApiResponse;
import com.mmk.dto.CardHistoryDTO;
import com.mmk.dto.MonthlySummary;
import com.mmk.service.CardHistoryService;

@RestController
@RequestMapping("/cardHistory")
public class CardHistoryController {

    @Autowired
    CardHistoryService cardHistoryService;
    
    // 카드내역 DB에 갱신
    @GetMapping("/update")
    public void updateCardHistory(@RequestParam("userNum") int userNum) {
        cardHistoryService.updateCardHistory(userNum);
    }

    // 월별통계 - DB에 있는 최근 3개월 카드내역 불러오기
    @GetMapping("/monthlyUpload")
    public ResponseEntity<ApiResponse<List<MonthlySummary>>> uploadMonthlyHistory(@RequestParam("userNum") int userNum) {
        List<MonthlySummary> result = cardHistoryService.uploadMonthlyHistory(userNum);
        if (result.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse<>(404, "최근 카드내역이 존재하지 않습니다", null));
        } else {
            return ResponseEntity.ok(new ApiResponse<>(200, "최근 카드내역 조회 성공", result));
        }
    }

}
