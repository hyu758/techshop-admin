window.onload = function () {
  const userToken = sessionStorage.getItem('userToken');
  if (!userToken) {
      alert('Bạn cần đăng nhập!')
      // Nếu không có token, chuyển hướng về trang login
      window.location.href = 'login.html';
  }
};
document.addEventListener('DOMContentLoaded', function () {
    fetch('https://techshop-backend-c7hy.onrender.com/api/getAllUsers')
      .then(response => response.json())
      .then(data => {
        // Tính tổng số người dùng
        const userCount = data.length;

        // Cập nhật số người dùng vào trang web
        const userCountElement = document.getElementById('user-count');
        if (userCountElement) {
          userCountElement.textContent = userCount.toLocaleString();
        }
      })
      .catch(error => console.error('Error fetching data:', error));

    fetch('https://techshop-backend-c7hy.onrender.com/api/getAllProducts')
      .then(response => response.json())
      .then(data => {
        const totalStockQuantity = data.reduce((total, product) => total + product.stock_quantity, 0);
        const totalSoldQuantity = data.reduce((total, product) => total + product.sold_quantity, 0);
        const totalRevenue = data.reduce((total, product) => total + (product.price * product.sold_quantity), 0);

        // Cập nhật số lượng sản phẩm vào trang web
        const productCount = document.getElementById('total-stock-quantity');
        if (productCount) {
          productCount.textContent = totalStockQuantity.toLocaleString();
        }

        // Cập nhật doanh thu vào trang web
        const revenueElement = document.getElementById('total-revenue');
        if (revenueElement) {
          revenueElement.textContent = totalRevenue.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
        }

        // Cập nhật số sản phẩm đã bán vào trang web
        const soldQuantityElement = document.getElementById('total-sold-quantity');
        if (soldQuantityElement) {
          soldQuantityElement.textContent = totalSoldQuantity.toLocaleString();
        }
      })
      .catch(error => console.error('Error fetching data:', error));
  });


  var ctx = document.getElementById("chart-bars-1").getContext("2d");
  document.addEventListener('DOMContentLoaded', function () {
    // Fetch data from the API
    fetch('https://techshop-backend-c7hy.onrender.com/api/getCustomers/2')
      .then(response => response.json())
      .then(data => {
        let sortedData = data.data.sort((a, b) => b.value - a.value);
        let labels = sortedData.map(order => order.userName);

        let chartData = sortedData.map(order => order.value);
        // Tạo biểu đồ với dữ liệu mới
        new Chart(ctx, {
          type: "bar",
          data: {
            labels: labels, // Gán labels là các userId
            datasets: [{
              label: "Total Amount",
              tension: 0.4,
              borderWidth: 0,
              borderRadius: 4,
              borderSkipped: false,
              backgroundColor: "#fff",
              data: chartData, // Gán data là total_amount
              maxBarThickness: 6
            }],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false,
              }
            },
            interaction: {
              intersect: false,
              mode: 'index',
            },
            scales: {
              y: {
                grid: {
                  drawBorder: false,
                  display: false,
                  drawOnChartArea: false,
                  drawTicks: false,
                },
                ticks: {
                  suggestedMin: 0,
                  beginAtZero: true,
                  padding: 15,
                  font: {
                    size: 14,
                    family: "Open Sans",
                    style: 'normal',
                    lineHeight: 2
                  },
                  color: "#fff"
                },
              },
              x: {
                grid: {
                  drawBorder: false,
                  display: false,
                  drawOnChartArea: false,
                  drawTicks: false
                },
                ticks: {
                  display: false
                },
              },
            },
          },
        });
      })
      .catch(error => console.error('Error fetching data:', error));
  });


  var ctx2 = document.getElementById("chart-bars-2").getContext("2d");
  document.addEventListener('DOMContentLoaded', function () {
    // Fetch data from the API
    fetch('https://techshop-backend-c7hy.onrender.com/api/getCustomers/1')
      .then(response => response.json())
      .then(data => {
        let sortedData = data.data.sort((a, b) => b.value - a.value);
        let labels = sortedData.map(order => order.userName);

        let chartData = sortedData.map(order => order.value);

        // Tạo biểu đồ với dữ liệu đã điều chỉnh
        new Chart(ctx2, {
          type: "bar",
          data: {
            labels: labels, // Gán labels là các userName
            datasets: [{
              label: "Total Amount / Order Count",
              tension: 0.4,
              borderWidth: 0,
              borderRadius: 4,
              borderSkipped: false,
              backgroundColor: "#fff",
              data: chartData, // Gán data là giá trị đã chi hoặc số lượng đơn hàng
              maxBarThickness: 6
            }],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false,
              }
            },
            interaction: {
              intersect: false,
              mode: 'index',
            },
            scales: {
              y: {
                grid: {
                  drawBorder: false,
                  display: false,
                  drawOnChartArea: false,
                  drawTicks: false,
                },
                ticks: {
                  suggestedMin: 0,
                  beginAtZero: true,
                  padding: 15,
                  font: {
                    size: 14,
                    family: "Open Sans",
                    style: 'normal',
                    lineHeight: 2
                  },
                  color: "#fff"
                },
              },
              x: {
                grid: {
                  drawBorder: false,
                  display: false,
                  drawOnChartArea: false,
                  drawTicks: false
                },
                ticks: {
                  display: false
                },
              },
            },
          },
        });
      })
      .catch(error => console.error('Error fetching data:', error));
  });