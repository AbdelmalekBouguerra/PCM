AOS.init({
  duration: 800,
  easing: "slide",
});

(function ($) {
  "use strict";

  $(window).stellar({
    responsive: true,
    parallaxBackgrounds: true,
    parallaxElements: true,
    horizontalScrolling: false,
    hideDistantElements: false,
    scrollProperty: "scroll",
    horizontalOffset: 0,
    verticalOffset: 0,
  });

  var fullHeight = function () {
    $(".js-fullheight").css("height", $(window).height());
    $(window).resize(function () {
      $(".js-fullheight").css("height", $(window).height());
    });
  };
  fullHeight();

  // loader
  var loader = function () {
    setTimeout(function () {
      if ($("#ftco-loader").length > 0) {
        $("#ftco-loader").removeClass("show");
      }
    }, 1);
  };
  loader();

  // Scrollax
  $.Scrollax();

  var carousel = function () {
    $(".home-slider").owlCarousel({
      loop: true,
      autoplay: true,
      margin: 0,
      animateOut: "fadeOut",
      animateIn: "fadeIn",
      nav: false,
      autoplayHoverPause: true,
      items: 1,
      navText: [
        "<span class='ion-md-arrow-back'></span>",
        "<span class='ion-chevron-right'></span>",
      ],
      responsive: {
        0: {
          items: 1,
          nav: false,
        },
        600: {
          items: 1,
          nav: false,
        },
        1000: {
          items: 1,
          nav: false,
        },
      },
    });
    $(".page-slider").owlCarousel({
      loop: true,
      autoplay: true,
      margin: 0,
      animateOut: "fadeOut",
      animateIn: "fadeIn",
      nav: false,
      autoplayHoverPause: true,
      items: 1,
      navText: [
        "<span class='ion-md-arrow-back'></span>",
        "<span class='ion-chevron-right'></span>",
      ],
      responsive: {
        0: {
          items: 1,
          nav: false,
        },
        600: {
          items: 1,
          nav: false,
        },
        1000: {
          items: 1,
          nav: false,
        },
      },
    });

    $(".carousel-testimony").owlCarousel({
      center: true,
      loop: true,
      items: 1,
      margin: 30,
      stagePadding: 0,
      nav: true,
      navText: [
        '<span class="ion-ios-arrow-back">',
        '<span class="ion-ios-arrow-forward">',
      ],
      responsive: {
        0: {
          items: 1,
        },
        600: {
          items: 1,
        },
        1000: {
          items: 1,
        },
      },
    });
  };
  carousel();

  $("nav .dropdown").hover(
    function () {
      var $this = $(this);
      // 	 timer;
      // clearTimeout(timer);
      $this.addClass("show");
      $this.find("> a").attr("aria-expanded", true);
      // $this.find('.dropdown-menu').addClass('animated-fast fadeInUp show');
      $this.find(".dropdown-menu").addClass("show");
    },
    function () {
      var $this = $(this);
      // timer;
      // timer = setTimeout(function(){
      $this.removeClass("show");
      $this.find("> a").attr("aria-expanded", false);
      // $this.find('.dropdown-menu').removeClass('animated-fast fadeInUp show');
      $this.find(".dropdown-menu").removeClass("show");
      // }, 100);
    }
  );

  $("#dropdown04").on("show.bs.dropdown", function () {
    console.log("show");
  });

  // scroll
  var scrollWindow = function () {
    $(window).scroll(function () {
      var $w = $(this),
        st = $w.scrollTop(),
        navbar = $(".ftco_navbar"),
        sd = $(".js-scroll-wrap");

      if (st > 800) {
        if (!navbar.hasClass("scrolled")) {
          navbar.addClass("scrolled");
        }
      }
      if (st < 150) {
        if (navbar.hasClass("scrolled")) {
          navbar.removeClass("scrolled sleep");
        }
      }
      if (st > 350) {
        if (!navbar.hasClass("awake")) {
          navbar.addClass("awake");
        }

        if (sd.length > 0) {
          sd.addClass("sleep");
        }
      }
      if (st < 350) {
        if (navbar.hasClass("awake")) {
          navbar.removeClass("awake");
          navbar.addClass("sleep");
        }
        if (sd.length > 0) {
          sd.removeClass("sleep");
        }
      }
    });
  };
  scrollWindow();

  var counter = function () {
    $("#section-counter").waypoint(
      function (direction) {
        if (
          direction === "down" &&
          !$(this.element).hasClass("ftco-animated")
        ) {
          var comma_separator_number_step =
            $.animateNumber.numberStepFactories.separator(",");
          $(".number").each(function () {
            var $this = $(this),
              num = $this.data("number");
            console.log(num);
            $this.animateNumber(
              {
                number: num,
                numberStep: comma_separator_number_step,
              },
              7000
            );
          });
        }
      },
      {
        offset: "95%",
      }
    );
  };
  counter();

  var contentWayPoint = function () {
    var i = 0;
    $(".ftco-animate").waypoint(
      function (direction) {
        if (
          direction === "down" &&
          !$(this.element).hasClass("ftco-animated")
        ) {
          i++;

          $(this.element).addClass("item-animate");
          setTimeout(function () {
            $("body .ftco-animate.item-animate").each(function (k) {
              var el = $(this);
              setTimeout(
                function () {
                  var effect = el.data("animate-effect");
                  if (effect === "fadeIn") {
                    el.addClass("fadeIn ftco-animated");
                  } else if (effect === "fadeInLeft") {
                    el.addClass("fadeInLeft ftco-animated");
                  } else if (effect === "fadeInRight") {
                    el.addClass("fadeInRight ftco-animated");
                  } else {
                    el.addClass("fadeInUp ftco-animated");
                  }
                  el.removeClass("item-animate");
                },
                k * 50,
                "easeInOutExpo"
              );
            });
          }, 100);
        }
      },
      {
        offset: "95%",
      }
    );
  };
  contentWayPoint();

  // navigation
  var OnePageNav = function () {
    $(".smoothscroll[href^='#'], #ftco-nav ul li a[href^='#']").on(
      "click",
      function (e) {
        e.preventDefault();

        var hash = this.hash,
          navToggler = $(".navbar-toggler");
        $("html, body").animate(
          {
            scrollTop: $(hash).offset().top,
          },
          700,
          "easeInOutExpo",
          function () {
            window.location.hash = hash;
          }
        );

        if (navToggler.is(":visible")) {
          navToggler.click();
        }
      }
    );
    $("body").on("activate.bs.scrollspy", function () {
      console.log("nice");
    });
  };
  OnePageNav();

  // magnific popup
  $(".image-popup").magnificPopup({
    type: "image",
    closeOnContentClick: true,
    closeBtnInside: false,
    fixedContentPos: true,
    mainClass: "mfp-no-margins mfp-with-zoom", // class to remove default margin from left and right side
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0, 1], // Will preload 0 - before current, and 1 after the current image
    },
    image: {
      verticalFit: true,
    },
    zoom: {
      enabled: true,
      duration: 300, // don't foget to change the duration also in CSS
    },
  });

  $(".popup-youtube, .popup-vimeo, .popup-gmaps").magnificPopup({
    disableOn: 700,
    type: "iframe",
    mainClass: "mfp-fade",
    removalDelay: 160,
    preloader: false,

    fixedContentPos: false,
  });

  $(".appointment_date").datepicker({
    format: "dd/mm/yyyy",
    autoclose: false,
  });
  $(".appointment_time").timepicker();
})(jQuery);

