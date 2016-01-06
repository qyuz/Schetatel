import {Component, EventEmitter} from 'angular2/core';
import {FilterItem} from './filter.item';
import {FilterItemService} from './filter.item.service';

@Component({
    selector: 'filter-form',
	template: `
		<form>
		  <div class="form-group">
			<label>Name
				<input [(ngModel)]="item.name" type="text" class="form-control" placeholder="Name">
			</label>
		  </div>
		  <div class="form-group">
			<label>Match description
				<input [(ngModel)]="item.description" type="text" class="form-control" placeholder="Description">
			</label>
		  </div>
		  <div class="form-group">
			<label>Match number
				<input [(ngModel)]="item.number" type="text" class="form-control" placeholder="Number">
			</label>
		  </div>
		  <div class="form-group">
			<label>Match date
				<input [(ngModel)]="item.date" type="text" class="form-control" placeholder="Date">
			</label>
		  </div>
		  <button class="btn btn-default" [disabled]="item.name == '' || (item.description == '' && item.number == '' && item.date == '')" (click)="add.next(item)">Add</button>
		  <button class="btn btn-success" (click)="testFilter(item)">Test</button>
		  <button class="btn btn-warning" (click)="clear()">Clear</button>
		</form>
	`,
	inputs: [
	],
	outputs: [
		'add'
	]
})

export class FilterFormComponent {
	public test: boolean = true;
	
	public item: FilterItem = new FilterItem();
	add = new EventEmitter<FilterItem>();
		
	clear() {
		this.test && console.log('clear ', this.item);
		this.item = new FilterItem();
	}
	
	testFilter(item: FilterItem) {
		
	}
}
