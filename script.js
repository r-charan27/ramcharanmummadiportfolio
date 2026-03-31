// CUSTOM CURSOR
const cursorDot = document.querySelector(".cursor-dot");
const cursorOutline = document.querySelector(".cursor-outline");

window.addEventListener("mousemove", (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    if (cursorDot) {
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;
    }

    if (cursorOutline) {
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    }
});

// HOVER EFFECT FOR CURSOR
function updateCursorInteractions() {
  const interactiveElements = document.querySelectorAll("a, button, .theme-icon, .project-card, input, textarea, .filter-btn");
  interactiveElements.forEach(el => {
      el.addEventListener("mouseenter", () => {
          if (cursorOutline) {
            cursorOutline.style.width = "60px";
            cursorOutline.style.height = "60px";
            cursorOutline.style.backgroundColor = "rgba(59, 130, 246, 0.1)";
          }
      });
      el.addEventListener("mouseleave", () => {
          if (cursorOutline) {
            cursorOutline.style.width = "40px";
            cursorOutline.style.height = "40px";
            cursorOutline.style.backgroundColor = "transparent";
          }
      });
  });
}
updateCursorInteractions();

// SCROLL PROGRESS
window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    const progressBar = document.getElementById("scrollProgress");
    if (progressBar) {
        progressBar.style.width = scrolled + "%";
    }
});

// DYNAMIC MESH BACKGROUND (Canvas)
const canvas = document.getElementById('bgCanvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height, particles = [];

    function initCanvas() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        particles = [];
        for (let i = 0; i < 50; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1
            });
        }
    }

    function animateCanvas() {
        ctx.clearRect(0, 0, width, height);
        const isLight = document.body.classList.contains('light');
        ctx.fillStyle = isLight ? 'rgba(37, 99, 235, 0.1)' : 'rgba(59, 130, 246, 0.2)';
        ctx.strokeStyle = isLight ? 'rgba(37, 99, 235, 0.05)' : 'rgba(59, 130, 246, 0.1)';

        particles.forEach((p, i) => {
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0 || p.x > width) p.vx *= -1;
            if (p.y < 0 || p.y > height) p.vy *= -1;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();

            for (let j = i + 1; j < particles.length; j++) {
                const p2 = particles[j];
                const dist = Math.sqrt((p.x - p2.x) ** 2 + (p.y - p2.y) ** 2);
                if (dist < 150) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            }
        });
        requestAnimationFrame(animateCanvas);
    }

    window.addEventListener('resize', initCanvas);
    initCanvas();
    animateCanvas();
}

// TYPING ANIMATION
if (document.getElementById("typing")) {
    new Typed("#typing", {
        strings: [
            "an AI Engineer",
            "a Machine Learning Developer",
            "a Deep Learning Enthusiast"
        ],
        typeSpeed: 60,
        backSpeed: 40,
        loop: true
    });
}

// THEME TOGGLE WITH PERSISTENCE
const themeToggle = document.getElementById("themeToggle");
const currentTheme = localStorage.getItem("theme");

if (currentTheme === "light") {
    document.body.classList.add("light");
    if (themeToggle) themeToggle.innerHTML = "🌙";
} else {
    if (themeToggle) themeToggle.innerHTML = "☀️";
}

if (themeToggle) {
    themeToggle.onclick = () => {
        document.body.classList.toggle("light");
        let theme = "dark";
        if (document.body.classList.contains("light")) {
            theme = "light";
            themeToggle.innerHTML = "🌙";
        } else {
            themeToggle.innerHTML = "☀️";
        }
        localStorage.setItem("theme", theme);
    };
}

// PROJECT FILTERING
const filterBtns = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterBtns.forEach(btn => {
    btn.onclick = () => {
        filterBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        
        const filter = btn.getAttribute("data-filter");
        
        projectCards.forEach(card => {
            const categories = card.getAttribute("data-category") ? card.getAttribute("data-category").split(' ') : [];
            if (filter === "all" || categories.includes(filter)) {
                card.style.display = "block";
                setTimeout(() => card.style.opacity = "1", 10);
            } else {
                card.style.opacity = "0";
                setTimeout(() => card.style.display = "none", 300);
            }
        });
    };
});

