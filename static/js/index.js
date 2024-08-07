document.addEventListener('DOMContentLoaded', function() {
    // edita una escuela
    document.querySelectorAll('.edit-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        let row = this.closest('.row');
        row.querySelectorAll('input').forEach(input => input.disabled = false);
        this.style.display = 'none';
        row.querySelector('.save-btn').style.display = 'inline-block';
      });
    });
  
    // guarda cambios en una escuela existente
    let deporte = 'futbol';
  
    document.querySelectorAll('.save-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        let row = this.closest('.row');
        let escuelaId = row.dataset.id;
        let categoria = row.dataset.categoria; // Obtén la categoría de la escuela
  
        // Obtén los valores de los campos de entrada
        let nombre = row.querySelector('.nombre').value;
        let pts = parseInt(row.querySelector('.pts').value);
        let pj = parseInt(row.querySelector('.pj').value);
        let pg = parseInt(row.querySelector('.pg').value);
        let pp = parseInt(row.querySelector('.pp').value);
        let gf = parseInt(row.querySelector('.gf').value);
        let gc = parseInt(row.querySelector('.gc').value);
        let dg = gf - gc;
  
        // Prepara los datos para enviar
        let data = {
          nombre: nombre,
          pts: pts,
          pj: pj,
          pg: pg,
          pp: pp,
          gf: gf,
          gc: gc,
          dg: dg
        };
  
        // Realiza la solicitud de actualización
        fetch(`/actualizar_escuela/${deporte}/${categoria}/${escuelaId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        .then(response => {
          if (response.ok) {
            // Actualiza los valores en la interfaz de usuario
            row.querySelector('.nombre').value = nombre;
            row.querySelector('.pts').value = pts;
            row.querySelector('.pj').value = pj;
            row.querySelector('.pg').value = pg;
            row.querySelector('.pp').value = pp;
            row.querySelector('.gf').value = gf;
            row.querySelector('.gc').value = gc;
            row.querySelector('.dg').value = dg;
  
            // Deshabilita inputs y muestra el botón de editar nuevamente
            row.querySelectorAll('input').forEach(input => input.disabled = true);
            btn.style.display = 'none';
            row.querySelector('.edit-btn').style.display = 'inline-block';
          }
        })
        .catch(error => console.error('Error al actualizar escuela:', error));
      });
    });
  
    // elimina una escuela
    document.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        let row = this.closest('.row');
        let escuelaId = row.dataset.id;
        let categoria = row.dataset.categoria;
        let deporte = "futbol";
        
        fetch(`/eliminar_escuela/${deporte}/${categoria}/${escuelaId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(response => {
          if (response.ok) {
            row.remove();
          } else {
            return response.json().then(data => {
              console.error('Error al eliminar escuela:', data.error);
            });
          }
        })
        .catch(error => console.error('Error al eliminar escuela:', error));
      });
    });
  
    // agrega una nueva escuela
    document.querySelectorAll('.add-school-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        let categoria = btn.dataset.categoria; // Obtén la categoría a la que se va a agregar
  
        // Verificar si ya existe una fila de nueva escuela en la parte inferior
        let existingNewRow = document.querySelector(`#school-rows-${categoria} .new-school-row`);
        if (existingNewRow) {
          return; // Evitar agregar una nueva fila si ya existe una
        }
  
        let newRow = document.createElement('div');
        newRow.className = 'row bg-light text-dark py-2 new-school-row'; 
        newRow.dataset.categoria = categoria; // Asigna la categoría a la nueva fila
        newRow.innerHTML = `
          <div class="col border border-dark">
            <input type="text" class="form-control nombre" placeholder="Nombre Escuela">
          </div>
          <div class="col border">
            <input type="number" class="form-control pts" placeholder="Pts">
          </div>
          <div class="col border">
            <input type="number" class="form-control pj" placeholder="PJ">
          </div>
          <div class="col border">
            <input type="number" class="form-control pg" placeholder="PG">
          </div>
          <div class="col border">
            <input type="number" class="form-control pp" placeholder="PP">
          </div>
          <div class="col border">
            <input type="number" class="form-control gf" placeholder="GF">
          </div>
          <div class="col border">
            <input type="number" class="form-control gc" placeholder="GC">
          </div>
          <div class="col border">
            <input type="number" class="form-control dg" placeholder="DG" disabled>
          </div>
          <div class="col border d-flex align-items-center justify-content-around">
            <button class="btn btn-primary edit-btn" style="display:none;">Editar</button>
            <button class="btn btn-success save-btn">Guardar</button>
            <button class="btn btn-danger delete-btn">Eliminar</button>
          </div>`;
        document.getElementById(`school-rows-${categoria}`).appendChild(newRow);
  
        newRow.querySelector('.save-btn').addEventListener('click', function() {
          let row = this.closest('.row');
          let nombre = row.querySelector('.nombre').value;
          let pts = parseInt(row.querySelector('.pts').value);
          let pj = parseInt(row.querySelector('.pj').value);
          let pg = parseInt(row.querySelector('.pg').value);
          let pp = parseInt(row.querySelector('.pp').value);
          let gf = parseInt(row.querySelector('.gf').value);
          let gc = parseInt(row.querySelector('.gc').value);
          let dg = gf - gc;
  
          let data = {
            nombre: nombre,
            pts: pts,
            pj: pj,
            pg: pg,
            pp: pp,
            gf: gf,
            gc: gc,
            dg: dg
          };
  
          fetch(`/guardar_escuela/${categoria}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          })
          .then(response => {
            if (response.ok) {
              row.querySelectorAll('input').forEach(input => input.disabled = true);
              this.style.display = 'none';
              row.querySelector('.edit-btn').style.display = 'inline-block';
            }
          })
          .catch(error => console.error('Error al guardar nueva escuela:', error));
        });
  
        newRow.querySelector('.delete-btn').addEventListener('click', function() {
          newRow.remove();
        });
      });
    });
  });
  