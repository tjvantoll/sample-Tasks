import observableArrayModule = require("data/observable-array");

import listViewModule = require("ui/list-view");

import viewModelBaseModule = require("../common/view-model-base");
import viewTaskViewModelModule = require("../view-task/view-task-view-model");
import editTaskViewModelModule = require("../edit-task/edit-task-view-model");
import navigationModule = require("../../utils/navigation");
import serviceModule = require("../../utils/service");
import viewsModule = require("../../utils/views");

export class TasksViewModel extends viewModelBaseModule.ViewModelBase {
    private _tasks: Array<viewTaskViewModelModule.ViewTaskViewModel>;
    private _selectedDay: number;

    constructor() {
        super();

        this._selectedDay = 1;
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

    get selectedDay(): number {
        return this._selectedDay;
    }

    set selectedDay(value: number) {
        if (this._selectedDay != value) {
            this._selectedDay = value;
            this.notifyPropertyChange("selectedDay", value);
            this.refresh();
        }
    }

    addTask() {
        navigationModule.navigate({
            moduleName: viewsModule.Views.editTask,
            context: new editTaskViewModelModule.EditTaskViewModel()
        });
    }

    viewTask(args: listViewModule.ItemEventData) {
        navigationModule.navigate({
            moduleName: viewsModule.Views.viewTask,
            context: args.view.bindingContext
        });
    }

    logout() {
        serviceModule.service.logout();
        navigationModule.navigate({
            moduleName: viewsModule.Views.login
        });
    }

    refresh() {
        if (!this.beginLoading())return;
        var getTasksMethod = getMethodByFilter(this.selectedDay);
        getTasksMethod.then((data: any[]) => {
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

function getMethodByFilter(selectedDay: number): Promise<any[]> {
    switch (selectedDay) {
        case 0:
            return serviceModule.service.getOverdueTasks();

        case 1:
            return serviceModule.service.getTasksForToday();

        case 2:
            return serviceModule.service.getTasksForTomorrow();

        default:
            return serviceModule.service.getTasksAfterTomorrow();
    }
}
