const URL = "http://localhost:3031";
/* Réglage de la largeur du selectpicker à 400px. */
$.fn.selectpicker.Constructor.DEFAULTS.width = "400px";
ayantDroit = $("#ayantDroit");
adherent = $("#adherent");
ayantDroitArea = $("#ayantDroitArea");
type = $("#type");
typeMethode = $("#typeMethode");
code = $("#code");
codeMethode = $("#codeMethode");
structure = $("#structure");
Employeur = $("#Employeur");
structure_select = $("#structure_select");
$(document).ready(function () {
  /* Un appel ajax au serveur pour obtenir les structures. ================== */
  $.ajax({
    url: `${URL}/get/structure`,
    success: function (data) {
      /* Vider l'élément de sélection. */
      Employeur.empty();
      /* Une fonction jQuery qui itère sur un tableau d'objets. */
      $.each(data, function (i, item) {
        /* Créer un élément d'option et l'ajouter à l'élément de sélection. */
        Employeur.append(
          $("<option>", {
            value: item.structure_id,
            text: item.structure_libelle,
          }).attr("data-tokens", item.code_mnémonique)
        );
      });
      /* Actualisation du sélecteur de sélection. */
      Employeur.selectpicker("refresh");
    },
    error: function (error) {
      alert("There was an error. ", error);
    },
  });
  /* ======================================================================== */
  /* Un appel ajax au serveur pour obtenir les type d'act. ================== */
  $.ajax({
    url: `${URL}/get/act`,
    success: function (data) {
      /* Vider l'élément de sélection. */
      typeMethode.empty();
      /* Une fonction jQuery qui itère sur un tableau d'objets. */
      $.each(data, function (i, item) {
        /* Créer un élément d'option et l'ajouter à l'élément de sélection. */
        typeMethode.append(
          $("<option>", {
            value: item,
            text: item,
          })
        );
      });
      /* Actualisation du sélecteur de sélection. */
      typeMethode.selectpicker("refresh");
    },
    error: function (error) {
      alert("There was an error. ", error);
    },
  });
  /* ======================================================================== */

  typeMethode.on(
    "changed.bs.select",
    function (e, clickedIndex, isSelected, previousValue) {
      $.ajax({
        url: `${URL}/get/structure/tp/${e.target.value}`,
        success: function (data) {
          structure_select.empty();
          $.each(data, function (i, item) {
            structure_select.append(
              $("<option>", {
                value: item,
                text: item,
              })
            );
          });
          structure_select.selectpicker("refresh");
        },
      });
    }
  );

  ayantDroit.on("click", () => {
    $("#benLastName").prop("required", true);
    $("#benFirstName").prop("required", true);
    $("#lienParentie").prop("required", true);
    $("#date").prop("required", true);

    ayantDroitArea.show();
  });

  adherent.on("click", () => {
    $("#benLastName").prop("required", false);
    $("#benFirstName").prop("required", false);
    $("#lienParentie").prop("required", false);
    $("#date").prop("required", false);

    ayantDroitArea.hide();
  });

  type.on("click", () => {
    $("#codeInput").prop("required", false);
    typeMethode.prop("required", true);

    typeMethode.selectpicker("show");
    structure.css("margin-top", "20px");
    codeMethode.hide();
  });

  code.on("click", () => {
    $("#codeInput").prop("required", true);
    typeMethode.prop("required", false);

    typeMethode.selectpicker("hide");
    structure.css("margin-top", "35px");
    codeMethode.show();

    structure_select.empty();
    structure_select.selectpicker("refresh");
  });

  codeMethode.on("input", (evt) => {
    if (evt.target.value.length == 13) {
      $.ajax({
        url: `${URL}/get/act/${evt.target.value}`,
        success: function (data) {
          structure_select.empty();
          structure_select.append(
            $("<option>", {
              value: data,
              text: data,
            })
          );
          structure_select.selectpicker("refresh");

          structure_select.selectpicker("val", data);
          $("#codeMessage").remove();
          codeMethode.append(
            `<b id='codeMessage' style ='color : green !important;'>
               Vous avez saisi le bon code :)
            </b>`
          );
        },
        error: (error) => {
          console.log("error " + error);
          codeMethode.effect("shake", { times: 2 }, 1000);
          $("#codeMessage").remove();
          codeMethode.append(
            `<b id='codeMessage' style ='color : red !important;'>
               Vous avez saisi le mauvais code :(
            </b>`
          );
        },
      });
    } else {
      $("#codeMessage").remove();
    }
  });

  // validating email and telephone numbers

  let isEmailValid = false;
  let isMobilePhoneValid = false;
  const email = $("#email");
  const tele = $("#tele");

  email.on("change", (evt) => {
    if (!validator.isEmail(evt.target.value, ["ar-DZ", "fr-FR"])) {
      $("#emailMessage").remove();
      $("#emailWarp").append(
        `<b id='emailMessage' style ='color : red !important;'>
          Votre email est incorrect :(
        </b>`
      );
      isEmailValid = false;
    } else {
      $("#emailMessage").remove();
      isEmailValid = true;
    }
  });

  tele.on("change", (evt) => {
    if (!validator.isMobilePhone(evt.target.value, ["ar-DZ", "fr-FR"])) {
      $("#teleMessage").remove();
      $("#teleWarp").append(
        `<b id='teleMessage' style ='color : red !important;'>
          Votre numero de telephone est incorrect :(
        </b>`
      );
      isMobilePhoneValid = false;
    } else {
      $("#teleMessage").remove();
      isMobilePhoneValid = true;
    }
  });
});
