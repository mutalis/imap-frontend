import * as express from 'express';
import * as cors from 'cors';
import { emails } from './emails'

const app = express();
app.use(cors());
app.get('/emails', (_, res) => {
  res.send(emails);
});

app.get('/search', (req, res) => {

  const queryString = ((req.query.q as string) ?? '').toLowerCase();
  res.send(emails.filter(({username}) => username.toLowerCase().includes(queryString)));
});

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
