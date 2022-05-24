package com.capybara.vue.Responses;

public class UserInfo {

  private Long id;
  private String username;

  private String password;

  private String avatarUrl;
  private Object roles;

  private boolean enabled;

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public String getAvatarUrl() {
    return avatarUrl;
  }

  public void setAvatarUrl(String avatarUrl) {
    this.avatarUrl = avatarUrl;
  }

  public boolean isEnabled() {
    return enabled;
  }

  public void setEnabled(boolean enabled) {
    this.enabled = enabled;
  }

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
  public UserInfo(Long id, String username, String password, String avatarUrl,Object roles, boolean enabled) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.avatarUrl = avatarUrl;
    this.roles = roles;
    this.enabled = enabled;
  }
}
