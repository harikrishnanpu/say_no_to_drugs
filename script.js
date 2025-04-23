// script.js

// Initialize AOS animations
AOS.init({
    once: true,
    duration: 1000,
    easing: "ease-out-quart"
  });
  
  // Parallax headline effect
  const hero = document.querySelector(".main-section"),
        text1 = document.querySelector(".text-1"),
        text2 = document.querySelector(".text-2");
  
  function handleParallax() {
    const y = window.scrollY;
    text1.style.transform = `translateX(${y * 0.25}px)`;
    text2.style.transform = `translateX(${-y * 0.25}px)`;
    hero.style.backgroundPositionY = `${-y * 0.3}px`;
  }
  window.addEventListener("scroll", handleParallax);
  
  // Mobile dropdown toggle
  const burger = document.getElementById("toggleMenu"),
        dropCard = document.getElementById("dropdownCard");
  
  burger.addEventListener("click", e => {
    e.stopPropagation();
    dropCard.classList.toggle("open");
  });
  document.addEventListener("click", e => {
    if (dropCard.classList.contains("open") && !dropCard.contains(e.target)) {
      dropCard.classList.remove("open");
    }
  });
  dropCard.querySelectorAll(".drop-link").forEach(link => {
    link.addEventListener("click", () => dropCard.classList.remove("open"));
  });
  
  // Stat counters animation
  const statCards = document.querySelectorAll(".stat-card");
  if (statCards.length) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const n = entry.target.querySelector(".stat-number"),
                target = +entry.target.dataset.count,
                startTime = performance.now(),
                dur = 2000;
  
          function update(now) {
            const progress = Math.min((now - startTime) / dur, 1);
            n.textContent = Math.floor(progress * target).toLocaleString();
            if (progress < 1) requestAnimationFrame(update);
          }
          requestAnimationFrame(update);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    statCards.forEach(card => observer.observe(card));
  }
  
  // FAQ accordion toggle
  document.querySelectorAll(".faq-item").forEach(item => {
    item.querySelector("h4").addEventListener("click", () => {
      item.classList.toggle("open");
    });
  });
  
  // Close dropdown on window resize
  window.addEventListener("resize", () => dropCard.classList.remove("open"));

  
  // ─── Reviews Carousel Functionality ───
const reviewCards = document.querySelectorAll('.review-card');
let currentReview = 0;

function showReview(idx) {
  reviewCards.forEach((card, i) => {
    card.classList.toggle('active', i === idx);
  });
}

// wire up next/prev buttons
document.querySelector('.review-nav.next')
  .addEventListener('click', () => {
    currentReview = (currentReview + 1) % reviewCards.length;
    showReview(currentReview);
  });
document.querySelector('.review-nav.prev')
  .addEventListener('click', () => {
    currentReview = (currentReview - 1 + reviewCards.length) % reviewCards.length;
    showReview(currentReview);
  });

// initialize
showReview(currentReview);


// Back-to-Top Button Functionality
const toTopBtn = document.getElementById('toTop');

// Show/hide button on scroll
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    toTopBtn.classList.add('visible');
  } else {
    toTopBtn.classList.remove('visible');
  }
});

// Smooth scroll to top on click
toTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

