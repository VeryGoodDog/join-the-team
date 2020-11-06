import * as Express from 'express';
import { ObjectID } from "mongodb";
import { TaskApp as ta, Endpoint } from '../TaskApp';

const action = async function del(req: Express.Request, res: Express.Response) {
	// console.log('Start delete.');
	const id = req.query.id as string;
	await ta.db.deleteTask(new ObjectID(id));
	res.json('Success').end();
	// console.log('End delete.');
}

module.exports = {
	part: 'tasks',
	action,
	method: 'DELETE',
	needsId: true
} as Endpoint;