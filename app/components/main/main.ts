import observableModule = require("data/observable");
import viewModule = require("ui/core/view");
import listViewModule = require("ui/list-view");
import pageModule = require("ui/page");

import mainViewModelModule = require("./main-view-model");
import listPickerViewModelModule = require("../list-picker/list-picker-view-model");
import navigationModule = require("../../utils/navigation");

var viewModel = new mainViewModelModule.MainViewModel();
export function navigatingTo(args: observableModule.EventData) {
    var page = <pageModule.Page>args.object;
    page.bindingContext = null;
    page.bindingContext = viewModel;
}

export function viewTap(args: listViewModule.ItemEventData) {
    var view = <viewModule.View>args.view;
    viewModel.views.selectItem(<listPickerViewModelModule.ListItem>view.bindingContext);
    var data = view.bindingContext.data;
    navigationModule.navigate(data.View);
} 

export function editProfileButtonTap() {
    viewModel.editProfile();
}

export function logoutButtonTap() {
    viewModel.logout();
}