$(document).ready(function() {

  // get the Twitch.TV stream status of Free Code Camp
//  $.getJSON('https://api.twitch.tv/kraken/streams/lirik?callback?', function(data) 
          $.getJSON('https://api.twitch.tv/kraken/streams/freecodecamp?callback?', function(data) 
                                                                                                      {
    if (data.stream) {
      // Free Code Camp is streaming on Twitch.TV
      // Show FCC stream preview image
      $('.media-object').attr('src', data.stream.preview.large)
      $('a').attr({
        href: data.stream.channel.url,
        target: '_blank'
      })  
      $('.media-object').css('border', 'thick solid #85D94D')
      $('.media-heading').text(data.stream.channel.display_name)
      $('.media-desc').text(data.stream.channel.status)
      $('.media-status').text('ONLINE')
      $('a').attr({
          href: channel.url,
          target: '_blank'      
      })
    } 
    else {
      // Free Code Camp Twitch.TV channel is Offline
      $.getJSON(data._links.channel, function(channel) {
        if (channel.video_banner) {
          // Show the offline video banner image
          $('.media-object').attr('src', channel.video_banner)
        } else {
          // Or show the Free Code Camp Channel Logo
          $('.media-object').attr({
            src: channel.logo,
            alt: 'Open on Twitch.TV'
          })
        }
        $('.media-heading').text(channel.display_name)
        $('.media-desc').text('')
        $('.media-status').text('OFFLINE')
        $('.media-status').css('color', '#898A6F')
        $('a').attr({
          href: channel.url,
          target: '_blank'      
        })
      })
    }

  })
})