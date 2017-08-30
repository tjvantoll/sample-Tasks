"use strict";
var viewModel;
function navigatingTo(args) {
    var page = args.object;
    viewModel = page.navigationContext;
    page.bindingContext = viewModel;
}
exports.navigatingTo = navigatingTo;
function itemTap(args) {
    var view = args.view;
    viewModel.selectItem(view.bindingContext);
}
exports.itemTap = itemTap;
function doneMenuItemTap(args) {
    viewModel.done();
}
exports.doneMenuItemTap = doneMenuItemTap;
//# sourceMappingURL=list-picker.js.map