# CS-361/weather-app (project)
In the project directory, you can run:
### `npm install`
### `npm start`
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
The page will reload when you make changes.\
You may also see any lint errors in the console.
# CS-361/OpenAI (partner's test project)
In the project directory, you can run:
### `pip install -r requirements.txt`
### `flask run`
Runs the app in the development mode.\
Open [http://localhost:5000](http://localhost:5000) to view it in your browser.
# quakes-main (partner's Microservice)
In the project directory, you can run:
### `python quakeFlask.py`

# CS-361/OpenAIMicroservice (project microservice)
## How to REQUEST data from the microservice:
### WAY ONE (get request from URL):
* Include "https://fejxhfgkg7.execute-api.us-east-2.amazonaws.com/Beta/search".
* Include three parameters at end of URL one="put parameter here", two="put parameter here",three="put parameter here".

#### Example call from URL:
#### https://fejxhfgkg7.execute-api.us-east-2.amazonaws.com/Beta/search?one=Python&two=version&three=3:

### WAY TWO (getting parameters from user and passing as a POST request):
* Include https://fejxhfgkg7.execute-api.us-east-2.amazonaws.com/Beta/search in HTTP request.
* Include requests for the three parameters as inputs from users.
* Either use as json and/or print to page/console.

#### Example call using Flask:
#### @app.route("/", methods=("GET", "POST"))
#### def index():
####     if request.method == "POST":
####         one = request.form["one"]
####         two = request.form["two"]
####         three = request.form["three"]
####         api_url = 'https://fejxhfgkg7.execute-api.us-east-2.amazonaws.com/Beta/search'
####         wikiresponse = requests.get(api_url, params={'one': one, 'two': two, 'three': three})
####         summary = wikiresponse.json()['summary']
####         print(summary)

## How to RECEIVE data from the microservice:
* Send an request to AWS services as stated above and will recieve a request and return an application/JSON file.
* By eliminating special characters and changing all letters to lowercase, the microservice will clean the search terms.
* The microservice will look for a Wikipedia page that corresponds to the refined search terms.
* The microservice will return a JSON response with the page's title, URL, and summary if a page is found.
* The microservice will deliver an error message as part of the JSON response if no page is discovered or if there are numerous results.
* The sent request will recieve the microservice's JSON answer with the searched Wikipedia site information.

#### Example Response: 
      
{"title": "Python (programming language)", "url": "https://en.wikipedia.org/wiki/Python_(programming_language)", "summary": "Python is a high-level, general-purpose programming language. Its design philosophy emphasizes code readability with the use of significant indentation via the off-side rule.Python is dynamically typed and garbage-collected. It supports multiple programming paradigms, including structured (particularly procedural), object-oriented and functional programming. It is often described as a \"batteries included\" language due to its comprehensive standard library.Guido van Rossum began working on Python in the late 1980s as a successor to the ABC programming language and first released it in 1991 as Python 0.9.0. Python 2.0 was released in 2000. Python 3.0, released in 2008, was a major revision not completely backward-compatible with earlier versions. Python 2.7.18, released in 2020, was the last release of Python 2.Python consistently ranks as one of the most popular programming languages.\n\n"}

## UML Sequence Diagram for Microservice:

[UML Microservice (4).pdf](https://github.com/drewbush1990/CS361/files/11504303/UML.Microservice.4.pdf)

