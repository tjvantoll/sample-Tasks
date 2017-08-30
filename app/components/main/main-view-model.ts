import viewModelBaseModule = require("../common/view-model-base");
import editProfileViewModelModule = require("../edit-profile/edit-profile-view-model");
import listPickerViewModelModule = require("../list-picker/list-picker-view-model");

import serviceModule = require("../../utils/service");
import navigationModule = require("../../utils/navigation");
import viewsModule = require("../../utils/views");

export class MainViewModel extends viewModelBaseModule.ViewModelBase {
    private _user: any;
    private _views: listPickerViewModelModule.ListPickerViewModel;

    constructor() {
        super();

        var tasksView = {
            Id: 1,
            Name: "Tasks",
            View: viewsModule.Views.tasks
        };

        var projectsView = {
            Id: 2,
            Name: "Projects",
            View: viewsModule.Views.projects
        };

        this._views = new listPickerViewModelModule.ListPickerViewModel(() => {
            return new Promise<any[]>((resolve, reject) => {
                resolve([tasksView, projectsView]);
            });
        }, tasksView,(selectedItem) => {
            });

        this.refresh();
    }

    get user(): any {
        return this._user;
    }

    set user(value: any) {
        if (this._user !== value) {
            this._user = value;
            this.notifyPropertyChange("user", value);
        }
    }

    get views(): listPickerViewModelModule.ListPickerViewModel {
        return this._views;
    }

    editProfile() {
        navigationModule.navigate({
            moduleName: viewsModule.Views.editProfile,
            context: new editProfileViewModelModule.EditProfileViewModel(this.user)
        });
    }

    logout() {
        serviceModule.service.logout();
        navigationModule.navigate({
            moduleName: viewsModule.Views.login,
            backstackVisible: false,
            clearHistory: true
        });
    }

    refresh() {
        if (!this.beginLoading())return;
        serviceModule.service.getCurrentUser().then(user => {
            this.user = user;
            this.endLoading();
        }, error => {
                this.endLoading();
            });
    }
}
