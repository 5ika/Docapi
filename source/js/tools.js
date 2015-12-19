var toast = Materialize.toast;
var preview = false;
var lastContent = "";
var waitForConvert = false;
var editeur;

$(document).ready(function() {
  $('.modal-trigger').leanModal();
  $('.link-' + id).addClass('active');
  toMarkdown();

  // Initialisaion de l'éditeur
  editeur = CodeMirror.fromTextArea($("textarea")[0]);
  editeur.on("change", toMarkdown);

  // Sauvegarde automatique toutes les minutes
  window.setInterval(function() {
    if ($('#title').val() !== "" && $('#content').val() !== "")
      send();
  }, 60000);
});

function toMarkdown() {
  if (preview) {
    var charCount = editeur.getValue().length;
    if (charCount < 10000) md();
    else if (!waitForConvert) {
      waitForConvert = true;
      setTimeout(function() {
        waitForConvert = false;
        md();
      }, 1500);
    }
  }
}

function md() {
  var titre = "";
  if ($('#title').val() !== "") titre = "# " + $('#title').val() + "\n";
  var content = titre + editeur.getValue();
  //content = content.replace(/(<([^>]+)>)/ig, "");
  content = content.replace(/(<script>)/ig, "[Javascript]\n");
  content = content.replace(/(<\/script>)/ig, "\n[/Javascript]");
  var mdContent = marked(content);
  $("#view").html(mdContent);
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

function toggleFullscreen() {
  if (editeur.getOption("fullScreen"))
    editeur.setOption("fullScreen", false);
  else editeur.setOption("fullScreen", true);
  $('.btn-fullscreen-disable').toggleClass('hide');
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
  console.log(e.keyCode);
  if (e.ctrlKey) {
    switch (e.keyCode) {
      //CTRL+S : Sauvegarde manuelle
      case 83:
        send();
        break;
        //CTRL+O : Toggle Preview
      case 79:
        togglePreview();
        break;
      case 80:
        toggleFullscreen();
        break;
    }
    e.preventDefault();
  }
});
