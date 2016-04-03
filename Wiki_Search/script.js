$(document).ready(function() {

  // Search button handler
  $("#searchBtn").click(function() {
    // check if search text box is not empty
    var searchText = $("#searchText").val().trim();
    if (searchText.length > 0) {
      $(".list-group").empty();
      searchWiki(searchText);
    }
  });
  
  $("#searchText").keypress(function(e) {
    if(e.keyCode == 13) {
      $("#searchBtn").click();      
    }
  });
});

function searchWiki(query) {
  
  var titles = [];
  
  // Call the MediaWiki API using ajax
  $.ajax({
    url: '//en.wikipedia.org/w/api.php',
    data: {
      action: 'query',
      format: 'json',
      list: 'search',
      srsearch: query
    },
    dataType: 'jsonp',
    success: function(x) {
      for (var i = 0; i < x.query.search.length; i++) {
        titles[i] = x.query.search[i].title;
      }
      if(titles.length > 0) {
        getWikiExtracts(titles.join("|"));
      }
      else {
        $(".list-group").html("<a href='#' class='list-group-item'><h4 class='list-group-item-heading'>Wikipedia returned no results for this search.</h4><p class='list-group-item-text'></p></a>");
      }
    }
  });
}

function getWikiExtracts(titles) {

  $.ajax({
    url: '//en.wikipedia.org/w/api.php',
    data: {
      action: 'query',
      format: 'json',
      prop: 'extracts',
      exintro: true,
      explaintext: true,
      exlimit: 10,
      titles: titles
    },
    dataType: 'jsonp',
    success: function(y) {    
      showResults(y.query.pages);
    }
  });
}

function showResults(pages) {
  for(var page in pages) {
    $(".list-group").append("<a href='https://en.wikipedia.org/?curid=" + pages[page]["pageid"] + "' target='_blank' class='list-group-item'><h4 class='list-group-item-heading'>" + pages[page]["title"] + "</h4><p class='list-group-item-text'>" + firstSentence(pages[page]["extract"]) + ".</p></a>");
  }
}

// return just the first sentence of the passed text
function firstSentence(extract) { 
  return extract.split(". ")[0];  
}
