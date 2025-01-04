const http = require('http');

// Tworzymy serwer HTTP
const server = http.createServer((req, res) => {
  console.log(`\nOtrzymano żądanie: ${req.method} ${req.url}`);

  if (req.method === 'GET') {
    // Obsługa żądań GET
    const url = new URL(req.url, `http://${req.headers.host}`);
    console.log('Parametry GET:');
    url.searchParams.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });

    // Odpowiedź na GET
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Serwer HTTP działa poprawnie!');
  } else if (req.method === 'POST') {
    // Obsługa żądań POST
    let body = '';
    req.on('data', chunk => {
      body += chunk;
    });

    req.on('end', () => {
      console.log('Treść POST (JSON):');
      try {
        const jsonData = JSON.parse(body);
        console.log(JSON.stringify(jsonData, null, 2));
      } catch (error) {
        console.log('Nieprawidłowy JSON:', body);
      }

      // Odpowiedź na POST
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Otrzymano dane POST.');
    });
  } else {
    // Obsługa innych metod HTTP
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    res.end('Metoda nieobsługiwana.');
  }
});

// Nasłuchiwanie na porcie 8080
const PORT = 8080;
server.listen(PORT, () => {
  console.log(`Serwer HTTP uruchomiony na http://localhost:${PORT}`);
});