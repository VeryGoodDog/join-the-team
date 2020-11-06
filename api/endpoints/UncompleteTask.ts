import * as Express from 'express';
import { ObjectID } from "mongodb";
import { Task } from '../Tasks';
import { TaskApp as ta, Endpoint } from '../TaskApp';

const action = async function uncom(req: Express.Request, res: Express.Response) {
	// console.log('Start uncomplete.');
	const id = req.query.id as string;
	await ta.db.updateTask({
		_id: new ObjectID(id),
		completed: false,
		timeCompleted: 0
	} as Task);
	res.json('Success').end();
	// console.log('End uncomplete.');
}

module.exports = {
	part: 'tasks',
	action,
	method: 'PATCH',
	needsId: true
} as Endpoint;