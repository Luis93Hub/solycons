// Datos de la galería (aquí puedes agregar todas tus imágenes reales)
const galleryItems = [
    {
        id: 1,
        category: "techos",
        imgSrc: "/src/images/gallery/techo-zinc.jpeg",
        title: "Instalación de techo nuevo",
        description: "Colocación de techo de lámina galvanizada"
    },
    {
        id: 2,
        category: "techos",
        imgSrc: "src/images/gallery/techo-zinc-goteras.jpeg",
        title: "Reparación de techo",
        description: "Solución de goteras e impermeabilización"

    },
    {
        id: 3,
        category: "pisos",
        imgSrc: "src/images/gallery/pisos-baños-ceramica.jpeg",
        title: "Piso de porcelanato",
        description: "Instalación de piso de porcelanato en sala y comedor"
    },
    {
        id: 4,
        category: "pisos",
        imgSrc: "src/images/gallery/pisos-baños-ceramica-anaranjada.jpeg",
        title: "Piso de porcelanato",
        description: "Instalación de piso ceramica en recámara principal"
    },
    {
        id: 5,
        category: "hierro",
        imgSrc: "src/images/gallery/soporte-de-hierro-para-escaleras.jpeg",
        title: "Barandal de escalera",
        description: "Barandal de hierro forjado con diseño personalizado"
    },
    {
        id: 6,
        category: "hierro",
        imgSrc: "src/images/gallery/protecciones-de-ventanas-de-hierro-personalizadas.jpeg",
        title: "Protecciones de ventanas",
        description: "Fabricación e instalación de protecciones de hierro"
    },
    {
        id: 7,
        category: "portones",
        imgSrc: "src/images/gallery/porton-de-hierro-color-negro.jpeg",
        title: "Portón de seguridad",
        description: "Portón de hierro plegable con cerradura centrica"
    },
    {
        id: 8,
        category: "portones",
        imgSrc: "src/images/gallery/porton-ornamental-negro-para-puerta.jpeg",
        title: "Portón de herrería artística",
        description: "Portón principal con diseño ornamental personalizado"
    },
    {
        id: 9,
        category: "remodelacion",
        imgSrc: "src/images/gallery/remodelación-casa-antigua.jpeg",
        title: "Remodelación de casa completa",
        description: "Transformación integral de vivienda antigua"
    },
    {
        id: 10,
        category: "remodelacion",
        imgSrc: "src/images/gallery/agregando-secciones.jpeg",
        title: "Ampliación de vivienda",
        description: "Construcción de nueva habitación y baño"
    },
    {
        id: 11,
        category: "cocinas",
        imgSrc: "src/images/gallery/remodelación-adaptación-de-pantri-cocina.jpeg",
        title: "Cocina moderna",
        description: "Remodelación completa de cocina con muebles nuevos"
    },
    {
        id: 12,
        category: "banos",
        imgSrc: "src/images/gallery/azulejo-baños.jpeg",
        title: "Baño principal",
        description: "Renovación de baño con azulejos y accesorios nuevos"
    },
];

// Variables globales
let currentFilter = "todos";
let currentImageIndex = 0;
let filteredItems = [];

// Inicializar galería
function initGallery() {
    const galleryContainer = document.getElementById('galleryContainer');
    galleryContainer.innerHTML = '';
    
    // Filtrar items según la categoría seleccionada
    filteredItems = currentFilter === "todos" 
        ? galleryItems 
        : galleryItems.filter(item => item.category === currentFilter);
    
    // Crear elementos de galería
    filteredItems.forEach((item, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = `gallery-item ${item.category}`;
        galleryItem.setAttribute('data-category', item.category);
        galleryItem.setAttribute('data-index', index);
        
        // Determinar nombre de categoría para mostrar
        const categoryNames = {
            "techos": "Techos",
            "pisos": "Pisos",
            "hierro": "Trabajos en Hierro",
            "portones": "Portones",
            "remodelacion": "Remodelación",
            "cocinas": "Cocinas",
            "banos": "Baños"
        };
        
        galleryItem.innerHTML = `
            <img src="${item.imgSrc}" alt="${item.title}" class="gallery-img">
            <div class="gallery-overlay">
                <span class="gallery-category">${categoryNames[item.category] || item.category}</span>
                <h3>${item.title}</h3>
                <p>${item.description}</p>
            </div>
        `;
        
        galleryItem.addEventListener('click', () => openModal(index));
        galleryContainer.appendChild(galleryItem);
    });
}

