$(function(){
    var totop = $('#j_toTop');
    var point = 600;
    totop.click(function () {
        $('body, html').stop(true, true).animate({
            scrollTop: 0
        }, 350 );
        return false;
    });

    $(window).scroll(function () {
        var st = $(window).scrollTop();
        if (st > point && totop.is(':hidden')) {
            totop.fadeIn();
        } else if (st <= point && totop.is(':visible')) {
            totop.fadeOut();
        }
    });
});

