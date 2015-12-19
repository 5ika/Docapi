function toMarkdown(){if(preview){var e=editeur.getValue().length;1e4>e?md():waitForConvert||(waitForConvert=!0,setTimeout(function(){waitForConvert=!1,md()},1500))}}function md(){var e="";""!==$("#title").val()&&(e="# "+$("#title").val()+"\n");var t=e+editeur.getValue();t=t.replace(/(<script>)/gi,"[Javascript]\n"),t=t.replace(/(<\/script>)/gi,"\n[/Javascript]");var a=marked(t);$("#view").html(a)}function togglePreview(){preview?($("#editor").addClass("m12").removeClass("m6"),$("#view").hide(),$(".fa-eye-slash").removeClass("fa-eye-slash").addClass("fa-eye")):($("#editor").addClass("m6").removeClass("m12"),$("#view").show(),$(".fa-eye").removeClass("fa-eye").addClass("fa-eye-slash"),md()),preview=!preview}function toggleNumberedTitles(){$("#view").toggleClass("numbered-view")}function toggleFullscreen(){editeur.getOption("fullScreen")?editeur.setOption("fullScreen",!1):editeur.setOption("fullScreen",!0),$(".btn-fullscreen-disable").toggleClass("hide")}function parameters(){"none"==$("#modal-parameters").css("display")?$("#modal-parameters").openModal():$("#modal-parameters").closeModal()}function getTags(){var e=$("#tags").val(),t=e.split(/[,;] */);return t.join(", ")}function send(){if(editeur.getValue()!=lastContent||forceSave)if(""!==$("#title").val()){console.log("Sauvegarde");var e={document:{title:$("#title").val(),content:editeur.getValue(),tags:getTags(),username:$("#username").val(),context:$("#context").val(),toc:$("#toc").is(":checked")||!1}};0!==id&&(e._id=id,$(".link-"+id+" .doc-title").text(e.document.title)),$.post("/api",e,function(t){if(t&&!t.hasOwnProperty("error")){id=t.id,toast(t.message,2e3);var a=new Date,n=a.getHours()+":"+a.getMinutes();$("#last-save").text("Dernière sauvegarde à "+n),lastContent=e.document.content,t.redirectToEdit&&(window.location.href="/"+id)}else toast("Problème serveur. Document non sauvé.",2e3)})}else toast("Pas de titre. Document non sauvé",2e3)}function del(){0!==id?$.ajax({url:"/api/"+id,type:"DELETE",success:function(e){window.location.href="/"}}):toast("Document non sauvé",2e3)}function newDocument(){window.location.href="/"}var toast=Materialize.toast,preview=!1,lastContent="",waitForConvert=!1,editeur;$(document).ready(function(){$(".modal-trigger").leanModal(),$(".link-"+id).addClass("active"),toMarkdown(),editeur=CodeMirror.fromTextArea($("textarea")[0]),editeur.on("change",toMarkdown),window.setInterval(function(){""!==$("#title").val()&&""!==$("#content").val()&&send()},6e4)}),$("textarea").keydown(function(e){if(9===e.keyCode){var t=this.selectionStart,a=this.selectionEnd,n=$(this),o=n.val();n.val(o.substring(0,t)+"	"+o.substring(a)),this.selectionStart=this.selectionEnd=t+1,e.preventDefault()}}),$(document).keydown(function(e){if(console.log(e.keyCode),e.ctrlKey){switch(e.keyCode){case 83:send();break;case 79:togglePreview();break;case 80:toggleFullscreen()}e.preventDefault()}});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRvb2xzLmpzIiwiZWRpdG9yLmpzIl0sIm5hbWVzIjpbInRvTWFya2Rvd24iLCJwcmV2aWV3IiwiY2hhckNvdW50IiwiZWRpdGV1ciIsImdldFZhbHVlIiwibGVuZ3RoIiwibWQiLCJ3YWl0Rm9yQ29udmVydCIsInNldFRpbWVvdXQiLCJ0aXRyZSIsIiQiLCJ2YWwiLCJjb250ZW50IiwicmVwbGFjZSIsIm1kQ29udGVudCIsIm1hcmtlZCIsImh0bWwiLCJ0b2dnbGVQcmV2aWV3IiwiYWRkQ2xhc3MiLCJyZW1vdmVDbGFzcyIsImhpZGUiLCJzaG93IiwidG9nZ2xlTnVtYmVyZWRUaXRsZXMiLCJ0b2dnbGVDbGFzcyIsInRvZ2dsZUZ1bGxzY3JlZW4iLCJnZXRPcHRpb24iLCJzZXRPcHRpb24iLCJwYXJhbWV0ZXJzIiwiY3NzIiwib3Blbk1vZGFsIiwiY2xvc2VNb2RhbCIsImdldFRhZ3MiLCJ0YWdzU3RyaW5nIiwidGFncyIsInNwbGl0Iiwiam9pbiIsInNlbmQiLCJsYXN0Q29udGVudCIsImZvcmNlU2F2ZSIsImNvbnNvbGUiLCJsb2ciLCJkb2N1bWVudCIsInRpdGxlIiwidXNlcm5hbWUiLCJjb250ZXh0IiwidG9jIiwiaXMiLCJpZCIsIl9pZCIsInRleHQiLCJwb3N0IiwiZGF0YSIsImhhc093blByb3BlcnR5IiwidG9hc3QiLCJtZXNzYWdlIiwibm93IiwiRGF0ZSIsImRhdGUiLCJnZXRIb3VycyIsImdldE1pbnV0ZXMiLCJyZWRpcmVjdFRvRWRpdCIsIndpbmRvdyIsImxvY2F0aW9uIiwiaHJlZiIsImRlbCIsImFqYXgiLCJ1cmwiLCJ0eXBlIiwic3VjY2VzcyIsIm5ld0RvY3VtZW50IiwiTWF0ZXJpYWxpemUiLCJyZWFkeSIsImxlYW5Nb2RhbCIsIkNvZGVNaXJyb3IiLCJmcm9tVGV4dEFyZWEiLCJvbiIsInNldEludGVydmFsIiwia2V5ZG93biIsImUiLCJrZXlDb2RlIiwic3RhcnQiLCJ0aGlzIiwic2VsZWN0aW9uU3RhcnQiLCJlbmQiLCJzZWxlY3Rpb25FbmQiLCIkdGhpcyIsInZhbHVlIiwic3Vic3RyaW5nIiwicHJldmVudERlZmF1bHQiLCJjdHJsS2V5Il0sIm1hcHBpbmdzIjoiQUFzQkEsUUFBQUEsY0FDQSxHQUFBQyxRQUFBLENBQ0EsR0FBQUMsR0FBQUMsUUFBQUMsV0FBQUMsTUFDQSxLQUFBSCxFQUFBSSxLQUNBQyxpQkFDQUEsZ0JBQUEsRUFDQUMsV0FBQSxXQUNBRCxnQkFBQSxFQUNBRCxNQUNBLFFBS0EsUUFBQUEsTUFDQSxHQUFBRyxHQUFBLEVBQ0EsTUFBQUMsRUFBQSxVQUFBQyxRQUFBRixFQUFBLEtBQUFDLEVBQUEsVUFBQUMsTUFBQSxLQUNBLElBQUFDLEdBQUFILEVBQUFOLFFBQUFDLFVBRUFRLEdBQUFBLEVBQUFDLFFBQUEsZUFBQSxrQkFDQUQsRUFBQUEsRUFBQUMsUUFBQSxpQkFBQSxrQkFDQSxJQUFBQyxHQUFBQyxPQUFBSCxFQUNBRixHQUFBLFNBQUFNLEtBQUFGLEdBR0EsUUFBQUcsaUJBQ0FoQixTQUNBUyxFQUFBLFdBQUFRLFNBQUEsT0FBQUMsWUFBQSxNQUNBVCxFQUFBLFNBQUFVLE9BQ0FWLEVBQUEsaUJBQUFTLFlBQUEsZ0JBQUFELFNBQUEsWUFHQVIsRUFBQSxXQUFBUSxTQUFBLE1BQUFDLFlBQUEsT0FDQVQsRUFBQSxTQUFBVyxPQUNBWCxFQUFBLFdBQUFTLFlBQUEsVUFBQUQsU0FBQSxnQkFDQVosTUFFQUwsU0FBQUEsUUFHQSxRQUFBcUIsd0JBQ0FaLEVBQUEsU0FBQWEsWUFBQSxpQkFHQSxRQUFBQyxvQkFDQXJCLFFBQUFzQixVQUFBLGNBQ0F0QixRQUFBdUIsVUFBQSxjQUFBLEdBQ0F2QixRQUFBdUIsVUFBQSxjQUFBLEdBQ0FoQixFQUFBLDJCQUFBYSxZQUFBLFFBR0EsUUFBQUksY0FDQSxRQUFBakIsRUFBQSxxQkFBQWtCLElBQUEsV0FDQWxCLEVBQUEscUJBQUFtQixZQUNBbkIsRUFBQSxxQkFBQW9CLGFBR0EsUUFBQUMsV0FDQSxHQUFBQyxHQUFBdEIsRUFBQSxTQUFBQyxNQUNBc0IsRUFBQUQsRUFBQUUsTUFBQSxTQUNBLE9BQUFELEdBQUFFLEtBQUEsTUNsRkEsUUFBQUMsUUFDQSxHQUFBakMsUUFBQUMsWUFBQWlDLGFBQUFDLFVBQ0EsR0FBQSxLQUFBNUIsRUFBQSxVQUFBQyxNQUFBLENBQ0E0QixRQUFBQyxJQUFBLGFBQ0EsSUFBQWIsSUFDQWMsVUFDQUMsTUFBQWhDLEVBQUEsVUFBQUMsTUFDQUMsUUFBQVQsUUFBQUMsV0FDQTZCLEtBQUFGLFVBQ0FZLFNBQUFqQyxFQUFBLGFBQUFDLE1BQ0FpQyxRQUFBbEMsRUFBQSxZQUFBQyxNQUNBa0MsSUFBQW5DLEVBQUEsUUFBQW9DLEdBQUEsY0FBQSxHQUdBLEtBQUFDLEtBQ0FwQixFQUFBcUIsSUFBQUQsR0FDQXJDLEVBQUEsU0FBQXFDLEdBQUEsZUFBQUUsS0FBQXRCLEVBQUFjLFNBQUFDLFFBRUFoQyxFQUFBd0MsS0FBQSxPQUFBdkIsRUFBQSxTQUFBd0IsR0FDQSxHQUFBQSxJQUFBQSxFQUFBQyxlQUFBLFNBQUEsQ0FDQUwsR0FBQUksRUFBQUosR0FDQU0sTUFBQUYsRUFBQUcsUUFBQSxJQUNBLElBQUFDLEdBQUEsR0FBQUMsTUFDQUMsRUFBQUYsRUFBQUcsV0FBQSxJQUFBSCxFQUFBSSxZQUNBakQsR0FBQSxjQUFBdUMsS0FBQSx5QkFDQVEsR0FDQXBCLFlBQUFWLEVBQUFjLFNBQUE3QixRQUNBdUMsRUFBQVMsaUJBQUFDLE9BQUFDLFNBQUFDLEtBQ0EsSUFBQWhCLFFBQ0FNLE9BQUEsd0NBQUEsV0FFQUEsT0FBQSxtQ0FBQSxLQUdBLFFBQUFXLE9BQ0EsSUFBQWpCLEdBQ0FyQyxFQUFBdUQsTUFDQUMsSUFBQSxRQUFBbkIsR0FDQW9CLEtBQUEsU0FDQUMsUUFBQSxTQUFBakIsR0FDQVUsT0FBQUMsU0FBQUMsS0FBQSxPQUdBVixNQUFBLHFCQUFBLEtBR0EsUUFBQWdCLGVBQ0FSLE9BQUFDLFNBQUFDLEtBQUEsSUQvQ0EsR0FBQVYsT0FBQWlCLFlBQUFqQixNQUNBcEQsU0FBQSxFQUNBb0MsWUFBQSxHQUNBOUIsZ0JBQUEsRUFDQUosT0FFQU8sR0FBQStCLFVBQUE4QixNQUFBLFdBQ0E3RCxFQUFBLGtCQUFBOEQsWUFDQTlELEVBQUEsU0FBQXFDLElBQUE3QixTQUFBLFVBQ0FsQixhQUdBRyxRQUFBc0UsV0FBQUMsYUFBQWhFLEVBQUEsWUFBQSxJQUNBUCxRQUFBd0UsR0FBQSxTQUFBM0UsWUFHQTZELE9BQUFlLFlBQUEsV0FDQSxLQUFBbEUsRUFBQSxVQUFBQyxPQUFBLEtBQUFELEVBQUEsWUFBQUMsT0FDQXlCLFFBQ0EsT0FtRUExQixFQUFBLFlBQUFtRSxRQUFBLFNBQUFDLEdBRUEsR0FBQSxJQUFBQSxFQUFBQyxRQUFBLENBQ0EsR0FBQUMsR0FBQUMsS0FBQUMsZUFDQUMsRUFBQUYsS0FBQUcsYUFDQUMsRUFBQTNFLEVBQUF1RSxNQUNBSyxFQUFBRCxFQUFBMUUsS0FDQTBFLEdBQUExRSxJQUFBMkUsRUFBQUMsVUFBQSxFQUFBUCxHQUFBLElBQUFNLEVBQUFDLFVBQ0FKLElBQ0FGLEtBQUFDLGVBQUFELEtBQUFHLGFBQUFKLEVBQUEsRUFDQUYsRUFBQVUsb0JBR0E5RSxFQUFBK0IsVUFBQW9DLFFBQUEsU0FBQUMsR0FFQSxHQURBdkMsUUFBQUMsSUFBQXNDLEVBQUFDLFNBQ0FELEVBQUFXLFFBQUEsQ0FDQSxPQUFBWCxFQUFBQyxTQUVBLElBQUEsSUFDQTNDLE1BQ0EsTUFFQSxLQUFBLElBQ0FuQixlQUNBLE1BQ0EsS0FBQSxJQUNBTyxtQkFHQXNELEVBQUFVIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciB0b2FzdCA9IE1hdGVyaWFsaXplLnRvYXN0O1xudmFyIHByZXZpZXcgPSBmYWxzZTtcbnZhciBsYXN0Q29udGVudCA9IFwiXCI7XG52YXIgd2FpdEZvckNvbnZlcnQgPSBmYWxzZTtcbnZhciBlZGl0ZXVyO1xuXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcbiAgJCgnLm1vZGFsLXRyaWdnZXInKS5sZWFuTW9kYWwoKTtcbiAgJCgnLmxpbmstJyArIGlkKS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gIHRvTWFya2Rvd24oKTtcblxuICAvLyBJbml0aWFsaXNhaW9uIGRlIGwnw6lkaXRldXJcbiAgZWRpdGV1ciA9IENvZGVNaXJyb3IuZnJvbVRleHRBcmVhKCQoXCJ0ZXh0YXJlYVwiKVswXSk7XG4gIGVkaXRldXIub24oXCJjaGFuZ2VcIiwgdG9NYXJrZG93bik7XG5cbiAgLy8gU2F1dmVnYXJkZSBhdXRvbWF0aXF1ZSB0b3V0ZXMgbGVzIG1pbnV0ZXNcbiAgd2luZG93LnNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuICAgIGlmICgkKCcjdGl0bGUnKS52YWwoKSAhPT0gXCJcIiAmJiAkKCcjY29udGVudCcpLnZhbCgpICE9PSBcIlwiKVxuICAgICAgc2VuZCgpO1xuICB9LCA2MDAwMCk7XG59KTtcblxuZnVuY3Rpb24gdG9NYXJrZG93bigpIHtcbiAgaWYgKHByZXZpZXcpIHtcbiAgICB2YXIgY2hhckNvdW50ID0gZWRpdGV1ci5nZXRWYWx1ZSgpLmxlbmd0aDtcbiAgICBpZiAoY2hhckNvdW50IDwgMTAwMDApIG1kKCk7XG4gICAgZWxzZSBpZiAoIXdhaXRGb3JDb252ZXJ0KSB7XG4gICAgICB3YWl0Rm9yQ29udmVydCA9IHRydWU7XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICB3YWl0Rm9yQ29udmVydCA9IGZhbHNlO1xuICAgICAgICBtZCgpO1xuICAgICAgfSwgMTUwMCk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIG1kKCkge1xuICB2YXIgdGl0cmUgPSBcIlwiO1xuICBpZiAoJCgnI3RpdGxlJykudmFsKCkgIT09IFwiXCIpIHRpdHJlID0gXCIjIFwiICsgJCgnI3RpdGxlJykudmFsKCkgKyBcIlxcblwiO1xuICB2YXIgY29udGVudCA9IHRpdHJlICsgZWRpdGV1ci5nZXRWYWx1ZSgpO1xuICAvL2NvbnRlbnQgPSBjb250ZW50LnJlcGxhY2UoLyg8KFtePl0rKT4pL2lnLCBcIlwiKTtcbiAgY29udGVudCA9IGNvbnRlbnQucmVwbGFjZSgvKDxzY3JpcHQ+KS9pZywgXCJbSmF2YXNjcmlwdF1cXG5cIik7XG4gIGNvbnRlbnQgPSBjb250ZW50LnJlcGxhY2UoLyg8XFwvc2NyaXB0PikvaWcsIFwiXFxuWy9KYXZhc2NyaXB0XVwiKTtcbiAgdmFyIG1kQ29udGVudCA9IG1hcmtlZChjb250ZW50KTtcbiAgJChcIiN2aWV3XCIpLmh0bWwobWRDb250ZW50KTtcbn1cblxuZnVuY3Rpb24gdG9nZ2xlUHJldmlldygpIHtcbiAgaWYgKHByZXZpZXcpIHtcbiAgICAkKCcjZWRpdG9yJykuYWRkQ2xhc3MoJ20xMicpLnJlbW92ZUNsYXNzKCdtNicpO1xuICAgICQoJyN2aWV3JykuaGlkZSgpO1xuICAgICQoXCIuZmEtZXllLXNsYXNoXCIpLnJlbW92ZUNsYXNzKCdmYS1leWUtc2xhc2gnKS5hZGRDbGFzcygnZmEtZXllJyk7XG5cbiAgfSBlbHNlIHtcbiAgICAkKCcjZWRpdG9yJykuYWRkQ2xhc3MoJ202JykucmVtb3ZlQ2xhc3MoJ20xMicpO1xuICAgICQoJyN2aWV3Jykuc2hvdygpO1xuICAgICQoXCIuZmEtZXllXCIpLnJlbW92ZUNsYXNzKCdmYS1leWUnKS5hZGRDbGFzcygnZmEtZXllLXNsYXNoJyk7XG4gICAgbWQoKTtcbiAgfVxuICBwcmV2aWV3ID0gIXByZXZpZXc7XG59XG5cbmZ1bmN0aW9uIHRvZ2dsZU51bWJlcmVkVGl0bGVzKCkge1xuICAkKFwiI3ZpZXdcIikudG9nZ2xlQ2xhc3MoJ251bWJlcmVkLXZpZXcnKTtcbn1cblxuZnVuY3Rpb24gdG9nZ2xlRnVsbHNjcmVlbigpIHtcbiAgaWYgKGVkaXRldXIuZ2V0T3B0aW9uKFwiZnVsbFNjcmVlblwiKSlcbiAgICBlZGl0ZXVyLnNldE9wdGlvbihcImZ1bGxTY3JlZW5cIiwgZmFsc2UpO1xuICBlbHNlIGVkaXRldXIuc2V0T3B0aW9uKFwiZnVsbFNjcmVlblwiLCB0cnVlKTtcbiAgJCgnLmJ0bi1mdWxsc2NyZWVuLWRpc2FibGUnKS50b2dnbGVDbGFzcygnaGlkZScpO1xufVxuXG5mdW5jdGlvbiBwYXJhbWV0ZXJzKCkge1xuICBpZiAoJChcIiNtb2RhbC1wYXJhbWV0ZXJzXCIpLmNzcygnZGlzcGxheScpID09IFwibm9uZVwiKVxuICAgICQoJyNtb2RhbC1wYXJhbWV0ZXJzJykub3Blbk1vZGFsKCk7XG4gIGVsc2UgJCgnI21vZGFsLXBhcmFtZXRlcnMnKS5jbG9zZU1vZGFsKCk7XG59XG5cbmZ1bmN0aW9uIGdldFRhZ3MoKSB7XG4gIHZhciB0YWdzU3RyaW5nID0gJChcIiN0YWdzXCIpLnZhbCgpO1xuICB2YXIgdGFncyA9IHRhZ3NTdHJpbmcuc3BsaXQoL1ssO10gKi8pO1xuICByZXR1cm4gdGFncy5qb2luKCcsICcpO1xufVxuXG4vL0dlc3Rpb24gZGVzIHRvdWNoZXMgY2xhdmllcnMgc3DDqWNpYWxlc1xuJChcInRleHRhcmVhXCIpLmtleWRvd24oZnVuY3Rpb24oZSkge1xuICAvLyBUYWJ1bGF0aW9uIGRhbnMgbCfDqWRpdGV1clxuICBpZiAoZS5rZXlDb2RlID09PSA5KSB7XG4gICAgdmFyIHN0YXJ0ID0gdGhpcy5zZWxlY3Rpb25TdGFydDtcbiAgICB2YXIgZW5kID0gdGhpcy5zZWxlY3Rpb25FbmQ7XG4gICAgdmFyICR0aGlzID0gJCh0aGlzKTtcbiAgICB2YXIgdmFsdWUgPSAkdGhpcy52YWwoKTtcbiAgICAkdGhpcy52YWwodmFsdWUuc3Vic3RyaW5nKDAsIHN0YXJ0KSArIFwiXFx0XCIgKyB2YWx1ZS5zdWJzdHJpbmcoXG4gICAgICBlbmQpKTtcbiAgICB0aGlzLnNlbGVjdGlvblN0YXJ0ID0gdGhpcy5zZWxlY3Rpb25FbmQgPSBzdGFydCArIDE7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICB9XG59KTtcbiQoZG9jdW1lbnQpLmtleWRvd24oZnVuY3Rpb24oZSkge1xuICBjb25zb2xlLmxvZyhlLmtleUNvZGUpO1xuICBpZiAoZS5jdHJsS2V5KSB7XG4gICAgc3dpdGNoIChlLmtleUNvZGUpIHtcbiAgICAgIC8vQ1RSTCtTIDogU2F1dmVnYXJkZSBtYW51ZWxsZVxuICAgICAgY2FzZSA4MzpcbiAgICAgICAgc2VuZCgpO1xuICAgICAgICBicmVhaztcbiAgICAgICAgLy9DVFJMK08gOiBUb2dnbGUgUHJldmlld1xuICAgICAgY2FzZSA3OTpcbiAgICAgICAgdG9nZ2xlUHJldmlldygpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgODA6XG4gICAgICAgIHRvZ2dsZUZ1bGxzY3JlZW4oKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgfVxufSk7XG4iLCJmdW5jdGlvbiBzZW5kKCkge1xuICAgIGlmIChlZGl0ZXVyLmdldFZhbHVlKCkgIT0gbGFzdENvbnRlbnQgfHwgZm9yY2VTYXZlKVxuICAgICAgICBpZiAoJCgnI3RpdGxlJykudmFsKCkgIT09IFwiXCIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU2F1dmVnYXJkZVwiKTtcbiAgICAgICAgICAgIHZhciBwYXJhbWV0ZXJzID0ge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50OiB7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiAkKCcjdGl0bGUnKS52YWwoKSxcbiAgICAgICAgICAgICAgICAgICAgY29udGVudDogZWRpdGV1ci5nZXRWYWx1ZSgpLFxuICAgICAgICAgICAgICAgICAgICB0YWdzOiBnZXRUYWdzKCksXG4gICAgICAgICAgICAgICAgICAgIHVzZXJuYW1lOiAkKCcjdXNlcm5hbWUnKS52YWwoKSxcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dDogJCgnI2NvbnRleHQnKS52YWwoKSxcbiAgICAgICAgICAgICAgICAgICAgdG9jOiAkKCcjdG9jJykuaXMoJzpjaGVja2VkJykgfHwgZmFsc2VcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaWYgKGlkICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgcGFyYW1ldGVycy5faWQgPSBpZDtcbiAgICAgICAgICAgICAgICAkKCcubGluay0nICsgaWQgKyBcIiAuZG9jLXRpdGxlXCIpLnRleHQocGFyYW1ldGVycy5kb2N1bWVudC50aXRsZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAkLnBvc3QoXCIvYXBpXCIsIHBhcmFtZXRlcnMsIGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgICAgICBpZiAoZGF0YSAmJiAhZGF0YS5oYXNPd25Qcm9wZXJ0eSgnZXJyb3InKSkge1xuICAgICAgICAgICAgICAgICAgICBpZCA9IGRhdGEuaWQ7XG4gICAgICAgICAgICAgICAgICAgIHRvYXN0KGRhdGEubWVzc2FnZSwgMjAwMCk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBub3cgPSBuZXcgRGF0ZSgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0ZSA9IG5vdy5nZXRIb3VycygpICsgXCI6XCIgKyBub3cuZ2V0TWludXRlcygpO1xuICAgICAgICAgICAgICAgICAgICAkKFwiI2xhc3Qtc2F2ZVwiKS50ZXh0KFwiRGVybmnDqHJlIHNhdXZlZ2FyZGUgw6AgXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgZGF0ZSk7XG4gICAgICAgICAgICAgICAgICAgIGxhc3RDb250ZW50ID0gcGFyYW1ldGVycy5kb2N1bWVudC5jb250ZW50O1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5yZWRpcmVjdFRvRWRpdCkgd2luZG93LmxvY2F0aW9uLmhyZWYgPVxuICAgICAgICAgICAgICAgICAgICAgICAgJy8nICsgaWQ7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHRvYXN0KFwiUHJvYmzDqG1lIHNlcnZldXIuIERvY3VtZW50IG5vbiBzYXV2w6kuXCIsMjAwMCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHRvYXN0KFwiUGFzIGRlIHRpdHJlLiBEb2N1bWVudCBub24gc2F1dsOpXCIsIDIwMDApO1xufVxuXG5mdW5jdGlvbiBkZWwoKSB7XG4gICAgaWYgKGlkICE9PSAwKVxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBcIi9hcGkvXCIgKyBpZCxcbiAgICAgICAgICAgIHR5cGU6IFwiREVMRVRFXCIsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnLyc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIGVsc2UgdG9hc3QoXCJEb2N1bWVudCBub24gc2F1dsOpXCIsIDIwMDApO1xufVxuXG5mdW5jdGlvbiBuZXdEb2N1bWVudCgpIHtcbiAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvJztcbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==