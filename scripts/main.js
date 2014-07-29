$(function () {
    $('.mobile-menu-button').click(function () {
        $('nav').toggleClass('shown');
    });

    var positionMenu = function () {
        var currentUrl = window.location.href;
        var filename = currentUrl.substring(currentUrl.lastIndexOf('/') + 1);

        var currentLi = null
        $('nav li').each(function () {
            var $li = $(this);

            if ($li.find('a').attr('href') == filename) {
                currentLi = $li;
            }
        });

        var $indicator = $('.indicator');
        if (currentLi) {
            currentLi.addClass('selected');

            var indicatorPosition = currentLi.position().left + currentLi.outerWidth() / 2 - $indicator.outerWidth() / 2;
            $indicator.css('left', indicatorPosition);
        } else {
            $indicator.css('visibility', 'hidden');
        }
    };

    positionMenu();
    $(window).resize(positionMenu);

});