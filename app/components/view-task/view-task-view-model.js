"use strict";
var viewModelBaseModule = require("../common/view-model-base");
var editTaskViewModelModule = require("../edit-task/edit-task-view-model");
var serviceModule = require("../../utils/service");
var navigationModule = require("../../utils/navigation");
var viewsModule = require("../../utils/views");
var ViewTaskViewModel = (function (_super) {
    __extends(ViewTaskViewModel, _super);
    function ViewTaskViewModel(task) {
        _super.call(this);
        this.task = task;
        this.pictureUrl = null;
        this.loadProject();
    }
    Object.defineProperty(ViewTaskViewModel.prototype, "task", {
        get: function () {
            return this._task;
        },
        set: function (value) {
            if (this._task != value) {
                this._task = value;
                this.notifyPropertyChange("task", value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewTaskViewModel.prototype, "project", {
        get: function () {
            return this._project;
        },
        set: function (value) {
            if (this._project != value) {
                this._project = value;
                this.notifyPropertyChange("project", value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewTaskViewModel.prototype, "pictureUrl", {
        get: function () {
            return this._pictureUrl;
        },
        set: function (value) {
            if (this._pictureUrl !== value) {
                this._pictureUrl = value;
                this.notifyPropertyChange("pictureUrl", value);
            }
        },
        enumerable: true,
        configurable: true
    });
    ViewTaskViewModel.prototype.editTask = function () {
        navigationModule.navigate({
            moduleName: viewsModule.Views.editTask,
            context: new editTaskViewModelModule.EditTaskViewModel(this.task)
        });
    };
    ViewTaskViewModel.prototype.completeTask = function () {
        var _this = this;
        this.task.IsCompleted = !this.task.IsCompleted;
        this.task.CompletionDate = this.task.IsCompleted ? new Date() : null;
        this.beginLoading();
        serviceModule.service.updateTask(this.task).then(function (data) {
            _this.endLoading();
        }, function (error) {
            _this.endLoading();
        });
    };
    ViewTaskViewModel.prototype.refresh = function () {
        this.loadPhoto();
        this.loadProject();
    };
    ViewTaskViewModel.prototype.loadPhoto = function () {
        var _this = this;
        if (this.task.Photo) {
            if (!this.beginLoading())
                return;
            serviceModule.service.getDownloadUrlFromId(this.task.Photo).then(function (url) {
                _this.pictureUrl = url;
                _this.endLoading();
            }, function (error) {
                _this.endLoading();
            });
        }
    };
    ViewTaskViewModel.prototype.loadProject = function () {
        var _this = this;
        if (this.task.Project) {
            if (!this.beginLoading())
                return;
            serviceModule.service.getProject(this.task.Project).then(function (project) {
                _this.project = project;
                _this.endLoading();
            }, function (error) {
                _this.endLoading();
            });
        }
    };
    return ViewTaskViewModel;
}(viewModelBaseModule.ViewModelBase));
exports.ViewTaskViewModel = ViewTaskViewModel;
//# sourceMappingURL=view-task-view-model.js.map