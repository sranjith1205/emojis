
const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;
    res.setHeader('Content-type', 'text/html');
    if (url === '/') {
        res.write(`<html>
        <head><title>First Nodejs page </title></head>
        <body><h2>Hello all, I'm from nodejs server!!</h2>
        <ul><li>Ranjith</li></ul>
        <ul><li>Yuvaraj</li></ul>
        <ul><li>Logesh</li></ul>
        <form action="/create-user" method="POST">
        <input type="text" name="create-user"><button type="submit">Create User</button>
        </form>
        </body>
        </html>`);
        return res.end();
    }
    if (url === '/create-user' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        });

        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const user = parsedBody.split('=')[1];
            fs.writeFile('user.txt', user, (err) => {
                res.statusCode = '302';
                return res.end();
            });
        });
    }

    res.write(`<html>
        <head><title>First Nodejs page </title></head>
        <body><h2>Hello all, I'm from nodejs server!!</h2>
        </body>
        </html>`);
    return res.end();
}

exports.handler = requestHandler;