var toast = Materialize.toast;
var preview = true;

$(document).ready(function() {
    $('.modal-trigger').leanModal();
    $('.link-' + id).addClass('active');
    $(".editable").on("input", toMarkdown);
    toMarkdown();

    // Sauvegarde automatique toutes les minutes
    window.setInterval(function() {
        if ($('#title').val() != "" && $('#content').val() !=
            "")
            send();
    }, 60000);
});

function toMarkdown() {
    var titre = "# " + $('#title').val() + "\n";
    var content = titre + $("#content").val();
    //content = content.replace(/(<([^>]+)>)/ig, "");
    content = content.replace(/(<script>)/ig, "[Javascript]\n");
    content = content.replace(/(<\/script>)/ig, "\n[/Javascript]");
    var md = marked(content);
    $("#view").html(md);
};

function send() {
    console.log("Sauvegarde");
    if ($('#title').val() != "") {
        var document = {
            title: $('#title').val(),
            content: $('#content').val(),
        };
        if (id != 0) {
            document._id = id;
            $('.link-' + id).text(document.title);
        }
        $.post("/api", document, function(data) {
            if (data && !data.hasOwnProperty('error')) {
                id = data.id;
                toast(data.message, 2000);
                $("#last-save").text("Dernière sauvegarde : " + Date());
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

function togglePreview() {
    if (preview) {
        $('#editor').addClass('m12').removeClass('m6');
        $('#view').hide();
    } else {
        $('#editor').addClass('m6').removeClass('m12');
        $('#view').show();
    }
    preview = !preview;
}
