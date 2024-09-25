 // script.js
document.addEventListener('DOMContentLoaded', function() {
  const carouselItems = document.querySelectorAll('.carousel__item');
  const indicators = document.querySelectorAll('.carousel__indicator');
  const prevButton = document.querySelector('.carousel__control--prev');
  const nextButton = document.querySelector('.carousel__control--next');
  let currentIndex = 0;
  let carouselInterval;

  function showSlide(index) {
      carouselItems.forEach((item, i) => {
          item.classList.toggle('active', i === index);
          indicators[i].classList.toggle('active', i === index);
      });
      currentIndex = index;
  }

  function nextSlide() {
      let nextIndex = (currentIndex + 1) % carouselItems.length;
      showSlide(nextIndex);
  }

  function prevSlide() {
      let prevIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
      showSlide(prevIndex);
  }

  indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => {
          showSlide(index);
          resetInterval();
      });
  });

  nextButton.addEventListener('click', () => {
      nextSlide();
      resetInterval();
  });

  prevButton.addEventListener('click', () => {
      prevSlide();
      resetInterval();
  });

  function startInterval() {
      carouselInterval = setInterval(nextSlide, 5000);
  }

  function resetInterval() {
      clearInterval(carouselInterval);
      startInterval();
  }

  startInterval();
});
