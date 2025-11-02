'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}


// EmailJS Integration
document.addEventListener('DOMContentLoaded', function () {
    // Initialize EmailJS
    emailjs.init('MR87pdkp-Hr9AcuQ1');
    
    // Setup contact form
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();
            
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const subject = document.getElementById('subject');
            const message = document.getElementById('message');
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            
            // Validate form
            if (!validateEmailForm(name, email, subject, message)) {
                return;
            }
            
            // Show loading state
            showLoadingState(submitBtn);
            
            // Prepare template parameters
            const templateParams = {
                name: name.value.trim(),
                email: email.value.trim(),
                subject: subject.value.trim(),
                message: message.value.trim(),
                to_name: 'Hemant Borana'
            };
            
            // Send email
            emailjs.send('service_cky6mhg', 'template_j2p0d7h', templateParams)
                .then(function (response) {
                    console.log('SUCCESS!', response.status, response.text);
                    showSuccessState(submitBtn);
                    showFormMessage('Your message has been sent successfully!', 'success');
                    contactForm.reset();
                    
                    setTimeout(() => {
                        resetButtonState(submitBtn);
                    }, 4000);
                }, function (error) {
                    console.error('FAILED...', error);
                    showErrorState(submitBtn);
                    showFormMessage('Failed to send message. Please try again.', 'error');
                    
                    setTimeout(() => {
                        resetButtonState(submitBtn);
                    }, 3000);
                });
        });
    }
});

// Form validation function
function validateEmailForm(name, email, subject, message) {
    clearFormErrors();
    let isValid = true;
    
    if (!name.value || name.value.trim().length < 2) {
        showFieldError(name, 'Name must be at least 2 characters long');
        isValid = false;
    }
    
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!email.value || !emailRegex.test(email.value.trim())) {
        showFieldError(email, 'Please enter a valid email address');
        isValid = false;
    }
    
    if (!subject.value || subject.value.trim().length < 3) {
        showFieldError(subject, 'Subject must be at least 3 characters long');
        isValid = false;
    }
    
    if (!message.value || message.value.trim().length < 10) {
        showFieldError(message, 'Message must be at least 10 characters long');
        isValid = false;
    }
    
    return isValid;
}

function showFieldError(field, message) {
    field.style.borderColor = '#ff6b6b';
    
    let errorElement = field.parentNode.querySelector('.field-error');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.style.cssText = 'color: #ff6b6b; font-size: 0.8em; margin-top: 5px;';
        field.parentNode.appendChild(errorElement);
    }
    errorElement.textContent = message;
}

function clearFormErrors() {
    const errorElements = document.querySelectorAll('.field-error');
    errorElements.forEach(error => error.remove());
    
    const inputs = document.querySelectorAll('.form-input');
    inputs.forEach(input => input.style.borderColor = '');
}

function showFormMessage(text, type) {
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) existingMessage.remove();
    
    const messageDiv = document.createElement('div');
    messageDiv.className = 'form-message';
    messageDiv.style.cssText = `
        padding: 10px;
        border-radius: 8px;
        margin-bottom: 20px;
        background-color: ${type === 'success' ? '#d4edda' : '#f8d7da'};
        color: ${type === 'success' ? '#155724' : '#721c24'};
        border: 1px solid ${type === 'success' ? '#c3e6cb' : '#f5c6cb'};
    `;
    messageDiv.textContent = text;
    
    const form = document.getElementById('contact-form');
    form.insertBefore(messageDiv, form.firstChild);
    
    if (type === 'success') {
        setTimeout(() => {
            if (messageDiv.parentNode) messageDiv.remove();
        }, 5000);
    }
}

function showLoadingState(btn) {
    btn.disabled = true;
    btn.innerHTML = '<span>Sending...</span>';
    btn.style.opacity = '0.7';
}

function showSuccessState(btn) {
    btn.innerHTML = '<span>Message Sent!</span>';
    btn.style.backgroundColor = '#28a745';
}

function showErrorState(btn) {
    btn.innerHTML = '<span>Failed to Send</span>';
    btn.style.backgroundColor = '#dc3545';
}

function resetButtonState(btn) {
    btn.disabled = false;
    btn.innerHTML = '<span>Send Message</span><ion-icon name="paper-plane"></ion-icon>';
    btn.style.backgroundColor = '';
    btn.style.opacity = '';
}

function openModal(img) {
  const modal = document.getElementById("certificateModal");
  const modalImg = document.getElementById("modalImg");
  const caption = document.getElementById("caption");
  
  modal.style.display = "block";
  modalImg.src = img.src;
  caption.innerHTML = img.alt;
}

function closeModal() {
  document.getElementById("certificateModal").style.display = "none";
}

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    closeModal();
  }
});

