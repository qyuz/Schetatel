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
	
	transform(items: WithdrawalItem[], [filterItems]: any[]) {		
		if (filterItems && Date.now() - this.lastTransform > 100) {
			this.filteredItems = _.filter(items, _.partial(FilterPipe.filter, _, filterItems));
			this.lastTransform = Date.now();
		}
		
		return this.filteredItems;
	}
	
	static filter(withdrawalItem: WithdrawalItem, filterItems: FilterItem[]) {
		var match;
		
		match = _.any(filterItems, _.partial(FilterPipe.match, withdrawalItem));
		
		return match;
	}
	
	static match(withdrawalItem: WithdrawalItem, filterItem: FilterItem) {
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
