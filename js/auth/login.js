document.getElementById('loginForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const response = await fetch('https://backend-alcaldia-5.onrender.com/api/auth/login/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });

  if (response.ok) {
    const data = await response.json();
    
    // ===== DEBUG: VER QUÉ ESTÁ DEVOLVIENDO EL BACKEND =====
    console.log('=== RESPUESTA COMPLETA DEL BACKEND ===');
    console.log(data);
    console.log('=== DATOS DEL USUARIO ===');
    console.log('Email:', data.user?.email);
    console.log('Role:', data.user?.role);
    console.log('Is Superuser:', data.user?.is_superuser);
    console.log('Is Staff:', data.user?.is_staff);
    console.log('=== FIN DEBUG ===');
    
    const token = data.access;
    const rol = data.user.role;

    localStorage.setItem('token', token);
    localStorage.setItem('rol', rol);

    // Redirige según el rol
    if (rol === 'admin') {
      console.log('Redirigiendo a panel admin');
      window.location.href = 'admin/reporte.html';
    } else if (rol === 'funcionario') {
      console.log('Redirigiendo a panel funcionario');
      window.location.href = 'funcionario/reporte.html';
    } else {
      console.log('Rol desconocido:', rol);
      alert('Rol de usuario desconocido: ' + rol);
    }
  } else {
    console.log('Error en login:', response.status);
    alert("Credenciales inválidas");
  }
});
