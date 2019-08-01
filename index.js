 
const net = require('net');

const server = net.createServer();

var on_data = null, on_error = null;


server.on('connection', (person) => {

    person.setEncoding('utf8');

    person.on('data', (data) => {
        if (on_data != null) {
            person.close = person.destroy;
            on_data(data, person);
        }
    });

});
server.on('error', (e) => {
    if (on_error != null) {
        on_error(e);
    }
});

function start(ip_port, on_data_function) {
    const info = ip_port.split(":");
    on_data = on_data_function;
    server.listen(info[1], info[0]);
}


module.exports = {
    start: start,
    onerror: f=> on_error = f
};
