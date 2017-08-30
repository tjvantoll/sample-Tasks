import platformModule = require("platform");
import enumsModule = require("ui/enums");

import viewModelBaseModule = require("./view-model-base");
import navigationModule = require("../../utils/navigation");
import notificationsModule = require("../../utils/notifications");

export class EditViewModelBase extends viewModelBaseModule.ViewModelBase {
    private _item: any;
    private _originalItem: any;
    private _isAdd: boolean;

    constructor(item?: any) {
        super();

        if (item) {
            this._isAdd = false
            this._originalItem = item;
            this.item = EditViewModelBase.clone(item);
        }
        else {
            this._isAdd = true;
            this.item = this.createItem();
        }
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

    get addVisibility(): string {
        if (this._isAdd) {
            return enumsModule.Visibility.visible;
        }

        return enumsModule.Visibility.collapsed;
    }

    get editVisibility(): string {
        if (this._isAdd) {
            return enumsModule.Visibility.collapsed;
        }

        return enumsModule.Visibility.visible;
    }

    get deleteMessage(): string {
        return "Do you want to delete the item?";
    }

    get deleteHeader(): string {
        return "Delete Item";
    }

    createItem(): any {
        return {};
    }

    save() {
        if (this.validate()) {
            if (!this.beginLoading())return;
            this.onSaving(this.item).then(cancel => {
                if (!cancel) {
                    var method = this._isAdd ? this.add : this.update;
                    method.call(this).then(item => {
                        this.onSaved(this.item).then(result => {
                            this.endLoading();
                        });
                    });
                }
                else {
                    this.endLoading();
                }
            }, error => {
                    this.endLoading();
                });
        }
    }

    del() {
        notificationsModule.confirm(this.deleteHeader, this.deleteMessage).then((value: boolean) => {
            if (value) {
                if (!this.beginLoading())return;
                this.deleteItem(this.item).then((data) => {
                    this.onItemDeleted(this.item);
                    this.endLoading();
                },(error) => {
                        this.endLoading();
                    });
            }
        });
    }

    addItem(item: any): Promise<any> {
        return null;
    }

    updateItem(item: any): Promise<any> {
        return null;
    }

    deleteItem(item: any): Promise<any> {
        return null;
    }

    validate(): boolean {
        return true;
    }

    onItemAdded(item: any) {
        navigationModule.goBack();
    }

    onItemDeleted(item: any) {
        navigationModule.goBack();
    }

    onSaving(item: any): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            resolve(false);
        });
    }

    onSaved(item: any): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            resolve({});
        });
    }

    private static clone(item: any): any {
        var clone = {};
        EditViewModelBase.copy(item, clone);

        return clone;
    }

    private static copy(fromItem: any, toItem: any) {
        for (var prop in fromItem) {
            if (fromItem.hasOwnProperty(prop)) {
                toItem[prop] = fromItem[prop];
            }
        }
    }

    add(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.addItem(this.item).then((data) => {
                this.item.Id = data.result.Id;
                this.onItemAdded(this.item);
                resolve(this.item);
            }, reject);
        });
    }

    update() {
        return new Promise<any>((resolve, reject) => {
            this.updateItem(this.item).then((data) => {
                EditViewModelBase.copy(this.item, this._originalItem);
                navigationModule.goBack();
                resolve(this.item);
            }, reject);
        });
    }
} 
