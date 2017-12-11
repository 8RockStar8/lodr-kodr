class CodesResponse {
  static generateResponse(photo, requester) {
    if (!requester) {
      return CodesResponse.generateRegularResponse(photo);
    }
    if (requester.role === UsersSettings.roles.ADMIN) {
      return CodesResponse.generateAdminResponse(photo);
    }
    if (requester) {
      return CodesResponse.generatePOVResponse(photo);
    }
  }

  static generateRegularResponse(photo) {
    return code = {
             content: req.body.content,
             language: req.body.language,
             author: req.user._id
           }
  }

  static generateAdminResponse(photo) {
    return code = {
             content: req.body.content,
             language: req.body.language,
             author: req.user._id
           }
  }

  static generatePOVResponse(photo) { // Point of View
    return code = {
             content: req.body.content,
             language: req.body.language,
             author: req.user._id
           }
  }

  static generateMeResponse(photo) {
    return code = {
             content: req.body.content,
             language: req.body.language,
             author: req.user._id
           }
  }
}

module.exports = CodesResponse;
