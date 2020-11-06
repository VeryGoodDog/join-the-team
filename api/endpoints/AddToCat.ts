import * as Express from 'express';
import { ObjectID } from "mongodb";
import { TaskApp as ta, Endpoint } from '../TaskApp';

const action = async function addtasks(req: Express.Request, res: Express.Response) {
	// console.log('Start add to cat.');
	const id = req.query.id as string;
	let tasks = req.body;
	if (!Array.isArray(tasks))
		return res.json('Request body must be an array').end();
	tasks = tasks.filter(ta.isValidID);
	
	await ta.db.addTasksToCategory(new ObjectID(id), tasks);
	res.json('Success').end();
	// console.log('End add to cat.');
}

module.exports = {
	part: 'cats',
	action,
	method: 'POST',
	needsId: true
} as Endpoint;