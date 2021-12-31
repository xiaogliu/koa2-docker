const Koa = require('koa');
const fetch = require('node-fetch');
const app = new Koa();

app.use(async (ctx, next) => {
  if (ctx.request.path === '/api/v1/serverInfo') {
    // https://stackoverflow.com/questions/68664181/error-connect-econnrefused-127-0-0-1-when-connection-to-anything-on-localhost
    // https://stackoverflow.com/questions/24319662/from-inside-of-a-docker-container-how-do-i-connect-to-the-localhost-of-the-mach
    const response = await fetch('http://host.docker.internal:8081/api/v1/locale');
    const locale = await response.text();

    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.response.body = `Koa2 server, ${locale}`;
    console.log(`Request from ${ctx.request.href}`);
  } else {
    await next();
  }
});

app.listen(8080, () => {
  console.log('[demo] request get is starting at port 8080');
});
