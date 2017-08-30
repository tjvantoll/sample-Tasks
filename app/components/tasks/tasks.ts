import observableModule = require("data/observable");

import viewModule = require("ui/core/view");
import pageModule = require("ui/page");
import gesturesModule = require("ui/gestures");

import tasksViewModelModule = require("./tasks-view-model")
import viewTaskViewModelModule = require("../view-task/view-task-view-model")

var viewModel = new tasksViewModelModule.TasksViewModel();
export function navigatingTo(args: observableModule.EventData) {
    var page = <pageModule.Page>args.object;
    page.bindingContext = viewModel;

    viewModel.refresh();
}

export function completeTaskButtonTap(args: gesturesModule.GestureEventData) {
    var view = <viewModule.View>args.view;
    var viewTaskViewModel = <viewTaskViewModelModule.ViewTaskViewModel>view.bindingContext;
    viewTaskViewModel.completeTask();
}
