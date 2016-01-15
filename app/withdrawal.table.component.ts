import {Component, EventEmitter} from 'angular2/core'
import {WithdrawalItem} from './type'

@Component({
    selector: 'withdrawal-table',
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

export class WithdrawalTableComponent {
	test: boolean = true;
	
	items: WithdrawalItem[];
	addFilter = new EventEmitter<WithdrawalItem>();
	removeFilter = new EventEmitter<WithdrawalItem>();
	
	_addFilter(index: number, item: WithdrawalItem) {
		this.test && console.log('add filter ', item);
		this.addFilter.next(item);
	}
	
	_removeFilter(index: number, item: WithdrawalItem) {
		this.test && console.log('remove filter ', item);
		this.removeFilter.next(item);
	}
}
