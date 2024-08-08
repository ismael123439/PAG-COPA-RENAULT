document.addEventListener('DOMContentLoaded', (event) => {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        const formData = new FormData(loginForm);
        const username = formData.get('username');
        const password = formData.get('password');

        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded' // Aquí es mejor usar 'application/x-www-form-urlencoded' para coincidir con el método request.form.get en el backend
                },
                body: new URLSearchParams({ username, password })
            });

            if (response.redirected) {
                window.location.href = response.url;
            } else {
                const result = await response.text();
                alert(result || 'Error desconocido');
            }
        } catch (error) {
            console.error('Error de autenticación:', error.message);
            alert('Error de autenticación');
        }
    });
});
