package com.mmk.app_backend.vo;

import java.sql.Timestamp;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter // getter()메서드 자동생성
@Setter // setter()메서드 자동생성
@ToString // toString()메서드 자동생성
@Entity // JPA를 다루는 엔티티빈 클래스
@SequenceGenerator( // 시퀀스 생성기를 설정하는 애노테이션
        name = "uno_seq_gename", // 시퀀스 제너레이터 이름
        sequenceName = "user_seq", // 시퀀스 이름
        initialValue = 1, // 시작값
        allocationSize = 1 // 1씩 증가값
)
@Table(name = "user") // user 테이블 생성
public class UserVO {

    @Id // 기본키 컬럼
    @GeneratedValue(strategy = GenerationType.SEQUENCE, // 사용할 전략을 시퀀스로 선택
            generator = "uno_seq_gename" // 시퀀스 생성기에 설정해 놓은 시퀀스 제너레이터 이름
    )
    private int uno;
    private String id;
    private String password;

    @CreationTimestamp
    private Timestamp regdate; // 등록 날짜

    @UpdateTimestamp // @CreationTimestamp, @UpdateTimestamp는 하이버네이트의 특별한 기능으로 엔터티빈 생성, 수정시점, 등록시점,
                     // 날짜값을 기록한다.
    private Timestamp updatedate;
}