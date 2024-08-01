let slideIndex = 0;
let manualScroll = false;
let slideChangeInProgress = false;

// Fungsi untuk menampilkan slide secara otomatis
function showSlides() {
  // Set flag to indicate slide change is in progress
  slideChangeInProgress = true;

  const slides = document.querySelectorAll(".slide");

  // Menyembunyikan semua slide
  slides.forEach((slide) => {
    slide.style.display = "none";
  });

  // Menampilkan slide berikutnya
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }

  slides[slideIndex - 1].style.display = "block";

  // Reset flag after slide transition
  setTimeout(() => {
    slideChangeInProgress = false;
  }, 3000); // Same duration as the slide change interval

  // Mengatur interval untuk slide berikutnya
  setTimeout(showSlides, 3000); // Ganti gambar setiap 3 detik
}

// Fungsi untuk autoslide halaman
function autoSlide() {
  // Check if manual scroll is not active and slide change is not in progress
  if (!manualScroll && !slideChangeInProgress) {
    const sections = document.querySelectorAll("section");
    const currentScroll = window.scrollY;

    // Tentukan section berikutnya untuk digulirkan
    let nextSection = null;
    for (const section of sections) {
      if (section.offsetTop > currentScroll) {
        nextSection = section;
        break;
      }
    }

    if (nextSection) {
      window.scrollTo({
        top: nextSection.offsetTop,
        behavior: "smooth",
      });
    }
  }
}

// Tambahkan event listener untuk smooth scrolling navigation links
document.querySelectorAll("nav ul li a").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);

    // Set the manual scroll flag to true
    manualScroll = true;

    window.scrollTo({
      top: targetElement.offsetTop,
      behavior: "smooth",
    });

    // Optionally, reset the manual scroll flag after a delay
    setTimeout(() => {
      manualScroll = false;
    }, 1000); // Adjust the timeout as needed
  });
});

// Mulai slideshow saat halaman dimuat
document.addEventListener("DOMContentLoaded", () => {
  showSlides();
  setInterval(autoSlide, 3000); // Interval untuk autoslide halaman
});
