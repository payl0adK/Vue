package com.capybara.vue.Controllers;

import com.capybara.vue.Models.User;
import com.capybara.vue.Repositories.UserRepository;
import com.capybara.vue.Repositories.UserRepositoryJPA;
import com.capybara.vue.Requests.AuthenticationRequest;
import com.capybara.vue.Responses.UserInfo;
import com.capybara.vue.Services.UserService;
import java.io.IOException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.ResponseEntity.BodyBuilder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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
      UserInfo userinfo = new UserInfo(username, user.getAuthorities().toArray());
      return ResponseEntity.ok(userinfo);
    } else {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
  }

}
