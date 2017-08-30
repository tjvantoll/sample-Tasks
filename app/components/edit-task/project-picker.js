"use strict";
var listPickerViewModelModule = require("../list-picker/list-picker-view-model");
var navigationModule = require("../../utils/navigation");
var viewsModule = require("../../utils/views");
var serviceModule = require("../../utils/service");
function projectPickerTap(args) {
    var view = args.view;
    var viewModel = view.bindingContext;
    navigationModule.navigate({
        moduleName: viewsModule.Views.listPicker,
        context: new listPickerViewModelModule.ListPickerViewModel(function () { return serviceModule.service.getProjects(); }, viewModel.project, function (selectedItem) {
            viewModel.project = selectedItem;
        })
    });
}
exports.projectPickerTap = projectPickerTap;
//# sourceMappingURL=project-picker.js.map