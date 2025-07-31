document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const copyBtn = document.getElementById('copyBtn');
    const usdtAddress = document.getElementById('usdtAddress');
    const alertBox = document.getElementById('alertBox');
    const depositForm = document.getElementById('depositForm');
    const fileInput = document.getElementById('screenshot');
    const fileLabel = document.querySelector('.file-label span');
    
    // Copy Address Functionality
    copyBtn.addEventListener('click', function() {
        navigator.clipboard.writeText(usdtAddress.textContent.trim())
            .then(() => {
                showAlert('USDT address copied to clipboard!', 'success');
                copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
                setTimeout(() => {
                    copyBtn.innerHTML = '<i class="far fa-copy"></i> Copy';
                }, 2000);
            })
            .catch(err => {
                showAlert('Failed to copy address', 'danger');
                console.error('Failed to copy: ', err);
            });
    });
    
    // File Upload Label Update
    fileInput.addEventListener('change', function() {
        if (this.files.length > 0) {
            fileLabel.textContent = this.files[0].name;
        } else {
            fileLabel.textContent = 'Upload Screenshot';
        }
    });
    
    // Form Submission
    depositForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const userId = document.getElementById('userId').value.trim();
        const amount = document.getElementById('amount').value;
        const screenshot = fileInput.files[0];
        
        // Validation
        if (!userId || !amount || !screenshot) {
            showAlert('Please fill all required fields', 'danger');
            return;
        }
        
        if (parseFloat(amount) < 10) {
            showAlert('Minimum deposit amount is 10 USDT', 'danger');
            return;
        }
        
        // Create FormData object
        const formData = new FormData();
        formData.append('userId', userId);
        formData.append('amount', amount);
        formData.append('screenshot', screenshot);
        
        // Here you would normally send to your backend
        // For demo, we'll simulate success
        simulateFormSubmission(formData);
    });
    
    // Show Alert Message
    function showAlert(message, type) {
        alertBox.innerHTML = `<i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i> ${message}`;
        alertBox.className = `alert alert-${type}`;
        alertBox.style.display = 'flex';
        
        setTimeout(() => {
            alertBox.style.display = 'none';
        }, 5000);
    }
    
    // Simulate form submission (replace with actual AJAX call)
    function simulateFormSubmission(formData) {
        // Show loading state
        const submitBtn = document.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        submitBtn.disabled = true;
        
        // Simulate API call delay
        setTimeout(() => {
            showAlert('Deposit submitted successfully! We will notify you once processed.', 'success');
            depositForm.reset();
            fileLabel.textContent = 'Upload Screenshot';
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // In real implementation, redirect or show confirmation
        }, 2000);
    }
});