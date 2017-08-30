"use strict";
var viewModel;
function navigatingTo(args) {
    var page = args.object;
    viewModel = page.navigationContext;
    page.bindingContext = null;
    page.bindingContext = viewModel;
}
exports.navigatingTo = navigatingTo;
function takePictureButtonTap() {
    viewModel.takePicture();
}
exports.takePictureButtonTap = takePictureButtonTap;
function saveButtonTap() {
    viewModel.save();
}
exports.saveButtonTap = saveButtonTap;
function deleteButtonTap() {
    viewModel.del();
}
exports.deleteButtonTap = deleteButtonTap;
//# sourceMappingURL=edit-task.js.map