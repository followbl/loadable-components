import express from 'express';
import fs from 'fs';
import path from 'path';
import renderer from './renderer';

const PORT = process.env.PORT || 3006;

const app = express();

let jsFiles;
try {
  jsFiles = fs.readdirSync(path.resolve(__dirname, '..', 'build', 'static', 'js'));
} catch (err) {
  // In development that folder might not exist, so ignore errors here
  console.error(err);
}

app.use(
  express.static(path.resolve(__dirname, '..', 'build'), {
    index: false,
    setHeaders: (res, path) => {},
  })
);

app.get('/static/js/:name', (req, res, next) => {
  if (!req.params.name) {
    return next();
  }
  const existingFile = jsFiles.find(file => file.startsWith(req.params.name));
  if (existingFile) {
    return res.sendFile(path.resolve(__dirname, '..', 'build', 'static', 'js', req.params.name));
  }
  // Match the first part of the file name, i.e. from "UserSettings.asdf123.chunk.js" match "UserSettings"
  const match = req.params.name.match(/(\w+?)\..+js/i);
  if (!match) {
    return next();
  }
  const actualFilename = jsFiles.find(file => file.startsWith(match[1]));
  if (!actualFilename) {
    return next();
  }
  res.redirect(`/static/js/${actualFilename}`);
});

app.get('*', renderer);

process.on('unhandledRejection', async err => {
  console.log('Unhandled rejection', err);
});

process.on('uncaughtException', async err => {
  console.log('Uncaught exception', err);
});

app.listen(PORT);
console.log(`Server running at http://localhost:${PORT}`);
