(function (TEMPLATES, clients) {

    var slurp = function (str) {
        return str.replace(/\s/g, '-').replace(/['.]/g, '_').replace(/[ô]/g, 'o').replace(/[éè]/g, 'e').replace(/\+/g, '_plus').toLowerCase()
    };

    $(function () {


        var clientTemplate = TEMPLATES['client'];

        var html = clients.map(function (client, idx) {
            return clientTemplate({
                name: client.name,
                slurpedName: slurp(client.name),
                idx: idx
            });
        }).join('');

        $('#clients-logo').append(html);
        console.log(html)
    });
})(window.TEMPLATES, window.CLIENTS);