package com.capybara.vue.Configs;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;


@Component
public class RestAuthenticationEntryPoint implements AuthenticationEntryPoint {

  @Override
  public void commence(HttpServletRequest request, HttpServletResponse response,
      AuthenticationException authException) throws IOException, ServletException {

    if (authException instanceof BadCredentialsException) {
      response.sendError(401, "Invalid login or username");
    } else if (authException instanceof InternalAuthenticationServiceException) {
      response.sendError(401, "User doesn't exist");
    }
    else {
      response.sendError(HttpServletResponse.SC_UNAUTHORIZED,authException.getMessage());
    }

  }

}