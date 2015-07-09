var toast = Materialize.toast;
var large = false;

$(document).ready(function() {
    $('.modal-trigger').leanModal();
    $('.link-' + id).addClass('active');
});

function toMarkdown() {
    var titre = "#" + $('#title').val() + "\n";
    $("#view").html(marked(titre + $("#content").val()));
};

function send() {
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
            if (data.redirectToEdit) window.location.href = '/' + id;
        } else toast("Problème serveur. Document non sauvé.", 2000);
    });
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

function toogleLarge() {
    if (large) {
        $('#editor').addClass('m6').removeClass('m12');
        $('#view').addClass('m6').removeClass('m12');
        $('#large-btn').text('Large');
    } else {
        $('#editor').addClass('m12').removeClass('m6');
        $('#view').addClass('m12').removeClass('m6');
        $('#large-btn').text('Compact');
    }
    large = !large;
}
