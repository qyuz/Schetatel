import {Pipe, PipeTransform} from 'angular2/core';
import {FilterItemService} from './filter.item.service';
import {FilterItem} from './type';
import {FilteredWithdrawalItem, WithdrawalItem} from './type';

@Pipe({name: 'filterWithdrawal', pure: false})
export class FilterPipe implements PipeTransform {
	private filterItemService: FilterItemService;
	private filteredItems: WithdrawalItem[];
	private lastTransform: number = Date.now();
	
	constructor(filterItemService: FilterItemService) {
        this.filterItemService = filterItemService;
    }
	
	transform(items: WithdrawalItem[]) {
		var filterPipe;
		
		filterPipe = this;
		
		if (Date.now() - this.lastTransform > 100) {	//because pure pipes aren't cool anymore
			this.filterItemService.getAllPromise()
				.then(function(filterItems: FilterItem[]) {
					filterPipe.filteredItems = _.filter(items, _.partial(FilterPipe.prototype.filter, _, filterItems));
				});
			this.lastTransform = Date.now();
			console.log(this.lastTransform);
		}
		
		return filterPipe.filteredItems;
	}
	
	filter(withdrawalItem: WithdrawalItem, filterItems: FilterItem[]) {
		var match;
		
		match = _.any(filterItems, _.partial(FilterPipe.prototype.match, withdrawalItem));
		
		return match;
	}
	
	match(withdrawalItem: WithdrawalItem, filterItem: FilterItem) {
		var descriptionMatch, numberMatch, dateMatch;
		
		descriptionMatch = numberMatch = dateMatch = true;
		
		if (filterItem.description) {
			descriptionMatch = withdrawalItem.description.match(new RegExp(filterItem.description));
		}
		if (filterItem.number) {
			numberMatch = withdrawalItem.number == filterItem.number;
		}
		if (filterItem.date) {
			dateMatch = withdrawalItem.date == filterItem.date;
		}
		
		return descriptionMatch && numberMatch && dateMatch;
	}
}
