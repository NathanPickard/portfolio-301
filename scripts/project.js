// var projects = [];

function Project (opts) {
  this.title = opts.title;
  this.category = opts.category;
  this.project = opts.project;
  this.authorUrl = opts.authorUrl;
  this.publishedOn = opts.publishedOn;
  this.body = opts.body;
}

Project.all = [];

Project.prototype.toHtml = function() {
  var appTemplate = Handlebars.compile($('#templateScript').text());

  this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);
  this.publishStatus = this.publishedOn ? 'published ' + this.daysAgo + ' days ago' : '(draft)';
  this.body = marked(this.body);

  return appTemplate(this);
};

Project.loadAll = function(rawData) {
  rawData.sort(function(a,b) {
    return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
  });

  rawData.forEach(function(ele) {
    Project.all.push(new Project(ele));
  });
}


Project.fetchAll = function() {
  $.ajax({
    url: './data/projectArticles.json',
    method: 'HEAD',
    success: function(data, message, xhr) {
      console.log('xhr', xhr);
      var etag = xhr.getResponseHeader('ETag');
      if(localStorage.etag) {
        var locEtag = localStorage.getItem('etag');
        if (locEtag === etag && localStorage.rawData) {
          fetchFromLocalStorage();
        } else {
          fetchFromDisk();
        }
      }  else {
          fetchFromDisk();
        }
        localStorage.setItem('etag', etag);
      }
  });

  function fetchFromDisk() {
    $.getJSON('.data/projectArticles.json', function(data) {
      Project.loadAll(data);
      localStorage.setItem('rawData', JSON.stringify(data));
      projectView.initIndexPage();
    });
  }

  function fetchFromLocalStorage() {
    var rd = localStorage.getItem('rawData');
    var rdjson = JSON.parse(rd);
    Project.loadAll(rdjson);
    projectView.initIndexPage();
  }
}


// projects.forEach(function(a) {
//   $('#projects').append(a.toHtml());
// });
