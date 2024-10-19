const link=document.querySelectorAll('.linking');
const carousel= document.querySelector(".carousel");
 const wrapper= document.querySelector(".wrapper");
 const arrowBtns= document.querySelectorAll(".wrapper i");
 
//active
link.forEach(link=>{
  link.addEventListener('click',()=>{
     document.querySelector('.active')?.classList.remove('active');
     link.classList.add('active');
  })
})
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

 // Hamburger menu functionality
   document.getElementById("hamburger-icon").addEventListener("click",function() {
   document.getElementById("hamburger-menu").classList.toggle("show");
 });

 const firstCardWidth=document.querySelector(".card").offsetWidth;
 const carouselChildrens=[...carousel.children];
 let isDragging = false,startX,startScrollLeft,timeOutId;
 
 //Get the Number of Card that can fit in the carousel at once
 let carPerView=Math.round(carousel.offsetWidth/firstCardWidth);
 
 //Insert copies of the last few cards to beginning of Carousel  for infinite scrolling
  carouselChildrens.slice(-carPerView).reverse().forEach(card=>{
          carousel.insertAdjacentHTML("afterbegin",card.outerHTML);
  });
 
  //Insert copies of the first few cards to end of Carousel  for infinite scrolling
  carouselChildrens.slice(0,carPerView).forEach(card=>{
   carousel.insertAdjacentHTML("beforeend",card.outerHTML);
 });
 
 //Add event listener for the arrow button to scroll the carousel left and right 
 arrowBtns.forEach(btn => {
   btn.addEventListener("click",()=>{
     carousel.scrollLeft += btn.id === "left"? -firstCardWidth : firstCardWidth;
   });
 });
 
 const dragStart= (e) =>{
    isDragging = true;
    carousel.classList.add("dragging");
    //Recode the initial cursor and scroll position of the carousel
    startX=e.pageX;
    startScrollLeft=carousel.scrollLeft;
 }
 const dragging = (e) => {
    if(!isDragging) return; //if isDragging is false return from here
    //update to scroll position of the carousel based on the cursor movement
     carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
 }
 const dragStop= () =>{
   isDragging = false;
    carousel.classList.remove("dragging");
 }
 
 const autoPlay =()=>{
   if(window.innerWidth<800) return; //return if window is smaller than 800
   //autoplay the carousel after every 2500ms
   timeOutId=setTimeout(()=> carousel.scrollLeft += firstCardWidth,2500);
 }
 autoPlay();
 const infiniteScroll =()=>{
   //if the carousel is at the beginning , scroll to the end
   if(carousel.scrollLeft===0){
     carousel.classList.add("no-transition");
     carousel.scrollLeft=carousel.scrollWidth-(2* carousel.offsetWidth);
     carousel.classList.remove("no-transition");
   }
   //if the carousel is at the end,scroll to the beginning
   else if(carousel.scrollLeft===carousel.scrollWidth - carousel.offsetWidth){
     carousel.classList.add("no-transition");
     carousel.scrollLeft=carousel.offsetWidth;
     carousel.classList.remove("no-transition");
   }
   //Clear existing timeout & start autoplay if mouse is not hovering over carousel
   clearTimeout(timeOutId);
   if(!wrapper.matches(":hover")) autoPlay();
 }
 carousel.addEventListener("mousedown",dragStart);
 carousel.addEventListener("mousemove",dragging);
 document.addEventListener("mouseup",dragStop);
 carousel.addEventListener("scroll",infiniteScroll);
 wrapper.addEventListener("mouseenter",()=> clearTimeout(timeOutId));
 wrapper.addEventListener("mouseleave",autoPlay);