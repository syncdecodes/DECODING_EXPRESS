// syntax of fetch api -:
// fetch(url, options) - url is a string, options is an object

let options = {
    method: "POST",
    headers: {
        "Content-type": "application/json"
    },
    body: JSON.stringify({
        name: "Dev codes",
        age: 17
    })
}

async function call() {
    let response = await fetch('https://jsonplaceholder.typicode.com/posts', options) // Calling API
    let data = await response.json() // Fetching API data
    console.log(data)
}
call()

// fetch('https://jsonplaceholder.typicode.com/posts', options)
// .then(response => response.json())
// .then(data => console.log(data))



// The response.json() method is used to parse a network response body (a data stream) 
// as JSON and convert it into a native JavaScript object

/* 
response.json() on the CLIENT (Fetch API)
1. Reads the response body (JSON text)
2. Converts JSON → JavaScript object
3. Returns a Promise
=> That’s why you must use .then() or await

res.json() on the SERVER (Express / Node.js)
1. Converts a JavaScript object into JSON
2. Sets the HTTP header: Content-Type: application/json
3. Sends the response to the client
4. Ends the response automatically
*/