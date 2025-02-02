package com.mmk.entity;

import java.sql.Timestamp;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Entity
@SequenceGenerator(name = "user_seq_generator", sequenceName = "user_seq", initialValue = 1, allocationSize = 1)
@Table(name = "user_info")
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_seq_generator")
    @Column(name = "user_num")
    private int userNum;

    @Column(name = "user_id", nullable = false, unique = true)
    private String userId;

    @ToString.Exclude
    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "spending_target", columnDefinition = "int default 0")
    private int spendingTarget = 0;

    @Column(name = "profile", columnDefinition = "varchar2(255) default 'temp_profile'")
    private String profile = "temp_profile";

    @Column(name = "state", columnDefinition = "int default 1")
    private int state; // 회원일때 1, 탈퇴회원 0

    @Column(name = "user_role", columnDefinition = "int default 1")
    private int userRole; // 관리자 0, 회원 1

    @CreationTimestamp
    @Column(name = "created_at")
    private Timestamp createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private Timestamp updatedAt;

}