document.addEventListener('DOMContentLoaded', function() {
    // Logout button for desktop
    document.getElementById('logout-btn-desktop').addEventListener('click', function(event) {
        event.preventDefault();
        sessionStorage.removeItem('userToken');
        sessionStorage.removeItem('userData');
        window.location.href = 'login.html';
    });

    // Logout button for mobile
    document.getElementById('logout-btn-mobile').addEventListener('click', function(event) {
        event.preventDefault();
        sessionStorage.removeItem('userToken');
        sessionStorage.removeItem('userData');
        window.location.href = 'login.html';
    });

    // Check session after 30 minutes
    const sessionTimeout = 30 * 60 * 1000; // 30 minutes in milliseconds
    setTimeout(() => {
        sessionStorage.removeItem('userToken');
        sessionStorage.removeItem('userData');
        window.location.href = 'login.html';
    }, sessionTimeout);
});
