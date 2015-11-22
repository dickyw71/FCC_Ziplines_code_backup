$(document).ready(function() {

  $.getScript('http://platform.twitter.com/widgets.js');
  getQuote();

  $("#btn_QuoteMe").click(function() {
    getQuote();
  });

  // Gets a Quote from the Quotes on Design site using the Word Press API
  function getQuote() {
    $.ajax({
      url: 'http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1',
      success: function(data) {
        var post = data.shift();
        $("#quote").html(post.content + "<p>— " + post.title + "</p>")
        var quoteText = $("#quote").text();
        $("#container").empty();
        twttr.widgets.createShareButton(
            'http://quotesondesign.com',
            document.getElementById('container'), {
              text: quoteText.substring(0, 113) + "...",
              size: "large"
            }
          );
      },
      cache: false
    });
  }
});
