// Admin panel functionality

let portfolioData = [];
let certificationsData = [];
let editingPortfolioId = null;
let editingCertId = null;
let portfolioPhotoBase64 = null;
let certPhotoBase64 = null;

// Helper function to escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

const colorOptions = [
    { value: 'from-blue-500 to-cyan-500', from: '#3b82f6', to: '#06b6d4' },
    { value: 'from-purple-500 to-pink-500', from: '#a855f7', to: '#ec4899' },
    { value: 'from-orange-500 to-red-500', from: '#f97316', to: '#ef4444' },
    { value: 'from-green-500 to-emerald-500', from: '#22c55e', to: '#10b981' },
    { value: 'from-indigo-500 to-blue-500', from: '#6366f1', to: '#3b82f6' },
    { value: 'from-pink-500 to-rose-500', from: '#ec4899', to: '#f43f5e' },
    { value: 'from-yellow-500 to-orange-500', from: '#eab308', to: '#f97316' },
    { value: 'from-teal-500 to-cyan-500', from: '#14b8a6', to: '#06b6d4' },
];

// Admin password
const ADMIN_PASSWORD = 'voENLcCd9p=UHP"2';

// Check authentication
function isAuthenticated() {
    return sessionStorage.getItem('adminAuthenticated') === 'true';
}

// Handle login
function handleLogin(e) {
    e.preventDefault();
    const passwordInput = document.getElementById('passwordInput');
    const loginError = document.getElementById('loginError');
    const password = passwordInput.value;
    
    if (password === ADMIN_PASSWORD) {
        // Set authentication
        sessionStorage.setItem('adminAuthenticated', 'true');
        
        // Hide login screen and show admin content
        document.getElementById('loginScreen').style.display = 'none';
        document.getElementById('adminContent').classList.add('authenticated');
        
        // Initialize admin panel
        initializeAdminPanel();
    } else {
        // Show error
        loginError.classList.add('show');
        passwordInput.value = '';
        passwordInput.focus();
        
        // Hide error after 3 seconds
        setTimeout(() => {
            loginError.classList.remove('show');
        }, 3000);
    }
}

// Logout function
function logout() {
    if (confirm('Apakah Anda yakin ingin logout?')) {
        sessionStorage.removeItem('adminAuthenticated');
        location.reload();
    }
}

// Initialize admin panel
function initializeAdminPanel() {
    console.log('Admin panel initialized');
    
    // Load data from localStorage
    portfolioData = loadPortfolioData();
    certificationsData = loadCertificationsData();
    
    console.log('Portfolio data loaded:', portfolioData.length, 'items');
    console.log('Certifications data loaded:', certificationsData.length, 'items');
    
    // Render items
    loadPortfolioItems();
    loadCertificationItems();
    initializeColorGrid();
    
    // Listen for storage changes (if opened in multiple tabs)
    window.addEventListener('storage', function(e) {
        if (e.key === 'portfolioData') {
            portfolioData = loadPortfolioData();
            loadPortfolioItems();
        } else if (e.key === 'certificationsData') {
            certificationsData = loadCertificationsData();
            loadCertificationItems();
        }
    });
}

// Check authentication on page load
document.addEventListener('DOMContentLoaded', function() {
    if (isAuthenticated()) {
        // User is authenticated, show admin content
        document.getElementById('loginScreen').style.display = 'none';
        document.getElementById('adminContent').classList.add('authenticated');
        initializeAdminPanel();
    } else {
        // User is not authenticated, show login screen
        document.getElementById('loginScreen').style.display = 'flex';
        document.getElementById('adminContent').classList.remove('authenticated');
    }
});

// Switch tabs
function switchTab(tab) {
    // Update tab buttons
    document.querySelectorAll('.admin-tab').forEach((btn, index) => {
        btn.classList.remove('active');
        if ((tab === 'portfolio' && index === 0) || (tab === 'certifications' && index === 1)) {
            btn.classList.add('active');
        }
    });

    // Update content
    document.querySelectorAll('.admin-content').forEach(content => {
        content.classList.remove('active');
    });
    
    if (tab === 'portfolio') {
        document.getElementById('portfolioTab').classList.add('active');
    } else {
        document.getElementById('certificationsTab').classList.add('active');
    }
}

