$(function () {
    $('.mobile-menu-button').click(function () {
        $('nav').toggleClass('shown');
    });

    var positionMenu = function () {
        var currentUrl = window.location.href;
        var filename = currentUrl.substring(currentUrl.lastIndexOf('/') + 1);

        $('nav li').each(function () {
            var $li = $(this);

            if ($li.find('a').attr('href') == filename) {

                $li.addClass('selected');

                var $indicator = $('.indicator');
                var indicatorPosition = $li.position().left + $li.outerWidth() / 2 - $indicator.outerWidth() / 2;
                $indicator.css('left', indicatorPosition);
            }
        });
    };

    positionMenu();
    $(window).resize(positionMenu);

});