"use strict";
function itemTap(args) {
    var viewProjectViewModel = args.object.bindingContext;
    viewProjectViewModel.viewTask(args);
}
exports.itemTap = itemTap;
function completeTaskButtonTap(args) {
    var view = args.view;
    var viewTaskViewModel = view.bindingContext;
    viewTaskViewModel.completeTask();
}
exports.completeTaskButtonTap = completeTaskButtonTap;
//# sourceMappingURL=view-project-common.js.map