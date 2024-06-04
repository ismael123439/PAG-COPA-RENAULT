from flask import Flask, render_template

app=Flask(__name__)

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