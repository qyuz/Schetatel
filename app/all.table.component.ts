import {Component, EventEmitter} from 'angular2/core';

@Component({
    selector: 'all-table',
	template: `
		<table class="table">
			<thead> 
				<tr> 
					<th>#</th> 
					<th>Description</th> 
					<th>Number</th> 
					<th>Date</th> 
					<th>Filter name</th> 
					<th>Actions</th> 
				</tr> 
			</thead> 
			<tbody> 
				<tr *ngFor="#item of items; #index = index;">
					<th class="col-md-1" scope="row">{{ index + 1 }}</th>
					<td>{{ item.description }}</td>
					<td class="col-md-1">{{ item.number }}</td>
					<td class="col-md-1">{{ item.date }}</td>
					<td class="col-md-2">{{ item.filterName }}</td>
					<td class="col-md-1">
						<div style="float: left; padding-right: 5px;" (click)="_addFilter(index, item)">Add</div>
						<div style="float: left;" (click)="_removeFilter(index, item)">Remove</div>
					</td>
				</tr>
			</tbody> 
		</table>
	`,
	inputs: [
		'items'
	],
	outputs: [
		'addFilter',
		'removeFilter'
	]
})

export class AllTableComponent {
	test: boolean = true;
	
	items: any;
	addFilter = new EventEmitter<number>();
	removeFilter = new EventEmitter<number>();
	
	_addFilter(index) {
		this.test && console.log('add filter ', index);
		this.addFilter.next(index);
	}
	
	_removeFilter(index) {
		this.test && console.log('remove filter ', index);
		this.removeFilter.next(index);
	}
}
