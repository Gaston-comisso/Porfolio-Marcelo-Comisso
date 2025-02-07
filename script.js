document.addEventListener('DOMContentLoaded', () => {
    // Cargar habilidades desde habilidades.json
    fetch('habilidades.json')
        .then(response => response.json())
        .then(skills => {
            const skillCards = document.querySelectorAll('.skill-card');
            skillCards.forEach(card => {
                const skillType = card.dataset.skill;
                const skillTags = card.querySelector('.skill-tags');
                skillTags.innerHTML = ""; // Limpiar contenido previo
                skills[skillType].forEach(skill => {
                    const tag = document.createElement('span');
                    tag.className = 'skill-tag';
                    tag.textContent = skill;
                    skillTags.appendChild(tag);
                });
            });
        })
        .catch(error => console.error("Error al cargar las habilidades:", error));

    // Cargar proyectos desde proyectos.json
    fetch('proyectos.json')
        .then(response => response.json())
        .then(projects => {
            const projectsGrid = document.querySelector('.projects-grid');
            projectsGrid.innerHTML = ""; // Limpiar contenido previo
            projects.forEach(project => {
                const projectCard = document.createElement('div');
                projectCard.className = 'project-card';
                projectCard.innerHTML = `
                    <img src="${project.image}" alt="${project.title}" class="project-image">
                    <div class="project-info">
                        <h3>${project.title}</h3>
                        <p>${project.description}</p>
                        <p>${project.tecnologias}</p>
                        <a href="${project.link}" style="color: var(--primary);">Ver más →</a>
                    </div>
                `;
                projectsGrid.appendChild(projectCard);
            });

            // Aplicar animaciones a las tarjetas de proyectos y habilidades
            addScrollAnimation();
        })
        .catch(error => console.error("Error al cargar los proyectos:", error));

    // Agregar animación al hacer scroll para otras secciones
    addScrollAnimationAdditional();

    // Agregar animación inicial para el héroe (opcional)
    animateHero();

    // Configuración del formulario de contacto
    const $form = document.querySelector('#contact-form'); // Cambié 'form' por 'contact-form'
    $form.addEventListener('submit', handleSubmit);
});

async function handleSubmit(event) {
    event.preventDefault(); // Evita que el formulario redirija a otra página

    const form = new FormData(event.target); // Captura los datos del formulario
    const response = await fetch(event.target.action, {
        method: event.target.method,
        body: form,
        headers: {
            'Accept': 'application/json' // Indicamos que esperamos un JSON como respuesta
        }
    });

    if (response.ok) {
        event.target.reset(); // Borra el formulario
        alert('¡Gracias por su mensaje! Me complace saber de usted y me pondré en contacto a la brevedad para atender su consulta.');
    } else {
        alert('Hubo un problema al enviar el mensaje. Inténtalo de nuevo.');
    }
}

// Función para animar las tarjetas de habilidades y proyectos al hacer scroll
function addScrollAnimation() {
    const elements = document.querySelectorAll('.skill-card, .project-card');
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s, transform 0.5s';
        observer.observe(element);
    });
}

// Nueva función para animar otras secciones al hacer scroll
function addScrollAnimationAdditional() {
    // Selecciona las secciones que quieres animar: héroe, sobre mí, experiencia y contacto
    const additionalElements = document.querySelectorAll('.hero-content, .about-container, .experience-card, .contact-form');
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    additionalElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s, transform 0.5s';
        observer.observe(element);
    });
}

// Función opcional para animar la sección del héroe al cargar la página
function animateHero() {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        // Inicia con opacidad 0 y desplazado a la izquierda
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateX(-50px)';
        heroContent.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        // Después de un breve retraso, se anima a su posición original
        setTimeout(() => {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateX(0)';
        }, 300);
    }
}



document.addEventListener("DOMContentLoaded", () => {
    const typewriter = document.querySelector(".typewriter");
    const text = typewriter.textContent;
    typewriter.textContent = "";
    let i = 0;
  
    function typeWriter() {
      if (i < text.length) {
        typewriter.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 50); // Ajusta este valor para cambiar la velocidad de escritura
      }
    }
  
    typeWriter();
  });

  