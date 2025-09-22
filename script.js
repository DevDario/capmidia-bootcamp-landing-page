document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
      });
    }
  });
});

window.addEventListener("scroll", function () {
  const header = document.querySelector(".header");
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

function setupSlider(sliderId) {
  const container = document.getElementById(sliderId);
  if (!container) return;

  const wrapper = container.querySelector(".slider-wrapper");
  const leftArrow = container.querySelector(".left-arrow");
  const rightArrow = container.querySelector(".right-arrow");
  const items = container.querySelectorAll(".slider-item");
  let currentIndex = 0;

  const updateSlider = () => {
    wrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
  };

  leftArrow.addEventListener("click", () => {
    currentIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
    updateSlider();
  });

  rightArrow.addEventListener("click", () => {
    currentIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
    updateSlider();
  });
}

setupSlider("work-slider");
