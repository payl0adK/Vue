package com.capybara.vue.Repositories;

import com.capybara.vue.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepositoryJPA extends JpaRepository<User, Long> {

  User findByUsername(String username);

}
