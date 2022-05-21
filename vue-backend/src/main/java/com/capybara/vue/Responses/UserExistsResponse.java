package com.capybara.vue.Responses;

public class UserExistsResponse {
  private boolean userExists;

  public UserExistsResponse(boolean exists) {
    this.userExists = exists;
  }

  public boolean isUserExists() {
    return userExists;
  }

  public void setUserExists(boolean userExists) {
    this.userExists = userExists;
  }
}
