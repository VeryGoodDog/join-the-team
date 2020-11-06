import * as Express from 'express';
import { TaskApp as ta, Endpoint } from '../TaskApp';

const action = async function list(_: Express.Request, res: Express.Response) {
	// console.log('Start list cats.');
	const cats = await ta.db.listCategories();
	res.json(cats).end();
	// console.log('End list cats.');
}

module.exports = {
	part: 'cats',
	action,
	method: 'GET'
} as Endpoint;