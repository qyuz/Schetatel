import {Component, ElementRef, EventEmitter, Input, OnInit} from 'angular2/core';
import {NavPill} from './nav.pill';

@Component({
    selector: 'nav',
	template:`
		<div class="container-fluid">
			<div class="navbar-header">
			  <a class="navbar-brand">{{ brand }}</a>
			</div>
			<ul class="nav nav-pills">
				<template ngFor #navPill [ngForOf]="navPills" #index="index">
					<p *ngIf="navPill.label" class="navbar-text">{{ navPill.label }}</p>
					<li (click)="_navSelect(index)" 
						[class.active]="selectedIndex == index">
						<a>{{ navPill.title }} <span class="badge">{{ navPill.badge }}</span></a>
					</li>
				</template>
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

export class NavComponent implements OnInit {
	brand: string;
	navPills: NavPill[];
	navSelect = new EventEmitter<number>();
	test: boolean = true;
	selectedIndex: number;
	
	_navSelect(index) {
		this.test && console.log('nav select ', index);
		this.selectedIndex = index;
		this.navSelect.next(index);
	}
	
	constructor(element: ElementRef) {
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
