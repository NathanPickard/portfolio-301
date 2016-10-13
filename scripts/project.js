(function(module) {

function Project (opts) {
  this.title = opts.title;
  this.category = opts.category;
  this.projectType = opts.projectType;
  this.projectLanguage = opts.projectLanguage;
  this.projectUrl = opts.projectUrl;
  this.authorUrl = opts.authorUrl;
  this.publishedOn = opts.publishedOn;
  this.body = opts.body;
}

Project.all = [];

Project.prototype.toHtml = function() {
  var appTemplate = Handlebars.compile($('#templateScript').text());

  this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);
  this.publishStatus = this.publishedOn ? 'published ' + this.daysAgo + ' days ago' : '(draft)';
  // this.body = marked(this.body);

  return appTemplate(this);
};

Project.loadAll = function(rawData) {
  rawData.sort(function(a,b) {
    return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
  });

  Project.all = rawData.map(function(ele) {
    return new Project(ele);
  });
};

Project.fetchAll = function(callback) {
  // if (localStorage.rawData) {
  //   Project.loadAll(JSON.parse(localStorage.rawData));
  //   callback();
  // } else {
    $.getJSON('./data/projectArticles.json', function(rawData) {
      Project.loadAll(rawData);
      localStorage.rawData = JSON.stringify(rawData);
      callback();
    });
  // }
};


  module.Project = Project;
})(window);
