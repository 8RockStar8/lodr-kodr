class UsersResponse {
  static generateResponse(user, requester) {
    if (!requester) {
      return UsersResponse.generateRegularResponse(user);
    }
    if (requester.role === UsersSettings.roles.ADMIN) {
      return UsersResponse.generateAdminResponse(user);
    }
    if (requester) {
      return UsersResponse.generatePOVResponse(photo);
    }
  }

  static generateRegularResponse(user) {
    return user = {
          fullname: user.fullname,
          username: user.username,
          // password: user.password,
          // email: user.email,
          // age: user.age
      }
  }

  static generateAdminResponse(user) {
    return user = {
          fullname: user.fullname,
          username: user.username,
          password: user.password,
          email: user.email,
          age: user.age
      }
  }

  static generatePOVResponse(user) { // Point of View
    return user = {
          fullname: user.fullname,
          username: user.username,
          // password: user.password,
          // email: user.email,
          age: user.age
      }
  }

  static generateMeResponse(user) {
    return user = {
          fullname: user.fullname,
          username: user.username,
          password: user.password,
          email: user.email,
          age: user.age
      }
  }
}

module.exports = UsersResponse;
