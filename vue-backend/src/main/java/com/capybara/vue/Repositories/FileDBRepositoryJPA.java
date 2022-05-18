package com.capybara.vue.Repositories;

import com.capybara.vue.Models.FileDB;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FileDBRepositoryJPA extends JpaRepository<FileDB, String> {

}
