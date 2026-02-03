// Main script for website functionality

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function() {
    initializeScrollProgress();
    initializeMobileMenu();
    initializeContactForm();
    loadServices();
    loadPortfolio();
    loadSkills();
    loadCertifications();
    setCurrentYear();
    
    // Listen for data updates
    window.addEventListener('dataUpdated', function() {
        loadPortfolio();
        loadCertifications();
    });
});

// Scroll to section
function scrollToSection(id) {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
    // Close mobile menu if open
    const navMenu = document.getElementById('navMenu');
    if (navMenu) {
        navMenu.classList.remove('active');
    }
}

// Initialize scroll progress bar
function initializeScrollProgress() {
    const scrollProgress = document.getElementById('scrollProgress');
    if (!scrollProgress) return;

    window.addEventListener('scroll', function() {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        scrollProgress.style.width = scrolled + '%';
    });
}

// Initialize mobile menu
function initializeMobileMenu() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
}

// Initialize contact form
function initializeContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message'),
        };

        // Show success message
        const messageDiv = document.getElementById('formMessage');
        if (messageDiv) {
            messageDiv.textContent = '✓ Pesan terkirim! Kami akan segera menghubungi Anda.';
            messageDiv.style.display = 'block';
            messageDiv.style.background = 'rgba(99, 102, 241, 0.1)';
            messageDiv.style.borderColor = 'rgba(99, 102, 241, 0.3)';
            messageDiv.style.color = 'var(--primary)';
        }

        // Reset form
        form.reset();

        // Hide message after 3 seconds
        setTimeout(function() {
            if (messageDiv) {
                messageDiv.style.display = 'none';
            }
        }, 3000);
    });
}

// Load and render services
function loadServices() {
    const servicesGrid = document.getElementById('servicesGrid');
    if (!servicesGrid) return;

    servicesGrid.innerHTML = servicesData.map(service => `
        <div class="service-card">
            <div class="service-icon">
                <i class="fas ${service.icon}"></i>
            </div>
            <h3>${service.title}</h3>
            <p>${service.description}</p>
            <div class="service-features">
                ${service.features.map(feature => `
                    <div class="service-feature">${feature}</div>
                `).join('')}
            </div>
        </div>
    `).join('');
}

// Load and render portfolio
function loadPortfolio() {
    const portfolioGrid = document.getElementById('portfolioGrid');
    if (!portfolioGrid) return;

    const portfolioData = loadPortfolioData();
    
    if (portfolioData.length === 0) {
        portfolioGrid.innerHTML = '<div class="empty-state">Belum ada portfolio items.</div>';
        return;
    }

    portfolioGrid.innerHTML = portfolioData.map(item => `
        <div class="portfolio-item" ${item.website ? `onclick="window.open('${item.website}', '_blank')"` : ''}>
            ${item.photo ? `<div class="portfolio-image" style="width: 100%; height: 200px; overflow: hidden; border-radius: 0.75rem 0.75rem 0 0;">
                <img src="${item.photo}" alt="${item.title}" style="width: 100%; height: 100%; object-fit: cover;">
            </div>` : ''}
            <div class="portfolio-content">
                <div>
                    <div class="portfolio-header">
                        <div>
                            <p class="portfolio-category">${item.category}</p>
                            <h3 class="portfolio-title">${item.title}</h3>
                        </div>
                        ${item.website ? '<i class="fas fa-arrow-up-right portfolio-arrow"></i>' : ''}
                    </div>
                    <p class="portfolio-description">${item.description}</p>
                    ${item.website ? `<a href="${item.website}" target="_blank" onclick="event.stopPropagation();" style="color: var(--primary); text-decoration: none; font-size: 0.875rem; margin-top: 0.5rem; display: inline-block;">
                        <i class="fas fa-external-link-alt"></i> Kunjungi Website
                    </a>` : ''}
                </div>
                <div class="portfolio-tags">
                    ${item.tags.map(tag => `
                        <span class="portfolio-tag">${tag}</span>
                    `).join('')}
                </div>
            </div>
        </div>
    `).join('');
}

// Load and render skills
function loadSkills() {
    const skillsGrid = document.getElementById('skillsGrid');
    if (!skillsGrid) return;

    skillsGrid.innerHTML = skillsData.map(category => `
        <div class="skill-category">
            <h3 class="skill-category-title">${category.category}</h3>
            ${category.skills.map(skill => `
                <div class="skill-bar-item">
                    <div class="skill-bar-header">
                        <span class="skill-name">${skill.name}</span>
                        <span class="skill-level">${skill.level}%</span>
                    </div>
                    <div class="skill-bar">
                        <div class="skill-bar-fill" style="width: ${skill.level}%"></div>
                    </div>
                </div>
            `).join('')}
        </div>
    `).join('');
}

// Load and render certifications
function loadCertifications() {
    const certificationsContent = document.getElementById('certificationsContent');
    if (!certificationsContent) return;

    const certificationsData = loadCertificationsData();
    
    if (certificationsData.length === 0) {
        certificationsContent.innerHTML = '<div class="empty-state">Belum ada sertifikasi atau awards yang ditampilkan.</div>';
        return;
    }

    const certs = certificationsData.filter(c => c.type === 'certification');
    const awards = certificationsData.filter(c => c.type === 'award');

    let html = '';

    if (certs.length > 0) {
        html += `
            <div class="certifications-group">
                <div class="cert-group-header">
                    <i class="fas fa-certificate cert-group-icon"></i>
                    <h3 class="cert-group-title">Sertifikasi</h3>
                </div>
                <div class="certifications-grid">
                    ${certs.map(cert => `
                        <div class="cert-item">
                            ${cert.photo ? `<div style="width: 100%; height: 150px; overflow: hidden; border-radius: 0.5rem; margin-bottom: 1rem;">
                                <img src="${cert.photo}" alt="${cert.title}" style="width: 100%; height: 100%; object-fit: cover;">
                            </div>` : ''}
                            <p class="cert-title">${cert.title}</p>
                            <p class="cert-issuer">${cert.issuer}</p>
                            <p class="cert-year">${cert.year}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    if (awards.length > 0) {
        html += `
            <div class="certifications-group">
                <div class="cert-group-header">
                    <i class="fas fa-trophy cert-group-icon"></i>
                    <h3 class="cert-group-title">Awards</h3>
                </div>
                <div class="certifications-grid">
                    ${awards.map(award => `
                        <div class="cert-item">
                            ${award.photo ? `<div style="width: 100%; height: 150px; overflow: hidden; border-radius: 0.5rem; margin-bottom: 1rem;">
                                <img src="${award.photo}" alt="${award.title}" style="width: 100%; height: 100%; object-fit: cover;">
                            </div>` : ''}
                            <p class="cert-title">${award.title}</p>
                            <p class="cert-issuer">${award.issuer}</p>
                            <p class="cert-year">${award.year}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    certificationsContent.innerHTML = html || '<div class="empty-state">Belum ada sertifikasi atau awards yang ditampilkan.</div>';
}

// Set current year in footer
function setCurrentYear() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

