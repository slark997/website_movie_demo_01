// Load user list từ localStorage hoặc khởi tạo mảng rỗng
function getUsers() {
  return JSON.parse(localStorage.getItem('users')) || [];
}

function saveUser(user) {
  const users = getUsers();
  users.push(user);
  localStorage.setItem('users', JSON.stringify(users));
}

function findUserByEmail(email) {
  return getUsers().find(u => u.email === email);
}

// Đăng ký
const registerForm = document.getElementById('register-form');
if (registerForm) {
  registerForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const username = registerForm.username.value.trim();
    const email = registerForm.email.value.trim();
    const password = registerForm.password.value;
    const confirmPassword = registerForm.confirm_password.value;
    const message = document.getElementById('register-message');

    if (findUserByEmail(email)) {
      message.textContent = 'Email đã được sử dụng!';
      return;
    }

    if (password !== confirmPassword) {
      message.textContent = 'Mật khẩu xác nhận không khớp!';
      return;
    }

    const newUser = { username, email, password };
    saveUser(newUser);
    message.style.color = 'green';
    message.textContent = 'Đăng ký thành công! Chuyển hướng...';

    setTimeout(() => {
      window.location.href = 'login.html';
    }, 1500);
  });
}

// Đăng nhập
const loginForm = document.getElementById('login-form');
if (loginForm) {
  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const email = loginForm.email.value.trim();
    const password = loginForm.password.value;
    const message = document.getElementById('login-message');

    const user = findUserByEmail(email);

    if (!user || user.password !== password) {
      message.textContent = 'Email hoặc mật khẩu không đúng!';
      return;
    }

    // Lưu thông tin đăng nhập
    localStorage.setItem('loggedInUser', JSON.stringify(user));
    message.style.color = 'green';
    message.textContent = 'Đăng nhập thành công!';

    setTimeout(() => {
      window.location.href = 'mainpage.html';
    }, 1000);
  });
}

// Cập nhật giao diện nút login khi đã đăng nhập (chạy trên các trang khác)
window.addEventListener('DOMContentLoaded', () => {
  const loginDiv = document.querySelector('.login');
  const user = JSON.parse(localStorage.getItem('loggedInUser'));

  if (user && loginDiv) {
    loginDiv.innerHTML = `
      <div class="user-dropdown">
        <span class="user-name">👤 ${user.username}</span>
        <div class="dropdown-content">
          <a href="#" id="logout-btn">Đăng xuất</a>
        </div>
      </div>
    `;

    // Gắn sự kiện đăng xuất
    const logoutBtn = document.getElementById('logout-btn');
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('loggedInUser');
      window.location.reload(); // Hoặc chuyển về trang đăng nhập
    });
  }
});

// Cập nhật giao diện sau khi đăng nhập
window.addEventListener('DOMContentLoaded', () => {
  const loginDiv = document.querySelector('.login');
  const user = JSON.parse(localStorage.getItem('loggedInUser'));
  
  if (user && loginDiv) {
    loginDiv.innerHTML = `
      <div class="user-info" style="display: flex; align-items: center; gap: 10px;">
        <img src="https://www.gravatar.com/avatar/?d=mp" alt="Avatar" style="width:30px;height:30px;border-radius:50%;">
        <span>${user.username}</span>
        <button id="logout-btn" style="padding: 5px 10px; cursor: pointer;">Đăng xuất</button>
      </div>
    `;
    
    // Bắt sự kiện đăng xuất
    const logoutBtn = document.getElementById('logout-btn');
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('loggedInUser');
      window.location.reload(); // hoặc chuyển hướng: window.location.href = 'login.html';
    });
  }
});
