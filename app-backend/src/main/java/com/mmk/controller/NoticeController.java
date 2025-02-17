package com.mmk.controller;

import java.io.File;
import java.util.Calendar;
import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.mmk.common.ApiResponse;
import com.mmk.dto.NoticeDTO;
import com.mmk.entity.UserEntity;
import com.mmk.service.NoticeService;
import com.mmk.service.UserService;

import lombok.extern.slf4j.Slf4j;

/**
 * 공지사항 관리를 위한 컨트롤러 클래스
 */
@Slf4j
@RestController
@RequestMapping("/notice")
public class NoticeController {

  @Value("${IMAGE_PATH}")
    private String uploadDir;

  private final UserService userService;
  private final NoticeService noticeService;

  public NoticeController(NoticeService noticeService, UserService userService){
    this.noticeService = noticeService;
    this.userService = userService;
  }


  /**
   * 공지사항 작성 API
   * @param noticeDTO 공지사항 정보
   * @param file 업로드할 파일(선택 사항)
   * @return 응답 결과
   */
  @PostMapping("/write")
  public ResponseEntity<ApiResponse<Void>> saveNotice(
    @ModelAttribute NoticeDTO noticeDTO,
    @RequestParam(value = "file", required = false) MultipartFile file) {

    try {
      System.out.println("아이디 : " + noticeDTO);

      String userId = noticeDTO.getUserId();

      UserEntity userEntity = userService.findByUserId(userId);

      if(userEntity == null || !"ADMIN".equals(userEntity.getUserRole())){
        return ResponseEntity.status(HttpStatus.FORBIDDEN)
          .body(new ApiResponse<>(403, "글쓰기 권한이 없습니다.", null));
      }

      //삭제 하기 saveFile apiResponse 호출하지말고 일반 메서드로 변경하기
      if (file != null && !file.isEmpty()) {
        ApiResponse<String> fileResponse = saveFile(file);

        if (fileResponse.getStatus() == 200) {
          String fileName = fileResponse.getData();
          noticeDTO.setImgurl(fileName);
        } else {
          return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body(new ApiResponse<>(500, "파일 저장 중 오류 발생", null));
          }
      }

      noticeDTO.setUpdatedAt(null);
      noticeDTO.setUserId(noticeDTO.getUserId());
      noticeService.saveNotice(noticeDTO);

      return ResponseEntity.ok(new ApiResponse<>(200, "공지사항 작성 성공", null));

    } catch (Exception e) {
      log.error("Error while saving notice: ", e);
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
        .body(new ApiResponse<>(500, "공지사항 작성 중 오류 발생", null));
    }
  }

  /**
   * 파일 저장 메서드
   * @param file 업로드할 파일
   * @return 저장된 파일의 경로
   */
  @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
  private ApiResponse<String> saveFile(@RequestParam("file") MultipartFile file) {
    try {
      String uploadFolder = uploadDir + "/uploads/images";

      Calendar cal = Calendar.getInstance();
      int year = cal.get(Calendar.YEAR);
      int month = cal.get(Calendar.MONTH) + 1;
      int date = cal.get(Calendar.DATE);
      String homedir = uploadFolder + "/" + year + "-" + month + "-" + date;

      File path = new File(homedir);
        if (!path.exists()) {
          path.mkdirs();
        }

      String fileName = file.getOriginalFilename();
        if (fileName == null || fileName.isEmpty()) {
          fileName = "default_filename.jpg";
        }

      Random r = new Random();
      int random = r.nextInt(100000000);
      int index = fileName.lastIndexOf(".");
      String fileExtension = fileName.substring(index + 1);
      String originalFileName = fileName.substring(0, fileName.length() - fileExtension.length() - 1);
      String newFileName = originalFileName + year + month + date + random + "." + fileExtension;
      String fileDBName = "/uploads/images/" + year + "-" + month + "-" + date + "/" + newFileName;

      File saveFile = new File(homedir + "/" + newFileName);
      log.info("파일 저장 경로: " + saveFile.getAbsolutePath());

      file.transferTo(saveFile);
      return new ApiResponse<>(200, "파일 저장 성공", fileDBName);

    } catch (Exception e) {
      log.error("파일 저장 중 오류 발생: ", e);
      return new ApiResponse<>(500, "파일 저장 중 오류 발생", null);
    }
  }




  /**
   * 공지사항 목록 조회 API
   * @param keyword 검색 키워드
   * @return 검색된 공지사항 목록
   */
  @GetMapping("/list")
  public ResponseEntity<ApiResponse<List<NoticeDTO>>> searchNotice(@RequestParam("keyword") String keyword) {
    List<NoticeDTO> notices = noticeService.searchNotice(keyword);
    
    if (notices.isEmpty()) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
            .body(new ApiResponse<>(404, "공지사항을 찾을 수 없습니다.", null));
    }
    
