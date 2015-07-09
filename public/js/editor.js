var toast = Materialize.toast;

function toMarkdown() {
    var titre = "#" + $('#title').val() + "\n";
    $("#view").html(marked(titre + $("#content").val()));
};

function send() {
    var document = {
        title: $('#title').val(),
        content: $('#content').val(),
    };
    if (id != 0) document._id = id;
    $.post("/api", document, function(data) {
        if (data) {
            id = data.id;
            toast(data.message, 2000);
            if (data.redirectToEdit) window.location.href = id;
        } else toast("Serveur inatteignable", 2000);
    });
};

function del() {
    if (id != 0)
        $.ajax({
            url: "/api/" + id,
            type: "DELETE",
            success: function(data) {
                toast(data.message, 2000);
            }
        });
};
