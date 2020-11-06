import { MongoDriver } from './MongoConnector'
import * as Express from 'express';

class TaskApp {
	public static singleton = new TaskApp();
	public app: Express.Express;
	public db: MongoDriver;
	public isValidID(id: string) {
		return typeof id === 'string'
		&& id.match(/^[0-9A-Fa-f]{24}$/)?.length == 1;
	};
}
let sing = TaskApp.singleton;
export { sing as TaskApp };

/**
* Represents an endpoint.
*/
export class Endpoint {
	/**
	* This is the last part of the Endpoint.
	* ie, /api/<part>...
	*/
	public part: string;
	/**
	* This is the action taken when the Endpoint
	* is called. It may or may not be async.
	* @param {Express.Request} req The request.
	* @param {Express.Response} res The response.
	*/
	public action: (req: Express.Request, res: Express.Response) => void;
	/**
	* true if the endpoint requires some form of ID,
	* null or undefined implies it's not needed.
	*/
	public needsId?: boolean;
	/**
	* The HTTP request method.
	*/
	public method: 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'CONNECT'
		| 'OPTIONS' | 'TRACE' | 'PATCH';
}