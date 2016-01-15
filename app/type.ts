export class FilterItem {
	
	name: string;
	description: string;
	number: string;
	date: string;
	
	constructor();	
	constructor(name: string, description: string, number: string, date: string);
	constructor(name?: any, description?: any, number?: any, date?: any) {
		this.name = name == null ? "" : name;
		this.description = description == null ? "" : description;
		this.number = number == null ? "" : number;
		this.date = date == null ? "" : date;
	}
}

export class NavItem {
	constructor() {
	}
}

export class NavPill extends NavItem {
	constructor(public text: string, public active?: boolean, public badge?: string) {
		super();
	}
}

export class NavText extends NavItem {
	constructor(public text: string) {
		super();
	}
}

export class WithdrawalItem {
	constructor(public description: string, public number: string, public date: string) {
	}
}

export class FilteredWithdrawalItem extends WithdrawalItem {
	constructor(public description: string, public number: string, public date: string, public filter: FilterItem) {
		super(description, number, date);
	}
}
