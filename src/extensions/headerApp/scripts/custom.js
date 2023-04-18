import $ from "jquery";

$(document).ready(function() {
    $(".nav-ham").on('click', function(){
        $('.link-header').toggleClass('open');
        $('body').toggleClass('overflow');
        $('.nav-ham .btns').toggleClass('open');
        $('.nav-ham .btns').toggleClass('not-open');
    });

    const togglebtn = document.querySelector(".hamburger");

    togglebtn.addEventListener('click', ()=>{
        document.querySelector(".link-header").classList.toggle("toggled-nav");
    })

});
  
