import {Component, EventEmitter} from 'angular2/core'
import {FilterItem} from './filter.item'

@Component({
    selector: 'filter-table',
	template: `
		<table class="table">
			<thead> 
				<tr> 
					<th>#</th> 
					<th>Name</th> 
					<th>Description</th> 
					<th>Number</th> 
					<th>Date</th> 
					<th>Actions</th> 
				</tr> 
			</thead> 
			<tbody> 
				<tr *ngFor="#item of items; #index = index;">
					<th class="col-md-1" scope="row">{{ index + 1 }}</th>
					<td class="col-md-1">{{ item.name }}</td>
					<td>{{ item.description }}</td>
					<td class="col-md-1">{{ item.number }}</td>
					<td class="col-md-1">{{ item.date }}</td>
					<td class="col-md-1">
						<div style="float: left; padding-right: 5px;" (click)="_add(index)">Add</div>
						<div style="float: left;" (click)="_remove(index, item)">Remove</div>
					</td>
				</tr>
			</tbody> 
		</table>
	`,
	inputs: [
		'items'
	],
	outputs: [
		'add',
		'remove'
	]
})

export class FilterTableComponent {
	public test: boolean = true;
	
	public items: FilterItem[];
	add = new EventEmitter<int>();
	remove = new EventEmitter<FilterItem>();
	
	_add(index) {
		this.test && console.log('add ', index);
		this.add.next(index);
	}
	
	_remove(index, item) {
		this.test && console.log('remove ', index, item);
		this.remove.next(item);
	}
}
