import viewTaskViewModel = require("./view-task-view-model");

var viewModel: viewTaskViewModel.ViewTaskViewModel;
export function navigatingTo(args) {
    var page = args.object;
    viewModel = page.navigationContext;
    page.bindingContext = null;
    page.bindingContext = viewModel;

    viewModel.refresh();
}

export function editTaskButtonTap() {
    viewModel.editTask();
}

export function completeTaskButtonTap() {
    viewModel.completeTask();
}