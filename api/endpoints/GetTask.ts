import * as Express from 'express';
import { ObjectID } from "mongodb";
import { TaskApp as ta, Endpoint } from '../TaskApp';

const action = async function get(req: Express.Request, res: Express.Response) {
	// console.log('Start get task.');
	const id = req.query.id as string;
	const task = await ta.db.readTask(new ObjectID(id));
	res.json(task).end();
	// console.log('End get task.');
}

module.exports = {
	part: 'tasks',
	action,
	method: 'GET',
	needsId: true
} as Endpoint;