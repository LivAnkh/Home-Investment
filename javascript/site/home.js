const slides = document.querySelectorAll('.carousel-item');
const next = document.querySelector('.carousel-control-next');
const prev = document.querySelector('.carousel-control-prev');
const dots = document.querySelectorAll('.carousel-indicators button');
const link=document.querySelectorAll('.linking');

link.forEach(link=>{
  link.addEventListener('click',()=>{
     document.querySelector('.active')?.classList.remove('active');
     link.classList.add('active');
  })
})
//  link.forEach(link=>{
//   link.addEventListener('click',function(){
//      document.querySelector('.active')?.classList.remove('active');
//      this.classList.add('active');
//   })
// })

let currentIndex = 0;
let timer = setInterval(autoSlide, 3000);

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
    dots[i].classList.remove('active');
  });
  slides[index].classList.add('active');
  dots[index].classList.add('active');
  currentIndex = index;
}

function nextSlide() {
  let newIndex = (currentIndex + 1) % slides.length;
  showSlide(newIndex);
}

function prevSlide() {
  let newIndex = (currentIndex - 1 + slides.length) % slides.length;
  showSlide(newIndex);
}

function autoSlide() {
  nextSlide();
}

next.addEventListener('click', () => {
  clearInterval(timer);
  nextSlide();
  timer = setInterval(autoSlide, 5000);
});

prev.addEventListener('click', () => {
  clearInterval(timer);
  prevSlide();
  timer = setInterval(autoSlide, 5000);
});

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    clearInterval(timer);
    showSlide(index);
    timer = setInterval(autoSlide, 5000);
  });
});

// Dark mode functionality
const modeIcon = document.querySelector('.mode_icon');
modeIcon.addEventListener('click', () => {
  document.body.classList.toggle('dark_mode');
  const icon = modeIcon.querySelector('i');
  if (document.body.classList.contains('dark_mode')) {
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
  } else {
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
  }
});

document.getElementById("hamburger-icon").addEventListener("click", function() {
 document.getElementById("hamburger-menu").classList.toggle("show");
});      

