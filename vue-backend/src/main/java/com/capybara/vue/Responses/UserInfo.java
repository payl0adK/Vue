package com.capybara.vue.Responses;

public class UserInfo {

  private String username;

  private Object roles;

  public String getUsername() {
    return username;
  }

  public void setUsername(String userName) {
    this.username = userName;
  }

  public Object getRoles() {
    return roles;
  }

  public void setRoles(Object roles) {
    this.roles = roles;
  }

  public UserInfo() {

  }
  public UserInfo(String username, Object roles) {
    this.username = username;
    this.roles = roles;
  }
}
