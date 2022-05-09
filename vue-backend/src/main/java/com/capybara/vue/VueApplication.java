package com.capybara.vue;

import com.capybara.vue.Models.Authority;
import com.capybara.vue.Models.User;
import com.capybara.vue.Repositories.AuthorityRepository;
import com.capybara.vue.Repositories.UserRepository;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class VueApplication {

  @Autowired
  private UserRepository userRepository;

  public static void main(String[] args) {
    SpringApplication.run(VueApplication.class, args);

  }
  // TODO: REMOVE THAT TRASH
  @PostConstruct
  protected void init() {
    PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    String password = passwordEncoder.encode("123");
    List<Authority> authorities = new ArrayList<>();
    authorities.add(new Authority("USER", "User role"));
    authorities.add(new Authority("ADMIN", "Admin role"));
    userRepository.save(new User("capybara", password, authorities));

  }
}
