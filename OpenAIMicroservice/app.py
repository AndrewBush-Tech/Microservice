import wikipedia
from flask import Flask, jsonify, request

app = Flask(__name__)

wikipedia.set_lang("en")

def clean_text(text):
    """
    This function removes special characters from a given text and returns the cleaned text.
    """
    # List of special characters to remove
    special_chars = "!@#$%^&*()_+=-[]{}|\\;':\"<>,.?/~`"

    # Remove special characters from text
    for char in special_chars:
        text = text.replace(char, "")

    # Convert all letters to lowercase
    text = text.lower()

    # Return cleaned text
    return text

@app.route("/search", methods=["GET"])
def search():
    one = request.args.get("one")
    two = request.args.get("two")
    three = request.args.get("three")

    # Clean search terms
    cleaned_terms = "{} {} {}".format(one, two, three)
    cleaned_terms = clean_text(cleaned_terms)

    try:
        # Search for page with cleaned terms
        page = wikipedia.page(cleaned_terms)

        # Create response dictionary
        response = {
            "title": page.title,
            "url": page.url,
            "summary": page.summary,
        }

        # Return response as JSON
        return jsonify(response)
    except wikipedia.exceptions.PageError:
        return jsonify({"error": "No results found."})
    except wikipedia.exceptions.DisambiguationError as e:
        return jsonify({"error": str(e)})


if __name__ == "__main__":
    app.run(port=8000, debug=True)
