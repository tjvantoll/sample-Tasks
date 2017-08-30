import observableModule = require("data/observable");

import viewModule = require("ui/core/view");
import listViewModule = require("ui/list-view");
import pageModule = require("ui/page");

import listPickerViewModelModule = require("./list-picker-view-model");

var viewModel: listPickerViewModelModule.ListPickerViewModel;
export function navigatingTo(args: observableModule.EventData) {
    var page = <pageModule.Page>args.object;
    viewModel = <listPickerViewModelModule.ListPickerViewModel>page.navigationContext;
    page.bindingContext = viewModel;
}

export function itemTap(args: listViewModule.ItemEventData) {
    var view = <viewModule.View>args.view;
    viewModel.selectItem(<listPickerViewModelModule.ListItem>view.bindingContext);
}

export function doneMenuItemTap(args: observableModule.EventData) {
    viewModel.done();
}