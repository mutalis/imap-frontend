import * as express from 'express';

import { emails } from './emails'

const app = express();

app.get('/emails', (_, res) => {
  res.send(emails);
});

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
