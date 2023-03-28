window.addEventListener("scroll", reveal);

function reveal() {
  let targets = document.querySelectorAll(".reveal");

  for (let target of targets) {
    const windowHeight = window.innerHeight;
    const targetTop = target.getBoundingClientRect().top;
    const REVEAL_POINT = 150;
    if (targetTop < windowHeight - REVEAL_POINT) {
      target.classList.add("pop-in");
    } else {
      target.classList.remove("pop-in");
    }
  }
}

const state = {
  servicesCarouselScroll: 0
  // testimonialsCarouselScroll: 0
};

function computeScrollOffset(
  direction,
  carouselScroll,
  carouselItemWidth,
  carouselScrollWidth
) {
  carouselScroll +=
    direction === "next" ? carouselItemWidth : -carouselItemWidth;

  if (carouselScroll < -carouselItemWidth) {
    carouselScroll = carouselScrollWidth - 1;
  } else if (carouselScroll > carouselScrollWidth) {
    carouselScroll = 0;
  }

  return carouselScroll;
}

function handleCarouselScroll(direction, carouselId, carouselScroll) {
  const carousel = document.getElementById(carouselId);

  carouselScroll = computeScrollOffset(
    direction,
    carouselScroll,
    carousel.firstElementChild.offsetWidth,
    carousel.scrollWidth / 2
  );

  carousel.scrollTo({
    left: carouselScroll,
    top: 0,
    behavior: "smooth"
  });

  return carouselScroll;
}

document
  .getElementById("services-ctrls")
  .addEventListener(
    "pointerdown",
    evnt =>
      (state.servicesCarouselScroll = handleCarouselScroll(
        evnt.target.dataset.dir,
        "srvices",
        state.servicesCarouselScroll
      ))
  );

// Will be used when "Testimonials" section becomes more populated
// document
//   .getElementById("testimonials-ctrls")
//   .addEventListener(
//     "pointerdown",
//     evnt =>
//       (state.testimonialsCarouselScroll = handleCarouselScroll(
//         evnt.target.dataset.dir,
//         "testimonials",
//         state.testimonialsCarouselScroll
//       ))
//   );
