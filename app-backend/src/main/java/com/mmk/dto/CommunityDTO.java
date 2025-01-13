package com.mmk.dto;

// import java.security.Timestamp;
import java.sql.Timestamp;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class CommunityDTO {
  
  private int communityNo;
  private String commCategory;
  private String userId;
  private String commTitle;
  private String commCont;
  private String commImgUrl;
  private int viewCount;
  private int replyCount;

  @JsonFormat(pattern="yyyy-mm-dd")
  private Timestamp createdAt;

  private Timestamp updatedAt;
}