// Filtros de galería
document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', function() {
        // Actualizar botones activos
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        
        // Actualizar filtro
        currentFilter = this.getAttribute('data-filter');
        
        // Reinicializar galería con el nuevo filtro
        initGallery();
    });
});

// Modal de imagen ampliada
const modal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const modalCaption = document.getElementById('modalCaption');
const modalClose = document.getElementById('modalClose');
const modalPrev = document.getElementById('modalPrev');
const modalNext = document.getElementById('modalNext');

function openModal(index) {
    currentImageIndex = index;
    const item = filteredItems[index];
    
    // Determinar nombre de categoría para mostrar
    const categoryNames = {
        "techos": "Techos",
        "pisos": "Pisos",
        "hierro": "Trabajos en Hierro",
        "portones": "Portones",
        "remodelacion": "Remodelación",
        "cocinas": "Cocinas",
        "banos": "Baños"
    };
    
    modalImage.src = item.imgSrc;
    modalImage.alt = item.title;
    modalCaption.innerHTML = `
        <h3>${item.title}</h3>
        <p>${item.description}</p>
        <span class="gallery-category">${categoryNames[item.category] || item.category}</span>
    `;
    
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function navigateModal(direction) {
    if (direction === 'prev') {
        currentImageIndex = currentImageIndex === 0 ? filteredItems.length - 1 : currentImageIndex - 1;
    } else {
        currentImageIndex = currentImageIndex === filteredItems.length - 1 ? 0 : currentImageIndex + 1;
    }
    
    const item = filteredItems[currentImageIndex];
    
    // Determinar nombre de categoría para mostrar
    const categoryNames = {
        "techos": "Techos",
        "pisos": "Pisos",
        "hierro": "Trabajos en Hierro",
        "portones": "Portones",
        "remodelacion": "Remodelación",
        "cocinas": "Cocinas",
        "banos": "Baños"
    };
    
    modalImage.src = item.imgSrc;
    modalImage.alt = item.title;
    modalCaption.innerHTML = `
        <h3>${item.title}</h3>
        <p>${item.description}</p>
        <span class="gallery-category">${categoryNames[item.category] || item.category}</span>
    `;
}

// Event listeners para el modal
modalClose.addEventListener('click', closeModal);
modalPrev.addEventListener('click', () => navigateModal('prev'));
modalNext.addEventListener('click', () => navigateModal('next'));

// Cerrar modal al hacer clic fuera de la imagen
modal.addEventListener('click', function(e) {
    if (e.target === modal) {
        closeModal();
    }
});

// Navegación con teclado
document.addEventListener('keydown', function(e) {
    if (modal.style.display === 'flex') {
        if (e.key === 'Escape') closeModal();
        if (e.key === 'ArrowLeft') navigateModal('prev');
        if (e.key === 'ArrowRight') navigateModal('next');
    }
});

// Menú móvil
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mainNav = document.getElementById('mainNav');

mobileMenuBtn.addEventListener('click', () => {
    mainNav.classList.toggle('active');
    mobileMenuBtn.innerHTML = mainNav.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Cerrar menú al hacer clic en enlace
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
        mainNav.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Formulario de contacto
const formContacto = document.getElementById('formContacto');
formContacto.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Gracias por su mensaje. Nos pondremos en contacto con usted en un plazo de 24 horas.');
    formContacto.reset();
});

// Smooth scroll para enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// Inicializar la galería al cargar la página
document.addEventListener('DOMContentLoaded', initGallery);