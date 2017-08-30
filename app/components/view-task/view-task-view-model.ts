import observableModule = require("data/observable");

import viewModelBaseModule = require("../common/view-model-base");
import editTaskViewModelModule = require("../edit-task/edit-task-view-model");
import notificationsModule = require("../../utils/notifications");
import serviceModule = require("../../utils/service");
import navigationModule = require("../../utils/navigation");
import viewsModule = require("../../utils/views");
import constantsModule = require("../../utils/constants");

export class ViewTaskViewModel extends viewModelBaseModule.ViewModelBase {
    private _project: any;
    private _task: any;
    private _pictureUrl: string;

    constructor(task: any) {
        super();

        this.task = task;
        this.pictureUrl = null;

        this.loadProject();
    }

    get task(): any {
        return this._task;
    }

    set task(value: any) {
        if (this._task != value) {
            this._task = value;
            this.notifyPropertyChange("task", value);
        }
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

    get pictureUrl(): any {
        return this._pictureUrl;
    }

    set pictureUrl(value: any) {
        if (this._pictureUrl !== value) {
            this._pictureUrl = value;
            this.notifyPropertyChange("pictureUrl", value);
        }
    }

    editTask() {
        navigationModule.navigate({
            moduleName: viewsModule.Views.editTask,
            context: new editTaskViewModelModule.EditTaskViewModel(this.task)
        });
    }

    completeTask() {
        this.task.IsCompleted = !this.task.IsCompleted;
        this.task.CompletionDate = this.task.IsCompleted ? new Date() : null;

        this.beginLoading()
        serviceModule.service.updateTask(this.task).then(data => {
            this.endLoading();
        }, error => {
                this.endLoading();
            });
    }

    refresh() {
        this.loadPhoto();
        this.loadProject();
    }

    loadPhoto() {
        if (this.task.Photo) {
            if (!this.beginLoading())return;
            serviceModule.service.getDownloadUrlFromId(this.task.Photo).then(url => {
                this.pictureUrl = url;
                this.endLoading();
            }, error => {
                    this.endLoading();
                });
        }
    }

    loadProject() {
        if (this.task.Project) {
            if (!this.beginLoading())return;
            serviceModule.service.getProject(this.task.Project).then(project => {
                this.project = project;
                this.endLoading();
            }, error => {
                    this.endLoading();
                });
        }
    }
}
