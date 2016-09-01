var articles = [];

function Article (opts) {
  this.title = opts.title;
  this.category = opts.category;
  this.author = opts.author;
  this.authorUrl = opts.authorUrl;
  this.publishedOn = opts.publishedOn;
  this.body = opts.body;
}

Article.prototype.toHtml = funciton() {
  var $newArticle = $('article.template').clone();

  $newArticle.attr('data-category', this.category);

  $newArticle.find('h1').html(this.title);
  $newArticle.find('a').html(this.author);
  $newArticle.find('a').attr('href', this.authorUrl);
  $newArticle.find('.article-body').html(this.body);
  $newArticle.find('time').html(this.publishedOn);

  // Include the publication date as a 'title' attribute to show on hover:
  $newArticle.find('time[pubdate]').attr('title', this.publishedOn);
}
