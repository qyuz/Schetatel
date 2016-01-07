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
	
	clear() {
		this.name = "";
		this.description = "";
		this.number = "";
		this.date = "";
	}
}
