/* ================== MENU SHOW Y HIDDEN ======================= */
const navMenu = document.getElementById("nav-menu"),
  navToogle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close");

/* === TAMPIL MENU  === */
/* validasi jika konstan ada  */
if (navToogle) {
  navToogle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

/* === TUTUP MENU  === */
/* validasi jika konstan ada  */
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

/* ============= REMOVE MENU MOBILE ============ */
const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  //ketika kita mengklik setiap nav__link, kita menghapus kelas show-menu
  navMenu.classList.remove("show-menu");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

/* ================== ACCORDION SKILLS ======================= */
const skillsContent = document.getElementsByClassName("skills__content"),
  skillHeader = document.querySelectorAll(".skills__header");

function toggleSkills() {
  let itemClass = this.parentNode.className;

  for (i = 0; i < skillsContent.length; i++) {
    skillsContent[i].className = "skills__content skills__close";
  }
  if (itemClass === "skills__content skills__close") {
    this.parentNode.className = "skills__content skills__open";
  }
}

skillHeader.forEach((el) => {
  el.addEventListener("click", toggleSkills);
});

/* ================== QUALIFICATION TABS ======================= */
const tabs = document.querySelectorAll("[data-target"),
  tabContents = document.querySelectorAll("[data-content]");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = document.querySelector(tab.dataset.target);

    tabContents.forEach((tabContents) => {
      tabContents.classList.remove("qualification__active");
    });
    target.classList.add("qualification__active");

    tab.forEach((tab) => {
      tab.classList.remove("qualification__active");
    });
    tab.classList.add("qualification__active");
  });
});

/* ================== BLOG MODAL ======================= */
const modalViews = document.querySelectorAll(".blogs__modal"),
  modalBtns = document.querySelectorAll(".blogs__button"),
  modalClose = document.querySelectorAll(".blogs__modal-close");

let modal = function (modalClick) {
  modalViews[modalClick].classList.add("active-modal");
};

modalBtns.forEach((modalBtn, i) => {
  modalBtn.addEventListener("click", () => {
    modal(i);
  });
});

modalClose.forEach((modalClose) => {
  modalClose.addEventListener("click", () => {
    modalViews.forEach((modalView) => {
      modalView.classList.remove("active-modal");
    });
  });
});

/* ================== PORTFOLIO SWIPER ======================= */
let swiperPortfolio = new Swiper(".portfolio__container", {
  cssMode: true,
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  // mousewheel: true,
  // keyboard: true,
});

/* ================== team SWIPER ======================= */
let swiperteam = new Swiper(".team__container", {
  loop: true,
  grabCursor: true,
  spaceBetween: 48,

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },
  breakpoints: {
    568: {
      slidesPerView: 2,
    },
  },
});

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document.querySelector(".nav__menu a[href*=" + sectionId + "]").classList.add("active-link");
    } else {
      document.querySelector(".nav__menu a[href*=" + sectionId + "]").classList.remove("active-link");
    }
  });
}
window.addEventListener("scroll", scrollActive);

/*==================== CHANGE BACKGROUND HEADER ====================*/
function scrollHeader() {
  const nav = document.getElementById("header");
  // When the scroll is greater than 200 viewport height, add the scroll-header class to the header tag
  if (this.scrollY >= 80) nav.classList.add("scroll-header");
  else nav.classList.remove("scroll-header");
}
window.addEventListener("scroll", scrollHeader);

/*==================== SHOW SCROLL UP ====================*/
function scrollUp() {
  const scrollUp = document.getElementById("scroll-up");
  // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
  if (this.scrollY >= 560) scrollUp.classList.add("show-scroll");
  else scrollUp.classList.remove("show-scroll");
}
window.addEventListener("scroll", scrollUp);

/*==================== DARK LIGHT THEME ====================*/
const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "uil-sun";

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => (document.body.classList.contains(darkTheme) ? "dark" : "light");
const getCurrentIcon = () => (themeButton.classList.contains(iconTheme) ? "uil-moon" : "uil-sun");

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](darkTheme);
  themeButton.classList[selectedIcon === "uil-moon" ? "add" : "remove"](iconTheme);
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener("click", () => {
  // Add or remove the dark / icon theme
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  // We save the theme and the current icon that the user chose
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});

/*==================== INPUT CONTACT FORM TO GOOGLE SHEET ====================*/
const scriptURL = "https://script.google.com/macros/s/AKfycbxek2i7LJPNNEyTR-VTxdOYjxKxU0AKzoC2sHZE8wDdoTygEOadbsluT2AdXO3tKo8r/exec";
const form = document.forms["myportfolio-contact-form"];
const btnSend = document.querySelector(".btn-send");
const btnLoading = document.querySelector(".btn-loading");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  // when the sumit button is clicked
  //show loading button, hidden buttom send

  btnSend.classList.toggle("btns-none");
  btnLoading.classList.toggle("btns-none");
  // btnSend.classList.toggle(".btns-none");

  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((response) => {
      //show Send button, hidden button loading
      btnSend.classList.toggle("btns-none");
      btnLoading.classList.toggle("btns-none");

      //show alert
      Swal.fire({
        icon: "success",
        title: "your message was sent successfully",
        type: "success",
      });

      //reset input form
      form.reset();

      console.log("Success!", response);
    })
    .catch((error) => console.error("Error!", error.message));
});

/*==================== ANIMATION AOS ====================*/
const blogsContents = document.querySelectorAll(".blogs__content");

blogsContents.forEach((sca, i) => {
  sca.dataset.aos = "fade-down";
  sca.dataset.aosDelay = i * 100;
  sca.dataset.aosDuration = 1000;
});

AOS.init();
