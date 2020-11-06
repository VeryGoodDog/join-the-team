import * as Express from 'express';
import { TaskApp as ta, Endpoint } from '../TaskApp';

const action = async function list(_: Express.Request, res: Express.Response) {
	// console.log('Start list tasks.');
	const tasks = await ta.db.listTasks();
	res.json(tasks.map(val => val._id)).end();
	// console.log('End list tasks.');
}

module.exports = {
	part: 'tasks',
	action,
	method: 'GET'
} as Endpoint;