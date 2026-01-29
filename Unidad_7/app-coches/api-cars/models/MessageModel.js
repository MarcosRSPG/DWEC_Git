class Message {
  constructor(gmail, subject, message, user) {
    this.gmail = gmail;
    this.subject = subject;
    this.message = message;
    this.user = user;
  }
}

module.exports = Message;
