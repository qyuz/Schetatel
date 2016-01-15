import {Component, EventEmitter} from 'angular2/core'
import {FilterItem} from './type'

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
						<div style="float: left; padding-right: 5px;" (click)="_add(index, item)">Add</div>
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
	test: boolean = true;
	
	items: FilterItem[];
	add = new EventEmitter<FilterItem>();
	remove = new EventEmitter<FilterItem>();
	
	private _add(index: number, item: FilterItem) {
		this.test && console.log('add ', index, item);
		this.add.next(item);
	}
	
	private _remove(index: number, item: FilterItem) {
		this.test && console.log('remove ', index, item);
		this.remove.next(item);
	}
}
