import {Component, ElementRef, EventEmitter, Input, OnInit} from 'angular2/core';
import {NavItem, NavPill, NavText} from './nav.item';

@Component({
    selector: 'nav',
	template:`
		<div class="container-fluid">
			<div class="navbar-header">
			  <a class="navbar-brand">{{ brand }}</a>
			</div>
			<ul class="nav nav-pills">
				<template ngFor #item [ngForOf]="items" #index="index">
					<p *ngIf="item.type == 'NavText'" class="navbar-text">{{ item.text }}</p>
					<li *ngIf="item.type == 'NavPill'"
						(click)="_navSelect(index, item)" 
						[class.active]="selectedItem == item">
						<a>{{ item.text }} <span class="badge">{{ item.badge }}</span></a>
					</li>
				</template>
			</ul>
		</div>
	`,
	inputs: [
		'brand',
		'items'
	],
	outputs: [
		'navSelect'
	]
})

export class NavComponent implements OnInit {
	brand: string;
	items: NavItem[];
	navSelect = new EventEmitter<NavItem>();
	test: boolean = true;
	selectedItem: NavItem;
	
	_navSelect(index, item: NavItem) {
		this.test && console.log('nav select ', index, item);
		this.selectedItem = item;
		this.navSelect.next(item);
	}
	
	constructor(element: ElementRef) {
		element.nativeElement.classList.add('navbar');
		element.nativeElement.classList.add('navbar-default');
		element.nativeElement.classList.add('navbar-fixed-top');
	}
	
	ngOnInit() {
		this.selectedItem = _.find(this.items, { active: true });
	}
}
