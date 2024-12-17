package com.mmk.app_backend.vo;

import java.sql.Timestamp;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Entity
@Table(name = "User_info")
public class User_InfoVO {

    @Id
    private String user_id;
    private String username;
    private String password;
    private String email;
    private String address;
    private int spending_target;

    @CreationTimestamp
    private Timestamp created_at;

    @UpdateTimestamp
    private Timestamp update_at;
}