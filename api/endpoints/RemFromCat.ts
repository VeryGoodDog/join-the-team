import * as Express from 'express';
import { ObjectID } from "mongodb";
import { TaskApp as ta, Endpoint } from '../TaskApp';

const action = async function remtasks(req: Express.Request, res: Express.Response) {
	// console.log('Start rem from cat.');
	const id = req.query.id as string;
	let tasks = req.body;
	if (!Array.isArray(tasks))
		return res.json('Invalid Tasks').end();
	tasks = tasks.filter(ta.isValidID);
	
	await ta.db.removeTasksFromCategory(new ObjectID(id), tasks);
	res.json('Success').end();
	// console.log('End rem fron cat.');
}

module.exports = {
	part: 'cats',
	action,
	method: 'POST',
	needsId: true
} as Endpoint;