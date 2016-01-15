import {Injectable} from 'angular2/core';
import {FilterItem} from './type';

export class FilterItemService {
	private items: FilterItem[];
	
	constructor() {
		var filterItemService;
		
		filterItemService = this;
		
		fetch('https://qyuz.cloudant.com/schetatel/_all_docs?include_docs=true', {
			method: 'get'
		}).then(function(response) {
			return response.json();
		  }).then(function(json) {
			filterItemService.items = json.rows.map(_.property('doc.data'));
		  });
	}
	
	add(item: FilterItem) {
		var filterItemService, request;
		
		filterItemService = this;
		request = new Request('https://qyuz.cloudant.com/schetatel/', {
			method: 'POST', 
			headers: new Headers({
				'Content-Type': 'application/json'
			}),
			body: JSON.stringify({
				_id: item.name,
				data: {
					name: item.name,
					description: item.description,
					number: item.number,
					date: item.date
				}
			})
		});

		fetch(request)  
			.then(function(response) {
				if (response.status == "201") {
					filterItemService.items.push(_.extend({}, item));
				} else {
					alert('error while adding filter item to service')
				}
				return response.text();
			}).then(function(text) {
				console.log(text); 
			});
	}
	
	getAll() {
		return this.items;
	}
	
	remove(item: FilterItem) {
		var filterItemService;
		
		filterItemService = this;
		
		fetch('https://qyuz.cloudant.com/schetatel/' + item.name)
			.then(function(response) {
				return response.json()
			})
			.then(function(doc) {
				var request = new Request('https://qyuz.cloudant.com/schetatel/' + doc._id + '?rev=' + doc._rev, {
					method: 'delete',
					body: "" //delete doesn't work without body
				});

				return request;
			})
			.then(function(request) {
				fetch(request)  
					.then(function(response) {
						if (response.status == "200") {
							filterItemService.items = _.reject(filterItemService.items, { name: item.name });
						} else {
							alert('error while removing filter item from service')
						}
						return response.text();
					}).then(function(text) {
						console.log(text); 
					});
			});
	}
}
