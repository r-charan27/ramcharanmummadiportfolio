new Typed("#typing",{
strings:[
"AI Engineer",
"Machine Learning Developer",
"Deep Learning Enthusiast"
],
typeSpeed:60,
backSpeed:40,
loop:true
});


const toggle=document.getElementById("themeToggle");

toggle.onclick=()=>{
document.body.classList.toggle("light");

if(document.body.classList.contains("light")){
toggle.innerHTML="🌙";
}
else{
toggle.innerHTML="☀️";
}
};


ScrollReveal().reveal('.hero',{delay:200});
ScrollReveal().reveal('.project-card',{interval:200});
ScrollReveal().reveal('.skills-grid span',{interval:100});
ScrollReveal().reveal('.info-card',{interval:150});