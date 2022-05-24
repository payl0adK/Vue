package com.capybara.vue.Controllers;


import com.capybara.vue.Models.FileDB;
import com.capybara.vue.Models.User;
import com.capybara.vue.Responses.MessageResponse;
import com.capybara.vue.Services.FileStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@Controller
@CrossOrigin
public class FilesController {
  @Autowired
  private FileStorageService fileStorageService;

  @PostMapping("/api/upload")
  public ResponseEntity<?> upload (@RequestParam("file") MultipartFile file) {
    String message = "";
    try {
      fileStorageService.store(file);
      message = "File successfully uploaded";
      return ResponseEntity.status(HttpStatus.OK)
          .body(new MessageResponse(message));
    } catch (Exception e) {
      message = "Couldn't upload the file: " + file.getOriginalFilename();
      System.out.println(message);
      return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED)
          .body(new MessageResponse(message));
    }
  }


  @GetMapping("/files/{id}")
  public ResponseEntity<byte[]> getFile(@PathVariable("id") String id) {
    FileDB fileDB = fileStorageService.getFile(id);
    return ResponseEntity.ok()
        .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileDB.getName() + "\"")
        .body(fileDB.getData());
  }
}
