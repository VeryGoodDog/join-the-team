import * as Express from 'express';
import { TaskApp as ta, Endpoint } from '../TaskApp';

const action = async function add(req: Express.Request, res: Express.Response) {
	// console.log('Start add cat.');
	const id = await ta.db.createCategory(req.body.name ?? 'Category');
	res.json(id).end();
	// console.log('Start add cat.');
}

module.exports = {
	part: 'cats',
	action,
	method: 'POST'
} as Endpoint;