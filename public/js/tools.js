var toast = Materialize.toast;
var preview = true;
var lastContent = "";
var waitForConvert = false;

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
    if (preview) {
        var charCount = $('#content').val().length;
        if (charCount < 10000) md();
        else if (!waitForConvert) {
            waitForConvert = true;
            setTimeout(function() {
                waitForConvert = false;
                md();
            }, 1500);
        }
    }
};

function md() {
    var titre = "";
    if ($('#title').val() != "") titre = "# " + $('#title').val() +
        "\n";
    var content = titre + $("#content").val();
    //content = content.replace(/(<([^>]+)>)/ig, "");
    content = content.replace(/(<script>)/ig, "[Javascript]\n");
    content = content.replace(/(<\/script>)/ig, "\n[/Javascript]");
    var md = marked(content);
    $("#view").html(md);
}

function togglePreview() {
    if (preview) {
        $('#editor').addClass('m12').removeClass('m6');
        $('#view').hide();
        $(".fa-eye-slash").removeClass('fa-eye-slash').addClass('fa-eye');

    } else {
        $('#editor').addClass('m6').removeClass('m12');
        $('#view').show();
        $(".fa-eye").removeClass('fa-eye').addClass('fa-eye-slash');
        md();
    }
    preview = !preview;
}

function toggleNumberedTitles() {
    $("#view").toggleClass('numbered-view');
}

function parameters() {
    if ($("#modal-parameters").css('display') == "none")
        $('#modal-parameters').openModal();
    else $('#modal-parameters').closeModal();
}

function getTags() {
    var tagsString = $("#tags").val();
    var tags = tagsString.split(/[,;] */);
    return tags.join(', ');
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
