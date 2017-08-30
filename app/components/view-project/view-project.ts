import viewModule = require("ui/core/view");

import listViewModule = require("ui/list-view");
import gesturesModule = require("ui/gestures");

import viewProjectViewModel = require("./view-project-view-model");
import viewTaskViewModelModule = require("../view-task/view-task-view-model");

var viewModel: viewProjectViewModel.ViewProjectViewModel;
export function navigatingTo(args) {
    var page = args.object;
    viewModel = page.navigationContext;
    page.bindingContext = null;
    page.bindingContext = viewModel;

    viewModel.refresh();
}

export function editProjectButtonTap() {
    viewModel.editProject();
}

export function addTaskButtonTap() {
    viewModel.addTask();
}