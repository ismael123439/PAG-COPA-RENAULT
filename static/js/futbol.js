document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.edit-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        let row = this.closest('.row');
        row.querySelectorAll('input').forEach(input => input.disabled = false);
        this.style.display = 'none';
        row.querySelector('.save-btn').style.display = 'inline-block';
      });
    });

    document.querySelectorAll('.save-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        let row = this.closest('.row');
        row.querySelectorAll('input').forEach(input => input.disabled = true);
        this.style.display = 'none';
        row.querySelector('.edit-btn').style.display = 'inline-block';
        // Aquí puedes agregar la lógica para guardar los cambios en la base de datos
      });
    });

    document.getElementById('add-school-btn').addEventListener('click', function() {
      let newRow = document.createElement('div');
      newRow.className = 'row bg-light text-dark py-2';
      newRow.innerHTML = `
        <div class="col border border-dark">
          <input type="text" class="form-control" placeholder="Nueva Escuela">
        </div>
        <div class="col border">
          <input type="number" class="form-control" placeholder="0">
        </div>
        <div class="col border">
          <input type="number" class="form-control" placeholder="0">
        </div>
        <div class="col border">
          <input type="number" class="form-control" placeholder="0">
        </div>
        <div class="col border">
          <input type="number" class="form-control" placeholder="0">
        </div>
        <div class="col border">
          <input type="number" class="form-control" placeholder="0">
        </div>
        <div class="col border">
          <input type="number" class="form-control" placeholder="0">
        </div>
        <div class="col border">
          <input type="number" class="form-control" placeholder="0">
        </div>
        <div class="col border d-flex align-items-center justify-content-around">
          <button class="btn btn-primary edit-btn" style="display:none;">Editar</button>
          <button class="btn btn-success save-btn">Guardar</button>
        </div>`;
      document.getElementById('school-rows').appendChild(newRow);

      // Añadir event listeners a los nuevos botones
      newRow.querySelector('.save-btn').addEventListener('click', function() {
        let row = this.closest('.row');
        row.querySelectorAll('input').forEach(input => input.disabled = true);
        this.style.display = 'none';
        row.querySelector('.edit-btn').style.display = 'inline-block';
        // Aquí puedes agregar la lógica para guardar los cambios en la base de datos
      });
    });

    document.getElementById('save-all-btn').addEventListener('click', function() {
      // Aquí puedes agregar la lógica para guardar todos los cambios en la base de datos
      console.log('Guardar todo');
    });
  });