$(document).ready(function() {
  $("#btn_QuoteMe").click(function() {
    $.ajax( {
      url: 'http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1',
      success: function(data) {
          var post = data.shift();
          $("#quote").html(post.content + "<p>— " + post.title + "</p>")
          //$("#quoteData").text(post.);
      },
      cache: false
      //dataType: "jsonp"
    });    
  }); 
});
