const http = require('http');

const port = 3000;
const baseUrl = `http://localhost:${port}`;

const homePage = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="styles.css">
    <title>My Main Page</title>
</head>
<body>
    <h1>My Main Page</h1>
</body>
</html>`;

const stylesCss = `h1 {
    color: lawngreen;
    text-align: center;
    font-family: Helvetica, serif;
    font-size: 48pt;
}`;

// Version 1
// http.createServer(function (req, response) {
//     console.log(req);
//     response.writeHead(200, {'Content-Type': 'text/plain'});

//     response.write('Hello, World!\n');

//     response.end();
// }).listen(3000, 'localhost');
// console.log('Server running at http://localhost:' + port);

// Version 2
// const requestProcessor = (request, response) => {
//     response.writeHead(200, {'Content-Type': 'text/plain'});

//     // response.end('Hello, World!\n');
//     response.write('Hello, World!\n');
//     response.write(`The path passed in: ${request.url}`);

//     const url = new URL(request.url, baseUrl);
//     console.log(url);
//     console.log(url.searchParams.get('key'));

//     response.end();
// }
// http.createServer(requestProcessor).listen(port);
// console.log(`Server running at ${baseUrl}`);


// Version 3
// const requestProcessor = (request, response) => {
//     response.writeHead(200, {'Content-Type': 'text/html'});

//     response.write(homePage);

//     response.end();
// }
// http.createServer(requestProcessor).listen(port);
// console.log(`Server running at ${baseUrl}`);


// Version 4
// const requestProcessor = (request, response) => {
//     const url = new URL(request.url, baseUrl);

//     if (url.pathname === '/styles.css') {   
//         console.log('Serving the styles...')
//         response.writeHead(200, {'Content-Type': 'text/css'});
//         response.write(stylesCss);
//     } else {
//         console.log('Serving the html...')
//         response.writeHead(200, {'Content-Type': 'text/html'});
//         response.write(homePage);
//     }
//     response.end();
// }

const mathForm = `<!DOCTYPE html>
<html>
<body>

<h2>Math API</h2>

<form action="/math" method="get">
  <label for="input1">First Input:</label>
  <input type="number" min="1" max="20" name="input1" value=1><br>
  
<input type="radio" id="html" name="operation" value="+" checked>
<label for="html">Add</label>
<input type="radio" id="css" name="operation" value="*">
<label for="css">Multiply</label><br>
  
  <label for="input2">Second Input:</label>
  <input type="number" min="1" max="20" name="input2" value=5>

  <br><input type="submit" value="Submit">
</form> 

</body>
</html>`

// Version 5
function eval_math(params) {
    const math_string = `${params.get('input1')} ${params.get('operation')} ${params.get('input2')}`;
    console.log('Evaluating this string:', math_string)
    return eval(math_string);
}

// Version 5
const requestProcessor = (request, response) => {
    const url = new URL(request.url, baseUrl);
    if (url.pathname === '/styles.css') {
        console.log('Serving the styles...')
        response.writeHead(200, {'Content-Type': 'text/css'});
        response.write(stylesCss);
    } else if (url.pathname === '/math') {
        console.log('Serving the math API...')
        response.writeHead(200, {'Content-Type': 'text/json'});
        console.log(`The params are: ${url.searchParams}`)
        response.write(`{
            "inputURL": ${url.pathname}${url.search},
            "answer": ${eval_math(url.searchParams)}
        }`);
    } else {
        console.log('Serving the html...')
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write(mathForm);
    }
    response.end();
}

http.createServer(requestProcessor).listen(port);
console.log(`Server running at ${baseUrl}`);