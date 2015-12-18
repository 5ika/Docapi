function send(forceSave = false) {
    if (editeur.getValue() != lastContent || forceSave)
        if ($('#title').val() != "") {
            console.log("Sauvegarde");
            var parameters = {
                document: {
                    title: $('#title').val(),
                    content: editeur.getValue(),
                    tags: getTags(),
                    username: $('#username').val(),
                    context: $('#context').val(),
                    toc: $('#toc').is(':checked') || false
                }
            };
            if (id != 0) {
                parameters._id = id;
                $('.link-' + id + " .doc-title").text(parameters.document.title);
            }
            $.post("/api", parameters, function(data) {
                if (data && !data.hasOwnProperty('error')) {
                    id = data.id;
                    toast(data.message, 2000);
                    var now = new Date(),
                        date = now.getHours() + ":" + now.getMinutes();
                    $("#last-save").text("Dernière sauvegarde à " +
                        date);
                    lastContent = parameters.document.content;
                    if (data.redirectToEdit) window.location.href =
                        '/' + id;
                } else toast(
                    "Problème serveur. Document non sauvé.",
                    2000);
            });
        } else toast("Pas de titre. Document non sauvé", 2000);
};

function del() {
    if (id != 0)
        $.ajax({
            url: "/api/" + id,
            type: "DELETE",
            success: function(data) {
                window.location.href = '/'
            }
        });
    else toast("Document non sauvé", 2000);
};

function newDocument() {
    window.location.href = '/'
}
