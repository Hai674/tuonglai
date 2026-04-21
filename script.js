// Tab functionality
document.addEventListener('DOMContentLoaded', function() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.dataset.tab;
            
            // Remove active class
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class
            btn.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
            
            // Update progress
            updateProgress();
        });
    });

    // Progress animation
    function updateProgress() {
        const progressFill = document.getElementById('progressFill');
        progressFill.style.width = '75%';
    }

    // Auto progress
    setTimeout(() => updateProgress(), 500);
});
