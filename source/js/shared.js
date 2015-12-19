var socket = io();
var firstAcquiring = true;

$(document).ready(function () {

  $(".CodeMirror").hide();

  socket.emit('getCurrentContent');

  editeur.on("keyup", function () {
    socket.emit('update', editeur.getValue());
  });

  socket.on('getCurrentContent', function () {
    socket.emit('postCurrentContent', editeur.getValue());
  })

  socket.on('postCurrentContent', function (content) {
    if (firstAcquiring) {
      $(".CodeMirror").show();
      editeur.setValue(content);
      console.log('SHOW ! ');
    }
    firstAcquiring = false;
  })

  socket.on("update", function (content) {
    editeur.setValue(content);
  })
});

function send() {
  if (editeur.getValue() != lastContent)
    if ($('#title').val() !== "") {
      console.log("Sauvegarde");
      var parameters = {
        document: {
          identifiant: identifiant,
          title: $('#title').val(),
          content: editeur.getValue(),
          username: $('#username').val(),
          context: $('#context').val(),
          toc: $('#toc').is(':checked') || false
        }
      };
      if (id !== 0) parameters._id = id;
      $.post("/share", parameters, function (data) {
        if (data && !data.hasOwnProperty('error')) {
          id = data.id;
          toast(data.message, 2000);
          var now = new Date(),
            date = now.getHours() + ":" + now.getMinutes();
          $("#last-save").text("Dernière sauvegarde à " +
            date);
          lastContent = parameters.document.content;
          if (data.redirectToEdit) window.location.href =
            '/share/' + identifiant;
        } else toast(
          "Problème serveur. Document non sauvé.",
          2000);
      });
    } else toast("Pas de titre. Document non sauvé", 2000);
}

function del() {
  if (id !== 0)
    $.ajax({
      url: "/share/" + id,
      type: "DELETE",
      success: function (data) {
        window.location.href = '/share/';
      }
    });
  else toast("Document non sauvé", 2000);
}

function newDocument() {
  window.location.href = '/share';
}
