class PhotosResponse {
  static generateResponse(photo, requester) {
    if (!requester) {
      return PhotosResponse.generateRegularResponse(photo);
    }
    if (requester.role === UsersSettings.roles.ADMIN) {
      return PhotosResponse.generateAdminResponse(photo);
    }
    if (requester) {
      return PhotosResponse.generatePOVResponse(photo);
    }
  }

  static generateRegularResponse(photo) {
    return photo = {
          author: photo.author,
          content_type: photo.content_type,
          size: photo.size,
          title: photo.title,
          image: photo.image,
          width: photo.width,
          height: photo.height,
          path: photo.path
      }
  }

  static generateAdminResponse(photo) {
    return photo = {
          author: photo.author,
          content_type: photo.content_type,
          size: photo.size,
          title: photo.title,
          image: photo.image,
          width: photo.width,
          height: photo.height,
          path: photo.path
      }
  }

  static generatePOVResponse(photo) { // Point of View
    return photo = {
          author: photo.author,
          content_type: photo.content_type,
          size: photo.size,
          title: photo.title,
          image: photo.image,
          width: photo.width,
          height: photo.height,
          path: photo.path
      }
  }

  static generateMeResponse(photo) {
    return photo = {
          author: photo.author,
          content_type: photo.content_type,
          size: photo.size,
          title: photo.title,
          image: photo.image,
          width: photo.width,
          height: photo.height,
          path: photo.path
      }
  }
}

module.exports = PhotosResponse;
