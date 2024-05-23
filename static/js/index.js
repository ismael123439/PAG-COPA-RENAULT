document.addEventListener('DOMContentLoaded', (event) => {
    const boton = document.getElementById('submitbtn');
    const pass = document.getElementById('passinput');
    const user = document.getElementById('userinput');
    const boton2 = document.getElementById('submitbtn2');
    
    boton.addEventListener('click', (event) => {
        event.preventDefault();
        if (user.value === "pajan" && pass.value === "gallo") {
            window.location.href = '/home';
        } else {
            alert("Credenciales incorrectas");
        }
    });

    boton2.addEventListener('click', (event) => {
        window.location.href = '/home';
    });
});
