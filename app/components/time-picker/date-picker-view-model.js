var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var viewModelBaseModule = require("../view-model-base");
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
                this.notifyPropertyChanged("day", value);
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
                this.notifyPropertyChanged("month", value);
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
                this.notifyPropertyChanged("year", value);
            }
        },
        enumerable: true,
        configurable: true
    });
    DatePickerViewModel.prototype.done = function () {
        this._selectedCallback(new Date(this.year, this.month - 1, this.day));
        navigationModule.goBack();
    };
    return DatePickerViewModel;
})(viewModelBaseModule.ViewModelBase);
exports.DatePickerViewModel = DatePickerViewModel;
//# sourceMappingURL=date-picker-view-model.js.map