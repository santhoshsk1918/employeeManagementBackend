module.exports.UserException = function(message, type, statusCode = 500) {
    this.message = message;
    this.type = type
    this.userError = true
    this.statusCode = statusCode
}