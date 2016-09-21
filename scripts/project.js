var projects = [];

function Project (opts) {
  this.title = opts.title;
  this.category = opts.category;
  this.project = opts.project;
  this.authorUrl = opts.authorUrl;
  this.publishedOn = opts.publishedOn;
  this.body = opts.body;
}

Project.prototype.toHtml = function() {
  var appTemplate = $('#templateScript').html();
  console.log(appTemplate);
  var compiledTemplate = Handlebars.compile(appTemplate);
  console.log(compiledTemplate);

  this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);
  this.publishStatus = this.publishedOn ? 'published ' + this.daysAgo + ' days ago' : '(draft)';

  return compiledTemplate(this);
};

rawData.sort(function(a,b) {
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

rawData.forEach(function(ele) {
  projects.push(new Project(ele));
});

projects.forEach(function(a) {
  $('#projects').append(a.toHtml());
});
