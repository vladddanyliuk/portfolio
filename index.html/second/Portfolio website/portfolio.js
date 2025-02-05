
    // Select necessary elements
    const mainContainer = document.getElementById('main-container');
    const fullGallery = document.getElementById('fullgallery');
    const toggleButtons1 = document.querySelectorAll('.toggle-btn');
    const toggleButtons2 = document.querySelectorAll('.toggle-btn');
    
    // Keep track of current screen
    let currentScreenIndex = 0;
    const screens = ['about-me', 'categories'];
    
    // Function to update toggle buttons' active state
    function updateToggleButtons(index) {
      // Update first set of toggle buttons
      toggleButtons1.forEach((btn, idx) => {
        if (idx === index) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });
      
      // Update second set of toggle buttons
      toggleButtons2.forEach((btn, idx) => {
        if (idx === index) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });
    }
    
   let touchStartY = 0;
let touchEndY = 0;
const swipeThreshold = 30; // Minimum swipe distance to trigger navigation

function navigateToScreen(index) {
  currentScreenIndex = index;
  mainContainer.style.transform = `translateY(-${index * 100}vh)`;
  updateToggleButtons(index);
}

// Add click event listeners to toggle buttons
toggleButtons1.forEach((button, index) => {
  button.addEventListener('click', () => navigateToScreen(index));
});

toggleButtons2.forEach((button, index) => {
  button.addEventListener('click', () => navigateToScreen(index));
});

// Disable free scrolling and enable controlled scrolling
document.body.addEventListener('wheel', (event) => {
  if (event.target.closest('.scrollable')) return; // Allow scrolling inside scrollable areas

  event.preventDefault(); // Prevent default scrolling

  if (event.deltaY > 0) {
    if (currentScreenIndex < screens.length - 1) {
      navigateToScreen(currentScreenIndex + 1);
    }
  } else {
    if (currentScreenIndex > 0) {
      navigateToScreen(currentScreenIndex - 1);
    }
  }
}, { passive: false });

// Enable swipe navigation
document.body.addEventListener('touchstart', (event) => {
  if (event.target.closest('.scrollable')) return; // Ignore swipe inside scrollable areas
  touchStartY = event.touches[0].clientY;
}, { passive: true });

document.body.addEventListener('touchend', (event) => {
  if (event.target.closest('.scrollable')) return;
  touchEndY = event.changedTouches[0].clientY;
  
  const swipeDistance = touchStartY - touchEndY;

  if (Math.abs(swipeDistance) > swipeThreshold) {
    if (swipeDistance > 0 && currentScreenIndex < screens.length - 1) {
      // Swipe up (next screen)
      navigateToScreen(currentScreenIndex + 1);
    } else if (swipeDistance < 0 && currentScreenIndex > 0) {
      // Swipe down (previous screen)
      navigateToScreen(currentScreenIndex - 1);
    }
  }
}, { passive: true });


    
    // Select all menu links and sections (if needed for further functionality)
    const menuLinks = document.querySelectorAll('header nav ul li a');
    const sections = document.querySelectorAll('section');

    
    document.getElementById('contactLink').addEventListener('click', function(e) {
        e.preventDefault(); // Prevent default link behavior
        document.getElementById('contactModal').style.display = 'block';
      });
      
      // Close the modal when the close button is clicked
      document.querySelector('.modal .close').addEventListener('click', function() {
        document.getElementById('contactModal').style.display = 'none';
      });
      
      // Close the modal when clicking outside the modal content
      window.addEventListener('click', function(e) {
        const modal = document.getElementById('contactModal');
        if (e.target === modal) {
          modal.style.display = 'none';
        }
      });
