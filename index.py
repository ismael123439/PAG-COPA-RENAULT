from flask import Flask, request, jsonify, render_template, session, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)
app.secret_key = os.urandom(24)
#app.secret_key = os.environ.get('FLASK_SECRET_KEY', 'hola125')

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

class EscuelaVoley(db.Model):
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
        return f'<EscuelaVoley {self.id}: {self.nombre}>'

class EscuelaBasquet(db.Model):
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
        return f'<EscuelaBasquet {self.id}: {self.nombre}>'

@app.route("/login", methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')

        if username == 'admin' and password == 'adminpassword':
            session['es_admin'] = True
            return redirect(url_for('principal')) 
        else:
            return render_template('login.html', error='Credenciales incorrectas')

    return render_template('login.html')

@app.route("/logout")
def logout():
    session.pop('es_admin', None)
    return redirect(url_for('principal'))

@app.route("/")
def principal():
    es_admin = session.get('es_admin', False)
    print(f'Es administrador: {es_admin}')
    return render_template("index.html", es_admin=es_admin)

@app.route("/contacto")
def contacto():
    return render_template("contacto.html")

@app.route("/futbol", methods=['GET'])
def futbol():
    escuelas = EscuelaFutbol.query.all()
    es_admin = session.get('es_admin', False)
    return render_template("/deportes/futbol.html", escuelas=escuelas, es_admin=es_admin)

@app.route("/voley", methods=['GET'])
def voley():
    escuelas = EscuelaVoley.query.all()
    es_admin = session.get('es_admin', False)
    return render_template("/deportes/voley.html", escuelas=escuelas, es_admin=es_admin)

@app.route("/basquet", methods=['GET'])
def basquet():
    escuelas = EscuelaBasquet.query.all()
    es_admin = session.get('es_admin', False)
    return render_template("/deportes/basquet.html", escuelas=escuelas, es_admin=es_admin)

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

@app.route("/guardar_escuela/voley", methods=['POST'])
def guardar_escuela_voley():
    data = request.json

    nombre = data.get('nombre')
    pts = data.get('pts')
    pj = data.get('pj')
    pg = data.get('pg')
    pp = data.get('pp')
    gf = data.get('gf')
    gc = data.get('gc')
    dg = data.get('dg', gf - gc)
    
    nueva_escuela = EscuelaVoley(nombre=nombre, pts=pts, pj=pj, pg=pg, pp=pp, gf=gf, gc=gc, dg=dg)
    db.session.add(nueva_escuela)
    db.session.commit()
    
    return jsonify({'message': 'Escuela guardada correctamente'}), 200

@app.route("/guardar_escuela/basquet", methods=['POST'])
def guardar_escuela_basquet():
    data = request.json

    nombre = data.get('nombre')
    pts = data.get('pts')
    pj = data.get('pj')
    pg = data.get('pg')
    pp = data.get('pp')
    gf = data.get('gf')
    gc = data.get('gc')
    dg = data.get('dg', gf - gc)
    
    nueva_escuela = EscuelaBasquet(nombre=nombre, pts=pts, pj=pj, pg=pg, pp=pp, gf=gf, gc=gc, dg=dg)
    db.session.add(nueva_escuela)
    db.session.commit()
    
    return jsonify({'message': 'Escuela guardada correctamente'}), 200

@app.route("/actualizar_escuela/<string:deporte>/<int:escuela_id>", methods=['PUT'])
def actualizar_escuela(deporte, escuela_id):
    if deporte == 'futbol':
        Escuela = EscuelaFutbol
    elif deporte == 'voley':
        Escuela = EscuelaVoley
    elif deporte == 'basquet':
        Escuela = EscuelaBasquet
    else:
        return jsonify({'error': 'Deporte no válido'}), 400

    escuela = Escuela.query.get(escuela_id)
    if not escuela:
        return jsonify({'error': f'Escuela de {deporte.capitalize()} no encontrada'}), 404
    
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

    return jsonify({'message': f'Escuela de {deporte.capitalize()} actualizada correctamente'}), 200

@app.route("/eliminar_escuela/<string:deporte>/<int:escuela_id>", methods=['DELETE'])
def eliminar_escuela(deporte, escuela_id):
    if deporte == 'futbol':
        escuela = EscuelaFutbol.query.get(escuela_id)
    elif deporte == 'voley':
        escuela = EscuelaVoley.query.get(escuela_id)
    elif deporte == 'basquet':
        escuela = EscuelaBasquet.query.get(escuela_id)
    else:
        return jsonify({'error': 'Deporte no válido'}), 400

    if not escuela:
        return jsonify({'error': f'Escuela de {deporte} no encontrada'}), 404

    db.session.delete(escuela)
    db.session.commit()

    return jsonify({'message': f'Escuela de {deporte} eliminada correctamente'}), 200


if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.secret_key = "hola"
    app.run(debug=True, port=3500)
