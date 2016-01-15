import {Component, ElementRef, EventEmitter, Input, OnInit} from 'angular2/core';
import {NavItem, NavPill, NavText} from './type';

@Component({
    selector: 'nav',
	template:`
		<div class="container-fluid">
			<div class="navbar-header">
			  <a class="navbar-brand">{{ brand }}</a>
			</div>
			<ul class="nav nav-pills">
				<template ngFor #item [ngForOf]="items" #index="index">
					<li *ngIf="isInstanceOfNavPill(item)"
						(click)="_select(index, item)" 
						[class.active]="selected == item">
						<a>{{ item.text }} <span class="badge">{{ item.badge }}</span></a>
					</li>
					<p *ngIf="isInstanceOfNavText(item)" class="navbar-text">{{ item.text }}</p>
				</template>
			</ul>
		</div>
	`,
	inputs: [
		'brand',
		'items'
	],
	outputs: [
		'select'
	]
})

export class NavComponent implements OnInit {
	test: boolean = true;
	
	brand: string;
	items: NavItem[];
	select = new EventEmitter<NavItem>();
	selected: NavItem;
	
	_select(index: number, item: NavItem) {
		this.test && console.log('nav select ', index, item);
		this.selected = item;
		this.select.next(item);
	}
	
	constructor(element: ElementRef) {
		element.nativeElement.classList.add('navbar');
		element.nativeElement.classList.add('navbar-default');
		element.nativeElement.classList.add('navbar-fixed-top');
	}
	
	isInstanceOfNavPill = (item) => item instanceof NavPill;
	
	isInstanceOfNavText = (item) => item instanceof NavText;
	
	ngOnInit() {
		var selectedIndex;
		
		selectedIndex = _.findIndex(this.items, { active: true });
		if (selectedIndex) {
			this.selected = this.items[selectedIndex];
			this._select(selectedIndex, this.selected);
		}
	}
}
