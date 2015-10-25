var toast = Materialize.toast;
var preview = true;
var lastContent = "";

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
    if ($('#content').val() != lastContent)
        if ($('#title').val() != "") {
            console.log("Sauvegarde");
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
                    $("#last-save").text("Dernière sauvegarde : " +
                        Date());
                    lastContent = document.content;
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

//Gestion des touches claviers spéciales
$("textarea").keydown(function(e) {
    // Tabulation dans l'éditeur
    if (e.keyCode === 9) {
        var start = this.selectionStart;
        var end = this.selectionEnd;
        var $this = $(this);
        var value = $this.val();
        $this.val(value.substring(0, start) + "\t" + value.substring(
            end));
        this.selectionStart = this.selectionEnd = start + 1;
        e.preventDefault();
    }
});
$(document).keydown(function(e) {
    console.log(e.keyCode);
    if (e.ctrlKey) {
        switch (e.keyCode) {
            //CTRL+S : Sauvegarde manuelle
            case 83:
                send();
                e.preventDefault();
                break;
                //CTRL+P : Toggle Preview
            case 80:
                togglePreview();
                e.preventDefault();
                break;
        }
    }
})
