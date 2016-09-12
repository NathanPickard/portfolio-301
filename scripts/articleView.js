var articleView = {};

articleView.populateFilters = function() {
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
    }
  });
};

articleView.handleProjectFilter = function() {
  $('#project-filter').on('change', function() {
    if ($(this).val()) {
      var $selectedAuthor = $('article[data-attribute="' + $(this).val() + '"]');
      $('article').hide();
      $selectedAuthor.fadeIn();
      $('#project-filter').val('');
    } else {
      $('article').show();
    }
  });
};

articleView.handleCategoryFilter = function() {
  $('#category-filter').on('change', function() {
    if ($(this).val()) {
      var $selectedCategory = $('article[data-category="' + $(this).val() + '"]');
      $('article').hide();
      $selectedCategory.fadeIn();
      $('#category-filter').val('');
    } else {
      $('article').show();
    }
    $('#project-filter').val('');
  });
};

articleView.handleMainNav = function() {
  $('.main-nav .tab').on('click', function() {
    var contentId = $(this).attr('data-content');
    var targetId = $('#' + contentId);
    $('section.tab-content').hide();
    $(targetId).show();
  });

  $('.main-nav .tab:first').click();
};

articleView.setTeasers = function() {
  $('.article-body *:nth-of-type(n+2)').hide();
  $('#articles .read-on').on('click', function(e) {
    e.preventDefault();
    var readOnLink = $(e.target);

    readOnLink.hide();
    readOnLink.parent().find('p').show();
  });
};

$(document).ready(function() {
  articleView.populateFilters();
  articleView.handleProjectFilter();
  articleView.handleCategoryFilter();
  articleView.handleMainNav();
  articleView.setTeasers();
});
