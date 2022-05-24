package com.capybara.vue.Controllers;

import com.capybara.vue.Models.FileDB;
import com.capybara.vue.Models.User;
import com.capybara.vue.Repositories.UserRepository;
import com.capybara.vue.Repositories.UserRepositoryJPA;
import com.capybara.vue.Requests.AuthenticationRequest;
import com.capybara.vue.Responses.MessageResponse;
import com.capybara.vue.Responses.UserExistsResponse;
import com.capybara.vue.Responses.UserInfo;
import com.capybara.vue.Services.FileStorageService;
import com.capybara.vue.Services.UserService;
import java.io.IOException;
import java.util.Objects;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.ResponseEntity.BodyBuilder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@RestController
@RequestMapping("api/user")
@CrossOrigin
public class UserController {

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private UserRepositoryJPA userRepositoryJPA;
  @Autowired
  private UserService userService;

  @Autowired
  private FileStorageService fileStorageService;

  private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

  @PostMapping
  public String createUser(@RequestBody AuthenticationRequest authenticationRequest,
      HttpServletResponse response)
      throws IOException {
    String username = authenticationRequest.getUsername();
    String password = passwordEncoder.encode(authenticationRequest.getPassword());
    User user = new User(username, password);
    if (userService.loadUserByUsername(username) == null) {
      userRepository.save(user);
      response.setStatus(200);
    } else {
      response.sendError(401, "User exists");
    }


    return "200";
  }
  @GetMapping
  public ResponseEntity<?> getUserinfoByName(@RequestParam(name = "username") String username) {
    User user = userRepositoryJPA.findByUsername(username);
    if (user != null) {
      UserInfo userinfo = new UserInfo(user.getId(), user.getUsername(), user.getPassword(),
          user.getAvatarUrl(), user.getAuthorities().toArray(), user.isEnabled());
      return ResponseEntity.ok(userinfo);
    } else {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
  }

  @PostMapping("/avatar")
  public ResponseEntity<?> uploadAvatar(@RequestParam("file") MultipartFile file,
      @RequestParam("username") String username) {
    System.out.println("Type: " + file.getContentType());
    if (!Objects.equals(file.getContentType(), "image/jpeg")) {
      return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE)
          .body(new MessageResponse("Wrong type"));
    }
    String message = "";
    try {
      FileDB fileDB =  fileStorageService.store(file);
      message = "Avatar successfully changed";
      String fileDownloadUrl = ServletUriComponentsBuilder
          .fromCurrentContextPath()
          .path("/files/")
          .path(fileDB.getId())
          .toUriString();

      User user = (User) userService.loadUserByUsername(username);
      user.setAvatarUrl(fileDownloadUrl);
      System.out.println(user.getAvatarUrl());
      userRepository.save(user);
      return ResponseEntity.status(HttpStatus.OK)
          .body(new MessageResponse(message));
    } catch (Exception e) {
      message = "Couldn't upload an avatar";
      return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED)
          .body(new MessageResponse(message));
    }

  }

  @GetMapping("/exists")
  public ResponseEntity<?> userExists(@RequestParam(name = "username") String username) {
    try {
      User user = userRepositoryJPA.findByUsername(username);
      return ResponseEntity.status(200).body(new UserExistsResponse(true));
    } catch (UsernameNotFoundException e) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new UserExistsResponse(false));
    }
  }

}
