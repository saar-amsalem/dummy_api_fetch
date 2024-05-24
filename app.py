from flask import Flask, render_template, request, jsonify
from flask_CORS import CORS
from functions import *

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/products")
def get_products():
    query = request.args.get('q')
    page = request.args.get('page', 1, type=int)
    per_page = 5
    skip = (page - 1) * per_page
    if query is not None and len(query) > 0:
        params = "/search?q={}&limit={}&skip={}".format(query, per_page, skip)
    else:
        params = "?limit={}&skip={}".format(per_page, skip)
    products = fetch_products(params)
    return jsonify(products)


if __name__ == '__main__':
    app.run(port=5000, debug=True)
