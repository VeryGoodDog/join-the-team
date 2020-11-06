import * as Express from 'express';
import { ObjectID } from "mongodb";
import { TaskApp as ta, Endpoint } from '../TaskApp';

const action = async function rename(req: Express.Request, res: Express.Response) {
	// console.log('Start rename cat.');
	const id = req.query.id as string;
	if (req.body.name === undefined)
		return res.json('Missing body name property').end();
	await ta.db.updateCategory(new ObjectID(id), req.body.name as string);
	res.json('Success').end();
	// console.log('End rename cat.');
}

module.exports = {
	part: 'cats',
	action,
	method: 'PATCH',
	needsId: true
} as Endpoint;