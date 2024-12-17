// package com.mmk.app_backend.vo;

// import java.sql.Timestamp;

// import org.hibernate.annotations.CreationTimestamp;
// import org.hibernate.annotations.UpdateTimestamp;

// import jakarta.persistence.Entity;
// import jakarta.persistence.GeneratedValue;
// import jakarta.persistence.GenerationType;
// import jakarta.persistence.Id;
// import jakarta.persistence.SequenceGenerator;
// import jakarta.persistence.Table;
// import lombok.Getter;
// import lombok.Setter;
// import lombok.ToString;

// @Getter
// @Setter
// @ToString
// @Entity
// @SequenceGenerator(
//         name = "monthly_statistics_gename",
//         sequenceName = "user_seq",
//         initialValue = 1,
//         allocationSize = 1
// )
// @Table(name = "User_info") // user 테이블 생성
// public class Monthly_StatisticsVO {

//     @Id
//     @GeneratedValue(strategy = GenerationType.SEQUENCE,
//             generator = "uno_seq_gename"
//     )
//     private int uno;
//     private String name;
//     private String nickname;
//     private String id;
//     private String password;
//     private String email;
//     private int spending_target;

//     @CreationTimestamp
//     private Timestamp regdate;

//     @UpdateTimestamp // @CreationTimestamp, @UpdateTimestamp는 하이버네이트의 특별한 기능으로 엔터티빈 생성, 수정시점, 등록시점,
//                      // 날짜값을 기록한다.
//     private Timestamp updatedate;
// }