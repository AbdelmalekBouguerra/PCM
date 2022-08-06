ayantDroit = $("#ayantDroit");
adherent = $("#adherent");
ayantDroitArea = $("#ayantDroitArea");
type = $("#type");
typeMethode = $("#typeMethode");
code = $("#code");
codeMethode = $("#codeMethode");
structure = $("#structure");

ayantDroit.on("click", () => ayantDroitArea.show());

adherent.on("click", () => ayantDroitArea.hide());

console.log(typeMethode);

type.on("click", () => {
  typeMethode.selectpicker("show");
  structure.css("margin-top", "20px");
  codeMethode.hide();
});

/* Réglage de la largeur du selectpicker à 400px. */
$.fn.selectpicker.Constructor.DEFAULTS.width = "400px";

code.on("click", () => {
  typeMethode.selectpicker("hide");
  structure.css("margin-top", "35px");
  codeMethode.show();
});