// Load portfolio items
function loadPortfolioItems() {
    // Always reload from localStorage to get latest data
    portfolioData = loadPortfolioData();
    const container = document.getElementById('portfolioItems');
    const count = document.getElementById('portfolioCount');
    
    if (!container) return;
    
    if (count) count.textContent = portfolioData.length;

    if (portfolioData.length === 0) {
        container.innerHTML = '<div class="empty-state-admin">Belum ada portfolio items. Klik "Tambah Item" untuk menambahkan.</div>';
        return;
    }

    container.innerHTML = portfolioData.map(item => `
        <div class="item-card">
            ${item.photo ? `<div style="width: 100%; height: 120px; overflow: hidden; border-radius: 0.5rem; margin-bottom: 0.75rem;">
                <img src="${item.photo}" alt="${escapeHtml(item.title || '')}" style="width: 100%; height: 100%; object-fit: cover;">
            </div>` : ''}
            <h3>${escapeHtml(item.title || 'Untitled')}</h3>
            <p style="color: var(--primary); font-size: 0.75rem;">${escapeHtml(item.category || '')}</p>
            <p style="font-size: 0.875rem; margin-top: 0.5rem;">${escapeHtml((item.description || '').substring(0, 100))}${(item.description || '').length > 100 ? '...' : ''}</p>
            ${item.website ? `<p style="font-size: 0.75rem; color: rgba(99, 102, 241, 0.8); margin-top: 0.5rem;">
                <i class="fas fa-link"></i> ${escapeHtml(item.website)}
            </p>` : ''}
            <div class="item-card-actions">
                <button class="btn btn-outline btn-small" onclick="editPortfolio(${item.id})">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="btn btn-danger btn-small" onclick="deletePortfolio(${item.id})">
                    <i class="fas fa-trash"></i> Hapus
                </button>
            </div>
        </div>
    `).join('');
}

// Load certification items
function loadCertificationItems() {
    // Always reload from localStorage to get latest data
    certificationsData = loadCertificationsData();
    const container = document.getElementById('certificationItems');
    const count = document.getElementById('certificationsCount');
    
    if (!container) return;
    
    if (count) count.textContent = certificationsData.length;

    if (certificationsData.length === 0) {
        container.innerHTML = '<div class="empty-state-admin">Belum ada certifications atau awards. Klik "Tambah Item" untuk menambahkan.</div>';
        return;
    }

    container.innerHTML = certificationsData.map(item => `
        <div class="item-card">
            ${item.photo ? `<div style="width: 100%; height: 120px; overflow: hidden; border-radius: 0.5rem; margin-bottom: 0.75rem;">
                <img src="${item.photo}" alt="${escapeHtml(item.title || '')}" style="width: 100%; height: 100%; object-fit: cover;">
            </div>` : ''}
            <h3>${escapeHtml(item.title || 'Untitled')}</h3>
            <p>${escapeHtml(item.issuer || '')}</p>
            <p style="font-size: 0.75rem; color: rgba(242, 242, 242, 0.5);">${escapeHtml(item.year || '')}</p>
            <span class="cert-badge">${item.type === 'certification' ? 'Certification' : 'Award'}</span>
            <div class="item-card-actions">
                <button class="btn btn-outline btn-small" onclick="editCertification(${item.id})">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="btn btn-danger btn-small" onclick="deleteCertification(${item.id})">
                    <i class="fas fa-trash"></i> Hapus
                </button>
            </div>
        </div>
    `).join('');
}

// Initialize color grid
function initializeColorGrid() {
    const colorGrid = document.getElementById('colorGrid');
    if (!colorGrid) return;

    colorGrid.innerHTML = colorOptions.map((color, index) => `
        <div class="color-option" 
             onclick="selectColor('${color.value}', ${index})"
             data-color="${color.value}"
             style="background: linear-gradient(to bottom right, ${color.from}, ${color.to});"></div>
    `).join('');
}

// Select color
let selectedColor = colorOptions[0].value;
function selectColor(color, index) {
    selectedColor = color;
    document.querySelectorAll('.color-option').forEach((el, i) => {
        if (i === index) {
            el.classList.add('selected');
        } else {
            el.classList.remove('selected');
        }
    });
}

