"use strict";
var viewModelBaseModule = require("../common/view-model-base");
var viewTaskViewModelModule = require("../view-task/view-task-view-model");
var editTaskViewModelModule = require("../edit-task/edit-task-view-model");
var navigationModule = require("../../utils/navigation");
var serviceModule = require("../../utils/service");
var viewsModule = require("../../utils/views");
var TasksViewModel = (function (_super) {
    __extends(TasksViewModel, _super);
    function TasksViewModel() {
        _super.call(this);
        this._selectedDay = 1;
    }
    Object.defineProperty(TasksViewModel.prototype, "tasks", {
        get: function () {
            return this._tasks;
        },
        set: function (value) {
            if (this._tasks != value) {
                this._tasks = value;
                this.notifyPropertyChange("tasks", value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TasksViewModel.prototype, "selectedDay", {
        get: function () {
            return this._selectedDay;
        },
        set: function (value) {
            if (this._selectedDay != value) {
                this._selectedDay = value;
                this.notifyPropertyChange("selectedDay", value);
                this.refresh();
            }
        },
        enumerable: true,
        configurable: true
    });
    TasksViewModel.prototype.addTask = function () {
        navigationModule.navigate({
            moduleName: viewsModule.Views.editTask,
            context: new editTaskViewModelModule.EditTaskViewModel()
        });
    };
    TasksViewModel.prototype.viewTask = function (args) {
        navigationModule.navigate({
            moduleName: viewsModule.Views.viewTask,
            context: args.view.bindingContext
        });
    };
    TasksViewModel.prototype.logout = function () {
        serviceModule.service.logout();
        navigationModule.navigate({
            moduleName: viewsModule.Views.login
        });
    };
    TasksViewModel.prototype.refresh = function () {
        var _this = this;
        if (!this.beginLoading())
            return;
        var getTasksMethod = getMethodByFilter(this.selectedDay);
        getTasksMethod.then(function (data) {
            var tasks = new Array();
            for (var i = 0; i < data.length; i++) {
                tasks.push(new viewTaskViewModelModule.ViewTaskViewModel(data[i]));
            }
            _this.tasks = tasks;
            _this.endLoading();
        }, function (error) {
            _this.endLoading();
        });
    };
    return TasksViewModel;
}(viewModelBaseModule.ViewModelBase));
exports.TasksViewModel = TasksViewModel;
function getMethodByFilter(selectedDay) {
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
//# sourceMappingURL=tasks-view-model.js.map