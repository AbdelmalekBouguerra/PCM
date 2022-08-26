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
TiersPayant = $("#TiersPayant");
MedecinesDeSoins = $("#MedecinesDeSoins");
PrisesEnCharge100 = $("#PrisesEnCharge100");
rendevouCMS = $("#rendevouCMS");
medecinsDeSoinsWrapper = $("#medecinsDeSoinsWrapper");
tpWrapper = $("#tpWrapper");
specialite = $("#specialite");
wilaya = $("#wilaya");
medecin = $("#medecin");

cmsWrapper = $("#cmsWrapper");
cmsSpecialite = $("#cmsSpecialite");
cms = $("#cms");
let isEmailValid = false;
let isMobilePhoneValid = false;
let specialiteSelected;

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
      console.log("There was an error. ", error);
    },
  });
  /* ======================================================================== */
  /* Un appel ajax au serveur pour obtenir les type d'act. ================== */

  /* ======================================================================== */

  typeMethode.on(
    "changed.bs.select",
    function (e, clickedIndex, isSelected, previousValue) {
      let getURL;
      if (TiersPayant.is(":checked"))
        getURL = `${URL}/get/structure/tp/${e.target.value}`;
      else if (PrisesEnCharge100.is(":checked"))
        getURL = `${URL}/get/structure/mt/${e.target.value}`;
      $.ajax({
        url: getURL,
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

  type.on("click", () => displayType());

  code.on("click", () => displayCode());

  codeMethode.on("input", (evt) => {
    structure_select.empty();
    structure_select.selectpicker("refresh");
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
          structure_select.empty();
          structure_select.selectpicker("refresh");
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

  TiersPayant.on("change", (evt) => {
    tpWrapper.show();
    medecinsDeSoinsWrapper.hide();
    cmsWrapper.hide();
    $("#codeWrapper").show(200);
    $("#veuveWrapper").show(200);
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
        console.log("There was an error. ", error);
      },
    });
  });

  PrisesEnCharge100.on("change", (evt) => {
    tpWrapper.show();
    medecinsDeSoinsWrapper.hide();
    cmsWrapper.hide();
    $("#codeWrapper").hide(200);
    $("#veuveWrapper").hide(200);
    type.prop("checked", true);
    displayType();

    $.ajax({
      url: `${URL}/get/structure/medecinTravailAct`,
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
      error: function (error) {},
    });
  });

  rendevouCMS.on("change", (evt) => {
    tpWrapper.hide();
    medecinsDeSoinsWrapper.hide();
    cmsWrapper.show();
    $("#codeWrapper").hide(200);
    $("#veuveWrapper").hide(200);
    $.ajax({
      url: `${URL}/get/cms/specialites`,
      success: function (data) {
        /* Vider l'élément de sélection. */
        cmsSpecialite.empty();
        /* Une fonction jQuery qui itère sur un tableau d'objets. */
        $.each(data, function (i, item) {
          /* Créer un élément d'option et l'ajouter à l'élément de sélection. */
          cmsSpecialite.append(
            $("<option>", {
              value: item,
              text: item,
            })
          );
        });
        /* Actualisation du sélecteur de sélection. */
        cmsSpecialite.selectpicker("refresh");
      },
      error: function (error) {},
    });
  });

  MedecinesDeSoins.on("change", (evt) => {
    cmsWrapper.hide();
    tpWrapper.hide();
    medecinsDeSoinsWrapper.show();
    $("#codeWrapper").hide(200);
    $("#veuveWrapper").hide(200);
    type.prop("checked", true);
    $.ajax({
      url: `${URL}/get/medecins_conventionnes/specialites`,
      success: function (data) {
        /* Vider l'élément de sélection. */
        specialite.empty();
        /* Une fonction jQuery qui itère sur un tableau d'objets. */
        $.each(data, function (i, item) {
          /* Créer un élément d'option et l'ajouter à l'élément de sélection. */
          specialite.append(
            $("<option>", {
              value: item,
              text: item,
            })
          );
        });
        /* Actualisation du sélecteur de sélection. */
        specialite.selectpicker("refresh");
      },
      error: function (error) {},
    });
  });

  specialite.on(
    "changed.bs.select",
    function (e, clickedIndex, isSelected, previousValue) {
      specialiteSelected = e.target.value;
      $.ajax({
        url: `${URL}/get/medecins_conventionnes/${e.target.value}/wilayas`,
        success: function (data) {
          wilaya.empty();
          $.each(data, function (i, item) {
            wilaya.append(
              $("<option>", {
                value: item,
                text: item,
              })
            );
          });
          wilaya.selectpicker("refresh");
        },
      });
    }
  );

  wilaya.on(
    "changed.bs.select",
    function (e, clickedIndex, isSelected, previousValue) {
      $.ajax({
        url: `${URL}/get/medecins_conventionnes/${specialiteSelected}/${e.target.value}/medecin`,
        success: function (data) {
          medecin.empty();
          $.each(data, function (i, item) {
            medecin.append(
              $("<option>", {
                value: item,
                text: item,
              })
            );
          });
          medecin.selectpicker("refresh");
        },
      });
    }
  );

  cmsSpecialite.on(
    "changed.bs.select",
    function (e, clickedIndex, isSelected, previousValue) {
      $.ajax({
        url: `${URL}/get/cms/${e.target.value}/structure`,
        success: function (data) {
          cms.empty();
          $.each(data, function (i, item) {
            cms.append(
              $("<option>", {
                value: item,
                text: item,
              })
            );
          });
          cms.selectpicker("refresh");
        },
      });
    }
  );
  // form validation
  $(document).on("submit", "#dpcForm", function (e) {
    e.preventDefault();
    if (isMobilePhoneValid && isEmailValid) e.currentTarget.submit();
    else {
      if (!isEmailValid) $("#emailWarp").effect("shake", { times: 2 }, 1000);
      if (!isMobilePhoneValid)
        $("#teleWarp").effect("shake", { times: 2 }, 1000);
    }
  });

  /**
   * Si l'utilisateur sélectionne l'option 'Type', alors le champ de saisie 'Code' n'est pas requis, le
   * champ de saisie 'Type' est requis, le champ de saisie 'Type' est affiché, le champ de saisie
   * 'Structure' est déplacé vers le bas de 20px, et le champ de saisie 'Code' est masqué.
   */
  function displayType() {
    $("#codeInput").prop("required", false);
    typeMethode.prop("required", true);

    typeMethode.selectpicker("show");
    structure.css("margin-top", "20px");
    codeMethode.hide();
  }

  /**
   * Si l'utilisateur sélectionne l'option "code", le champ "codeInput" est obligatoire, le champ
   * "typeMethode" n'est pas obligatoire, le champ "typeMethode" est masqué, le champ "structure" est
   * déplacé vers le bas, et le champ "codeMethode" est montré.
   */
  function displayCode() {
    $("#codeInput").prop("required", true);
    typeMethode.prop("required", false);

    typeMethode.selectpicker("hide");
    structure.css("margin-top", "35px");
    codeMethode.show();

    structure_select.empty();
    structure_select.selectpicker("refresh");
  }

  function displayMedecins() {}
});
