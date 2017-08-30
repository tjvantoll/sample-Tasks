"use strict";
var datePickerViewModelModule = require("../date-picker/date-picker-view-model");
var timePickerViewModelModule = require("../time-picker/time-picker-view-model");
var navigationModule = require("../../utils/navigation");
var viewsModule = require("../../utils/views");
function datePickerTap(args) {
    var view = args.view;
    var viewModel = view.bindingContext;
    navigationModule.navigate({
        moduleName: viewsModule.Views.datePicker,
        context: new datePickerViewModelModule.DatePickerViewModel(getDate(viewModel.item.DueDate), function (day, month, year) {
            var date = getDate(viewModel.item.DueDate);
            date.setDate(day);
            date.setMonth(month);
            date.setFullYear(year);
            viewModel.item.DueDate = date;
        })
    });
}
exports.datePickerTap = datePickerTap;
function timePickerTap(args) {
    var view = args.view;
    var viewModel = view.bindingContext;
    navigationModule.navigate({
        moduleName: viewsModule.Views.timePicker,
        context: new timePickerViewModelModule.TimePickerViewModel(getDate(viewModel.item.DueDate), function (hour, minute) {
            var date = getDate(viewModel.item.DueDate);
            date.setHours(hour);
            date.setMinutes(minute);
            viewModel.item.DueDate = date;
        })
    });
}
exports.timePickerTap = timePickerTap;
function getDate(date) {
    if (!date) {
        return new Date();
    }
    return date;
}
//# sourceMappingURL=due-date-picker.js.map