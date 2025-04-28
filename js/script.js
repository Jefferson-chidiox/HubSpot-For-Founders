document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Close mobile menu if open
                    if (navLinks.classList.contains('active')) {
                        navLinks.classList.remove('active');
                        mobileMenuBtn.classList.remove('active');
                    }
                    
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Add animation on scroll
    const animateElements = document.querySelectorAll('.feature-card, .industry-card, .metric-card, .pricing-card');
    
    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Function to add animation class when element is in viewport
    function checkVisibility() {
        animateElements.forEach(element => {
            if (isInViewport(element)) {
                element.classList.add('animate');
            }
        });
    }
    
    // Initial check on page load
    checkVisibility();
    
    // Check on scroll
    window.addEventListener('scroll', checkVisibility);

    // Modal functionality
    const modal = document.getElementById('subscribeModal');
    const closeButton = document.getElementById('modalClose');
    let modalShown = false;
    
    // Close modal when clicking the close button
    if (closeButton) {
        closeButton.addEventListener('click', function() {
            closeModal();
        });
    }
    
    // Close modal when clicking outside the modal
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });
    
    // Close modal function
    function closeModal() {
        if (modal) {
            modal.classList.remove('show');
            document.body.classList.remove('no-scroll');
        }
    }
    
    // Show modal on 50% scroll
    function showModalOnScroll() {
        if (modalShown) return;
        
        const scrollPosition = window.scrollY;
        const totalHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercentage = (scrollPosition / totalHeight) * 100;
        
        if (scrollPercentage > 50) {
            showModal();
            modalShown = true;
        }
    }
    
    // --- Modal: Show only once per day ---
    function getTodayString() {
        const now = new Date();
        return now.getFullYear() + '-' + (now.getMonth()+1) + '-' + now.getDate();
    }
    const modalLastShown = localStorage.getItem('modalLastShown');
    const today = getTodayString();
    let modalEligible = modalLastShown !== today;

    // Only track scroll if modal hasn't been shown today
    if (!modalEligible) {
        modalShown = true;
    }

    // Show modal function
    function showModal() {
        if (modal) {
            modal.classList.add('show');
            document.body.classList.add('no-scroll');
            localStorage.setItem('modalShown', 'true');
            localStorage.setItem('modalLastShown', today);
        }
    }

    // Only track scroll if modal hasn't been shown today
    if (!modalShown && modalEligible) {
        window.addEventListener('scroll', showModalOnScroll);
    }

    // --- Affiliate Alert: Show only once per day ---
    const affiliateAlertLastShown = localStorage.getItem('affiliateAlertLastShown');
    if (affiliateAlertLastShown !== today) {
        alert("This website uses affiliate links. If you make a purchase through these links, we may earn a commission at no extra cost to you. Thank you for your support!");
        localStorage.setItem('affiliateAlertLastShown', today);
    }
});
