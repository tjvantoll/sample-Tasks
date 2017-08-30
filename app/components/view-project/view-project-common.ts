import viewModule = require("ui/core/view");

import gesturesModule = require("ui/gestures");
import listViewModule = require("ui/list-view");

import viewProjectViewModelModule = require("./view-project-view-model");
import viewTaskViewModelModule = require("../view-task/view-task-view-model");

export function itemTap(args: listViewModule.ItemEventData) {
    var viewProjectViewModel = <viewProjectViewModelModule.ViewProjectViewModel>(<viewModule.View>args.object).bindingContext;
    viewProjectViewModel.viewTask(args);
}

export function completeTaskButtonTap(args: gesturesModule.GestureEventData) {
    var view = <viewModule.View>args.view;
    var viewTaskViewModel = <viewTaskViewModelModule.ViewTaskViewModel>view.bindingContext;
    viewTaskViewModel.completeTask();
}