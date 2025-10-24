// ===================================
// EmailJS Integration
// ===================================

// EmailJS Configuration
const EMAIL_CONFIG = {
    serviceID: 'service_81dmn1r',
    templateID: 'template_5qecreg',
    publicKey: '7yRLxdXAf0ljLXatW'
};

// Initialize EmailJS when the page loads
(function() {
    emailjs.init(EMAIL_CONFIG.publicKey);
})();

// Handle form submission
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form button
            const submitButton = contactForm.querySelector('button[type="submit"]');
            
            // Show loading state
            if (window.portfolioUtils) {
                window.portfolioUtils.showButtonLoading(submitButton);
            }
            
            // Clear previous status
            formStatus.className = 'form-status';
            formStatus.textContent = '';
            formStatus.style.display = 'none';
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };            // Send email using EmailJS
            emailjs.send(
                EMAIL_CONFIG.serviceID,
                EMAIL_CONFIG.templateID,
                formData
            )
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                
                // Show success message
                formStatus.className = 'form-status success';
                formStatus.textContent = '✓ Message sent successfully! I\'ll get back to you soon.';
                formStatus.style.display = 'block';
                
                // Reset form
                contactForm.reset();
                
                // Hide loading state
                if (window.portfolioUtils) {
                    window.portfolioUtils.hideButtonLoading(submitButton);
                }
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    formStatus.style.display = 'none';
                }, 5000);
                
            }, function(error) {
                console.log('FAILED...', error);
                
                // Show error message
                formStatus.className = 'form-status error';
                formStatus.textContent = '✗ Failed to send message. Please try again or email me directly.';
                formStatus.style.display = 'block';
                
                // Hide loading state
                if (window.portfolioUtils) {
                    window.portfolioUtils.hideButtonLoading(submitButton);
                }
                
                // Hide error message after 7 seconds
                setTimeout(() => {
                    formStatus.style.display = 'none';
                }, 7000);
            });
        });
    }
});

// ===================================
// EmailJS Setup Instructions
// ===================================

/*
HOW TO SET UP EMAILJS:

1. Create an Account:
   - Go to https://www.emailjs.com/
   - Sign up for a free account

2. Add Email Service:
   - Go to "Email Services" in the dashboard
   - Click "Add New Service"
   - Choose your email provider (Gmail, Outlook, etc.)
   - Follow the setup instructions
   - Note your Service ID

3. Create Email Template:
   - Go to "Email Templates" in the dashboard
   - Click "Create New Template"
   - Use these template variables in your email template:
     * {{name}} - Sender's name
     * {{email}} - Sender's email
     * {{subject}} - Email subject
     * {{message}} - Email message
   
   Example template:
   -------------------
   Subject: New Contact from {{name}}
   
   From: {{name}}
   Email: {{email}}
   Subject: {{subject}}
   
   Message:
   {{message}}
   -------------------
   
   - Note your Template ID

4. Get Your Public Key:
   - Go to "Account" > "General"
   - Find your Public Key (also called User ID)

5. Update the Configuration:
   - Replace the values in EMAIL_CONFIG above with your actual:
     * Service ID
     * Template ID
     * Public Key

6. Test Your Form:
   - Open your portfolio website
   - Fill out the contact form
   - Submit and check your email

SECURITY NOTE:
- The public key is safe to use in client-side code
- EmailJS has rate limiting to prevent abuse
- Consider adding reCAPTCHA for additional security

TROUBLESHOOTING:
- Check browser console for errors
- Verify all IDs are correct
- Make sure EmailJS service is active
- Check spam folder for test emails
- Verify email template is enabled

FREE TIER LIMITS:
- 200 emails per month
- Upgrade to paid plan if you need more

For more help, visit: https://www.emailjs.com/docs/
*/
