exports.DATABASE_URL = process.env.DATABASE_URL ||
    global.DATABASE_URL ||
    'mongodb://admin:admin@ds121898.mlab.com:21898/non-verbal-communication';
exports.TEST_DATABASE_URL = (
    process.env.TEST_DATABASE_URL ||
    'mongodb://admin:admin@ds121898.mlab.com:21898/non-verbal-communication');
exports.PORT = process.env.PORT || 8080;
