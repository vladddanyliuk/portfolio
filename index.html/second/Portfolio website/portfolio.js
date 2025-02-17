/* Optimized JavaScript Code */

// ------------------------------
// Screen Navigation & Contact Modal
// ------------------------------
(() => {
  const mainContainer = document.getElementById('main-container');
  // Assuming both sets of toggle buttons share the same class, we combine them.
  const toggleButtons = document.querySelectorAll('.toggle-btn');

  let currentScreenIndex = 0;
  const screens = ['about-me', 'categories'];

  // Update toggle buttons active state
  function updateToggleButtons(index) {
    toggleButtons.forEach((btn, idx) => {
      btn.classList.toggle('active', idx === index);
    });
  }

  // Navigate to the given screen index
  function navigateToScreen(index) {
    currentScreenIndex = index;
    mainContainer.style.transform = `translateY(-${index * 100}vh)`;
    updateToggleButtons(index);
  }

  // Add click listeners for toggle buttons
  toggleButtons.forEach((button, index) => {
    button.addEventListener('click', () => navigateToScreen(index));
  });

  // Controlled scrolling with mouse wheel
  document.body.addEventListener(
    'wheel',
    (event) => {
      if (event.target.closest('.scrollable')) return; // allow inner scrolling
      event.preventDefault();
      if (event.deltaY > 0 && currentScreenIndex < screens.length - 1) {
        navigateToScreen(currentScreenIndex + 1);
      } else if (event.deltaY < 0 && currentScreenIndex > 0) {
        navigateToScreen(currentScreenIndex - 1);
      }
    },
    { passive: false }
  );

  // Swipe navigation
  let touchStartY = 0;
  const swipeThreshold = 30;
  document.body.addEventListener(
    'touchstart',
    (event) => {
      if (event.target.closest('.scrollable')) return;
      touchStartY = event.touches[0].clientY;
    },
    { passive: true }
  );

  document.body.addEventListener(
    'touchend',
    (event) => {
      if (event.target.closest('.scrollable')) return;
      const touchEndY = event.changedTouches[0].clientY;
      const swipeDistance = touchStartY - touchEndY;
      if (Math.abs(swipeDistance) > swipeThreshold) {
        if (swipeDistance > 0 && currentScreenIndex < screens.length - 1) {
          navigateToScreen(currentScreenIndex + 1);
        } else if (swipeDistance < 0 && currentScreenIndex > 0) {
          navigateToScreen(currentScreenIndex - 1);
        }
      }
    },
    { passive: true }
  );

  // Contact Modal for header navigation
  const contactLink = document.getElementById('contactLink');
  const contactModal = document.getElementById('contactModal');
  if (contactLink && contactModal) {
    contactLink.addEventListener('click', (e) => {
      e.preventDefault();
      contactModal.style.display = 'block';
    });
    const contactClose = contactModal.querySelector('.close');
    if (contactClose) {
      contactClose.addEventListener('click', () => (contactModal.style.display = 'none'));
    }
    window.addEventListener('click', (e) => {
      if (e.target === contactModal) contactModal.style.display = 'none';
    });
  }
})();

