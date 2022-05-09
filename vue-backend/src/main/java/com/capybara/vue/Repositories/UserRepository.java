package com.capybara.vue.Repositories;

import com.capybara.vue.Models.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Long> {

}
