import observableArrayModule = require("data/observable-array");

import listViewModule = require("ui/list-view");

import viewModelBaseModule = require("../common/view-model-base");
import viewProjectViewModelModule = require("../view-project/view-project-view-model");
import editProjectViewModelModule = require("../edit-project/edit-project-view-model");
import navigationModule = require("../../utils/navigation");
import serviceModule = require("../../utils/service");
import viewsModule = require("../../utils/views");

export class ProjectsViewModel extends viewModelBaseModule.ViewModelBase {
    private _projects: Array<viewProjectViewModelModule.ViewProjectViewModel>;

    constructor() {
        super();
    }

    get projects(): Array<viewProjectViewModelModule.ViewProjectViewModel> {
        return this._projects;
    }

    set projects(value: Array<viewProjectViewModelModule.ViewProjectViewModel>) {
        if (this._projects != value) {
            this._projects = value;
            this.notifyPropertyChange("projects", value);
        }
    }

    addProject() {
        navigationModule.navigate({
            moduleName: viewsModule.Views.editProject,
            context: new editProjectViewModelModule.EditProjectViewModel()
        });
    }

    viewProject(args: listViewModule.ItemEventData) {
        navigationModule.navigate({
            moduleName: viewsModule.Views.viewProject,
            context: args.view.bindingContext
        });
    }

    logout() {
        serviceModule.service.logout();
        navigationModule.navigate({
            moduleName: viewsModule.Views.login,
            backstackVisible: false
        });
    }

    refresh() {
        if (!this.beginLoading())return;
        serviceModule.service.getProjects().then((data: any[]) => {
            var projects = new Array<viewProjectViewModelModule.ViewProjectViewModel>();
            for (var i = 0; i < data.length; i++) {
                projects.push(new viewProjectViewModelModule.ViewProjectViewModel(data[i]));
            }

            this.projects = projects;
            this.endLoading();
        },(error: any) => {
                this.endLoading();
            });
    }
}
