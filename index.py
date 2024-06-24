from flask import Flask, request, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

username = 'ude5ew8s9zf8o1bw'
password = 'zucUaOmeMxamFHXfORRJ'
hostname = 'bxkcn93dxb5qzbaf2th7-mysql.services.clever-cloud.com'
database = 'bxkcn93dxb5qzbaf2th7'

app.config['SQLALCHEMY_DATABASE_URI'] = f'mysql+mysqlconnector://{username}:{password}@{hostname}/{database}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class EscuelaFutbol(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(50), nullable=False)
    pts = db.Column(db.Integer, nullable=False)
    pj = db.Column(db.Integer, nullable=False)
    pg = db.Column(db.Integer, nullable=False)
    pp = db.Column(db.Integer, nullable=False)
    gf = db.Column(db.Integer, nullable=False)
    gc = db.Column(db.Integer, nullable=False)
    dg = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return f'<EscuelaFutbol {self.id}: {self.nombre}>'

@app.route("/")
def login():
    return render_template("login.html")

@app.route("/home")
def principal():
    return render_template("index.html")

@app.route("/contacto")
def contacto():
    return render_template("contacto.html")

@app.route("/futbol", methods=['GET'])
def futbol():
    escuelas = EscuelaFutbol.query.all()
    return render_template("/deportes/futbol.html", escuelas=escuelas)

@app.route("/guardar_escuela", methods=['POST'])
def guardar_escuela():
    data = request.json

    nombre = data.get('nombre')
    pts = data.get('pts')
    pj = data.get('pj')
    pg = data.get('pg')
    pp = data.get('pp')
    gf = data.get('gf')
    gc = data.get('gc')
    dg = data.get('dg', gf - gc)
    
    nueva_escuela = EscuelaFutbol(nombre=nombre, pts=pts, pj=pj, pg=pg, pp=pp, gf=gf, gc=gc, dg=dg)
    db.session.add(nueva_escuela)
    db.session.commit()
    
    return jsonify({'message': 'Escuela guardada correctamente'}), 200

@app.route("/actualizar_escuela/<int:escuela_id>", methods=['PUT'])
def actualizar_escuela(escuela_id):
    escuela = EscuelaFutbol.query.get(escuela_id)
    if not escuela:
        return jsonify({'error': 'Escuela no encontrada'}), 404
    
    data = request.json

    escuela.nombre = data.get('nombre', escuela.nombre)
    escuela.pts = data.get('pts', escuela.pts)
    escuela.pj = data.get('pj', escuela.pj)
    escuela.pg = data.get('pg', escuela.pg)
    escuela.pp = data.get('pp', escuela.pp)
    escuela.gf = data.get('gf', escuela.gf)
    escuela.gc = data.get('gc', escuela.gc)
    escuela.dg = data.get('dg', escuela.gf - escuela.gc)

    db.session.commit()

    return jsonify({'message': 'Escuela actualizada correctamente'}), 200

@app.route("/eliminar_escuela/<int:escuela_id>", methods=['DELETE'])
def eliminar_escuela(escuela_id):
    escuela = EscuelaFutbol.query.get(escuela_id)
    if not escuela:
        return jsonify({'error': 'Escuela no encontrada'}), 404

    db.session.delete(escuela)
    db.session.commit()

    return jsonify({'message': 'Escuela eliminada correctamente'}), 200

@app.route("/guardar_todos_los_cambios", methods=['POST'])
def guardar_todos_los_cambios():
    data_to_save = request.json

    for data in data_to_save:
        escuela_id = data.get('escuela_id')
        nombre = data.get('nombre')
        pts = data.get('pts')
        pj = data.get('pj')
        pg = data.get('pg')
        pp = data.get('pp')
        gf = data.get('gf')
        gc = data.get('gc')
        dg = data.get('dg', gf - gc)

        escuela = EscuelaFutbol.query.get(escuela_id)
        if not escuela:
            return jsonify({'error': f'Escuela con ID {escuela_id} no encontrada'}), 404

        escuela.nombre = nombre
        escuela.pts = pts
        escuela.pj = pj
        escuela.pg = pg
        escuela.pp = pp
        escuela.gf = gf
        escuela.gc = gc
        escuela.dg = dg

        db.session.commit()

    return jsonify({'message': 'Todos los cambios guardados correctamente'}), 200

@app.route("/basquet")
def basquet():
    return render_template("/deportes/basquet.html")

@app.route("/voley")
def voley():
    return render_template("/deportes/voley.html")

if __name__ == '__main__':
    app.run(debug=True, port=3500)
