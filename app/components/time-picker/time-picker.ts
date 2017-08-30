import observableModule = require("data/observable");

import pagesModule = require("ui/page");

import timePickerViewModelModule = require("./time-picker-view-model");

var viewModel: timePickerViewModelModule.TimePickerViewModel;
export function navigatingTo(args: observableModule.EventData) {
    var page = <pagesModule.Page>args.object;
    viewModel = <timePickerViewModelModule.TimePickerViewModel>page.navigationContext;
    page.bindingContext = viewModel;
}

export function doneMenuItemTap(args: observableModule.EventData) {
    viewModel.done();
}