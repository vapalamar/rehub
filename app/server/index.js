const app = require('./../api/v1');
const debug = require('debug')('rehub:server');
const http = require('http');

// Set application server port
app.set('port', process.env.PORT || 3000);

// Create server
const server = http.createServer(app);
server.listen(app.get('port'));

server.on('error', onError);
server.on('listening', onListening);

function onError(error) {
    const port = app.get('port');
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    switch (error.code) {
    case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
    case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
        break;
    default:
        throw error;
    }
}

function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}
