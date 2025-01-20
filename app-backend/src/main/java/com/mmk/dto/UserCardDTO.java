package com.mmk.dto;

import java.sql.Timestamp;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

// 유저가 보유한 카드
@Getter
@Setter
@ToString
public class UserCardDTO {
    private int userCardId;
    private String userCardNum;
    private String expiryDate;
    private String userName;
    private String cardPwd;
    private int primaryCard = 0;

    private int cardCompanyNum;
    private int cardId;
    private int userNum;

    private Timestamp createdAt;
    private Timestamp updatedAt;
}
