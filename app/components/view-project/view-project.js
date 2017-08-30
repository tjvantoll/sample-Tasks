"use strict";
var viewModel;
function navigatingTo(args) {
    var page = args.object;
    viewModel = page.navigationContext;
    page.bindingContext = null;
    page.bindingContext = viewModel;
    viewModel.refresh();
}
exports.navigatingTo = navigatingTo;
function editProjectButtonTap() {
    viewModel.editProject();
}
exports.editProjectButtonTap = editProjectButtonTap;
function addTaskButtonTap() {
    viewModel.addTask();
}
exports.addTaskButtonTap = addTaskButtonTap;
//# sourceMappingURL=view-project.js.map