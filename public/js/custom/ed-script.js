/* Obtenir les éléments par leur identifiant. */
const Employeur = document.getElementById("Sonatrach"); // id optgroup in Employeur select
const actSelect = document.getElementById("act"); // id in Act select
const ms = document.getElementById("RetCheck"); // radio button Médecines de soins
const tp = document.getElementById("AgentCheck"); // radio button Tiers payant
const smc = document.getElementById("smc"); // id in Structure médicale conventionnée souhaitée

/* type de radio button est clicke */
let typeRadio;

/* Il récupère les données d'acts  du serveur et les stocke dans la variable tpActs. */
/* Et filter code et designation d'acts dans la variable tpActDes*/
let tpActs, tpActsDes;
console.log("fetching ACT... ");
$.ajax({
  url: "https://localhost:3030/ACT",
  type: "GET",
  dataType: "json", // added data type
  success: function (res) {
    console.log("ACT fetched successfully");
    tpActs = res.data;
    const actsNames = tpActs.map((act) => {
      let DÉSIGNATION = act.DÉSIGNATION;
      let CODE = act.CODE;
      return { DÉSIGNATION, CODE };
    });
    // deleting duplicates in actsNames array.
    tpActsDes = [...new Set(actsNames)];
  },
  error: function (jqXHR, textStatus, errorThrown) {
    console.log(jqXHR);
    console.log(textStatus);
    console.log(errorThrown);
  },
});

/* 
  C'est une fonction qui récupère les données de Structures SH
  du serveur et les ajoute au DOM. 
*/
console.log("fetching SH... ");
$.ajax({
  url: "https://localhost:3030/sh",
  type: "GET",
  dataType: "json",
  success: function (res) {
    console.log("S fetched successfully");
    shs = res.data;
    shs.forEach(function (sh) {
      let option = document.createElement("option");
      option.dataset.tokens = sh.CODE;
      option.value = sh.STRUCTURE;
      option.innerHTML = sh.STRUCTURE;
      Employeur.appendChild(option);
    });
  },
  error: function (jqXHR, textStatus, errorThrown) {
    console.log(jqXHR);
    console.log(textStatus);
    console.log(errorThrown);
  },
});

let smtActs, smtActsFiltred;
// structures Médecine du travail
console.log("fetching SMT...");
$.ajax({
  url: "https://localhost:3030/SMT",
  type: "GET",
  dataType: "json", // added data type
  success: function (res) {
    console.log("SMT fetched successfully");
    acts = res.data;
    // filtering acts name in new array.
    const actsNames = acts.map((act) => act.ACTES);
    // deleting duplicates in actsNames array.
    smtActsFiltred = [...new Set(actsNames)];

    // refresh the selectpicker to apply new changes.
    $("#act").selectpicker("refresh");
  },
  error: function (jqXHR, textStatus, errorThrown) {
    console.log(jqXHR);
    console.log(textStatus);
    console.log(errorThrown);
  },
});

// Tiers payant clicked
tp.addEventListener("click", function (e) {
  typeRadio = "tp";
  // clearing old values
  actSelect.innerHTML = "";

  tpActsDes.forEach(function (act) {
    let option = document.createElement("option");
    option.dataset.tokens = act.CODE;
    option.value = act.DÉSIGNATION;
    option.innerHTML = act.DÉSIGNATION;
    actSelect.appendChild(option);
  });
  // refresh the selectpicker to apply new changes.
  $("#act").selectpicker("refresh");
});

// Médecines de soins clicked
ms.addEventListener("click", function (e) {
  typeRadio = "ms";
  // clearing old values.
  actSelect.innerHTML = "";
  console.log("Médecines de soins clicked");
  // looping each unique act and creating new option element.
  smtActsFiltred.forEach(function (act) {
    let option = document.createElement("option");
    option.value = act;
    option.innerHTML = act;
    actSelect.appendChild(option);
  });
  $("#act").selectpicker("refresh");
});

// getting value selected using select-bootstrap.
$(".selectpicker").on("changed.bs.select", function (e) {
  console.log(e.target.id);
  // if act selected
  if (e.target.id == "act") {
    /* 
          fetching only the value appropriate to the selected element and filter the undefined
          values.
        */
    switch (typeRadio) {
      case "tp": // quand l'utilsateur select Tiers payant.
        break;
      case "ms": // quand l'utilsateur select Médecines de soins
        let selectedActs = acts
          .map((act) => {
            if (act.ACTES == e.target.value) return act.STRUCTURES;
          })
          .filter((act) => {
            return act !== undefined;
          });
        // clearing old values.
        while (smc.firstChild) {
          smc.removeChild(smc.lastChild);
        }
        // adding this value now to the structure select area.
        selectedActs.forEach((act) => {
          let option = document.createElement("option");
          option.value = act;
          option.innerHTML = act;
          smc.appendChild(option);
        });
        // refresh the selectpicker to apply new changes.
        $("#smc").selectpicker("refresh");
        break;
    }
  }
});

function remove(ele) {
  ele.parentElement.style.display = "none";
  console.log(ele);
}
