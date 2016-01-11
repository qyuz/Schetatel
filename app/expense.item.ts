import {FilterItem} from './filter.item'

export class ExpenseItem {
	constructor(public description: string, public number: string, public date: string) {
	}
}

export class FilteredExpenseItem extends ExpenseItem {
	constructor(public description: string, public number: string, public date: string, public filter: FilterItem) {
		super(description, number, date);
	}
}
