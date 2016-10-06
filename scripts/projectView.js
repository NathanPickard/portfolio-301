(function(module) {
  
var projectView = {};

projectView.populateFilters = function() {
  $('article').each(function() {
    if (!$(this).hasClass('template')) {
      var val = $(this).find('address a').text();
        var optionTag = '<option value"' + val + '">' + val + '</option>';
        $('#project-filter').append(optionTag);

        val = $(this).attr('data-category');
        optionTag = '<option value="' + val + '">' + val + '</option>';
        if ($('#category-filter option[value="' + val + '"]').length === 0) {
          $('#category-filter').append(optionTag);
        }
        if ($('#language-filter option[value="' + val + '"]').length === 0) {
          $('#language-filter').append(optionTag);
        }
      }
  });
};

projectView.handleProjectFilter = function() {
  $('#project-filter').on('change', function() {
    if ($(this).val()) {
      $('article').hide();
      $('article[data-project="' + $(this).val() + '"]').fadeIn();
    } else {
      $('article').fadeIn();
      $('project.template').hide();
    }
    $('#category-filter').val('');
  });
};

projectView.handleCategoryFilter = function() {
  $('#category-filter').on('change', function() {
    if ($(this).val()) {
      $('article').hide();
      $('article[data-category="' + $(this).val() + '"]').fadeIn();
    } else {
      $('article').fadeIn();
      $('project.template').hide();
    }
    $('#project-filter').val('');
  });
};

projectView.handleLanguageFilter = function() {
  $('#language-filter').on('change', function() {
    if ($(this).val()) {
      $('article').hide();
      $('article[data-language="' + $(this).val() + '"]').fadeIn();
    } else {
      $('article').fadeIn();
      $('project.template').hide();
    }
    $('#project-filter').val('');
  });
};

projectView.handleMainNav = function() {
  $('.main-nav').on('click', '.tab', function(e) {
    $('.tab-content').hide();
    $('#' + $(this).data('content')).fadeIn();
  });

  $('.main-nav .tab:first').click();
};

projectView.setTeasers = function() {
  $('.project-body *:nth-of-type(n+2)').hide();

  $('#projects').on('click', 'a.read-on', function(e) {
    e.preventDefault();
    $(this).parent().find('*').fadeIn();
    $(this).hide();
  });
};

projectView.initNewArticlePage = function() {
  $('.tab-content').show();
  $('#export-field').hide();
  $('#project-json').on('focus', function() {
    this.select();
  });

  $('#new-form').on('change', 'input, textarea', projectView.create);
};

projectView.create = function() {
  var article;
  $('#projects').empty();

  project = new Project({
    title: $('#project-title').val(),
    category: $('#project-category').val(),
    project: $('#project-project').val(),
    authorUrl: $('#project-author-url').val(),
    body: $('#project-body').val(),
    publishedOn: $('#project-published:checked').length ? util.today() : null
  });

  $('#projects').append(article.toHtml());

  $('pre code').each(function(i, block) {
    hljs.highlightBlock(block);
  });

  $('#export-field').show();
  $('#project-json').val(JSON.stringify(project) + ',');
};

projectView.initIndexPage = function() {
  Project.all.forEach(function(a) {
    $('#projects').append(a.toHtml())
  });

  projectView.populateFilters();
  projectView.handleCategoryFilter();
  projectView.handleProjectFilter();
  projectView.handleLanguageFilter();
  projectView.handleMainNav();
  projectView.setTeasers();
};

  module.projectView = projectView;
})(window);