// Handle portfolio photo upload
function handlePortfolioPhotoUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert('Ukuran foto maksimal 5MB!');
        event.target.value = '';
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        portfolioPhotoBase64 = e.target.result;
        const preview = document.getElementById('portfolioPhotoPreview');
        const previewImg = document.getElementById('portfolioPhotoPreviewImg');
        if (preview && previewImg) {
            previewImg.src = portfolioPhotoBase64;
            preview.style.display = 'block';
        }
    };
    reader.readAsDataURL(file);
}

// Remove portfolio photo
function removePortfolioPhoto() {
    portfolioPhotoBase64 = null;
    const fileInput = document.getElementById('portfolioPhoto');
    const preview = document.getElementById('portfolioPhotoPreview');
    if (fileInput) fileInput.value = '';
    if (preview) preview.style.display = 'none';
}

// Handle certification photo upload
function handleCertPhotoUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert('Ukuran foto maksimal 5MB!');
        event.target.value = '';
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        certPhotoBase64 = e.target.result;
        const preview = document.getElementById('certPhotoPreview');
        const previewImg = document.getElementById('certPhotoPreviewImg');
        if (preview && previewImg) {
            previewImg.src = certPhotoBase64;
            preview.style.display = 'block';
        }
    };
    reader.readAsDataURL(file);
}

// Remove certification photo
function removeCertPhoto() {
    certPhotoBase64 = null;
    const fileInput = document.getElementById('certPhoto');
    const preview = document.getElementById('certPhotoPreview');
    if (fileInput) fileInput.value = '';
    if (preview) preview.style.display = 'none';
}

// Open portfolio modal
function openPortfolioModal(item = null) {
    editingPortfolioId = item ? item.id : null;
    const modal = document.getElementById('portfolioModal');
    const form = document.getElementById('portfolioForm');
    
    if (!modal || !form) {
        console.error('Modal or form not found');
        return;
    }
    
    // Reset photo
    portfolioPhotoBase64 = null;
    removePortfolioPhoto();
    
    if (item) {
        document.getElementById('portfolioTitle').value = item.title || '';
        document.getElementById('portfolioCategory').value = item.category || '';
        document.getElementById('portfolioDescription').value = item.description || '';
        document.getElementById('portfolioTags').value = (item.tags || []).join(', ');
        document.getElementById('portfolioWebsite').value = item.website || '';
        selectedColor = item.color || colorOptions[0].value;
        
        // Load photo if exists
        if (item.photo) {
            portfolioPhotoBase64 = item.photo;
            const preview = document.getElementById('portfolioPhotoPreview');
            const previewImg = document.getElementById('portfolioPhotoPreviewImg');
            if (preview && previewImg) {
                previewImg.src = item.photo;
                preview.style.display = 'block';
            }
        }
        
        // Select the color
        document.querySelectorAll('.color-option').forEach((el, i) => {
            if (el.dataset.color === selectedColor) {
                el.classList.add('selected');
            } else {
                el.classList.remove('selected');
            }
        });
    } else {
        // Reset form for new item
        form.reset();
        selectedColor = colorOptions[0].value;
        document.querySelectorAll('.color-option').forEach((el, i) => {
            if (i === 0) {
                el.classList.add('selected');
            } else {
                el.classList.remove('selected');
            }
        });
    }
    
    modal.classList.add('active');
    console.log('Portfolio modal opened, editing ID:', editingPortfolioId);
}

// Close portfolio modal
function closePortfolioModal() {
    document.getElementById('portfolioModal').classList.remove('active');
    editingPortfolioId = null;
    portfolioPhotoBase64 = null;
    document.getElementById('portfolioForm').reset();
    removePortfolioPhoto();
}

