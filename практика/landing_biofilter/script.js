
// Hamburger menu

document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navContainer = document.querySelector('.nav-container');
    const menuOverlay = document.querySelector('.menu-overlay');
    const navItems = document.querySelectorAll('.nav-item');
    
    
    menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
        navContainer.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });
    
    
    menuOverlay.addEventListener('click', function() {
        menuToggle.classList.remove('active');
        navContainer.classList.remove('active');
        menuOverlay.classList.remove('active');
        document.body.classList.remove('menu-open');
    });
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            if (window.innerWidth <= 992) {
                if (e.target.closest('.nav-link') && !e.target.closest('.dropdown')) {
                    e.preventDefault();
                  
                    navItems.forEach(otherItem => {
                        if (otherItem !== item) {
                            otherItem.classList.remove('active');
                        }
                    });
                    
                    item.classList.toggle('active');
                }
            }
        });
    });
    
    window.addEventListener('resize', function() {
        if (window.innerWidth > 992) {
            menuToggle.classList.remove('active');
            navContainer.classList.remove('active');
            menuOverlay.classList.remove('active');
            document.body.classList.remove('menu-open');
            
            navItems.forEach(item => {
                item.classList.remove('active');
            });
        }
    });
});

const hero = document.querySelector('.hero');
const nextButton = document.querySelector('.next-btn');
const prevButton = document.querySelector('.prev-btn');
const images = [
  './images/hero.jpg',
  './images/card3.png',
  './images/card4.png'
];
let currentIndex = 0;




// Hero bg

const bg1 = document.createElement('div');
const bg2 = document.createElement('div');
bg1.className = 'hero__bg';
bg2.className = 'hero__bg';
bg2.style.opacity = '0';
hero.prepend(bg1, bg2);


bg1.style.backgroundImage = `url(${images[0]})`;

function changeImage(direction) {
  if (direction === 'next') {
    currentIndex = (currentIndex + 1) % images.length;
  } else {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
  }
  
  const activeBg = bg1.style.opacity === '1' ? bg1 : bg2;
  const nextBg = activeBg === bg1 ? bg2 : bg1;

  nextBg.style.backgroundImage = `url(${images[currentIndex]})`;
  nextBg.style.opacity = '1';
  activeBg.style.opacity = '0';
}

nextButton.addEventListener('click', () => changeImage('next'));
prevButton.addEventListener('click', () => changeImage('prev'));



// Tab-button

document.addEventListener("DOMContentLoaded", () => {
  const tabButtons = document.querySelectorAll(".tab-button")
  const tabContents = document.querySelectorAll(".tab-content")

  tabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      
      const tabId = this.getAttribute("data-tab")

      tabButtons.forEach((btn) => btn.classList.remove("active"))
      tabContents.forEach((content) => content.classList.remove("active"))

      this.classList.add("active")
      document.getElementById(tabId).classList.add("active")
    })
  })
})



// Control-card 1

document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.control-card');
    let activeCardIndex = 0;

    function updateUI() {
        cards.forEach((card, index) => {
            

            if (index === activeCardIndex) {
                card.classList.add('active');
                card.classList.remove('inactive');
            } else {
                card.classList.add('inactive');
                card.classList.remove('active');
            }


            const leftArrow = card.querySelector('.leftArrow');
            const rightArrow = card.querySelector('.rightArrow');
            

            leftArrow.classList.toggle('disabled', activeCardIndex === 0);
            rightArrow.classList.toggle('disabled', activeCardIndex === cards.length - 1);
        });
    }

    
    document.querySelector('.biofilter-wrapper').addEventListener('click', function(e) {
        const target = e.target;


        if (target.classList.contains('leftArrow')) {
            if (activeCardIndex > 0) {
                activeCardIndex--;
                updateUI();
            }
        }


        if (target.classList.contains('rightArrow')) {
            if (activeCardIndex < cards.length - 1) {
                activeCardIndex++;
                updateUI();
            }
        }
    });


    updateUI();
});


// Control-card2

document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.control-card2');
    let activeCardIndex = 0;


    function updateUI() {
        cards.forEach((card, index) => {
            if (index === activeCardIndex) {
                card.classList.add('active');
                card.classList.remove('inactive');
            } else {
                card.classList.add('inactive');
                card.classList.remove('active');
            }

            const leftArrow = card.querySelector('.arrowLeft');
            const rightArrow = card.querySelector('.arrowRight');
            
            leftArrow.classList.toggle('disabled', activeCardIndex === 0);
            rightArrow.classList.toggle('disabled', activeCardIndex === cards.length - 1);
        });
    }

    document.querySelector('.examples-wrapper').addEventListener('click', function(e) {
        const target = e.target;

        if (target.classList.contains('arrowLeft')) {
            if (activeCardIndex > 0) {
                activeCardIndex--;
                updateUI();
            }
        }

        if (target.classList.contains('arrowRight')) {
            if (activeCardIndex < cards.length - 1) {
                activeCardIndex++;
                updateUI();
            }
        }
    });

    updateUI();
});



// Carousel Arrows

const carousel = document.querySelector('.carousel');
const leftArrow = document.getElementById('leftArrow');
const rightArrow = document.getElementById('rightArrow');

function updateArrows() {
  const scrollLeft = carousel.scrollLeft;
  const maxScroll = carousel.scrollWidth - carousel.clientWidth;
  
  if (scrollLeft <= 0) {
    leftArrow.classList.add('disabled');
  } else {
    leftArrow.classList.remove('disabled');
  }
  
  if (scrollLeft >= maxScroll - 1) {
    rightArrow.classList.add('disabled');
  } else {
    rightArrow.classList.remove('disabled');
  }
}

updateArrows();

carousel.addEventListener('scroll', updateArrows);

leftArrow.addEventListener('click', () => {
  if (!leftArrow.classList.contains('disabled')) {
    carousel.scrollBy({ left: -370, behavior: 'smooth' });
  }
});

rightArrow.addEventListener('click', () => {
  if (!rightArrow.classList.contains('disabled')) {
    carousel.scrollBy({ left: 370, behavior: 'smooth' });
  }
});


document.addEventListener('DOMContentLoaded', function() {
  const answerTitles = document.querySelectorAll('.answer-title');
    
  answerTitles.forEach(title => {
    title.addEventListener('click', () => {
      const answer = title.parentElement;
      answer.classList.toggle('active');
        
      });
    });
  });




// Modal form

document.addEventListener('DOMContentLoaded', function() {


    document.getElementById("modal-feedback-form").addEventListener("submit", function(e) {
        e.preventDefault();

        alert("Спасибо! Ваша заявка отправлена.");

        window.location.href = "#close";
        
        this.reset();
    });

    document.querySelector('.modal').addEventListener('click', function(e) {
        if (e.target === this) {
            window.location.href = "#close";
        }
    });
});


