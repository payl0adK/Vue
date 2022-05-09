package com.capybara.vue.Controllers;


import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
public class HomeController {
    @GetMapping("/home")
    public String hello() {
      return "hello";
    }

    @GetMapping("/admin")
  public String admin() {
      return "adminpage";
    }
}
