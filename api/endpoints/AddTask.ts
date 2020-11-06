import * as Express from 'express';
import { Task } from '../Tasks';
import { TaskApp as ta, Endpoint } from '../TaskApp';

const action = async function add(req: Express.Request, res: Express.Response) {
	// console.log('Start add task.');
	const clientData = req.body;
	const nTask = {
		name: clientData.name ?? 'Task',
		timeCreated: Date.now(),
		completed: false,
		timeCompleted: 0,
		notes: clientData.notes ?? ''
	} as Task;
	const id = await ta.db.createTask(nTask);
	res.json(id).end();
	// console.log('End add task.');
}

module.exports = {
	part: 'tasks',
	action,
	method: 'POST'
} as Endpoint;