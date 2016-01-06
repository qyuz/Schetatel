import {Component, EventEmitter, Inject} from 'angular2/core'
import {AllTableComponent} from './all.table.component'
import {FilterTableComponent} from './filter.table.component'
import {FilterFormComponent} from './filter.form.component'
import {FilterItem} from './filter.item'
import {FilterItemService} from './filter.item.service'
import {NavComponent} from './nav.component'
import {NavPill} from './nav.pill'

@Component({
    selector: 'schetatel',
	template: `
		<nav [brand]="'Schetatel'" [navPills]="navPills" (navSelect)="nvSlct($event)"></nav>
		<div class="content">
			<all-table [items]="items" [class.display]="navIndex == 0"></all-table>
			<table class="table" [class.display]="navIndex == 1">
				<thead> 
					<tr> 
						<th>#</th> 
						<th>zxcv Name</th> 
						<th>Last Name</th> 
						<th>Username</th> 
					</tr> 
				</thead> 
				<tbody> 
					<tr> 
						<th scope="row">1</th> 
						<td>Mark</td> 
						<td>Otto</td> 
						<td>@mdo</td> 
					</tr> 
					<tr> 
						<th scope="row">2</th> 
						<td>Jacob</td> 
						<td>Thornton</td> 
						<td>@fat</td> 
					</tr> 
					<tr> 
						<th scope="row">3</th> 
						<td>Larry</td> 
						<td>the Bird</td> 
						<td>@twitter</td> 
					</tr> 
				</tbody> 
			</table>
			<filter-table [items]="filterItemService.items" (add)="filterFormToggle(true)" (remove)="removeFilter($event)" [class.display]="navIndex == 3"></filter-table>
			<filter-form (add)="addFilter($event)" [class.display]="filterFormVisible == true || navIndex == 4"></filter-form>
		</div>
		
	`,
	directives: [
		AllTableComponent,
		FilterTableComponent,
		FilterFormComponent,
		NavComponent
	]
})

export class SchetatelComponent {
	public test: boolean = true;
	
	navIndex: int;
	filterFormVisible: boolean = false;
	filterItemService: FilterItemService;
	
	constructor(filterItemService: FilterItemService) {
		var schetatelComponent = this;
		
		this.filterItemService = filterItemService;
	}
	
	public navPills:NavPill[] = [
		{ title: 'All'},
		{ title: 'Found' },
		{ title: 'Missing' },
		{ title: 'Filters', active: true   },
		{ title: 'Add filter' }
	]
	public items:any[] = [
		{ description: "yo", filterName: "filter name", number: 10, date: "date" }
	]
	
	// public filterItems: FilterItem[] 
	// = [
		// { name: "Name", description: "description", number: 20, date: "now" }
	// ]

	public nvSlct(indx) {
		this.navIndex = indx;
		this.test && console.log('navIndex ', indx)
	};
	
	public addFilter(item) {
		this.test && console.log('add filter ', item)
		this.filterItemService.add(item);
	}
	
	public removeFilter(item) {
		this.test && console.log('remove filter ', item);
		this.filterItemService.remove(item);
		this.filterFormVisible = false;
	}
	
	public filterFormToggle(open) {
		this.filterFormVisible = open;
	}
}
