"use strict";
var enumsModule = require("ui/enums");
var viewModelBaseModule = require("./view-model-base");
var navigationModule = require("../../utils/navigation");
var notificationsModule = require("../../utils/notifications");
var EditViewModelBase = (function (_super) {
    __extends(EditViewModelBase, _super);
    function EditViewModelBase(item) {
        _super.call(this);
        if (item) {
            this._isAdd = false;
            this._originalItem = item;
            this.item = EditViewModelBase.clone(item);
        }
        else {
            this._isAdd = true;
            this.item = this.createItem();
        }
    }
    Object.defineProperty(EditViewModelBase.prototype, "item", {
        get: function () {
            return this._item;
        },
        set: function (value) {
            if (this._item !== value) {
                this._item = value;
                this.notifyPropertyChange("item", value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditViewModelBase.prototype, "addVisibility", {
        get: function () {
            if (this._isAdd) {
                return enumsModule.Visibility.visible;
            }
            return enumsModule.Visibility.collapsed;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditViewModelBase.prototype, "editVisibility", {
        get: function () {
            if (this._isAdd) {
                return enumsModule.Visibility.collapsed;
            }
            return enumsModule.Visibility.visible;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditViewModelBase.prototype, "deleteMessage", {
        get: function () {
            return "Do you want to delete the item?";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditViewModelBase.prototype, "deleteHeader", {
        get: function () {
            return "Delete Item";
        },
        enumerable: true,
        configurable: true
    });
    EditViewModelBase.prototype.createItem = function () {
        return {};
    };
    EditViewModelBase.prototype.save = function () {
        var _this = this;
        if (this.validate()) {
            if (!this.beginLoading())
                return;
            this.onSaving(this.item).then(function (cancel) {
                if (!cancel) {
                    var method = _this._isAdd ? _this.add : _this.update;
                    method.call(_this).then(function (item) {
                        _this.onSaved(_this.item).then(function (result) {
                            _this.endLoading();
                        });
                    });
                }
                else {
                    _this.endLoading();
                }
            }, function (error) {
                _this.endLoading();
            });
        }
    };
    EditViewModelBase.prototype.del = function () {
        var _this = this;
        notificationsModule.confirm(this.deleteHeader, this.deleteMessage).then(function (value) {
            if (value) {
                if (!_this.beginLoading())
                    return;
                _this.deleteItem(_this.item).then(function (data) {
                    _this.onItemDeleted(_this.item);
                    _this.endLoading();
                }, function (error) {
                    _this.endLoading();
                });
            }
        });
    };
    EditViewModelBase.prototype.addItem = function (item) {
        return null;
    };
    EditViewModelBase.prototype.updateItem = function (item) {
        return null;
    };
    EditViewModelBase.prototype.deleteItem = function (item) {
        return null;
    };
    EditViewModelBase.prototype.validate = function () {
        return true;
    };
    EditViewModelBase.prototype.onItemAdded = function (item) {
        navigationModule.goBack();
    };
    EditViewModelBase.prototype.onItemDeleted = function (item) {
        navigationModule.goBack();
    };
    EditViewModelBase.prototype.onSaving = function (item) {
        return new Promise(function (resolve, reject) {
            resolve(false);
        });
    };
    EditViewModelBase.prototype.onSaved = function (item) {
        return new Promise(function (resolve, reject) {
            resolve({});
        });
    };
    EditViewModelBase.clone = function (item) {
        var clone = {};
        EditViewModelBase.copy(item, clone);
        return clone;
    };
    EditViewModelBase.copy = function (fromItem, toItem) {
        for (var prop in fromItem) {
            if (fromItem.hasOwnProperty(prop)) {
                toItem[prop] = fromItem[prop];
            }
        }
    };
    EditViewModelBase.prototype.add = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.addItem(_this.item).then(function (data) {
                _this.item.Id = data.result.Id;
                _this.onItemAdded(_this.item);
                resolve(_this.item);
            }, reject);
        });
    };
    EditViewModelBase.prototype.update = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.updateItem(_this.item).then(function (data) {
                EditViewModelBase.copy(_this.item, _this._originalItem);
                navigationModule.goBack();
                resolve(_this.item);
            }, reject);
        });
    };
    return EditViewModelBase;
}(viewModelBaseModule.ViewModelBase));
exports.EditViewModelBase = EditViewModelBase;
//# sourceMappingURL=edit-view-model-base.js.map