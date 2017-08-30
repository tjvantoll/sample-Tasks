var viewModel;
function navigatingTo(args) {
    var page = args.object;
    viewModel = page.navigationContext;
    page.bindingContext = viewModel;
}
exports.navigatingTo = navigatingTo;
function doneMenuItemTap(args) {
    viewModel.done();
}
exports.doneMenuItemTap = doneMenuItemTap;
//# sourceMappingURL=date-picker.js.map