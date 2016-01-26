import {Pipe, PipeTransform} from 'angular2/core';
import {FilterItemService} from './filter.item.service';
import {FilterItem} from './type';
import {FilteredWithdrawalItem, WithdrawalItem} from './type';

@Pipe({name: 'filterWithdrawal', pure: false})
export class FilterWithdrawalPipe implements PipeTransform {
	private filterItemService: FilterItemService;
	private filteredItems: WithdrawalItem[];
	private debounceFetchAllFilter: Function; 
	
	constructor(filterItemService: FilterItemService) {
        this.filterItemService = filterItemService;
		this.debounceFetchAllFilter = _.debounce(this.fetchAllAndFilter, 25);
    }
	
	transform(items: WithdrawalItem[]) {
		this.debounceFetchAllFilter(items);	
		return this.filteredItems;
	}
	
	fetchAllAndFilter(withdrawalItems: WithdrawalItem[]) {
		this.filterItemService.fetchAll()
			.then((filterItems) => 
				this.filteredItems = _.filter(withdrawalItems, _.partial(FilterWithdrawalPipe.filter, _, filterItems)));
	}
	
	static filter(withdrawalItem: WithdrawalItem, filterItems: FilterItem[]) {
		var match;
		
		match = _.any(filterItems, _.partial(FilterWithdrawalPipe.match, withdrawalItem));
		
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
