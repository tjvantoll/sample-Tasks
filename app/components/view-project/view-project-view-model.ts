import observableModule = require("data/observable");

import listViewModule = require("ui/list-view");

import viewModelBaseModule = require("../common/view-model-base");
import viewTaskViewModelModule = require("../view-task/view-task-view-model");
import editTaskViewModelModule = require("../edit-task/edit-task-view-model");
import editProjectViewModelModule = require("../edit-project/edit-project-view-model");
import notificationsModule = require("../../utils/notifications");
import serviceModule = require("../../utils/service");
import navigationModule = require("../../utils/navigation");
import viewsModule = require("../../utils/views");
import constantsModule = require("../../utils/constants");

export class ViewProjectViewModel extends viewModelBaseModule.ViewModelBase {
    private _project: any;
    private _tasks: Array<viewTaskViewModelModule.ViewTaskViewModel>;

    constructor(project: any) {
        super();

        this.project = project;
        this.refresh();
    }

    get project(): any {
        return this._project;
    }

    set project(value: any) {
        if (this._project != value) {
            this._project = value;
            this.notifyPropertyChange("project", value);
        }
    }

    get tasks(): Array<viewTaskViewModelModule.ViewTaskViewModel> {
        return this._tasks;
    }

    set tasks(value: Array<viewTaskViewModelModule.ViewTaskViewModel>) {
        if (this._tasks != value) {
            this._tasks = value;
            this.notifyPropertyChange("tasks", value);
        }
    }

    get tasksCount(): number {
        if (this.tasks) {
            return this.tasks.length
        }

        return undefined;
    }

    editProject() {
        navigationModule.navigate({
            moduleName: viewsModule.Views.editProject,
            context: new editProjectViewModelModule.EditProjectViewModel(this.project)
        });
    }

    addTask() {
        var editTaskViewModel = new editTaskViewModelModule.EditTaskViewModel();
        editTaskViewModel.project = this.project;
        navigationModule.navigate({
            moduleName: viewsModule.Views.editTask,
            context: editTaskViewModel
        });
    }

    viewTask(args: listViewModule.ItemEventData) {
        navigationModule.navigate({
            moduleName: viewsModule.Views.viewTask,
            context: args.view.bindingContext
        });
    }

    refresh() {
        if (!this.beginLoading())return;
        serviceModule.service.getTasksByProject(this.project)
            .then((data: any[]) => {
            var tasks = new Array<viewTaskViewModelModule.ViewTaskViewModel>();
            for (var i = 0; i < data.length; i++) {
                tasks.push(new viewTaskViewModelModule.ViewTaskViewModel(data[i]));
            }

            this.tasks = tasks;
            this.endLoading();
        },(error: any) => {
                this.endLoading();
            });
    }
} 