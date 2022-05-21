package com.capybara.vue.Services;

import com.capybara.vue.Models.User;
import com.capybara.vue.Repositories.UserRepositoryJPA;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserService implements UserDetailsService {

  @Autowired
  private UserRepositoryJPA userRepositoryJPA;

  @Override
  public UserDetails loadUserByUsername(String username){
    return userRepositoryJPA.findByUsername(username);
  }
}
