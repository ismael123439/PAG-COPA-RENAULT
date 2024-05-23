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

@app.route("/deportes")
def futbol():
    return render_template("deportes.html")

if __name__ == 	'__main__':
    app.run(debug=True,port=3500)