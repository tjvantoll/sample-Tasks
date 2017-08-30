import observableModule = require("data/observable");

import viewModule = require("ui/core/view");
import listViewModule = require("ui/list-view");
import frameModule = require("ui/frame");
import pageModule = require("ui/page");
import gesturesModule = require("ui/gestures");

import projectsViewModelModule = require("./projects-view-model")
import viewTaskViewModelModule = require("../view-task/view-task-view-model")
import serviceModule = require("../../utils/service")
import viewsModule = require("../../utils/views")

var viewModel = new projectsViewModelModule.ProjectsViewModel();
export function navigatingTo(args: observableModule.EventData) {
    var page = <pageModule.Page>args.object;
    page.bindingContext = viewModel;

    viewModel.refresh();
}