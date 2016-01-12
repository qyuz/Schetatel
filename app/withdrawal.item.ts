import {FilterItem} from './filter.item'

export class WithdrawalItem {
	constructor(public description: string, public number: string, public date: string) {
	}
}

export class FilteredWithdrawalItem extends WithdrawalItem {
	constructor(public description: string, public number: string, public date: string, public filter: FilterItem) {
		super(description, number, date);
	}
}