$(".btn").click(function () {
  $(".input").toggleClass("active").focus;
  $(this).toggleClass("animate");
  $(".input").val("");
});

// //this script to only check one checkbox
// function myFun(checkbox) {
//   var checkboxes = document.getElementsByName("typeDemande");
//   checkboxes.forEach((item) => {
//     if (item !== checkbox) item.checked = false;
//   });
// }

// function myFun2(checkbox) {
//   var checkboxes = document.getElementsByName("bene");
//   checkboxes.forEach((item) => {
//     if (item !== checkbox) item.checked = false;
//   });
// }

// function myFun3(checkbox) {
//   var checkboxes = document.getElementsByName("statuAdh");
//   checkboxes.forEach((item) => {
//     if (item !== checkbox) item.checked = false;
//   });
// }

// // Copying value from one input field to another input field

// var benFirstName, benLastName;

// function copyTextValue() {
//   if (document.getElementById("check1").checked) {
//     benLastName = document.getElementById("benLastName").value;
//     benFirstName = document.getElementById("benFirstName").value;
//     let Agentlastname = document.getElementById("Agentlastname").value;
//     let Agentfirstname = document.getElementById("Agentfirstname").value;

//     document.getElementById("benLastName").value = Agentlastname;
//     document.getElementById("benFirstName").value = Agentfirstname;
//     document.getElementById("date").type = "text";
//     document.getElementById("date").value = "pas besoin";
//     document.getElementById("benLastName").disabled = true;
//     document.getElementById("benFirstName").disabled = true;
//     document.getElementById("date").disabled = true;
//   } else {
//     document.getElementById("benLastName").value = benLastName;
//     document.getElementById("benFirstName").value = benFirstName;

//     document.getElementById("benLastName").disabled = false;
//     document.getElementById("benFirstName").disabled = false;

//     document.getElementById("date").disabled = false;
//     document.getElementById("date").type = "date";

//     document.getElementById("lienParentie").disabled = false;
//   }
// }

// function getLastTextValue() {
//   if (document.getElementById("check2").checked) {
//     document.getElementById("benLastName").value = benLastName;
//     document.getElementById("benFirstName").value = benFirstName;

//     document.getElementById("benLastName").disabled = false;
//     document.getElementById("benFirstName").disabled = false;

//     document.getElementById("date").disabled = false;
//     document.getElementById("date").type = "date";
//   }
// }

// // this function will validate the DPC forum before sending.
// function validateForm() {
//   // declaring booleans to determine where is the invalid information
//   var statuAdhState = false,
//     typeDemandeState = false,
// 	beneState = false;

//   // getting the elements
//   var statuAdh = document.getElementsByName("statuAdh");
//   var typeDemande = document.getElementsByName("typeDemande");
//   var bene = document.getElementsByName("bene");
//   // checking if one of the at least get checked
//   statuAdh.forEach((item) => {
//     if (item.checked) statuAdhState = true;
//   });
//   typeDemande.forEach((item) => {
//     if (item.checked) typeDemandeState = true;
//   });
//   bene.forEach((item) => {
//     if (item.checked)  beneState = true;
//   });

// }
