import observableModule = require("data/observable");

import pageModule = require("ui/page");

import editProjectViewModelModule = require("./edit-project-view-model");

import navigationModule = require("../../utils/navigation");
import viewsModule = require("../../utils/views");

var viewModel: editProjectViewModelModule.EditProjectViewModel;
export function navigatingTo(args: observableModule.EventData) {
    var page = <pageModule.Page>args.object;
    viewModel = page.navigationContext;
    page.bindingContext = null;
    page.bindingContext = viewModel;
}

export function saveButtonTap() {
    viewModel.save();
}

export function deleteButtonTap() {
    viewModel.del();
}