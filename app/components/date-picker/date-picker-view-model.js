"use strict";
var viewModelBaseModule = require("../common/view-model-base");
var navigationModule = require("../../utils/navigation");
var DatePickerViewModel = (function (_super) {
    __extends(DatePickerViewModel, _super);
    function DatePickerViewModel(selectedDate, selectedCallback) {
        _super.call(this);
        this.day = selectedDate.getDate();
        this.month = selectedDate.getMonth() + 1;
        this.year = selectedDate.getFullYear();
        this._selectedCallback = selectedCallback;
    }
    Object.defineProperty(DatePickerViewModel.prototype, "day", {
        get: function () {
            return this._day;
        },
        set: function (value) {
            if (this._day !== value) {
                this._day = value;
                this.notifyPropertyChange("day", value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatePickerViewModel.prototype, "month", {
        get: function () {
            return this._month;
        },
        set: function (value) {
            if (this._month !== value) {
                this._month = value;
                this.notifyPropertyChange("month", value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatePickerViewModel.prototype, "year", {
        get: function () {
            return this._year;
        },
        set: function (value) {
            if (this._year !== value) {
                this._year = value;
                this.notifyPropertyChange("year", value);
            }
        },
        enumerable: true,
        configurable: true
    });
    DatePickerViewModel.prototype.done = function () {
        this._selectedCallback(this.day, this.month - 1, this.year);
        navigationModule.goBack();
    };
    return DatePickerViewModel;
}(viewModelBaseModule.ViewModelBase));
exports.DatePickerViewModel = DatePickerViewModel;
//# sourceMappingURL=date-picker-view-model.js.map