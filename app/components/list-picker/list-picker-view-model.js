"use strict";
var observableModule = require("data/observable");
var viewModelBaseModule = require("../common/view-model-base");
var navigationModule = require("../../utils/navigation");
var ListPickerViewModel = (function (_super) {
    __extends(ListPickerViewModel, _super);
    function ListPickerViewModel(getItemsFunction, selectedItem, selectedCallback) {
        var _this = this;
        _super.call(this);
        this._selectedCallback = selectedCallback;
        this.items = [];
        if (!this.beginLoading())
            return;
        getItemsFunction().then(function (items) {
            var listItems = new Array();
            for (var i = 0; i < items.length; i++) {
                var listItem = new ListItem(items[i]);
                if (selectedItem && items[i].Id === selectedItem.Id) {
                    _this.selectItem(listItem);
                }
                listItems.push(listItem);
            }
            _this.items = listItems;
            _this.endLoading();
        }, function (error) {
            _this.endLoading();
        });
    }
    Object.defineProperty(ListPickerViewModel.prototype, "items", {
        get: function () {
            return this._items;
        },
        set: function (value) {
            if (this._items !== value) {
                this._items = value;
                this.notifyPropertyChange("items", value);
            }
        },
        enumerable: true,
        configurable: true
    });
    ListPickerViewModel.prototype.selectItem = function (item) {
        if (this._selectedItem) {
            this._selectedItem.isSelected = false;
        }
        this._selectedItem = item;
        if (this._selectedItem) {
            this._selectedItem.isSelected = true;
        }
    };
    ListPickerViewModel.prototype.done = function () {
        this._selectedCallback(this._selectedItem.data);
        navigationModule.goBack();
    };
    return ListPickerViewModel;
}(viewModelBaseModule.ViewModelBase));
exports.ListPickerViewModel = ListPickerViewModel;
var ListItem = (function (_super) {
    __extends(ListItem, _super);
    function ListItem(data) {
        _super.call(this);
        this.data = data;
        this.isSelected = false;
    }
    Object.defineProperty(ListItem.prototype, "isSelected", {
        get: function () {
            return this._isSelected;
        },
        set: function (value) {
            if (this._isSelected !== value) {
                this._isSelected = value;
                this.notifyPropertyChange("isSelected", value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListItem.prototype, "data", {
        get: function () {
            return this._data;
        },
        set: function (value) {
            if (this._data !== value) {
                this._data = value;
                this.notifyPropertyChange("data", value);
            }
        },
        enumerable: true,
        configurable: true
    });
    return ListItem;
}(observableModule.Observable));
exports.ListItem = ListItem;
//# sourceMappingURL=list-picker-view-model.js.map