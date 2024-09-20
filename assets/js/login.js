document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    console.log('Username:', username);
    console.log('Password:', password);

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
        // Kiểm tra mã trạng thái (status) của response từ server
        if (response.status === 200) {
            return response.json(); // Chuyển đổi response thành JSON nếu status là 200
        } else {
            throw new Error('Invalid credentials'); // Nếu không phải 200, throw lỗi
        }
    })
    .then(data => {
        console.log('Response data:', data);

        // Giả sử server trả về một token hoặc thông tin người dùng
        const token = data.token; // Thay thế 'token' bằng tên biến đúng nếu khác
        const user = data.user; // Thay thế 'user' bằng tên biến đúng nếu khác

        // Lưu token và thông tin người dùng vào localStorage
        localStorage.setItem('userToken', token);
        localStorage.setItem('userData', JSON.stringify(user));

        // Thông báo đăng nhập thành công
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
