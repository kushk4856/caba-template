document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const dropdownLinks = document.querySelectorAll('.nav-link');
  const toggleImg = document.getElementById('toggle_img')
  console.log(toggleImg)

  // Toggle menu
  menuToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      if(navMenu.classList.contains('active')){
        toggleImg.src = './images/close.svg'
      }else{
        toggleImg.src = './images/more.svg'
      }

  });



  // Handle dropdowns
  dropdownLinks.forEach(link => {
      const chevron = link.querySelector('.chevron');
      if (chevron) {
          link.addEventListener('click', function(e) {
              e.preventDefault();
              const dropdownContent = this.nextElementSibling;
              const isOpen = dropdownContent.classList.contains('active');
              
              // Close all dropdowns
              document.querySelectorAll('.dropdown-content').forEach(dropdown => {
                  dropdown.classList.remove('active');
                  const chevron = dropdown.previousElementSibling.querySelector('.chevron');
                  if (chevron) chevron.classList.remove('up');
              });

              // Toggle clicked dropdown
              if (!isOpen) {
                  dropdownContent.classList.add('active');
                  chevron.classList.add('up');
              }
          });
      }
  });

  // Close menu when clicking outside
  document.addEventListener('click', function(e) {
      if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
          navMenu.classList.remove('active');
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



const track = document.getElementById("carousel-track");
console.log(track)
const mainImage2 = document.querySelector(".carousel-main-image");
const cardWidth2 = track.children[0].offsetWidth + 50;
let isAnimating2 = false;
let autoSlideInterval;
let pauseAutoSlide = false;



function moveTrackForward() {
  if (isAnimating) return;
  isAnimating = true;
  track.style.transition = "transform 0.5s ease";
  track.style.transform = `translateX(-${cardWidth2}px)` ;
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
      // updateMainImage(nextImage);
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
