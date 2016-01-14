import {Component, EventEmitter, Inject} from 'angular2/core'
import {FilterTableComponent} from './filter.table.component'
import {FilterFormComponent} from './filter.form.component'
import {FilterItem} from './filter.item'
import {FilterItemService} from './filter.item.service'
import {NavComponent} from './nav.component'
import {NavItem, NavPill, NavText} from './nav.item'
import {WithdrawalTableComponent} from './withdrawal.table.component'
import {WithdrawalItem, FilteredWithdrawalItem} from './withdrawal.item'

@Component({
    selector: 'schetatel',
	template: `
		<nav [brand]="'Schetatel'" [items]="navItems" (select)="nvSlct($event)"></nav>
		<div class="content">
			<withdrawal-table [items]="withdrawalItems" [class.display]="navSelected == navWithdrawalAll"></withdrawal-table>
			<table class="table" [class.display]="navSelected == navFound">
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
			<filter-table [items]="filterItemService.items" (add)="setFilterForm($event)" (remove)="removeFilter($event)" [class.display]="navSelected == navFiltersAll"></filter-table>
			<filter-form [item]="filterFormItem" (add)="addFilter($event)" [class.display]="filterFormVisible == true || navSelected == navFiltersAdd"></filter-form>
		</div>
		
	`,
	directives: [
		WithdrawalTableComponent,
		FilterTableComponent,
		FilterFormComponent,
		NavComponent
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
	
	private withdrawalItems: WithdrawalItem[];
	
	private filterFormItem: FilterItem = new FilterItem();
	private filterFormVisible: boolean = false;
	private filterItemService: FilterItemService;
	
	constructor(filterItemService: FilterItemService) {
        this.filterItemService = filterItemService;
        this.withdrawalItems  = [
            new FilteredWithdrawalItem("desc", "number", "date", new FilterItem("fName", "fDescription", "fNumber", "fDate"))
        ];
    }
	
	navItems: NavItem[] = [
		this.navWithdrawalAll,
		this.navFound,
		this.navMissing,
		new NavText('Filters'),
		this.navFiltersAll,
		this.navFiltersAdd
	];
	
	nvSlct(item: NavItem) {
		this.navSelected = item;
		this.test && console.log('nvSlct ', item)
	}
	
	addFilter(item: FilterItem) {
		this.test && console.log('add filter ', item)
		this.filterItemService.add(item);
	}
	
	removeFilter(item: FilterItem) {
		this.test && console.log('remove filter ', item);
		this.filterItemService.remove(item);
	}
	
	setFilterForm(item: FilterItem) {
		this.toggleFilterForm(true);
		this.filterFormItem = new FilterItem(item.name, item.description, item.number, item.date);
	}
	
	toggleFilterForm(open: boolean) {
		this.filterFormVisible = open;
	}
}
