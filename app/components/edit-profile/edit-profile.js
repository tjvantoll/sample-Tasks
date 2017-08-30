"use strict";
var viewModel;
function navigatingTo(args) {
    var page = args.object;
    viewModel = args.context;
    page.bindingContext = null;
    page.bindingContext = viewModel;
}
exports.navigatingTo = navigatingTo;
function saveButtonTap(args) {
    viewModel.save();
}
exports.saveButtonTap = saveButtonTap;
//# sourceMappingURL=edit-profile.js.map