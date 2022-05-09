package com.capybara.vue.Controllers;

import com.capybara.vue.Services.UserService;
import java.security.NoSuchAlgorithmException;
import java.security.Principal;
import java.security.spec.InvalidKeySpecException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.capybara.vue.Configs.JWTTokenHelper;
import com.capybara.vue.Models.User;
import com.capybara.vue.Requests.AuthenticationRequest;
import com.capybara.vue.Responses.LoginResponse;
import com.capybara.vue.Responses.UserInfo;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class AuthenticationController {

  @Autowired
  private AuthenticationManager authenticationManager;

  @Autowired
  JWTTokenHelper jWTTokenHelper;

  @Autowired
  private UserService userDetailsService;

  @PostMapping("/auth/login")
  public ResponseEntity<?> login(@RequestBody AuthenticationRequest authenticationRequest)
      throws InvalidKeySpecException, NoSuchAlgorithmException {

    final Authentication authentication = authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(
            authenticationRequest.getUsername(), authenticationRequest.getPassword()));

    SecurityContextHolder.getContext().setAuthentication(authentication);
    User user = (User) userDetailsService.loadUserByUsername(authenticationRequest.getUsername());
    String jwtToken = jWTTokenHelper.generateToken(user.getUsername());

    LoginResponse response = new LoginResponse();
    response.setToken(jwtToken);
    return ResponseEntity.ok(response);
  }

  @GetMapping("/auth/userinfo")
  public ResponseEntity<?> getUserInfo(Principal user) {
    User userObj = (User) userDetailsService.loadUserByUsername(user.getName());

    UserInfo userInfo = new UserInfo();
    userInfo.setUsername(userObj.getUsername());
    userInfo.setRoles(userObj.getAuthorities().toArray());

    return ResponseEntity.ok(userInfo);

  }
}