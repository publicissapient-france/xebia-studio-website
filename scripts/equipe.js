(function (TEMPLATES, equipe) {

    var toPhotoUrl = function (name) {

        var slurpedName = name
            .replace(/\s/g, '-')
            .replace(/[éèê]/g, 'e')
            .replace(/[ç]/g, 'c')
            .toLocaleLowerCase();
        return 'images/equipe/' + slurpedName + '.jpg'
    }

    $(function () {

        var equipierTemplate = TEMPLATES['equipier'];

        var html = equipe.map(function (equipier) {
            return equipierTemplate({
                name: equipier.name,
                role: equipier.role,
                urlPhoto: toPhotoUrl(equipier.name)
            });
        }).join('');

        $('#equipiers').append(html);

    });
})(window.TEMPLATES, window.EQUIPE);