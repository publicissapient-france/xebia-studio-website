window.selectMainMenu = function (li) {
    var $indicator = $('.indicator');
    if (li) {
        li.addClass('selected');

        var indicatorPosition = li.position().left + li.outerWidth() / 2 - $indicator.outerWidth() / 2;
        $indicator.css('left', indicatorPosition);
    } else {
        $indicator.css('visibility', 'hidden');
    }
};



$(function () {
    $('.mobile-menu-button').click(function () {
        $('nav').toggleClass('shown');
    });


    var positionMenu = function () {
        var currentUrl = window.location.href;
        var filename = currentUrl.substring(currentUrl.lastIndexOf('/') + 1);

        var currentLi = null;
        $('nav li').each(function () {
            var $li = $(this);

            if (filename.indexOf($li.find('a').attr('href')) === 0) {
                currentLi = $li;
            }
        });

        selectMainMenu(currentLi);
    };

    positionMenu();
    $(window).resize(positionMenu);

    var $mentionsPopup = $('#mentions-legales-popup');
    $('.mentions-legales').click(function () {
        $mentionsPopup.slideDown();
    });

    $mentionsPopup.find('.close').click(function () {
        $('#mentions-legales-popup').slideUp();
    });
});