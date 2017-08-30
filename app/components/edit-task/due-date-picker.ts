import viewModule = require("ui/core/view");
import gesturesModule = require("ui/gestures");

import editTaskViewModelModule = require("./edit-task-view-model");

import datePickerViewModelModule = require("../date-picker/date-picker-view-model");
import timePickerViewModelModule = require("../time-picker/time-picker-view-model");

import navigationModule = require("../../utils/navigation");
import viewsModule = require("../../utils/views");

export function datePickerTap(args: gesturesModule.GestureEventData) {
    var view = <viewModule.View>args.view;
    var viewModel = <editTaskViewModelModule.EditTaskViewModel>view.bindingContext;
    navigationModule.navigate({
        moduleName: viewsModule.Views.datePicker,
        context: new datePickerViewModelModule.DatePickerViewModel(getDate(viewModel.item.DueDate),(day: number, month: number, year: number) => {
            var date = getDate(<Date>viewModel.item.DueDate);
            date.setDate(day);
            date.setMonth(month);
            date.setFullYear(year);
            viewModel.item.DueDate = date;
        })
    });
}

export function timePickerTap(args: gesturesModule.GestureEventData) {
    var view = <viewModule.View>args.view;
    var viewModel = <editTaskViewModelModule.EditTaskViewModel>view.bindingContext;
    navigationModule.navigate({
        moduleName: viewsModule.Views.timePicker,
        context: new timePickerViewModelModule.TimePickerViewModel(getDate(viewModel.item.DueDate),(hour: number, minute: number) => {
            var date = getDate(<Date>viewModel.item.DueDate);
            date.setHours(hour);
            date.setMinutes(minute);
            viewModel.item.DueDate = date;
        })
    });
}

function getDate(date: Date) {
    if (!date) {
        return new Date();
    }

    return date;
}