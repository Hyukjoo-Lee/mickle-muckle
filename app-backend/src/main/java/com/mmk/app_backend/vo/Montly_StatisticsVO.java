// package com.mmk.app_backend.vo;

// import java.sql.Timestamp;

// import org.hibernate.annotations.CreationTimestamp;
// import org.hibernate.annotations.UpdateTimestamp;

// import jakarta.persistence.Entity;
// import jakarta.persistence.Id;
// import jakarta.persistence.Table;
// import lombok.Getter;
// import lombok.Setter;
// import lombok.ToString;

// @Getter
// @Setter
// @ToString
// @Entity
// @Table(name = "Montly_Statistics")
// public class Montly_StatisticsVO {

//     @Id
//     private int monthly_stat_id;
//     private int user_id;
//     private int card_id;
//     private String category;
//     private String stat_month;
//     private int monthly_total;

//     @CreationTimestamp
//     private Timestamp created_at;

// }