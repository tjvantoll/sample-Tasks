"use strict";
var tasksViewModelModule = require("./tasks-view-model");
var viewModel = new tasksViewModelModule.TasksViewModel();
function navigatingTo(args) {
    var page = args.object;
    page.bindingContext = viewModel;
    viewModel.refresh();
}
exports.navigatingTo = navigatingTo;
function completeTaskButtonTap(args) {
    var view = args.view;
    var viewTaskViewModel = view.bindingContext;
    viewTaskViewModel.completeTask();
}
exports.completeTaskButtonTap = completeTaskButtonTap;
//# sourceMappingURL=tasks.js.map