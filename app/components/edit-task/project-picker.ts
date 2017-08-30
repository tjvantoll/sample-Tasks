import viewModule = require("ui/core/view");
import gesturesModule = require("ui/gestures");

import editTaskViewModelModule = require("./edit-task-view-model");

import listPickerViewModelModule = require("../list-picker/list-picker-view-model");

import navigationModule = require("../../utils/navigation");
import viewsModule = require("../../utils/views");
import serviceModule = require("../../utils/service");

export function projectPickerTap(args: gesturesModule.GestureEventData) {
    var view = <viewModule.View>args.view;
    var viewModel = <editTaskViewModelModule.EditTaskViewModel>view.bindingContext;
    navigationModule.navigate({
        moduleName: viewsModule.Views.listPicker,
        context: new listPickerViewModelModule.ListPickerViewModel(() => { return serviceModule.service.getProjects(); }, viewModel.project,(selectedItem: any) => {
            viewModel.project = selectedItem;
        })
    });
}