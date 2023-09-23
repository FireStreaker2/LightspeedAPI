![LightspeedAPI](https://socialify.git.ci/FireStreaker2/LightspeedAPI/image?description=1&forks=1&issues=1&language=1&name=1&owner=1&pulls=1&stargazers=1&theme=Dark)

# About
Lightspeed API is an unofficial rest API made for the [lightspeed systems archive](https://archive.lightspeedsystems.com/) using [puppeteer](https://pptr.dev/).

# Example Usage
JavaScript
```js
const apiUrl = "https://lightspeedapi.firestreaker2.gq/search/firestreaker2.gq";

// Make a GET request to the API
fetch(apiUrl)
	.then((response) => {
		// Check if the request was successful (status code 200)
		if (response.ok) {
			// Parse the response body as JSON
			return response.json();
		} else {
			// If the request was not successful, handle the error
			throw new Error(`Request failed with status: ${response.status}`);
		}
	})
	.then((data) => {
		// Print the response data
		console.log("Response:", data);
	})
	.catch((error) => {
		// Handle any errors that occurred during the request
		console.error("Error:", error);
	});
```

Python
```py
import requests

api_url = "https://lightspeedapi.firestreaker2.gq/search/firestreaker2.gq"

try:
    # Send a GET request to the API
    response = requests.get(api_url)

    # Check if the request was successful (status code 200)
    if response.status_code == 200:
        # Print the response content (the data from the API)
        print("Response:")
        print(response.text)
    else:
        # If the request was not successful, print an error message
        print(f"Error: {response.status_code}")
except requests.exceptions.RequestException as e:
    # Handle any network-related errors
    print(f"Request error: {e}")

```

Response:
```json
{
	"filter": {
		"category": "computers",
		"date": "Jul 3 2023 08:12:42 PM CST",
		"member": "Automatically categorized by Lightspeed Systems"
	},
	"rocket": {
		"category": "entertainment",
		"date": "Jul 3 2023 08:12:42 PM CST",
		"member": "Automatically categorized by Lightspeed Systems"
	}
}
```



# License
[MIT](https://github.com/FireStreaker2/LightspeedAPI/blob/main/LICENSE)
