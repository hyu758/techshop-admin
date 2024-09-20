document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('https://techshop-backend-c7hy.onrender.com/api/loginAdmin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            password: password,
        }),
    })
    .then(response => {
        if (response.status === 200) {
            return response.json();
        } else {
            throw new Error('Invalid credentials');
        }
    })
    .then(data => {
        const token = data.token; // Thay thế 'token' bằng tên biến đúng nếu khác
        const user = data.user; // Thay thế 'user' bằng tên biến đúng nếu khác

        // Lưu token và thông tin người dùng vào sessionStorage
        sessionStorage.setItem('userToken', token);
        sessionStorage.setItem('userData', JSON.stringify(user));

        alert('Login successful');

        // Chuyển đến trang dashboard nếu đăng nhập thành công
        window.location.href = 'dashboard.html';
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('error-message').textContent = error.message || 'Login failed';
        document.getElementById('error-message').classList.remove('hidden');
    });
});
