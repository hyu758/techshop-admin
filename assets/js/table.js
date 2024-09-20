window.onload = function () {
    const userToken = localStorage.getItem('userToken');
    if (!userToken) {
        alert('Bạn cần đăng nhập!')
        // Nếu không có token, chuyển hướng về trang login
        window.location.href = 'login.html';
    }
};
document.addEventListener('DOMContentLoaded', function () {
    const itemsPerPage = 10;
    let currentPageUsers = 1;
    let currentPageProducts = 1;
    let currentPageOrders = 1;

    // Fetch users data and implement pagination
    function fetchUsersData(page) {
        fetch(`https://techshop-backend-c7hy.onrender.com/api/getUsersByPage?limit=${itemsPerPage}&page=${page - 1}`)
            .then(response => response.json())
            .then(data => {
                renderUsersTable(data, page);
                updateCurrentPage('users', page); // Update current page for users

                if (data.length < itemsPerPage) {
                    document.getElementById('next-users').disabled = true; // Vô hiệu hóa nút Next nếu không còn dữ liệu
                } else {
                    document.getElementById('next-users').disabled = false; // Bật nút Next nếu còn dữ liệu
                }
            })
            .catch(error => console.error('Error fetching users data:', error));
    }

    fetchUsersData(currentPageUsers);

    document.getElementById('prev-users').addEventListener('click', function () {
        if (currentPageUsers > 1) {
            currentPageUsers--;
            fetchUsersData(currentPageUsers);
        }
    });

    document.getElementById('next-users').addEventListener('click', function () {
        currentPageUsers++;
        fetchUsersData(currentPageUsers);
    });

    function renderUsersTable(data, page) {
        const tableBody = document.getElementById('table-users');
        tableBody.innerHTML = ''; // Clear previous rows

        data.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="px-2 py-2 border-b">${item.id}</td>
                <td class="px-2 py-2 border-b">${item.name}</td>
                <td class="px-2 py-2 border-b">${item.email}</td>
                <td class="px-2 py-2 border-b truncate">${item.password}</td>
                <td class="px-2 py-2 border-b truncate">${item.address}</td>
                <td class="px-2 py-2 border-b">${item.phone_number}</td>
                <td class="px-2 py-2 border-b">${new Date(item.created_at).toLocaleString()}</td>
                <td class="px-2 py-2 border-b">${new Date(item.updated_at).toLocaleString()}</td>
            `;
            tableBody.appendChild(row);
        });
    }

    // Fetch products data and implement pagination
    function fetchProductsData(page) {
        fetch(`https://techshop-backend-c7hy.onrender.com/api/getProductsInPage?limit=${itemsPerPage}&page=${page - 1}`)
            .then(response => response.json())
            .then(data => {
                renderProductsTable(data, page);
                updateCurrentPage('products', page); // Update current page for products

                // Kiểm tra xem có dữ liệu hay không
                if (data.length < itemsPerPage) {
                    document.getElementById('next-products').disabled = true; // Vô hiệu hóa nút Next nếu không còn dữ liệu
                } else {
                    document.getElementById('next-products').disabled = false; // Bật nút Next nếu còn dữ liệu
                }
            })
            .catch(error => console.error('Error fetching products data:', error));
    }

    fetchProductsData(currentPageProducts);

    document.getElementById('prev-products').addEventListener('click', function () {
        if (currentPageProducts > 1) {
            currentPageProducts--;
            fetchProductsData(currentPageProducts);
        }
    });

    document.getElementById('next-products').addEventListener('click', function () {
        currentPageProducts++;
        fetchProductsData(currentPageProducts);
    });

    function renderProductsTable(data, page) {
        const tableBody = document.getElementById('table-products');
        tableBody.innerHTML = ''; // Clear previous rows

        data.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="px-2 py-2 border-b">${item.id}</td>
                <td class="px-2 py-2 border-b truncate">${item.name}</td>
                <td class="px-2 py-2 border-b">${item.price}</td>
                <td class="px-2 py-2 border-b">${item.discount}</td>
                <td class="px-2 py-2 border-b">${item.sold_quantity}</td>
                <td class="px-2 py-2 border-b">${item.stock_quantity}</td>
                <td class="px-2 py-2 border-b">${item.category_id}</td>
                <td class="px-2 py-2 border-b">${item.brand}</td>
                <td class="px-2 py-2 border-b">${new Date(item.updated_at).toLocaleString()}</td>
                <td class="px-2 py-2 border-b">
                    <button class="bg-blue-500 text-white px-2 py-1 rounded edit-button" data-id="${item.id}">Edit</button>
                </td>
            `;
            tableBody.appendChild(row);
        });

        // Attach click event to edit buttons
        document.querySelectorAll('.edit-button').forEach(button => {
            button.addEventListener('click', function () {
                const productId = this.getAttribute('data-id');
                openModal(productId);
            });
        });
    }
    // Fetch orders data and implement pagination
    function fetchOrdersData(page) {
        fetch(`https://techshop-backend-c7hy.onrender.com/api/getOrdersByPage?limit=${itemsPerPage}&page=${page - 1}`) // Giảm page đi 1 vì API bắt đầu từ 0
            .then(response => response.json())
            .then(data => {
                renderOrdersTable(data);
                updateCurrentPage('orders', page); // Cập nhật trang hiện tại cho đơn hàng
                if (data.length < itemsPerPage) {
                    document.getElementById('next-orders').disabled = true;
                } else {
                    document.getElementById('next-orders').disabled = false;
                }
            })
            .catch(error => console.error('Error fetching orders data:', error));
    }

    fetchOrdersData(currentPageOrders);

    document.getElementById('prev-orders').addEventListener('click', function () {
        if (currentPageOrders > 1) {
            currentPageOrders--;
            fetchOrdersData(currentPageOrders);
        }
    });

    document.getElementById('next-orders').addEventListener('click', function () {
        currentPageOrders++;
        fetchOrdersData(currentPageOrders);
    });

    function renderOrdersTable(data) {
        const tableBody = document.getElementById('table-orders');
        tableBody.innerHTML = ''; // Xóa các hàng trước đó

        data.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
            <td class="px-2 py-2 border-b">${item.id}</td>
            <td class="px-2 py-2 border-b">${item.user_id}</td>
            <td class="px-2 py-2 border-b">${item.total_amount}</td>
            <td class="px-2 py-2 border-b">${item.status}</td>
            <td class="px-2 py-2 border-b">${new Date(item.created_at).toLocaleString()}</td>
            <td class="px-2 py-2 border-b">${new Date(item.updated_at).toLocaleString()}</td>
            <td class="px-2 py-2 border-b">${item.phone}</td>
            <td class="px-2 py-2 border-b">${item.customer_name}</td>
            <td class="px-2 py-2 border-b">${item.address}</td>
        `;
            tableBody.appendChild(row);
        });
    }

    // Function to update current page display
    function updateCurrentPage(type, page) {
        const currentPageElement = document.getElementById(`current-page-${type}`);
        currentPageElement.textContent = `Page ${page}`;
    }

    // Modal handling
    function openModal(productId) {
        fetch(`https://techshop-backend-c7hy.onrender.com/api/getProductDetails/${productId}`)
            .then(response => response.json())
            .then(data => {
                document.getElementById('readonly-input').value = productId;
                document.getElementById('edit_name').value = data.name;
                document.getElementById('edit_price').value = data.price;
                document.getElementById('edit_discount').value = data.discount;
                document.getElementById('edit_description').value = data.description;
                document.getElementById('edit_stock_quantity').value = data.stock_quantity;
                document.getElementById('edit_brand').value = data.brand;
                document.getElementById('edit_image_url').value = data.image_url;

                // Show the modal
                document.getElementById('edit-modal').classList.add('modal-show');
            })
            .catch(error => console.error('Error fetching product data:', error));
    }

    document.getElementById('close-modal').addEventListener('click', function () {
        document.getElementById('edit-modal').classList.remove('modal-show');
    });

    document.getElementById('edit-form').addEventListener('submit', function (event) {
        event.preventDefault();
        const formData = new FormData(this);
        const productData = {};

        formData.forEach((value, key) => {
            productData[key] = value;
        });

        fetch(`https://techshop-backend-c7hy.onrender.com/api/updateProduct/${productData.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData),
        })
            .then(response => response.json())
            .then(data => {
                alert('Product updated successfully');
                document.getElementById('edit-modal').classList.remove('modal-show');
                fetchProductsData(currentPageProducts); // Refresh product data after update
            })
            .catch(error => console.error('Error updating product:', error));
    });

    document.getElementById('edit_product_image').addEventListener('change', async function (event) {
        const imageFile = event.target.files[0]; // Lấy file ảnh từ input
        if (imageFile) {
            const formData = new FormData();
            formData.append('img', imageFile);
    
            try {
                const response = await fetch('https://techshop-backend-c7hy.onrender.com/api/uploadProductImage', {
                    method: 'POST',
                    body: formData
                });
                const data = await response.json();
                if (data.success) {
                    // Cập nhật trường image_url với link trả về từ API
                    alert('Cập nhật trường image url thành công!')
                    document.getElementById('edit_image_url').value = data.img_link; // Giả sử backend trả về img_link
                } else {
                    console.error(data.message);
                    alert('Upload image failed: ' + data.message);
                }
            } catch (error) {
                console.error('Error uploading image:', error);
                alert('Error uploading image');
            }
        }
    });
});
