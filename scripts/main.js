$(function () {
    $('.mobile-menu-button').click(function () {
        $('nav').toggleClass('shown');
    });

    (function menu() {
        var currentUrl = window.location.href;
        var filename = currentUrl.substring(currentUrl.lastIndexOf('/') + 1);

        $('nav li').each(function () {
            var $li = $(this);

            if ($li.find('a').attr('href') == filename) {
                $li.addClass('selected');
            }
        })

    })();

});