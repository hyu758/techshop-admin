document.addEventListener('DOMContentLoaded', function() {
    // Logout button for desktop
    document.getElementById('logout-btn-desktop').addEventListener('click', function(event) {
        event.preventDefault();
        localStorage.removeItem('userToken');
        localStorage.removeItem('userData');
        window.location.href = 'login.html';
    });

    // Logout button for mobile
    document.getElementById('logout-btn-mobile').addEventListener('click', function(event) {
        event.preventDefault();
        localStorage.removeItem('userToken');
        localStorage.removeItem('userData');
        window.location.href = 'login.html';
    });
});
