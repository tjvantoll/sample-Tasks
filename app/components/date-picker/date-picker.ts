import observableModule = require("data/observable");

import pagesModule = require("ui/page");

import datePickerViewModelModule = require("./date-picker-view-model");

var viewModel: datePickerViewModelModule.DatePickerViewModel;
export function navigatingTo(args: observableModule.EventData) {
    var page = <pagesModule.Page>args.object;
    viewModel = <datePickerViewModelModule.DatePickerViewModel>page.navigationContext;
    page.bindingContext = viewModel;
}

export function doneMenuItemTap(args: observableModule.EventData) {
    viewModel.done();
}