// ------------------------------
// Gallery Slider & Artwork Modal
// ------------------------------
document.addEventListener('DOMContentLoaded', () => {
  const galleryElement = document.getElementById('fullgallery');
  const sliderContainer = document.querySelector('.slides');
  const sliderOuter = document.querySelector('.slider');
  const header = document.getElementById('header');
  const actionBox2 = document.getElementById('calltoslider');
  let currentSlide = 0;

  // Artworks array – add or update as needed 🎨
  const artworks = [
    { src: 'art2.png', caption: 'Portrait 1' },
    { src: 'art3.jpg', caption: 'Portrait 1' },
    { src: 'art1.jpg', caption: 'Portrait 1' },
    {
      src: 'https://images.unsplash.com/photo-1738432323553-b9471e2239b9?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      caption: 'Client Order 1'
    }
  ];

  // Populate gallery and slider
  function populateGallery() {
    sliderContainer.innerHTML = '';
    galleryElement.innerHTML = '';
    artworks.forEach((artwork, index) => {
      // Create gallery thumbnail
      const galleryItem = document.createElement('div');
      galleryItem.classList.add('gallery-item');
      galleryItem.innerHTML = `<img src="${artwork.src}" alt="${artwork.caption}" data-index="${index}">`;
      galleryElement.appendChild(galleryItem);
      galleryItem.addEventListener('click', () => showSlide(index));

      // Create slide for the slider
      const slide = document.createElement('div');
      slide.classList.add('slide');
      const sliderImg = document.createElement('img');
      sliderImg.src = artwork.src;
      sliderImg.alt = artwork.caption;
      slide.appendChild(sliderImg);
      sliderContainer.appendChild(slide);
    });
    showSlide(currentSlide);
  }

  // Display a given slide
  function showSlide(index) {
    const totalSlides = sliderContainer.children.length;
    currentSlide = (index + totalSlides) % totalSlides;
    // Use sliderOuter's width for initial positioning; this will be updated in updateSliderSize.
    const slideWidth = sliderOuter.clientWidth;
    sliderContainer.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
    highlightGalleryItem(currentSlide);
    updateSliderSize();
  }

  function nextSlide() {
    showSlide(currentSlide + 1);
  }

  function prevSlide() {
    showSlide(currentSlide - 1);
  }

  // Highlight the selected gallery thumbnail
  function highlightGalleryItem(index) {
    const galleryItems = galleryElement.querySelectorAll('.gallery-item img');
    galleryItems.forEach((img) => img.classList.remove('selected'));
    const selectedImage = galleryElement.querySelector(`.gallery-item img[data-index="${index}"]`);
    if (selectedImage) selectedImage.classList.add('selected');
  }

  // Adjust slider size based on the current image's natural dimensions
  function updateSliderSize() {
    const slides = sliderContainer.children;
    if (!slides[currentSlide]) return;
    const currentImg = slides[currentSlide].querySelector('img');
    if (!currentImg) return;
    if (!currentImg.complete) {
      currentImg.onload = () => resizeSlider(currentImg);
    } else {
      resizeSlider(currentImg);
    }
  }

  // Resize slider and update transforms
  function resizeSlider(image) {
    let width = image.naturalWidth;
    let height = image.naturalHeight;
    const maxWidth = window.innerWidth * 0.8;
    const maxHeight = window.innerHeight * 0.8;
    // Calculate scale factor using the minimum of width and height ratios
    const scaleFactor = Math.min(maxWidth / width, maxHeight / height, 1);
    width = width * scaleFactor;
    height = height * scaleFactor;
    
    // Set the outer slider container dimensions
    sliderOuter.style.width = `${width}px`;
    sliderOuter.style.height = `${height}px`;

    // Update each slide's dimensions
    Array.from(sliderContainer.children).forEach((slide) => {
      slide.style.width = `${width}px`;
      slide.style.height = `${height}px`;
    });

    // Update slider container's transform based on the new slide width
    sliderContainer.style.transform = `translateX(-${currentSlide * width}px)`;
  }

  // Ensure the slider resizes when the window does
  window.addEventListener('resize', updateSliderSize);

  // Toggle header display based on main container's transform
  function updateHeaderDisplay() {
    const mainContainer = document.getElementById('main-container');
    header.style.display =
      mainContainer.style.transform.trim() === 'translateY(-100vh)' ? 'none' : 'flex';
  }

  // Action Box to toggle call-to-action display
  actionBox2.addEventListener('click', () => {
    const actionBox = document.getElementById('calltoaction');
    if (actionBox.style.display === 'flex') {
      actionBox.style.display = 'none';
      actionBox.classList.remove('visible');
    } else {
      actionBox.classList.add('visible');
      actionBox2.style.display = 'none';
    }
    updateHeaderDisplay();
  });

  // Artwork Modal functionality
  const modal = document.getElementById('artworkModal');
  const modalImage = document.getElementById('modalImage');
  const captionText = document.getElementById('caption');
  const modalClose = modal.querySelector('.close');

  function openModal(src, caption) {
    modal.style.display = 'flex';
    modalImage.src = src;
    captionText.innerHTML = caption;
  }

  if (modalClose) {
    modalClose.addEventListener('click', () => (modal.style.display = 'none'));
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
  });

  // Slider navigation buttons
  const nextBtn = document.querySelector('.next');
  const prevBtn = document.querySelector('.prev');
  if (nextBtn) nextBtn.addEventListener('click', nextSlide);
  if (prevBtn) prevBtn.addEventListener('click', prevSlide);

  // Open artwork modal when clicking on a slider image
  sliderContainer.addEventListener('click', (e) => {
    const slide = e.target.closest('.slide');
    if (slide) {
      const index = Array.from(sliderContainer.children).indexOf(slide);
      const artwork = artworks[index];
      if (artwork) openModal(artwork.src, artwork.caption);
    }
  });

  populateGallery();
});
