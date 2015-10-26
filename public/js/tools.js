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
    var titre = "";
    if ($('#title').val() != "") titre = "# " + $('#title').val() + "\n";
    var content = titre + $("#content").val();
    //content = content.replace(/(<([^>]+)>)/ig, "");
    content = content.replace(/(<script>)/ig, "[Javascript]\n");
    content = content.replace(/(<\/script>)/ig, "\n[/Javascript]");
    var md = marked(content);
    $("#view").html(md);
};

function togglePreview() {
    if (preview) {
        $('#editor').addClass('m12').removeClass('m6');
        $('#view').hide();
        $(".fa-eye-slash").removeClass('fa-eye-slash').addClass('fa-eye');

    } else {
        $('#editor').addClass('m6').removeClass('m12');
        $('#view').show();
        $(".fa-eye").removeClass('fa-eye').addClass('fa-eye-slash');
    }
    preview = !preview;
}

function parameters() {
    if ($("#modal-parameters").css('display') == "none")
        $('#modal-parameters').openModal();
    else $('#modal-parameters').closeModal();
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