// Save portfolio item
function savePortfolioItem(e) {
    e.preventDefault();
    
    const title = document.getElementById('portfolioTitle').value.trim();
    if (!title) {
        alert('Judul tidak boleh kosong!');
        return;
    }

    // Generate unique ID for new items
    let newId;
    if (editingPortfolioId) {
        newId = editingPortfolioId;
    } else {
        // Find max ID and add 1, or use timestamp if no items exist
        if (portfolioData.length > 0) {
            const maxId = Math.max(...portfolioData.map(p => {
                const pId = typeof p.id === 'string' ? parseInt(p.id, 10) : p.id;
                return isNaN(pId) ? 0 : pId;
            }));
            newId = maxId + 1;
        } else {
            newId = Date.now();
        }
    }

    const item = {
        id: newId,
        title: title,
        category: document.getElementById('portfolioCategory').value.trim(),
        description: document.getElementById('portfolioDescription').value.trim(),
        tags: document.getElementById('portfolioTags').value.split(',').map(t => t.trim()).filter(t => t),
        color: selectedColor,
        website: document.getElementById('portfolioWebsite').value.trim() || null,
        photo: portfolioPhotoBase64 || (editingPortfolioId && portfolioData.find(p => {
            const pId = typeof p.id === 'string' ? parseInt(p.id, 10) : p.id;
            const editId = typeof editingPortfolioId === 'string' ? parseInt(editingPortfolioId, 10) : editingPortfolioId;
            return pId === editId;
        })?.photo) || null,
    };

    if (editingPortfolioId) {
        // Ensure ID is number for comparison
        const editId = typeof editingPortfolioId === 'string' ? parseInt(editingPortfolioId, 10) : editingPortfolioId;
        const index = portfolioData.findIndex(p => {
            const pId = typeof p.id === 'string' ? parseInt(p.id, 10) : p.id;
            return pId === editId;
        });
        if (index >= 0) {
            portfolioData[index] = item;
            console.log('Updated portfolio item:', item);
        } else {
            // If not found, add as new item
            portfolioData.push(item);
            console.log('Added new portfolio item (edit not found):', item);
        }
    } else {
        portfolioData.push(item);
        console.log('Added new portfolio item:', item);
    }

    // Auto-save to localStorage
    savePortfolioData(portfolioData);
    console.log('Portfolio data saved, total items:', portfolioData.length);
    loadPortfolioItems();
    closePortfolioModal();
}

// Edit portfolio
function editPortfolio(id) {
    // Ensure ID is number for comparison
    const numId = typeof id === 'string' ? parseInt(id, 10) : id;
    const item = portfolioData.find(p => {
        const pId = typeof p.id === 'string' ? parseInt(p.id, 10) : p.id;
        return pId === numId;
    });
    if (item) {
        openPortfolioModal(item);
    } else {
        console.error('Portfolio item not found with id:', id);
    }
}

// Delete portfolio
function deletePortfolio(id) {
    if (confirm('Apakah Anda yakin ingin menghapus item ini?')) {
        // Ensure ID is number for comparison
        const numId = typeof id === 'string' ? parseInt(id, 10) : id;
        const beforeCount = portfolioData.length;
        portfolioData = portfolioData.filter(p => {
            const pId = typeof p.id === 'string' ? parseInt(p.id, 10) : p.id;
            return pId !== numId;
        });
        const afterCount = portfolioData.length;
        console.log(`Deleted portfolio item ${id}. Before: ${beforeCount}, After: ${afterCount}`);
        
        // Auto-save to localStorage
        savePortfolioData(portfolioData);
        loadPortfolioItems();
    }
}

// Save portfolio to localStorage (manual save button)
function savePortfolio() {
    // Reload data from localStorage first to ensure we have latest
    portfolioData = loadPortfolioData();
    savePortfolioData(portfolioData);
    alert('Portfolio data berhasil disimpan!');
}

// Open certification modal
function openCertificationModal(item = null) {
    editingCertId = item ? item.id : null;
    const modal = document.getElementById('certificationModal');
    const form = document.getElementById('certificationForm');
    
    if (!modal || !form) {
        console.error('Modal or form not found');
        return;
    }
    
    // Reset photo
    certPhotoBase64 = null;
    removeCertPhoto();
    
    if (item) {
        document.getElementById('certTitle').value = item.title || '';
        document.getElementById('certIssuer').value = item.issuer || '';
        document.getElementById('certYear').value = item.year || new Date().getFullYear();
        document.getElementById('certType').value = item.type || 'certification';
        
        // Load photo if exists
        if (item.photo) {
            certPhotoBase64 = item.photo;
            const preview = document.getElementById('certPhotoPreview');
            const previewImg = document.getElementById('certPhotoPreviewImg');
            if (preview && previewImg) {
                previewImg.src = item.photo;
                preview.style.display = 'block';
            }
        }
    } else {
        // Reset form for new item
        form.reset();
        document.getElementById('certYear').value = new Date().getFullYear();
        document.getElementById('certType').value = 'certification';
    }
    
    modal.classList.add('active');
    console.log('Certification modal opened, editing ID:', editingCertId);
}