    return ResponseEntity.ok(new ApiResponse<>(200, "조회 성공", notices));
  }

  /**
   * 공지사항 상세 조회 API
   * @param id 공지사항 ID
   * @return 해당 공지사항 정보
   */
  @GetMapping("/detail")
  public ResponseEntity<ApiResponse<NoticeDTO>> getNoticeDetail(@RequestParam("id") int id){
    try{
      NoticeDTO notice = noticeService.getNoticeById(id);
      if(notice != null){
        return ResponseEntity.ok(new ApiResponse<>(200,"공지사항 조회 성공 : ",notice));
      }else{
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
          .body(new ApiResponse<>(404,"해당 공지사항을 찾을 수 없습니다.",null));
      }
    }catch(Exception e){
      e.printStackTrace();
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
        .body(new ApiResponse<>(500,"공지사항 조회 중 오류 발생.",null));
    }
  }

  /**
   * 공지사항 글 삭제 API
   * @param ids 공지사항 ID
   * @return 삭제할 공지사항 정보
   */
  @PostMapping("/delete")
  public ResponseEntity<ApiResponse<Void>> deleteByNotice(@RequestBody List<Integer> ids) {
    try {
      for (Integer id : ids) {
        NoticeDTO notice = noticeService.getNoticeById(id);
            
        if (notice == null) {
          return ResponseEntity.status(HttpStatus.NOT_FOUND)
            .body(new ApiResponse<>(404, "ID " + id + "에 해당하는 공지사항을 찾을 수 없습니다.", null));
        }

        if (notice.getImgurl() != null) {
          String filePath = System.getProperty("user.dir")
            .replace("\\app-backend", "")
            .replace("/app-backend", "") + notice.getImgurl();
          File file = new File(filePath);
                
          if (file.exists()) {
            if (file.delete()) {
              log.info("Deleted image file: " + filePath);
            } else {
              log.warn("Failed to delete image file: " + filePath);
            }
          }
        }

        if (notice.getImgurl() != null) {
          deleteFile(notice.getImgurl());
        }
      }

      noticeService.deleteByNotice(ids);
      return ResponseEntity.ok(new ApiResponse<>(200, "공지사항 삭제 성공", null));

    } catch (Exception e) {
      log.error("공지사항 삭제 중 오류 발생: ", e);
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
        .body(new ApiResponse<>(500, "공지사항 삭제 중 오류가 발생했습니다.", null));
    }
  }

  /**
   * 공지사항 수정 API
   * @param id 공지사항 ID
   * @param title 공지사항 제목
   * @param content 공지사항 내용
   * @param file 공지사항 업로드할 파일 (선택 사항)
   * @param imgurl 공지사항 이미지 url(선택 사항)
   * @return 응답 결과
   */
  @PostMapping("/edit")
  public ResponseEntity<ApiResponse<Void>> editNotice(
    @RequestParam("id") int id,
    @RequestParam("title") String title,
    @RequestParam("content") String content,
    @RequestParam(value = "file", required = false) MultipartFile file,
    @RequestParam(value = "imgurl", required = false) String imgurl){

    try{
      NoticeDTO existingNotice = noticeService.getNoticeById(id);
      if(existingNotice == null){
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
          .body(new ApiResponse<>(404, "해당 공지사항을 찾을 수 없습니다.", null));
      }

      existingNotice.setTitle(title);
      existingNotice.setContent(content);

      if("deleted".equals(imgurl)){
        if(existingNotice.getImgurl() != null){
          deleteFile(existingNotice.getImgurl());
        }
        existingNotice.setImgurl(null);
      }

      if(file != null && !file.isEmpty()){
        if(existingNotice.getImgurl() != null){
          deleteFile(existingNotice.getImgurl());
        }

        ApiResponse<String> fileResponse = saveFile(file);
        if(fileResponse.getStatus() == 200){
          existingNotice.setImgurl(fileResponse.getData());
        }else{
          return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body(new ApiResponse<>(500,"파일 저장 중 오류 발생",null));
        }
      }

      if(imgurl != null && imgurl.isEmpty()){
        if(existingNotice.getImgurl() != null){
          deleteFile(existingNotice.getImgurl());
        }
        existingNotice.setImgurl(null);
      }

      noticeService.saveNotice(existingNotice);

      return ResponseEntity.ok(new ApiResponse<>(200, "공지사항 수정 성공",null));
    }catch(Exception e){
      log.error("공지사항 수정 중 오류 발생 : ",e);
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
        .body(new ApiResponse<>(500,"공지사항 수정 중 오류 발생",null));
    }
  }

  /**
   * 파일 삭제 메서드
   * @param filePath 삭제할 파일 경로
   */
  private void deleteFile(String filePath) {
    if (filePath == null || filePath.isEmpty()) {
        log.warn("삭제할 파일 경로가 없습니다.");
        return;
    }

    String absolutePath = uploadDir + filePath;
    log.info("삭제할 파일 경로:" + absolutePath);

    File file = new File(absolutePath);

    if (file.exists()) {
        if (file.delete()) {
            log.info("파일 삭제 성공: " + absolutePath);
        } else {
            log.warn("파일 삭제 실패: " + absolutePath);
        }
    } else {
        log.warn("파일이 존재하지 않음: " + absolutePath);
    }
  }
}