export class FilterItem {
	public name: string;
	public description: string;
	public number: string;
	public date: string;
	
	constructor() {
		this.name = "";
		this.description = "";
		this.number = "";
		this.date = "";			}
	
	constructor(name, description, number, date) {
		this.name = name;
		this.description = description;
		this.number = number;
		this.date = date;
	}
}
