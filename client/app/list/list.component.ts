import { Component, OnInit } from '@angular/core';
import { ConnectorService } from '../connector.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
	tasks: string;
	ts: string[];
  constructor(private connector: ConnectorService) { }

  ngOnInit(): void {
		this.connector.getTasks().then(list => {
			this.tasks = list;
			this.ts = JSON.parse(this.tasks);
		});
  }
}
