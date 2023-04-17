

const togglebtn = document.querySelector(".hamburger");

togglebtn.addEventListener('click', ()=>{
    document.querySelector(".link-header").classList.toggle("toggled-nav");
})