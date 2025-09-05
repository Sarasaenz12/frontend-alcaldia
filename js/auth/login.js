document.getElementById('loginForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    console.log('Intentando login...'); // Para debugging
    
    const response = await fetch('https://backend-alcaldia-5.onrender.com/api/auth/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        username: 'admin', // Usar username fijo por ahora
        email: email,      // También enviar email por compatibilidad
        password: password 
      })
    });

    console.log('Response status:', response.status); // Para debugging

    if (response.ok) {
      const data = await response.json();
      console.log('Login exitoso:', data);
      
      const token = data.access;
      const rol = data.user.role || data.user.is_staff ? 'admin' : 'funcionario'; // Fallback si no hay role

      localStorage.setItem('token', token);
      localStorage.setItem('rol', rol);

      // Redirige según el rol
      if (rol === 'admin' || data.user.is_staff) {
        window.location.href = 'admin/reporte.html';
      } else if (rol === 'funcionario') {
        window.location.href = 'funcionario/reporte.html';
      } else {
        // Fallback si no se puede determinar el rol
        window.location.href = 'admin/reporte.html';
      }
    } else {
      const errorData = await response.json().catch(() => ({}));
      console.error('Error de login:', response.status, errorData);
      alert("Credenciales inválidas. Código: " + response.status);
    }
  } catch (error) {
    console.error('Error en la petición:', error);
    alert("Error de conexión: " + error.message);
  }
});
