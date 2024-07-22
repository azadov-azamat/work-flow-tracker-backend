const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const errorHandler = require('./server/middleware/error-handler');

const isTest = process.env.NODE_ENV === 'test';
const cookieParser = require('cookie-parser');

// const i18n = require('./server/services/i18n-config');

const allowedOrigins = ['http://localhost:3000', 'http://localhost:8080'];

const corsOptions = function (req, callback) {
  let options = {
    credentials: true,
    methods: '*',
    exposedHeaders: true,
    allowedHeaders: [
      'X-Requested-With',
      'X-HTTP-Method-Override',
      'Content-Type',
      'Accept',
      'Cookie',
      'Authorization',
    ],
  };

  // Check if the request's origin is allowed, including subdomains
  const requestOrigin = req.header('Origin');
  const isAllowedOrigin = allowedOrigins.some((origin) => {
    if (requestOrigin === origin) {
      return true; // Exact match
    }
    // Check for subdomains, considering the allowed origins without protocol
    const originWithoutProtocol = origin.replace(/^https?:\/\//, '');
    if (requestOrigin?.includes('.' + originWithoutProtocol)) {
      return true; // Subdomain match
    }
    return false;
  });

  options.origin = isAllowedOrigin;

  callback(null, options);
};


morgan.format('custom', ':method :url :status :res[content-length] - :response-time ms');

const app = express();
// app.use(helmet())
app.set('x-powered-by', false);
app.set('view cache', false);
app.set('query parser', 'extended');
if (!isTest) {
  app.use(morgan('custom'));
}

app.use(cookieParser());
// app.use(i18n.init)

app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  bodyParser.json({
    strict: true,
    limit: '200kb',
    type: '*/*',
  })
);

app.options('*', cors({ origin: true, credentials: true }));
app.use(cors(corsOptions));

app.use(require('./server/routes'));

app.use(errorHandler);

module.exports = app;
