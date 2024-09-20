window.onload = function () {
    const userToken = localStorage.getItem('userToken');
    if (!userToken) {
        alert('Bạn cần đăng nhập!')
        // Nếu không có token, chuyển hướng về trang login
        window.location.href = 'login.html';
    }
};
document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.add-product-form');
    const imageInput = document.getElementById('edit_product_image');
    const imageUrlInput = document.getElementById('edit_image_url');
    loadCategories();
    async function loadCategories() {
        const categorySelect = document.getElementById('edit_category_id');
    
        try {
            const response = await fetch('https://techshop-backend-c7hy.onrender.com/api/getAllCategoryNames');
            const categories = await response.json();
    
            // Thêm từng danh mục vào dropdown
            categories.forEach(category => {
                const option = document.createElement('option');
                option.value = category.id; // id của category
                option.textContent = category.name; // tên của category
                categorySelect.appendChild(option);
            });
        } catch (error) {
            console.error('Error fetching categories:', error);
            alert('Có lỗi khi tải danh mục. Vui lòng thử lại.');
        }
    }

    imageInput.addEventListener('change', async function (event) {
        const file = event.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('img', file); // Đảm bảo key này trùng với key trong backend

            try {
                const response = await fetch('https://techshop-backend-c7hy.onrender.com/api/uploadProductImage', { // Thay thế bằng URL API upload ảnh
                    method: 'POST',
                    body: formData
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const result = await response.json();
                if (result.success) {
                    imageUrlInput.value = result.img_link; // Cập nhật trường image_url với URL từ phản hồi
                    alert('Cập nhật trường image URL thành công!');
                } else {
                    alert('Tải lên hình ảnh thất bại: ' + result.message);
                }
            } catch (error) {
                console.error('Lỗi khi tải lên hình ảnh:', error);
                alert('Có lỗi khi tải ảnh lên. Vui lòng thử lại');
            }
        }
    });

    form.addEventListener('submit', async function (event) {
        event.preventDefault(); // Ngăn chặn form gửi mặc định

        // Lấy dữ liệu từ form
        const name = document.getElementById('edit_name').value.trim();
        const description = document.getElementById('edit_description').value.trim();
        const price = parseFloat(document.getElementById('edit_price').value.trim());
        const stock_quantity = parseInt(document.getElementById('edit_stock_quantity').value.trim(), 10);
        const category_id = parseInt(document.getElementById('edit_category_id').value.trim(), 10);
        const image_url = imageUrlInput.value.trim(); // Lấy từ input image_url
        const brand = document.getElementById('edit_brand').value.trim();

        // Kiểm tra tính hợp lệ của giá
        if (isNaN(price) || price <= 0) {
            alert('Vui lòng nhập số tiền hợp lệ!');
            return;
        }

        // Tạo đối tượng dữ liệu để gửi
        const productData = {
            name: name,
            description: description,
            price: price,
            stock_quantity: stock_quantity,
            category_id: category_id,
            image_url: image_url,
            brand: brand,
        };

        try {
            // Gửi dữ liệu đến API
            const response = await fetch('https://techshop-backend-c7hy.onrender.com/api/createProduct', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(productData)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            // Xử lý phản hồi từ API
            await response.json();
            alert('Thêm sản phẩm thành công!');
            form.reset(); // Đặt lại form sau khi thành công

        } catch (error) {
            console.error('Lỗi khi thêm sản phẩm:', error);
            alert('Có lỗi khi thêm dữ liệu. Vui lòng thử lại');
        }
    });
});