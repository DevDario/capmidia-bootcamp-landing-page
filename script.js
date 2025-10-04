const form = document.getElementById("form")
const video = document.getElementById("hero-video")
const playBtn = document.getElementById("play-btn")


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

const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

document.querySelectorAll(".animate-on-scroll").forEach((el) => {
  observer.observe(el);
});


async function handleSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const whatsappLink = 'https://chat.whatsapp.com/BDokgPqm1GdLGYBL4SFbPC?mode=ems_wa_t';

  const formData = new FormData(form);
  const formspreeUrl = form.getAttribute('data-formspree');

  try {
    const response = await fetch(formspreeUrl, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      console.log('Data sent to Formspree.');
      window.location.href = whatsappLink;
    } else {
      console.error('Error sending data to Formspree.');
      alert('Houve um erro na submissão. Por favor, tente novamente.');
    }
  } catch (error) {
    console.error('Network error:', error);
    alert('Houve um problema de conexão. Por favor, verifique sua internet e tente novamente.');
  }
}


function controllVideo(state) {
  if (state === "pause") {
    video.pause();
    playBtn.style.display = "inline";
  } else if (state === "play") {
    video.play();
    playBtn.style.display = "none";
  }
}

playBtn.addEventListener("click", () => controllVideo("play"));
video.addEventListener("click", () => {
  if (playBtn.style.display === "none") {
    controllVideo("pause")
  }
})


form.addEventListener('submit', handleSubmit);