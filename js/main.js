$( document ).ready(function() {

    /////////// filter Isotop
    $( function() {
      // init Isotope
      var $grid = $('.grid').isotope({
        itemSelector: '.grid-item',
        layoutMode: 'fitRows'

      });
      // filter functions
      var filterFns = {
        // show if number is greater than 50
        numberGreaterThan50: function() {
          var number = $(this).find('.number').text();
          return parseInt( number, 10 ) > 50;
        },
        // show if name ends with -ium
        ium: function() {
          var name = $(this).find('.name').text();
          return name.match( /ium$/ );
        }
      };
      // bind filter button click
      $('.filters-button-group').on( 'click', 'button', function() {
        var filterValue = $( this ).attr('data-filter');
        // use filterFn if matches value
        filterValue = filterFns[ filterValue ] || filterValue;
        $grid.isotope({ filter: filterValue });
      });
      // change is-checked class on buttons
      $('.button-group').each( function( i, buttonGroup ) {
        var $buttonGroup = $( buttonGroup );
        $buttonGroup.on( 'click', 'button', function() {
          $buttonGroup.find('.is-checked').removeClass('is-checked');
          $( this ).addClass('is-checked');
        });
      });
      
    });

    /////////// Sort Isotop
    var $grid = $('.grid').isotope({
        itemSelector: '.grid-item',
        layoutMode: 'fitRows',
        getSortData: {
          current: '.current',
          completed: '.completed',
          name: '.name',
          //number: '.number parseInt',
          //category: '[data-category]',
          weight: function( itemElem ) {
            var weight = $( itemElem ).find('.weight').text();
            return parseFloat( weight.replace( /[\(\)]/g, '') );
          }
        }
      });

      // bind sort button click
      $('.sort-by-button-group').on( 'click', 'button', function() {
        var sortValue = $(this).attr('data-sort-value');
        $grid.isotope({ sortBy: sortValue });
      });

      // change is-checked class on buttons
      $('.button-group').each( function( i, buttonGroup ) {
        var $buttonGroup = $( buttonGroup );
        $buttonGroup.on( 'click', 'button', function() {
          $buttonGroup.find('.is-checked').removeClass('is-checked');
          $( this ).addClass('is-checked');
        });
      });


    /////////// Project slider
    var projectSlider;

    $(function() {

        $("#slide-counter").prepend('<span class="current-index"></span> <span class="counter-space">of</span> ');

        projectSlider = $('.project-slider').bxSlider({
            onSliderLoad: function (currentIndex){
              $('#slide-counter .current-index').text(currentIndex + 1);
            },
            onSlideBefore: function ($slideElement, oldIndex, newIndex){
              $('#slide-counter .current-index').text(newIndex + 1);
            }
        });

        $("a.item").click(function() {  // button that sets the DIV visible
            $(".project-slider-box").animate({'opacity': 'show', 'paddingTop': 30}); // DIV that contain SLIDER
            projectSlider.reloadSlider();  // Reloads the slideshow (bxSlider API function)
        });

        $(".button, .close-slider").click(function() {   // button that sets the DIV visible
            $(".project-slider-box").animate({'opacity': 'hide', 'paddingTop': 30});
        });

        $("#slide-counter").append(projectSlider.getSlideCount()); // show slider counter

    });


    // overlay show hide on project slider

    $("a.item").click(function() {   // button that sets the DIV visible
      $(".overlay").animate({'opacity': 'show'});
    });

    $(".close-overlay").click(function() {   // button that sets the DIV visible
      $(".overlay").animate({'opacity': 'hide'});
    });


}); // END document ready function







