package com.capybara.vue.Services;


import com.capybara.vue.Models.FileDB;
import com.capybara.vue.Repositories.FileDBRepositoryJPA;
import java.io.IOException;
import org.springframework.util.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileStorageService {

  @Autowired
  private FileDBRepositoryJPA fileDBRepositoryJPA;

  public FileDB store (MultipartFile file) throws IOException {
    String fileName = StringUtils.cleanPath(file.getOriginalFilename());
    FileDB fileDB = new FileDB(fileName, file.getContentType(), file.getBytes());

    return fileDBRepositoryJPA.save(fileDB);
  }

  public FileDB getFile (String id) {
    return fileDBRepositoryJPA.findById(id).orElseThrow();
  }

}
