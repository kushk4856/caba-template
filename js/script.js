

const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-item');
const body = document.body;

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    if (navLinks.classList.contains('active')) {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = 'auto';
    }
    
});

navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            if (e.target.classList.contains('nav-link') && item.querySelector('.dropdown')) {
                e.preventDefault();
                item.classList.toggle('active');
            }
        }
    });
});


// ----------navbar end --------- 






const slides = document.querySelectorAll(".slide");
const track = document.querySelector(".thumbnails-track");
const wrapper = document.querySelector(".thumbnails-wrapper");
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");
let currentSlide = 0;

// Clone thumbnails for infinite loop
function setupInfiniteLoop() {
  const thumbnails = document.querySelectorAll(".thumbnail");
  const clonesBefore = [];
  const clonesAfter = [];

  thumbnails.forEach((thumb) => {
    const beforeClone = thumb.cloneNode(true);
    const afterClone = thumb.cloneNode(true);
    clonesBefore.push(beforeClone);
    clonesAfter.push(afterClone);
  });

  // Add clones to track
  clonesBefore
    .reverse()
    .forEach((clone) => track.insertBefore(clone, track.firstChild));
  clonesAfter.forEach((clone) => track.appendChild(clone));

  // Update all thumbnails with click listeners
  updateThumbnailListeners();
  centerCurrentSlide(true);
}

function updateThumbnailListeners() {
  const allThumbnails = document.querySelectorAll(".thumbnail");
  allThumbnails.forEach((thumb) => {
    thumb.addEventListener("click", () => {
      const index = parseInt(thumb.dataset.index);
      showSlide(index);
    });
  });
}

function centerCurrentSlide(immediate = false) {
  const thumbnails = document.querySelectorAll(".thumbnail");
  const thumbnailWidth = thumbnails[0].offsetWidth;
  const gap = 10; // Match the gap from CSS
  const offset = (wrapper.offsetWidth - thumbnailWidth) / 2;
  const slidePosition = currentSlide * (thumbnailWidth + gap);
  const totalWidth = thumbnails.length * (thumbnailWidth + gap);

  // Calculate the center position
  const position = -(slidePosition - offset + thumbnailWidth / 2);

  // Apply transform with or without transition
  track.style.transition = immediate ? "none" : "transform 0.5s ease-in-out";
  track.style.transform = `translateX(${position}px)`;

  // Reset transition after immediate positioning
  if (immediate) {
    setTimeout(() => {
      track.style.transition = "transform 0.5s ease-in-out";
    }, 0);
  }

  // Update active states
  thumbnails.forEach((thumb, i) => {
    if (parseInt(thumb.dataset.index) === currentSlide) {
      thumb.classList.add("active");
    } else {
      thumb.classList.remove("active");
    }
  });
}

function showSlide(index) {
  // Remove active class from current slide
  slides[currentSlide].classList.remove("active");

  // Update current slide index
  currentSlide = index;

  // Handle wraparound
  if (currentSlide >= slides.length) currentSlide = 0;
  if (currentSlide < 0) currentSlide = slides.length - 1;

  // Add active class to new slide
  slides[currentSlide].classList.add("active");

  // Center the thumbnails
  centerCurrentSlide();
}

// Event listeners for next/prev buttons
prevButton.addEventListener("click", () => showSlide(currentSlide - 1));
nextButton.addEventListener("click", () => showSlide(currentSlide + 1));

// Initialize infinite loop
setupInfiniteLoop();

// Optional: Auto-play functionality
let autoPlay = setInterval(() => showSlide(currentSlide + 1), 5000);

// Pause auto-play on hover
const sliderContainer = document.querySelector(".slider-container");
sliderContainer.addEventListener("mouseenter", () => clearInterval(autoPlay));
sliderContainer.addEventListener("mouseleave", () => {
  autoPlay = setInterval(() => showSlide(currentSlide + 1), 5000);
});

// Handle window resize
window.addEventListener("resize", () => centerCurrentSlide(true));


// -------job slider ------- 

const slider = document.getElementById('slider');
let cardWidth = slider.children[0].offsetWidth + 20; // Width of each card including margin
let intervalSpeed = 2000; // Interval speed in ms
let interval;

function startSlider() {
    interval = setInterval(() => {
        slider.style.transition = "transform 0.5s linear";
        slider.style.transform = `translateX(-${cardWidth}px)`;

        // After the transition ends, rearrange the cards
        setTimeout(() => {
            slider.style.transition = "none";
            slider.style.transform = "translateX(0)";
            slider.appendChild(slider.children[0]); // Move the first card to the end
        }, 500); // Match transition duration
    }, intervalSpeed);
}

startSlider();