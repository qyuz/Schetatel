import {Component, EventEmitter, Inject} from 'angular2/core'
import {FilterTableComponent} from './filter.table.component'
import {FilterFormComponent} from './filter.form.component'
import {FilterItem} from './type'
import {FilterItemService} from './filter.item.service'
import {FilterWithdrawalPipe} from './filter.withdrawal.pipe'
import {NavComponent} from './nav.component'
import {NavItem, NavPill, NavText} from './type'
import {WithdrawalTableComponent} from './withdrawal.table.component'
import {WithdrawalItem, FilteredWithdrawalItem} from './type'

@Component({
    selector: 'schetatel',
	template: `
		<nav [brand]="'Schetatel'" [items]="navItems" [date]="date" (dateChange)="debounceDateChange($event)" (select)="navSelect($event)"></nav>
		<div class="content">
			<withdrawal-table [items]="withdrawalItems" [class.display]="navSelected === navWithdrawalAll" (add)="setWithdrawalFilterForm($event)"></withdrawal-table>
			<withdrawal-table [items]="withdrawalItems | filterWithdrawal" [class.display]="navSelected === navFound" (add)="setWithdrawalFilterForm($event)"></withdrawal-table>
			<table class="table" [class.display]="navSelected === navMissing">
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
			<filter-table [items]="filterItems" (add)="setFilterForm($event)" (remove)="removeFilter($event)" [class.display]="navSelected === navFiltersAll"></filter-table>
			<filter-form [item]="filterFormItem" (add)="addFilter($event)" (close)="filterFormVisible = false" [class.display]="filterFormVisible === true || navSelected === navFiltersAdd"></filter-form>
		</div>
		
	`,
	directives: [
		FilterTableComponent,
		FilterFormComponent,
		NavComponent,
		WithdrawalTableComponent
	],
	pipes: [
		FilterWithdrawalPipe
	]
})

export class SchetatelComponent {
	test: boolean = true;
	
	private navSelected: NavItem;
	private navWithdrawalAll: NavPill = new NavPill('All');
	private navFound: NavPill = new NavPill('Found');
	private navMissing: NavPill = new NavPill('Missing');
	private navFiltersAll: NavPill = new NavPill('All', true);
	private navFiltersAdd: NavPill = new NavPill('Add');
	
	private date: String = "2016-01";
	private filterItems: FilterItem[];
	private filterFormItem: FilterItem = new FilterItem();
	private filterItemService: FilterItemService;
	private filterFormVisible: boolean = false;
	private withdrawalItems: WithdrawalItem[];
	
	private debounceDateChange: Function;
	
	constructor(filterItemService: FilterItemService) {
		this.filterItemService = filterItemService;
        this.withdrawalItems  = [
            new FilteredWithdrawalItem("desc", "number", "date", new FilterItem("fName", "fDescription", "fNumber", "fDate")),
			new FilteredWithdrawalItem("desc2", "number", "date", new FilterItem("fName", "fDescription", "fNumber", "fDate"))
        ];
		
		this.debounceDateChange = _.debounce(
			this.dateChange, 
			1000,
			{ 
				leading: false,
				trailing: true
		});
		
		this.updateFilterItems();
    }
	
	navItems: NavItem[] = [
		this.navWithdrawalAll,
		this.navFound,
		this.navMissing,
		new NavText('Filters'),
		this.navFiltersAll,
		this.navFiltersAdd
	];
	
	dateChange(date: String) {
		this.date = date;
		debugger;
	}
	
	navSelect(item: NavItem) {
		this.navSelected = item;
		this.test && console.log('navSelect ', item)
	}
	
	addFilter(item: FilterItem) {
		this.test && console.log('add filter ', item)
		this.filterItemService.add(item)
			.then(() =>
				this.updateFilterItems());
	}
	
	removeFilter(item: FilterItem) {
		this.test && console.log('remove filter ', item);
		this.filterItemService.remove(item)
			.then(() => 
				this.updateFilterItems());
	}
	
	setFilterForm(item: FilterItem) {
		this.toggleFilterForm(true);
		this.filterFormItem = new FilterItem(item.name, item.description, item.number, item.date);
	}
	
	setWithdrawalFilterForm(item: WithdrawalItem) {
		var filterItem: FilterItem;
		
		filterItem = new FilterItem("", item.description, item.number, item.date);
		
		this.setFilterForm(filterItem);
	}
	
	toggleFilterForm(open: boolean) {
		this.filterFormVisible = open;
	}
	
	updateFilterItems() {
		this.filterItemService.fetchAll().
			then((filterItems) =>
				this.filterItems = filterItems);		
	}
}
