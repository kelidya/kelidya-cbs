
var developmentDatabase = {
    postgres: {
        host: 'ec2-18-215-96-22.compute-1.amazonaws.comec2-18-215-96-22.compute-1.amazonaws.com',
        port: 5432,
        database: 'd764lkkl20ae7i',
        user: 'cruvuegvapgwlh',
        password: 'da942d2b81a3da873ff26995307690a77a4f422b09bca9a1f6a209ebf6f6b1f2'
    }
}

var connectionString = "postgres://cruvuegvapgwlh:da942d2b81a3da873ff26995307690a77a4f422b09bca9a1f6a209ebf6f6b1f2@ec2-18-215-96-22.compute-1.amazonaws.com:5432/d764lkkl20ae7i";

if (process.env.NODE_ENV == 'production') {
    //Production mode
    if (process.env.DATABASE_URL) {
        developmentDatabase = parseConnectionString(process.env.DATABASE_URL);
    } else {
        console.log("process.env.DATABASE_URL empty, connectionString variable used");
        developmentDatabase = parseConnectionString(connectionString);
    }
}else{
    //Development mode
    developmentDatabase = parseConnectionString(connectionString);
}

function parseConnectionString(connectionString) {
    if (connectionString) {
        var myRegexp = /(\w+):(\w+)@(.+):(\w+)\/(\w+)/g;
        var match = myRegexp.exec(connectionString);

        if (match.length == 6) {
            developmentDatabase.postgres.user = match[1];
            developmentDatabase.postgres.password = match[2];
            developmentDatabase.postgres.host = match[3];
            developmentDatabase.postgres.port = Number(match[4]);
            developmentDatabase.postgres.database = match[5];
            developmentDatabase.postgres.ssl = true;

            return developmentDatabase;
        }
    }

    console.log("connectionString parse edilemedi");
    return null;
}

module.exports = {
    hostname: "http://localhost",
    port: 5656,
    database: {
        postgres: developmentDatabase.postgres
    }
}