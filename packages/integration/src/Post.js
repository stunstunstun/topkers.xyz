class Post {
  constructor({ id, source, title, desc, link, author, avatar }) {
    this.id = id
    this.source = source
    this.title = title
    this.desc = desc
    this.link = link
    this.author = author
    this.avatar = avatar
  }
}

module.exports = Post