const projectData = {
  cnms: {
    title: "CN Management System - PWA",
    category: "Business Automation",
    image: "./assests/images/project-cnms.png",
    description: "A comprehensive Progressive Web App for automated credit note management with Google Workspace integration. Built in just 2 days using AI assistance and successfully deployed in production. Features automated PDF generation, email automation, WhatsApp integration, cloud storage, offline support, and real-time analytics. Seamlessly integrates with Google Sheets, Drive, Gmail, and Firebase for complete workflow automation from CN creation to distribution and tracking.",
    techStack: ["React", "TypeScript", "Firebase", "Google Apps Script", "Tailwind CSS", "PWA", "IndexedDB", "Google Workspace APIs"],
    links: [
      { text: "Project Overview", url: "https://hemantborana.github.io/credit-note-automation-app/project.html", type: "primary", icon: "open-outline" },
      { text: "Setup Guide", url: "https://github.com/hemantborana/credit-note-automation-app/blob/main/SETUP.md", type: "secondary", icon: "document-outline" },
      { text: "Source Code", url: "https://github.com/hemantborana/credit-note-automation-app", type: "secondary", icon: "logo-github" }
    ]
  },
  doms: {
    title: "Distributor Order Management – with Analytics",
    category: "Full-Stack Web Dev",
    image: "./assests/images/project-doms.png",
    description: "A comprehensive web application designed to streamline distributor operations with integrated analytics. Features include real-time order tracking, inventory management, sales analytics, and automated reporting. Built with responsive design principles to ensure optimal performance across all devices.",
    techStack: ["HTML/CSS", "JavaScript", "APIs", "Excel Export"],
    links: [
      { text: "Live Demo", url: "https://hemantborana.github.io/D-OMS/", type: "primary", icon: "open-outline" },
      { text: "Source Code", url: "https://github.com/hemantborana/D-OMS", type: "secondary", icon: "logo-github" }
    ]
  },
  edss: {
    title: "Enterprise DMS Sales Report Scraper",
    category: "Data Science",
    image: "./assests/images/project-edss.png",
    description: "An automated web scraping solution for extracting and analyzing sales data from enterprise DMS platforms, featuring comprehensive reporting with email notifications and multiple export formats. Successfully deployed in production environments for over 2 months with proven business reliability. Built with Python Selenium for robust data extraction, automated login & navigation, multi-page data handling, and party-wise data consolidation with target tracking.",
    techStack: ["Python", "Selenium", "Web Scraping", "Data Analysis", "Automated Reporting", "Email Notifications", "CSV/JSON/PDF Export"],
    links: [
      { text: "Main Script", url: "https://github.com/hemantborana/enterprise-sales-data-extractor/blob/main/dms_scraper.py", type: "primary", icon: "code-outline" },
      { text: "Config File", url: "https://github.com/hemantborana/enterprise-sales-data-extractor/blob/main/config.py", type: "secondary", icon: "settings-outline" },
      { text: "Sample Output", url: "https://github.com/hemantborana/enterprise-sales-data-extractor/blob/main/sample_outputs/mail_sample.pdf", type: "secondary", icon: "document-outline" },
      { text: "Source Code", url: "https://github.com/hemantborana/enterprise-sales-data-extractor", type: "secondary", icon: "logo-github" }
    ]
  },
  rssa: {
    title: "Retail Supermarket Sales & Profit Analysis",
    category: "Business Analytics",
    image: "./assests/images/project-rssa.png",
    description: "Comprehensive data analytics project analyzing supermarket sales patterns, profit margins, and customer behavior. Utilized advanced Excel functions, pivot tables, and linear programming optimization to identify trends and provide actionable business insights for revenue optimization.",
    techStack: ["Excel", "Data Analysis", "Pivot Tables", "Linear Programming"],
    links: [
      { text: "View Report", url: "https://github.com/hemantborana/Retail-Supermarket-Analytics/blob/main/Project_Files/Retail_Supermarket_Analysis_Report.docx", type: "primary", icon: "document-outline" },
      { text: "Source Code", url: "https://github.com/hemantborana/Retail-Supermarket-Analytics", type: "secondary", icon: "logo-github" }
    ]
  },
  hrea: {
    title: "HR Attrition Analysis Excel",
    category: "Business Analytics",
    image: "./assests/images/project-hrea.png",
    description: "A comprehensive data analytics project focused on understanding employee attrition patterns and predicting workforce turnover using advanced Excel techniques including pivot tables, regression analysis, and interactive dashboards. Analyzed 1,470 employee records across 36 variables to identify key factors contributing to workforce turnover and provide actionable insights for HR decision-making.",
    techStack: ["Excel", "Data Analysis", "Pivot Tables", "Regression Analysis", "What-If Analysis"],
    links: [
      { text: "Dashboard Preview", url: "https://github.com/hemantborana/HR-Employee-Attrition-Analysis/blob/main/screenshots/Dashboard_overview.png", type: "primary", icon: "analytics-outline" },
      { text: "Source Code", url: "https://github.com/hemantborana/HR-Employee-Attrition-Analysis", type: "secondary", icon: "logo-github" }
    ]
  },
  hraml: {
    title: "HR Attrition Analysis - ML Python",
    category: "Data Science",
    image: "./assests/images/project-hraml.png",
    description: "A comprehensive data analytics and machine learning project focused on understanding employee attrition patterns using Python and Jupyter Notebook. Employed advanced statistical analysis, data visualization techniques, and predictive modeling to analyze 1,470 employee records across 35+ variables. Created interactive visualizations and derived actionable insights for HR decision-making using pandas, matplotlib, seaborn, and plotly libraries.",
    techStack: ["Python", "Jupyter Notebook", "pandas", "matplotlib", "seaborn", "plotly", "Machine Learning"],
    links: [
      { text: "Jupyter Notebook", url: "https://github.com/hemantborana/HR-Attrition-Analysis-ML-Python/blob/main/notebooks/employee_attrition_analysis.ipynb", type: "primary", icon: "analytics-outline" },
      { text: "Source Code", url: "https://github.com/hemantborana/HR-Attrition-Analysis-ML-Python", type: "secondary", icon: "logo-github" }
    ]
  },
  rsfs: {
    title: "Retail Sales Forecasting System - ML",
    category: "Data Science",
    image: "./assests/images/project-rsfs.png",
    description: "Advanced machine learning system for retail demand prediction developed during TCS iON RIO 125 internship. Analyzed 200,000 records across 4 years (2020-2023) using Gradient Boosting algorithm to achieve 99.41% R² accuracy and 3.44% MAPE. Features comprehensive data pipeline from generation to forecasting, seasonal pattern analysis, risk assessment, and business recommendations for inventory optimization and procurement planning.",
    techStack: ["Python", "Scikit-learn", "Pandas", "NumPy", "Matplotlib", "Seaborn", "Jupyter Notebook", "Gradient Boosting", "Time Series Analysis"],
    links: [
      { text: "Jupyter Notebook", url: "https://github.com/hemantborana/TCS-iON-RIO-Retail-Sales-Forecasting/blob/main/retail_sales_forecasting_system.ipynb", type: "primary", icon: "analytics-outline" },
      { text: "Source Code", url: "https://github.com/hemantborana/TCS-iON-RIO-Retail-Sales-Forecasting", type: "secondary", icon: "logo-github" },
      { text: "Video Explanation", url: "https://github.com/hemantborana/TCS-iON-RIO-Retail-Sales-Forecasting/blob/main/presentation/TSC%20iON%20RIO%20Project%20Explanation.mp4", type: "secondary", icon: "play-outline" }
    ]
  }
};  

