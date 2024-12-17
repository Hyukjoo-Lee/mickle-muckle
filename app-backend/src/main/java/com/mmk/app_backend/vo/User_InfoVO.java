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

@Getter
@Setter
@ToString
@Entity
@SequenceGenerator(
			name = "User_info_seq_gename",
			sequenceName = "User_info_seq",
			initialValue = 1,
			allocationSize = 1
		)
@Table(name = "User_info")
public class User_InfoVO {

    @Id
    @GeneratedValue(
				strategy = GenerationType.SEQUENCE,
				generator = "User_info_seq_gename"
			)
    private int user_id;
    private String username;
    private String password;
    private String name;
    private String email;
    private String address;
    private int spending_target;

    @CreationTimestamp
    private Timestamp created_at;

    @UpdateTimestamp
    private Timestamp update_at;
}