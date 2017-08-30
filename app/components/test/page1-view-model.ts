import observableModule = require("data/observable");

var resourcesModule = require("../../resources");

export class Page1ViewModel extends observableModule.Observable {
    private _item: any;

    constructor() {
        super();

        this.item = { Title: "Alabala" };
    }

    get item(): any {
        return this._item;
    }

    set item(value: any) {
        if (this._item !== value) {
            this._item = value;
            this.notifyPropertyChange("item", value);
        }
    }

    get resources(): any {
        return resourcesModule.resources;
    }
}
