import { ObjectID } from "mongodb";

export class Task {
	_id: ObjectID;
	name: string;
	timeCreated: number;
	completed: boolean;
	timeCompleted: number;
	notes: string;
}

export class Category {
  _id?: ObjectID;
	name: string;
	tasks: ObjectID[];
}