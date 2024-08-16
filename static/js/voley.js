document.addEventListener('DOMContentLoaded', function () {
  // configurar botones de editar, guardar y eliminar
  function setupRowActions(containerId, categoria) {
    const container = document.getElementById(containerId);

    // editar una escuela
    container.querySelectorAll('.edit-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        let row = this.closest('.row');
        row.querySelectorAll('input').forEach(input => input.disabled = false);
        this.style.display = 'none';
        row.querySelector('.save-btn').style.display = 'inline-block';
      });
    });

    // guardar cambios en una escuela existente
    container.querySelectorAll('.save-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        let row = this.closest('.row');
        let escuelaId = row.dataset.id;

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

        fetch(`/actualizar_escuela/${categoria.toLowerCase()}/${escuelaId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
          .then(response => {
            if (response.ok) {
              // deshabilita inputs y muestra el botón de editar nuevamente
              row.querySelectorAll('input').forEach(input => input.disabled = true);
              btn.style.display = 'none';
              row.querySelector('.edit-btn').style.display = 'inline-block';
            } else {
              return response.json().then(data => {
                console.error('Error al actualizar escuela:', data.error);
              });
            }
          })
          .catch(error => console.error('Error al actualizar escuela:', error));
      });
    });

    // eliminar una escuela
    container.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        let row = this.closest('.row');
        let escuelaId = row.dataset.id;

        fetch(`/eliminar_escuela/${categoria.toLowerCase()}/${escuelaId}`, {
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
  }

  // agregar una nueva fila
  function addSchoolRow(containerId, categoria) {
    let newRow = document.createElement('div');
    newRow.className = 'row bg-light text-dark py-2 new-school-row';
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

    document.getElementById(containerId).appendChild(newRow);

    newRow.querySelector('.save-btn').addEventListener('click', function () {
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
        dg: dg,
        categoria: categoria
      };

      fetch('/guardar_escuela/voley', {
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
          } else {
            return response.json().then(data => {
              console.error('Error al guardar nueva escuela:', data.error);
            });
          }
        })
        .catch(error => console.error('Error al guardar nueva escuela:', error));
    });

    newRow.querySelector('.delete-btn').addEventListener('click', function () {
      newRow.remove();
    });
  }

  // configurar acciones para las filas de ambas categorías
  setupRowActions('school-rows-mayor', 'voley');
  setupRowActions('school-rows-menor', 'voley');

  // agregar una nueva escuela en ambas categorías
  if (document.getElementById('add-school-btn-mayor')) {
    document.getElementById('add-school-btn-mayor').addEventListener('click', function () {
      addSchoolRow('school-rows-mayor', 'Mayor');
    });
  }

  if (document.getElementById('add-school-btn-menor')) {
    document.getElementById('add-school-btn-menor').addEventListener('click', function () {
      addSchoolRow('school-rows-menor', 'Menor');
    });
  }
});