// Project Modal Functionality
const projectModalContainer = document.querySelector('[data-project-modal-container]');
const projectModalCloseBtn = document.querySelector('[data-project-modal-close-btn]');
const projectModalTriggers = document.querySelectorAll('[data-project-modal-trigger]');

// Modal elements
const modalProjectImg = document.querySelector('[data-modal-project-img]');
const modalProjectTitle = document.querySelector('[data-modal-project-title]');
const modalProjectCategory = document.querySelector('[data-modal-project-category]');
const modalProjectDescription = document.querySelector('[data-modal-project-description]');
const modalTechTags = document.querySelector('[data-modal-tech-tags]');
const modalProjectLinks = document.querySelector('[data-modal-project-links]');

// Open modal
projectModalTriggers.forEach(trigger => {
  trigger.addEventListener('click', (e) => {
    e.preventDefault();
    const projectId = trigger.getAttribute('data-project-modal-trigger');
    const project = projectData[projectId];
    
    if (project) {
      // Populate modal content
      modalProjectImg.src = project.image;
      modalProjectImg.alt = project.title;
      modalProjectTitle.textContent = project.title;
      modalProjectCategory.textContent = project.category;
      modalProjectDescription.textContent = project.description;
      
      // Tech stack tags
      modalTechTags.innerHTML = '';
      project.techStack.forEach(tech => {
        const tag = document.createElement('span');
        tag.className = 'tech-tag';
        tag.textContent = tech;
        modalTechTags.appendChild(tag);
      });
      
      // Project links
      modalProjectLinks.innerHTML = '';
      project.links.forEach(link => {
        const linkElement = document.createElement('a');
        linkElement.href = link.url;
        linkElement.target = '_blank';
        linkElement.className = `modal-btn modal-btn-${link.type}`;
        linkElement.innerHTML = `
          <span>${link.text}</span>
          <ion-icon name="${link.icon}"></ion-icon>
        `;
        modalProjectLinks.appendChild(linkElement);
      });
      
      // Show modal
      projectModalContainer.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  });
});

// Close modal
const closeProjectModal = () => {
  projectModalContainer.classList.remove('active');
  document.body.style.overflow = 'auto';
};

projectModalCloseBtn.addEventListener('click', closeProjectModal);

// Close modal on overlay click
projectModalContainer.addEventListener('click', (e) => {
  if (e.target === projectModalContainer) {
    closeProjectModal();
  }
});

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && projectModalContainer.classList.contains('active')) {
    closeProjectModal();
  }
});
