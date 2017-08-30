"use strict";
var projectsViewModelModule = require("./projects-view-model");
var viewModel = new projectsViewModelModule.ProjectsViewModel();
function navigatingTo(args) {
    var page = args.object;
    page.bindingContext = viewModel;
    viewModel.refresh();
}
exports.navigatingTo = navigatingTo;
//# sourceMappingURL=projects.js.map