import {Component, EventEmitter} from 'angular2/core';
import {FilterItem} from './filter.item';
import {FilterItemService} from './filter.item.service';

@Component({
    selector: 'filter-form',
	template: `
		<form>
		  <div class="form-group">
			<label>Name
				<input [ngModel]="item.name" (ngModelChange)="changeName($event)" type="text" class="form-control" placeholder="Name">
			</label>
		  </div>
		  <div class="form-group">
			<label>Match description
				<input [ngModel]="item.description" (ngModelChange)="changeSecondaryField('description', $event)" type="text" class="form-control" placeholder="Description">
			</label>
		  </div>
		  <div class="form-group">
			<label>Match number
				<input [ngModel]="item.number" (ngModelChange)="changeSecondaryField('number', $event)" type="text" class="form-control" placeholder="Number">
			</label>
		  </div>
		  <div class="form-group">
			<label>Match date
				<input [ngModel]="item.date" (ngModelChange)="changeSecondaryField('date', $event)" type="text" class="form-control" placeholder="Date">
			</label>
		  </div>
		  <button class="btn btn-default" [disabled]="!item.name" (click)="add.next(item)">Add</button>
		  <button class="btn btn-success" (click)="testFilter(item)">Test</button>
		  <button class="btn btn-warning" (click)="clear()">Clear</button>
		</form>
	`,
	inputs: [
		'item'
	],
	outputs: [
		'add'
	]
})

export class FilterFormComponent {
	test: boolean = true;
	
	item: FilterItem;
	add = new EventEmitter<FilterItem>();
	
	private manualName: boolean = false;
	
	changeName(name: string) {
		this.item.name = name;
		if (name.length) {
			this.manualName = true;
		} else {
			this.manualName = false;
			this.computeName();
		}
	}
	
	changeSecondaryField(field: string, value: string) {
		this.item[field] = value;
		this.computeName();
	}
	
	computeName() {
		if (!this.manualName) {
			this.item.name = `${ this.item.description }${ this.item.number }${ this.item.date }`;
		}
	}
	
	clear() {
		this.test && console.log('clear ', this.item);
		this.item.clear();
	}
	
	testFilter(item: FilterItem) {
		
	}
}
