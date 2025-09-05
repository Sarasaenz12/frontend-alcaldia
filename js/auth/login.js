document.getElementById('loginForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    console.log('Intentando login...'); 
    
    const response = await fetch('https://backend-alcaldia-5.onrender.com/api/auth/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ 
        username: 'admin', 
        email: email,      
        password: password 
      })
    });

    console.log('Response status:', response.status);

    if (response.ok) {
      const data = await response.json();
      console.log('Login exitoso:', data);
      
      const token = data.access;
      const rol = data.user.role || (data.user.is_staff ? 'admin' : 'funcionario');

      localStorage.setItem('token', token);
      localStorage.setItem('rol', rol);

      // Redirigir según el rol
      if (rol === 'admin' || data.user.is_staff) {
        window.location.href = 'admin/reporte.html';
      } else if (rol === 'funcionario') {
        window.location.href = 'funcionario/reporte.html';
      } else {
        window.location.href = 'admin/reporte.html';
      }
    } else {
      const errorText = await response.text();
      console.error('Error de login:', response.status, errorText);
      alert("Credenciales inválidas. Código: " + response.status);
    }
  } catch (error) {
    console.error('Error en la petición:', error);
    alert("Error de conexión: " + error.message);
  }
});
