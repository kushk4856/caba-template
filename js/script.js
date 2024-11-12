const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-item");
const body = document.body;

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  if (navLinks.classList.contains("active")) {
    body.style.overflow = "hidden";
  } else {
    body.style.overflow = "auto";
  }
});

navItems.forEach((item) => {
  item.addEventListener("click", (e) => {
    if (window.innerWidth <= 768) {
      if (
        e.target.classList.contains("nav-link") &&
        item.querySelector(".dropdown")
      ) {
        e.preventDefault();
        item.classList.toggle("active");
      }
    }
  });
});

// ----------navbar end ---------

const slider = document.getElementById("slider");
const mainImage = document.querySelector(".fade-image");
const cardWidth = slider.children[0].offsetWidth;
let isAnimating = false;

// Function to update main image with fade effect
function updateMainImage(newSrc) {
  mainImage.classList.add("fade-out");
  setTimeout(() => {
    mainImage.src = newSrc;
    mainImage.classList.remove("fade-out");
  }, 300);
}

// Function to update active card
function updateActiveCard() {
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => card.classList.remove("active"));
  cards[2].classList.add("active"); // Middle card is always active
}

// Handle card click with fade effect
function handleCardClick(e) {
  if (isAnimating) return;

  const clickedCard = e.currentTarget;
  const cards = Array.from(slider.children);
  const clickedIndex = cards.indexOf(clickedCard);
  const middleIndex = Math.floor(cards.length / 2);

  // Update main image
  const newImageSrc = clickedCard.querySelector("img").src;
  updateMainImage(newImageSrc);

  if (clickedIndex === middleIndex) return;

  isAnimating = true;

  if (clickedIndex > middleIndex) {
    moveSliderForward();
  } else if (clickedIndex < middleIndex) {
    moveSliderBackward();
  }
}

// Function to move slider forward
function moveSliderForward() {
  slider.style.transition = "transform 0.5s ease";
  slider.style.transform = `translateX(-${cardWidth}px)`;

  setTimeout(() => {
    slider.style.transition = "none";
    slider.style.transform = "translateX(0)";
    slider.appendChild(slider.children[0]);
    isAnimating = false;
    updateActiveCard();
  }, 500);
}

// Function to move slider backward
function moveSliderBackward() {
  slider.style.transition = "transform 0.5s ease";
  slider.style.transform = `translateX(${cardWidth}px)`;

  setTimeout(() => {
    slider.style.transition = "none";
    slider.style.transform = "translateX(0)";
    slider.prepend(slider.children[slider.children.length - 1]);
    isAnimating = false;
    updateActiveCard();
  }, 500);
}

// Add click event listeners to all cards
function addCardListeners() {
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    card.addEventListener("click", handleCardClick);
  });
}

// Handle navigation buttons
document.querySelector(".prev").addEventListener("click", () => {
  if (isAnimating) return;
  isAnimating = true;

  // Update main image to the previous image
  const prevImage = slider.children[1].querySelector("img").src;
  updateMainImage(prevImage);
  moveSliderBackward();
});

document.querySelector(".next").addEventListener("click", () => {
  if (isAnimating) return;
  isAnimating = true;

  // Update main image to the next image
  const nextImage = slider.children[3].querySelector("img").src;
  updateMainImage(nextImage);
  moveSliderForward();
});

// Initialize card listeners
addCardListeners();
updateActiveCard(); // Set initial active card
// -------job slider -------

// const jobSlider = document.getElementById("slider");
// let cardWidthJob = slider.children[0].offsetWidth + 20; // Width of each card including margin
// let intervalSpeed = 2000; // Interval speed in ms
// let interval;

// function startSlider() {
//   interval = setInterval(() => {
//     jobSlider.style.transition = "transform 0.5s linear";
//     jobSlider.style.transform = `translateX(-${cardWidthJob}px)`;

//     // After the transition ends, rearrange the cards
//     setTimeout(() => {
//       jobSlider.style.transition = "none";
//       jobSlider.style.transform = "translateX(0)";
//       jobSlider.appendChild(jobSlider.children[0]); // Move the first card to the end
//     }, 500); // Match transition duration
//   }, intervalSpeed);
// }

// startSlider();

const track = document.getElementById("carousel-track");
const mainImage2 = document.querySelector(".carousel-main-image");
const cardWidth2 = track.children[0].offsetWidth;
let isAnimating2 = false;
let autoSlideInterval;
let pauseAutoSlide = false;

// function updateMainImage(newSrc) {
//   mainImage2.classList.add("image-fade-out");
//   setTimeout(() => {
//     mainImage2.src = newSrc;
//     mainImage2.classList.remove("image-fade-out");
//   }, 300);
// }

function moveTrackForward() {
  if (isAnimating) return;
  isAnimating = true;
  track.style.transition = "transform 0.5s ease";
  track.style.transform = `translateX(-${cardWidth2}px)`;
  setTimeout(() => {
    track.style.transition = "none";
    track.style.transform = "translateX(0)";
    track.appendChild(track.children[0]);
    isAnimating = false;
  }, 500);
}

function moveTrackBackward() {
  if (isAnimating) return;
  isAnimating = true;
  track.style.transition = "none";
  track.insertBefore(
    track.children[track.children.length - 1],
    track.children[0]
  );
  track.style.transform = `translateX(-${cardWidth2}px)`;
  setTimeout(() => {
    track.style.transition = "transform 0.5s ease";
    track.style.transform = "translateX(0)";
    setTimeout(() => {
      isAnimating = false;
    }, 500);
  }, 0);
}

function startAutoSlide() {
  autoSlideInterval = setInterval(() => {
    if (!pauseAutoSlide && !isAnimating) {
      const nextImage =
        track.children[1].querySelector(".course-card-image").src;
      updateMainImage(nextImage);
      moveTrackForward();
    }
  }, 3000);
}

function resetAutoSlideTimer() {
  clearInterval(autoSlideInterval);
  startAutoSlide();
}

document.querySelector(".carousel-prev").addEventListener("click", () => {
  resetAutoSlideTimer();
  const prevImage =
    track.children[track.children.length - 1].querySelector(
      ".course-card-image"
    ).src;
  updateMainImage(prevImage);
  moveTrackBackward();
});

document.querySelector(".carousel-next").addEventListener("click", () => {
  resetAutoSlideTimer();
  const nextImage = track.children[1].querySelector(".course-card-image").src;
  updateMainImage(nextImage);
  moveTrackForward();
});

track.addEventListener("mouseenter", () => (pauseAutoSlide = true));
track.addEventListener("mouseleave", () => (pauseAutoSlide = false));
startAutoSlide();
