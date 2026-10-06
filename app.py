from flask import Flask, request, render_template_string

app = Flask(__name__)

html = """
<!DOCTYPE html>
<html>
<head>
    <title>Simple Calculator</title>

    <style>
        body {
            font-family: Arial, sans-serif;
            background: #f2f2f2;
            text-align: center;
            padding-top: 100px;
        }

        .calculator {
            background: white;
            width: 350px;
            margin: auto;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 0 10px gray;
        }

        h1 {
            color: #333;
        }

        input, select, button {
            width: 90%;
            padding: 12px;
            margin: 10px;
            font-size: 16px;
            box-sizing: border-box;
        }

        button {
            background: #4CAF50;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }

        button:hover {
            background: #45a049;
        }

        #result {
            margin-top: 20px;
            font-size: 22px;
            font-weight: bold;
        }
    </style>
</head>

<body>

<div class="calculator">

    <h1>Simple Calculator</h1>

    <form method="POST">

        <input type="number"
               name="num1"
               placeholder="Enter first number"
               step="any"
               required>

        <input type="number"
               name="num2"
               placeholder="Enter second number"
               step="any"
               required>

        <select name="operation">

            <option value="add">Addition (+)</option>
            <option value="subtract">Subtraction (-)</option>
            <option value="multiply">Multiplication (×)</option>
            <option value="divide">Division (÷)</option>

        </select>

        <button type="submit">Calculate</button>

    </form>

    {% if result != "" %}
        <div id="result">
            Result: {{ result }}
        </div>
    {% endif %}

</div>

</body>
</html>
"""


@app.route("/", methods=["GET", "POST"])
def calculator():

    result = ""

    if request.method == "POST":

        num1 = float(request.form["num1"])
        num2 = float(request.form["num2"])
        operation = request.form["operation"]

        if operation == "add":
            result = num1 + num2

        elif operation == "subtract":
            result = num1 - num2

        elif operation == "multiply":
            result = num1 * num2

        elif operation == "divide":

            if num2 == 0:
                result = "Cannot divide by zero"
            else:
                result = num1 / num2

    return render_template_string(html, result=result)


if __name__ == "__main__":
    app.run(debug=True)