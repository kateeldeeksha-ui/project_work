from flask import Flask, request, jsonify, send_file

app = Flask(__name__)


# Open the HTML page
@app.route("/")
def home():
    return send_file("frontend.html")


# Calculator backend
@app.route("/calculate", methods=["POST"])
def calculate():

    data = request.get_json()

    num1 = float(data["num1"])
    num2 = float(data["num2"])
    operation = data["operation"]

    if operation == "add":
        result = num1 + num2

    elif operation == "subtract":
        result = num1 - num2

    elif operation == "multiply":
        result = num1 * num2

    elif operation == "divide":

        if num2 == 0:
            return jsonify({"result": "Cannot divide by zero"})

        result = num1 / num2

    else:
        return jsonify({"result": "Invalid operation"})

    return jsonify({"result": result})


if __name__ == "__main__":
    app.run(debug=True)