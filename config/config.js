const env = process.env.NODE_ENV; // 'dev' or 'prod'

const dev = {
    frontURL : 'http://localhost:4200',
    sqlConn : {
        user:  "sa",
        password: "vladimir",
        server: "PC-ERICK",
        database: "OCTAGT",
        pool: {
            max: 10,
            min: 0,
            idleTimeoutMillis: 30000
        }
    }
};

const prod = {
    frontURL : 'http://localhost:4200',
    sqlConn : {
        user:  "sa",
        password: "vladimir",
        server: "PC-ERICK",
        database: "OCTAGT",
        pool: {
            max: 20,
            min: 0,
            idleTimeoutMillis: 30000
        }
    }
};

const config = {
    dev,
    prod 
};

module.exports = config[env];
/*
options: {
        encrypt: true // Use this if you're on Windows Azure
    }
*/