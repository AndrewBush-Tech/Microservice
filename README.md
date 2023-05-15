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
* Enter the URL "https://fejxhfgkg7.execute-api.us-east-2.amazonaws.com/Beta/search" in an HTTP GET request.
* Include the request URL with the query parameters "one", "two", and "three", each of which represents a word or phrase to search for on Wikipedia.
* Include the API key "api_key = 'API key goes here'" and "headers = {'x-api-key': api_key}" in your program making the request.
An example call would be ""https://fejxhfgkg7.execute-api.us-east-2.amazonaws.com/Beta/search?one=Python&two=version&three=3" to look up information about the Python version 3. The title, URL, and summary of the Wikipedia entry for Python version 3 will be returned in a JSON response.
## How to RECEIVE data from the microservice:
* Send an request to AWS services as stated above and will recieve a request and return an application/JSON file.
* By eliminating special characters and changing all letters to lowercase, the microservice will clean the search terms.
* The microservice will look for a Wikipedia page that corresponds to the refined search terms.
* The microservice will return a JSON response with the page's title, URL, and summary if a page is found.
* The microservice will deliver an error message as part of the JSON response if no page is discovered or if there are numerous results.
* The sent request will recieve the microservice's JSON answer with the searched Wikipedia site information.

In the project directory, you can run program by:

### `pip install -r requirements.txt`
### `$env:FLASK_APP="app.py"`      
### `$env:FLASK_RUN_PORT=8000`
### `flask run`


## UML Sequence Diagram for Microservice:

[UML Microservice (2).pdf](https://github.com/drewbush1990/CS361/files/11424042/UML.Microservice.2.pdf)