// 3D TILT EFFECT
projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const { left, top, width, height } = card.getBoundingClientRect();
        const x = (e.clientX - left - width / 2) / 10;
        const y = (e.clientY - top - height / 2) / 10;
        card.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg) translateY(-10px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(0px)`;
    });
});

// AI CHAT LOGIC
const chatToggle = document.getElementById("chatToggle");
const chatBubble = document.getElementById("chatBubble");
const closeChat = document.getElementById("closeChat");
const chatInput = document.getElementById("chatInput");
const chatBody = document.getElementById("chatBody");
const sendChat = document.getElementById("sendChat");

if (chatToggle) {
    chatToggle.onclick = () => {
        chatBubble.style.display = chatBubble.style.display === "flex" ? "none" : "flex";
    };
}

if (closeChat) {
    closeChat.onclick = () => {
        chatBubble.style.display = "none";
    };
}

function addMessage(msg, isUser = false) {
    const div = document.createElement("div");
    div.className = isUser ? "user-msg" : "bot-msg";
    div.innerText = msg;
    chatBody.appendChild(div);
    chatBody.scrollTop = chatBody.scrollHeight;
}

function handleChat() {
    const text = chatInput.value.trim().toLowerCase();
    if (!text) return;

    addMessage(chatInput.value, true);
    chatInput.value = "";

    setTimeout(() => {
        let response = "That's interesting! I'm still learning, but you can check out Ramcharan's projects to see what he's capable of.";
        
        if (text.includes("experience") || text.includes("career") || text.includes("job")) {
            response = "Ramcharan is an Algo Risk Developer at Zetheta Algorithms and has interned at Elevate Labs and Oasis Infobyte. Check his timeline below!";
        } else if (text.includes("projects") || text.includes("work") || text.includes("build")) {
            response = "He has built impressive AI systems like Lung Cancer Prediction AI and the NexusMind Agentic Platform. Scroll to Projects for details!";
        } else if (text.includes("skills") || text.includes("tech") || text.includes("expert")) {
            response = "He specializes in Python, Machine Learning, Deep Learning, and FastAPI. He's also familiar with TensorFlow and SQL.";
        } else if (text.includes("contact") || text.includes("email") || text.includes("reach")) {
            response = "You can reach out via the 'Get In Touch' section at the bottom, or connect on LinkedIn!";
        } else if (text.includes("hello") || text.includes("hi") || text.includes("hey")) {
            response = "Hello! I'm Ramcharan's digital twin. Ask me about his projects, experience, or skills!";
        }
        
        addMessage(response);
    }, 1000);
}

if (sendChat) sendChat.onclick = handleChat;
if (chatInput) {
    chatInput.onkeypress = (e) => { if (e.key === "Enter") handleChat(); };
}

// MOBILE MENU
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if (menuToggle) {
    menuToggle.onclick = () => {
        navMenu.classList.toggle("active");
    };
}

// CLOSE MENU AFTER CLICKING LINK (mobile fix)
document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
      if (navMenu) navMenu.classList.remove("active");
    });
});

// SCROLL REVEAL SETTINGS
if (typeof ScrollReveal !== 'undefined') {
    ScrollReveal().reveal('.hero-text', { delay: 200, origin: 'left', distance: '50px', reset: true });
    ScrollReveal().reveal('.hero-image-container', { delay: 400, origin: 'right', distance: '50px', reset: true });
    ScrollReveal().reveal('.project-card', { interval: 100, origin: 'bottom', distance: '30px', reset: true });
    ScrollReveal().reveal('.timeline-item', { interval: 150, origin: 'left', distance: '30px', reset: true });
    ScrollReveal().reveal('.skill-item', { interval: 100, origin: 'bottom', distance: '20px', reset: true });
    ScrollReveal().reveal('.cert-card', { interval: 100, origin: 'bottom', distance: '20px', reset: true });
}