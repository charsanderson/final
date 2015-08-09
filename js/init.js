/* masonry init */
  
    $(function(){

      var 
        speed = 700,   // animation speed
        $wall = $('#content').find('.wall'),

        masonryOptions = {         // initial masonry options
          columnWidth: 110, 
          itemSelector: '.box:not(.invis)',
          animate: true,
          animationOptions: {
            duration: speed,
            queue: true
          }
        }
      ;

      // run on window.load so we can capture any incoming hashes
      $(window).load(function(){
        // run masonry on start-up to capture all the boxes we'll need
        $wall.masonry(masonryOptions);
        if ( window.location.hash ) {
          // get rid of the '#' from the hash
          var possibleFilterClass = window.location.hash.replace('#', '');
          switch (possibleFilterClass) {
          // if the hash matches the following words
          case 'editorial' : case 'paint' : case 'prod' : case 'drawings': case 'info' : 
            // set masonry options animate to false
            masonryOptions.animate = false;
            // hide boxes that don't match the filter class
            $wall.children().not('.'+possibleFilterClass)
              .toggleClass('invis').hide();
            // run masonry again, this time with the necessary stuff hidden
            $wall.masonry(masonryOptions);
            break;
          }
        }

      });

      $('#filtering-nav a').click(function(){
        var 
          color = $(this).attr('class').split(' ')[0],
          filterClass = '.' + color;
        ;

        if(filterClass=='.everything') {
          // show all hidden boxes
          $wall.children('.invis')
            .toggleClass('invis').fadeIn(200);
        } else {
          // hide visible boxes 
          $wall.children().not(filterClass).not('.invis')
            .toggleClass('invis').fadeOut(400);
          // show hidden boxes
          $wall.children(filterClass+'.invis')
            .toggleClass('invis').fadeIn(200);

        }
        $wall.masonry({ animate: true });
        // set hash in URL
        window.location.hash = color;
        return false;
      });
      
      /* @ndre */
      $('#filtering-nav a').click(function(){
        $('#filtering-nav a').removeClass("selected");
        $(this).addClass("selected");
      });
      

    });


/* document ready */

$(document).ready(function() {       
  QueryLoader.selectorPreload = "body"; QueryLoader.init(); // only #id not class
  
  $(QueryLoader.loadAmt).css({
      position: "relative",
      top: "20px",
      left: "25px"
});

});   

$(document).ready(function(){
  $('#nav-icon3').click(function(){
    $(this).toggleClass('open');
    $('.mobile-nav').slideToggle(); //if it's hidden show it and if its shown hide it .toggle >>slideToggle adds the animation

  });

  $( window).resize(function(){
      console.log('screen is resizing');
      //detect window width
      console.log($(window).width());

      
      if ($( window ).width() >= 760){
        $('.mobile-nav').hide(); 
      }
    });
});  