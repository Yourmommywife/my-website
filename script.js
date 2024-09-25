document.addEventListener('DOMContentLoaded', function() {
  const carouselItems = document.querySelectorAll('.carousel__item');
  const indicators = document.querySelectorAll('.carousel__indicator');
  const prevButton = document.querySelector('.carousel__control--prev');
  const nextButton = document.querySelector('.carousel__control--next');
  let currentIndex = 0;
  let carouselInterval;

  // Funkcija za prikaz slajda sa animacijom
  function showSlide(index) {
      // Dodaj klasu 'exit' za trenutnu kremu
      carouselItems[currentIndex].classList.add('exit');
      // Dodaj klasu 'enter' za novu kremu
      carouselItems[index].classList.add('enter');

      // Nakon animacije, ukloni klase 'enter' i 'exit' i postavi aktivni slajd
      setTimeout(() => {
          carouselItems.forEach((item, i) => {
              item.classList.remove('active', 'enter', 'exit'); // Ukloni sve klase
              indicators[i].classList.remove('active'); // Ukloni aktivnu klasu indikatora
          });
          carouselItems[index].classList.add('active'); // Postavi novu kremu kao aktivnu
          indicators[index].classList.add('active'); // Postavi indikator za novi slajd
      }, 800); // Vreme animacije (mora biti sinhronizovano sa CSS animacijom)

      currentIndex = index; // Ažuriraj trenutni indeks
  }

  // Funkcija za prikaz sledećeg slajda
  function nextSlide() {
      let nextIndex = (currentIndex + 1) % carouselItems.length; // Ako je poslednji, vrati na prvi
      showSlide(nextIndex);
  }

  // Funkcija za prikaz prethodnog slajda
  function prevSlide() {
      let prevIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length; // Ako je prvi, vrati na poslednji
      showSlide(prevIndex);
  }

  // Dodavanje događaja na indikatore (tačkice)
  indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => {
          showSlide(index); // Promeni slajd kad se klikne na indikator
          resetInterval(); // Resetuj automatsku promenu slajdova
      });
  });

  // Dodavanje događaja na dugme za sledeći slajd
  nextButton.addEventListener('click', () => {
      nextSlide(); // Prikaži sledeći slajd
      resetInterval(); // Resetuj automatsku promenu slajdova
  });

  // Dodavanje događaja na dugme za prethodni slajd
  prevButton.addEventListener('click', () => {
      prevSlide(); // Prikaži prethodni slajd
      resetInterval(); // Resetuj automatsku promenu slajdova
  });

  // Funkcija za pokretanje automatskog menjanja slajdova na svakih 5 sekundi
  function startInterval() {
      carouselInterval = setInterval(nextSlide, 5000); // Menja slajd na svakih 5 sekundi
  }

  // Funkcija za resetovanje intervala (koristi se nakon ručne promene slajda)
  function resetInterval() {
      clearInterval(carouselInterval); // Zaustavi trenutni interval
      startInterval(); // Pokreni novi interval
  }

  // Pokreni automatsku rotaciju slajdova
  startInterval();
});
