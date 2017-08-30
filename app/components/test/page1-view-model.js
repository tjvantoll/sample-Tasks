"use strict";
var observableModule = require("data/observable");
var resourcesModule = require("../../resources");
var Page1ViewModel = (function (_super) {
    __extends(Page1ViewModel, _super);
    function Page1ViewModel() {
        _super.call(this);
        this.item = { Title: "Alabala" };
    }
    Object.defineProperty(Page1ViewModel.prototype, "item", {
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
    Object.defineProperty(Page1ViewModel.prototype, "resources", {
        get: function () {
            return resourcesModule.resources;
        },
        enumerable: true,
        configurable: true
    });
    return Page1ViewModel;
}(observableModule.Observable));
exports.Page1ViewModel = Page1ViewModel;
//# sourceMappingURL=page1-view-model.js.map