// Close certification modal
function closeCertificationModal() {
    document.getElementById('certificationModal').classList.remove('active');
    editingCertId = null;
    certPhotoBase64 = null;
    document.getElementById('certificationForm').reset();
    removeCertPhoto();
}

// Save certification item
function saveCertificationItem(e) {
    e.preventDefault();
    
    const title = document.getElementById('certTitle').value.trim();
    if (!title) {
        alert('Judul tidak boleh kosong!');
        return;
    }

    // Generate unique ID for new items
    let newId;
    if (editingCertId) {
        newId = editingCertId;
    } else {
        // Find max ID and add 1, or use timestamp if no items exist
        if (certificationsData.length > 0) {
            const maxId = Math.max(...certificationsData.map(c => {
                const cId = typeof c.id === 'string' ? parseInt(c.id, 10) : c.id;
                return isNaN(cId) ? 0 : cId;
            }));
            newId = maxId + 1;
        } else {
            newId = Date.now();
        }
    }

    const item = {
        id: newId,
        title: title,
        issuer: document.getElementById('certIssuer').value.trim(),
        year: document.getElementById('certYear').value.trim(),
        type: document.getElementById('certType').value,
        photo: certPhotoBase64 || (editingCertId && certificationsData.find(c => {
            const cId = typeof c.id === 'string' ? parseInt(c.id, 10) : c.id;
            const editId = typeof editingCertId === 'string' ? parseInt(editingCertId, 10) : editingCertId;
            return cId === editId;
        })?.photo) || null,
    };

    if (editingCertId) {
        // Ensure ID is number for comparison
        const editId = typeof editingCertId === 'string' ? parseInt(editingCertId, 10) : editingCertId;
        const index = certificationsData.findIndex(c => {
            const cId = typeof c.id === 'string' ? parseInt(c.id, 10) : c.id;
            return cId === editId;
        });
        if (index >= 0) {
            certificationsData[index] = item;
            console.log('Updated certification item:', item);
        } else {
            // If not found, add as new item
            certificationsData.push(item);
            console.log('Added new certification item (edit not found):', item);
        }
    } else {
        certificationsData.push(item);
        console.log('Added new certification item:', item);
    }

    // Auto-save to localStorage
    saveCertificationsData(certificationsData);
    console.log('Certifications data saved, total items:', certificationsData.length);
    loadCertificationItems();
    closeCertificationModal();
}

// Edit certification
function editCertification(id) {
    // Ensure ID is number for comparison
    const numId = typeof id === 'string' ? parseInt(id, 10) : id;
    const item = certificationsData.find(c => {
        const cId = typeof c.id === 'string' ? parseInt(c.id, 10) : c.id;
        return cId === numId;
    });
    if (item) {
        openCertificationModal(item);
    } else {
        console.error('Certification item not found with id:', id);
    }
}

// Delete certification
function deleteCertification(id) {
    if (confirm('Apakah Anda yakin ingin menghapus item ini?')) {
        // Ensure ID is number for comparison
        const numId = typeof id === 'string' ? parseInt(id, 10) : id;
        const beforeCount = certificationsData.length;
        certificationsData = certificationsData.filter(c => {
            const cId = typeof c.id === 'string' ? parseInt(c.id, 10) : c.id;
            return cId !== numId;
        });
        const afterCount = certificationsData.length;
        console.log(`Deleted certification item ${id}. Before: ${beforeCount}, After: ${afterCount}`);
        
        // Auto-save to localStorage
        saveCertificationsData(certificationsData);
        loadCertificationItems();
    }
}

// Save certifications to localStorage (manual save button)
function saveCertifications() {
    // Reload data from localStorage first to ensure we have latest
    certificationsData = loadCertificationsData();
    saveCertificationsData(certificationsData);
    alert('Certifications data berhasil disimpan!');
}

