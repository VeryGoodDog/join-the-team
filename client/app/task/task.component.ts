import { Component, OnInit, Input } from '@angular/core';
import { ConnectorService } from '../connector.service';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
	@Input() id: string;
	t: any;
  constructor(private connector: ConnectorService) { }

  ngOnInit(): void {
		this.connector.getOneTask(this.id).then(temp => {
			this.t = JSON.parse(temp);
		});
  }
	
	onClick(): void {
		// uncomment this for non functional deleting
		// this.connector.deleteTask(this.id);
	}
	
}
