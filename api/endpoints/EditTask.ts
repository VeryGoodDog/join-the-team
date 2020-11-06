import * as Express from 'express';
import { Task } from '../Tasks';
import { TaskApp as ta, Endpoint } from '../TaskApp';

const action = async function edit(req: Express.Request, res: Express.Response) {
	// console.log('Start edit.');
	const partial = req.body;
	if (!ta.isValidID(partial._id))
		return res.json('Invalid or missing ID').end();
	await ta.db.updateTask(partial as Task);
	res.json('Success').end();
	// console.log('End edit.');
}

module.exports = {
	part: 'tasks',
	action,
	method: 'PATCH'
} as Endpoint;