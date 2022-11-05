$("#search").on("change", (e) => {
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
