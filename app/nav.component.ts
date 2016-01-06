import {Component, ElementRef, EventEmitter, Input} from 'angular2/core';
import {NavPill} from './nav.pill';

@Component({
    selector: 'nav',
	template:`
		<div class="container-fluid">
			<div class="navbar-header">
			  <a class="navbar-brand">{{ brand }}</a>
			</div>
			<ul class="nav nav-pills">
				<li *ngFor="#navPill of navPills; #index=index"
					(click)="_navSelect(index)" 
					[class.active]="selectedIndex == index">
					<a>{{ navPill.title }} <span class="badge">{{ navPill.badge }}</span>
					</a>
				</li>
			</ul>
		</div>
	`,
	inputs: [
		'brand',
		'navPills'
	],
	outputs: [
		'navSelect'
	]
})

export class NavComponent implements onInit {
	brand: string;
	navPills: NavPill[];
	navSelect = new EventEmitter<int, NavPill>();
	public test: booelean = true;
	public selectedIndex: int;
	
	_navSelect(index) {
		this.test && console.log('nav select ', index);
		this.selectedIndex = index;
		this.navSelect.next(index);
	}
	
	constructor(public element: ElementRef) {
		element.nativeElement.classList.add('navbar');
		element.nativeElement.classList.add('navbar-default');
		element.nativeElement.classList.add('navbar-fixed-top');
	}
	
	ngOnInit() {
		var selectedIndex = _.findIndex(this.navPills, { active: true });
		if (selectedIndex > -1) {
			this._navSelect(selectedIndex);
		}
	}
}
