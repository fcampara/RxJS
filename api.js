const http = require('http')

http.createServer((req, res) => {
  res.writeHead(200, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  })

  const matchUrl = /^\/response\/(.+)\/delay\/(\d+)\/?$/
  // http://localhost:5200/response/{"data": "Hello Word"}/delay/1000/
  if (!matchUrl.test(req.url)) return res.end()

  const [, response, delay] = matchUrl.exec(req.url)
  const jsonResponse = decodeURIComponent(response)

  setTimeout(() => {
    res.write(jsonResponse)
    res.end()
  }, +delay)
}).listen(5200)
