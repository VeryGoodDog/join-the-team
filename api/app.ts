import * as Express from 'express';
import * as path from 'path';
import { MongoDriverFactory } from './MongoConnectorFactory';
import { TaskApp as ta, Endpoint } from './TaskApp';
import * as fs from 'fs';

const PORT = 8080;
const ENDPOINT_DIR_PATH = path.join(__dirname, 'endpoints');
const API_PATH = '/api/';

ta.app = Express();
ta.app.use(Express.json()); // this makes sure that req.body has values

MongoDriverFactory.build()
  .then(async data => ta.db = data)
  .catch(e => { throw e; });

// load the endpoints in the dir
const eps = fs.readdirSync(ENDPOINT_DIR_PATH)
		.map(e => require(path.join(ENDPOINT_DIR_PATH, e)) as Endpoint);

ta.app.all(API_PATH + '*', (req, res) => {
	// get the endpoint that matches the event
	let ep = eps.find(v => 
		v.part == req.path.replace(API_PATH, '')
		&& v.action.name == req.query.act
	);
	// console.log(ep);
	if (ep === undefined)
		return res.sendStatus(400).end();
	
	if (ep.needsId && !ta.isValidID(req.query.id as string))
		return res.json('Invalid or missing ID').end();
	
	if (ep.method != req.method)
		return res.sendStatus(405).end();
	res.set('Access-Control-Allow-Origin','*');
	ep.action(req, res);
});

// this was used to test the api
ta.app.use(Express.static(path.join(__dirname, 'static')));

ta.app.listen(PORT);