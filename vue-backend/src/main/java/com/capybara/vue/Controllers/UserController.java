package com.capybara.vue.Controllers;

import com.capybara.vue.Models.User;
import com.capybara.vue.Repositories.UserRepository;
import com.capybara.vue.Requests.AuthenticationRequest;
import com.capybara.vue.Services.UserService;
import java.io.IOException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/user")
@CrossOrigin
public class UserController {

  @Autowired
  private UserRepository userRepository;

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
}
