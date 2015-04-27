$(window).load(function () {

    "use strict";

    /*---------------------------------------*/
    /*	WOW FOR ANIMATION ON SCROLL
	/*---------------------------------------*/
    var wow = new WOW({
        mobile: false
    });
    wow.init();

    /*---------------------------------------*/
    /*	NAVIGATION
	/*---------------------------------------*/
    $('.main-navigation').onePageNav({
        changeHash: true,
        currentClass: 'not-active',
        /* CHANGE THE VALUE TO 'current' TO HIGHLIGHT CURRENT SECTION LINK IN NAV*/
        scrollSpeed: 750,
        scrollThreshold: 0.5,
        filter: ':not(.external)'
    });

    /*---------------------------------------*/
    /*	STELLAR FOR BACKGROUND SCROLLING
	/*---------------------------------------*/



    $('.scrollToTop').click(function () {
        console.log('scroll top');
        $('html, body').animate({
            scrollTop: 0
        }, 800);
        return false;
    });


    $('#home-quote').stellar({
        horizontalScrolling: false,
        responsive: true
    });




    /* PRE LOADER */
    //jQuery(".status").show();
    //jQuery(".status").delay(1900).fadeOut();
    //jQuery(".preloader").delay(2000).fadeOut("slow");
    //jQuery('#mainWrapper').show();

});


$(window).resize(function () {

    "use strict";

    var ww = $(window).width();

    /* COLLAPSE NAVIGATION ON MOBILE AFTER CLICKING ON LINK */
    if (ww < 480) {
        $('.sticky-navigation a').on('click', function () {
            $(".navbar-toggle").click();
        });
    }
});

(function ($) {

    "use strict";

    /*---------------------------------------*/
    /*	NAVIGATION AND NAVIGATION VISIBLE ON SCROLL
	/*---------------------------------------*/

    mainNav();
    $(window).scroll(function () {
        mainNav();
    });

    function mainNav() {
        var top = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
        if (top > 40) $('.appear-on-scroll').stop().addClass('white');
        else $('.appear-on-scroll').stop().removeClass('white');
    }



    /*---------------------------------------*/
    /*	PLACEHOLDER FIX
	/*---------------------------------------*/
    //CREATE PLACEHOLDER FUNCTIONALITY IN IE
    $('[placeholder]').focus(function () {
        var input = $(this);
        if (input.val() == input.attr('placeholder')) {
            input.val('');
            input.removeClass('placeholder');
        }
    }).blur(function () {
        var input = $(this);
        if (input.val() == '' || input.val() == input.attr('placeholder')) {
            input.addClass('placeholder');
            input.val(input.attr('placeholder'));
        }
    }).blur();

    //ENSURE PLACEHOLDER TEEXT IS NOT SUBMITTED AS POST
    $('[placeholder]').parents('form').submit(function () {
        $(this).find('[placeholder]').each(function () {
            var input = $(this);
            if (input.val() == input.attr('placeholder')) {
                input.val('');
            }
        })
    });

    /*---------------------------------------*/
    /*	BOOTSTRAP FIXES
	/*---------------------------------------*/

    var oldSSB = $.fn.modal.Constructor.prototype.setScrollbar;
    $.fn.modal.Constructor.prototype.setScrollbar = function () {
        oldSSB.apply(this);
        if (this.scrollbarWidth) $('.navbar-fixed-top').css('padding-right', this.scrollbarWidth);
    }

    var oldRSB = $.fn.modal.Constructor.prototype.resetScrollbar;
    $.fn.modal.Constructor.prototype.resetScrollbar = function () {
        oldRSB.apply(this);
        $('.navbar-fixed-top').css('padding-right', '');
    }

    if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
        var msViewportStyle = document.createElement('style')
        msViewportStyle.appendChild(
            document.createTextNode(
                '@-ms-viewport{width:auto!important}'
            )
        )
        document.querySelector('head').appendChild(msViewportStyle)
    }


    /*---------------------------------------*/
    /*	SCREENSHOT CAROUSEL
	/*---------------------------------------*/

    $("#screenshots").owlCarousel({
        navigation: false,
        slideSpeed: 300,
        paginationSpeed: 400,
        singleItem: true
    });


    /*---------------------------------------*/
    /*	SCREENSHOT LIGHTBOX
	/*---------------------------------------*/

    $('#screenshots a').nivoLightbox({
        effect: 'fadeScale',
    });


})(jQuery);



/*---------------------------------------*/
/*	TIMELINE SLIDER
	/*---------------------------------------*/
jQuery(document).ready(function ($) {


    "use strict";

    /*setTimeout(function () {

        var x = 0,
            init,
            container = $('.timeline-section'),
            items = container.find('li'),
            containerHeight = 0,
            numberVisible = 4,
            intervalSec = 4000;

        if (!container.find('li:first').hasClass("first")) {
            container.find('li:first').addClass("first");
        }

        items.each(function () {
            if (x < numberVisible) {
                containerHeight = containerHeight + $(this).outerHeight();
                x = x + 1;
            }
        });

        container.css({
            height: containerHeight,
            overflow: "hidden"
        });

        function vertCycle() {
            var firstItem = container.find('li.first').html();

            container.append('<li>' + firstItem + '</li>');
            firstItem = '';
            container.find('li.first').animate({
                marginTop: "-105px",
                opacity: "0"
            }, 600, function () {
                $(this).remove();
                container.find('li:first').addClass("first");
            });
        }

        if (intervalSec < 700) {
            intervalSec = 700;
        }

        init = setInterval(function () {
            vertCycle();
        }, intervalSec);

        container.hover(function () {
            clearInterval(init);
        }, function () {
            init = setInterval(function () {
                vertCycle();
            }, intervalSec);
        });
    }, 1000);*/

});


/*< script >
    function backgroundRotator() {
        $('#home').backstretch(["http://itsthejrny.herokuapp.com/assets/images/Colorful-Small.jpg", "http://itsthejrny.herokuapp.com/assets/images/timesSquare.jpg", "http://itsthejrny.herokuapp.com/assets/images/DC-Metro.png", "http://itsthejrny.herokuapp.com/assets/images/road.png"
], {
            duration: 4000,
            fade: 750
        });
    }

backgroundRotator(); < /script>*/