from flask import Flask, request, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)

CORS(app)

username = 'ude5ew8s9zf8o1bw'
password = 'zucUaOmeMxamFHXfORRJ'
hostname = 'bxkcn93dxb5qzbaf2th7-mysql.services.clever-cloud.com'
database = 'mysql://ude5ew8s9zf8o1bw:zucUaOmeMxamFHXfORRJ@bxkcn93dxb5qzbaf2th7-mysql.services.clever-cloud.com:3306/bxkcn93dxb5qzbaf2th7'

app.config['SQLALCHEMY_DATABASE_URI'] = f'mysql+mysqlconnector://{username}:{password}@{hostname}/{database}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# 6. Crear un objeto db, para informar a la app que se trabajará con sqlalchemy
db = SQLAlchemy(app)

@app.route("/")
def login():
    return render_template("login.html")

@app.route("/home")
def principal():
    return render_template("index.html")

@app.route("/contacto")
def contacto():
    return render_template("contacto.html")

@app.route("/futbol")
def futbol():
    return render_template("/deportes/futbol.html")

@app.route("/basquet")
def basquet():
    return render_template("/deportes/basquet.html")

@app.route("/voley")
def voley():
    return render_template("/deportes/voley.html")


if __name__ == 	'__main__':
    app.run(debug=True,port=3500)