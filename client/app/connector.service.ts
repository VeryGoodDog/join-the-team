import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConnectorService {

  constructor() { }
	
	getTasks(): Promise<string> {
		return new Promise(async resolve => {
			const r = await (await fetch('http://localhost:8080/api/tasks?act=list')).text();
			resolve(r);
		});
	}
	
	getOneTask(id: string): Promise<string> {
		return new Promise(async resolve => {
			const r = await (await fetch('http://localhost:8080/api/tasks?act=get&id='+id)).text();
			resolve(r);
		});
	}
	
	deleteTask(id: string): Promise<void> {
		return new Promise(async resolve => {
			await fetch('http://localhost:8080/api/tasks?act=del&id='+id, {
				method: 'DELETE',
				headers: {
					'Access-Control-Allow-Origin': '*'
				}
			});
			resolve();
		});
	}
}
