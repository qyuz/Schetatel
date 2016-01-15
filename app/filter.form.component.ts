import {Component, EventEmitter, OnChanges, SimpleChange} from 'angular2/core';
import {FilterItem} from './type';
import {FilterItemService} from './filter.item.service';

@Component({
    selector: 'filter-form',
	template: `
		<form>
		  <div class="form-group">
            <div class="col-xs-12">
                <label>Name</label>
            </div>
            <div class="col-xs-8">
                <input [ngModel]="item.name" (ngModelChange)="_changeName($event)" [disabled]="_isNameClear" type="text" class="form-control" placeholder="Name">
            </div>
            <div class="col-xs-2">
                <input type="button" (click)="item.name = ''; _manualName = true;" class="btn btn-default" value="Clear">
            </div>
            <div class="col-xs-2 padding-left-0">
                <input type="button" (click)="_manualName = false; _computeName();" class="btn btn-default" value="Compute">
            </div>
		  </div>
		  <div class="form-group">
            <div class="col-xs-12">
                <label>Match description</label>
            </div>
            <div class="col-xs-10">
                <input [ngModel]="item.description" (ngModelChange)="item.description = $event; _computeName();" [disabled]="_isDescriptionClear" type="text" class="form-control" placeholder="Description">
            </div>
            <div class="col-xs-2">
                <div class="checkbox">
                    <label><input [ngModel]="_isDescriptionClear" (ngModelChange)="_isDescriptionClear = $event; _computeName();" type="checkbox">Disable</label>
                </div>
            </div>
		  </div>
		  <div class="form-group">
            <div class="col-xs-12">
                <label>Match number</label>
            </div>
            <div class="col-xs-10">
                <input [ngModel]="item.number" (ngModelChange)="item.number = $event; _computeName();" [disabled]="_isNumberClear" type="text" class="form-control" placeholder="Number">
            </div>
            <div class="col-xs-2">
                <div class="checkbox">
                    <label><input [ngModel]="_isNumberClear" (ngModelChange)="_isNumberClear = $event; _computeName();" type="checkbox">Disable</label>
                </div>
            </div>
		  </div>
		  <div class="form-group">
            <div class="col-xs-12">
                <label>Match date</label>
            </div>
            <div class="col-xs-10">
                <input [ngModel]="item.date" (ngModelChange)="item.date = $event; _computeName();" [disabled]="_isDateClear" type="text" class="form-control" placeholder="Date">
            </div>
            <div class="col-xs-2">
                <div class="checkbox">
                    <label><input [ngModel]="_isDateClear" (ngModelChange)="_isDateClear = $event; _computeName();" type="checkbox">Disable</label>
                </div>
            </div>
		  </div>
          <div class="col-xs-12">
            <button class="btn btn-default" [disabled]="!item.name" (click)="_add(item)">Add</button>
            <button class="btn btn-success" (click)="_testFilter(item)">Test</button>
            <button class="btn btn-warning" (click)="_clearFlags(); _clearItem();">Clear</button>
            <button class="btn btn-warning" (click)="close.next()">Close</button>
          </div>
		</form>
	`,
	inputs: [
		'item'
	],
	outputs: [
		'add',
        'close'
	]
})

export class FilterFormComponent implements OnChanges {
	test: boolean = true;
	
	item: FilterItem;
	add = new EventEmitter<FilterItem>();
    close = new EventEmitter();
	
	private _manualName: boolean = false;
    private _isDescriptionClear: boolean = false;
    private _isNumberClear: boolean = false;
    private _isDateClear: boolean = false;
  
    ngOnChanges(changes: {[propName: string]: SimpleChange}) {
        if (_.has(changes, 'item')) {
            this.test && console.log('item changed');
            this._clearFlags();
			if (_.get(changes, 'item.currentValue.name')) {
				this._manualName = true;
			} else {
				this._computeName();
			}
        }
    }
	
    private _add(item: FilterItem) {
        var _item = new FilterItem();
        
        _item.name = item.name;
        _item.description = this._isDescriptionClear ? "" : item.description;
        _item.number = this._isNumberClear ? "" : item.number;
        _item.date = this._isDateClear ? "" : item.date;
        
        this.add.next(_item);
    }
    
	private _changeName(name: string) {
		this.item.name = name;
        
		if (name.length) {
			this._manualName = true;
		} else {
			this._manualName = false;
			this._computeName();
		}
	}
	
	private _computeName() {
        var _description, _number, _date, _name;
        
		if (!this._manualName) {
			_description = this._isDescriptionClear ? "" : this.item.description;
            _number = this._isNumberClear ? "" : this.item.number;
            _date = this._isDateClear ? "" : this.item.date;
            _name = `${ _description }${ _number }${ _date }`;
            
			setTimeout(() => this.item.name = _name);
		}
	}
	
	private _clearFlags() {
		this.test && console.log('clear flags', this.item);
        
        this._manualName = false;
        this._isDateClear = false;
        this._isDescriptionClear = false;
        this._isNumberClear = false;
	}
    
    private _clearItem() {
        this.item.name = "";
		this.item.description = "";
		this.item.number = "";
		this.item.date = "";        
    }
	
	private _testFilter(item: FilterItem) {
    }
}
