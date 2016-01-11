import {Component, EventEmitter} from 'angular2/core'
import {ExpenseItem} from './expense.item'

@Component({
    selector: 'expense-table',
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
					<td class="col-md-2">{{ item.filter.name }}</td>
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

export class ExpenseTableComponent {
	test: boolean = true;
	
	items: ExpenseItem[];
	addFilter = new EventEmitter<ExpenseItem>();
	removeFilter = new EventEmitter<ExpenseItem>();
	
	_addFilter(index: number, item: ExpenseItem) {
		this.test && console.log('add filter ', item);
		this.addFilter.next(item);
	}
	
	_removeFilter(index: number, item: ExpenseItem) {
		this.test && console.log('remove filter ', item);
		this.removeFilter.next(item);
	}
}
