import observableModule = require("data/observable");

import viewModelBaseModule = require("../common/view-model-base");
import navigationModule = require("../../utils/navigation");
import serviceModule = require("../../utils/service");

export class ListPickerViewModel extends viewModelBaseModule.ViewModelBase{
    private _items: any[];
    private _selectedItem: ListItem;
    private _selectedCallback: (selectedItem: any) => void;

    constructor(getItemsFunction: () => Promise<any[]>, selectedItem: any, selectedCallback: (selectedItem: any) => void) {
        super();


        this._selectedCallback = selectedCallback;
        this.items = [];

        if (!this.beginLoading())return;
        getItemsFunction().then((items) => {
            var listItems = new Array<ListItem>();
            for (var i = 0; i < items.length; i++) {
                var listItem = new ListItem(items[i]);
                if (selectedItem && items[i].Id === selectedItem.Id) {
                    this.selectItem(listItem);
                }

                listItems.push(listItem);
            }

            this.items = listItems;
            this.endLoading();
        },(error) => {
                this.endLoading();
            });

    }

    get items(): ListItem[] {
        return this._items;
    }

    set items(value: ListItem[]) {
        if (this._items !== value) {
            this._items = value;
            this.notifyPropertyChange("items", value);
        }
    }

    selectItem(item: ListItem) {
        if (this._selectedItem) {
            this._selectedItem.isSelected = false;
        }

        this._selectedItem = item;
        if (this._selectedItem) {
            this._selectedItem.isSelected = true;
        }
    }

    done() {
        this._selectedCallback(this._selectedItem.data);
        navigationModule.goBack();
    }
}

export class ListItem extends observableModule.Observable {
    private _isSelected: boolean;
    private _data: any;

    constructor(data: any) {
        super();

        this.data = data;
        this.isSelected = false;
    }

    get isSelected(): boolean {
        return this._isSelected;
    }

    set isSelected(value: boolean) {
        if (this._isSelected !== value) {
            this._isSelected = value;
            this.notifyPropertyChange("isSelected", value);
        }
    }

    get data(): boolean {
        return this._data;
    }

    set data(value: boolean) {
        if (this._data !== value) {
            this._data = value;
            this.notifyPropertyChange("data", value);
        }
    }
}
