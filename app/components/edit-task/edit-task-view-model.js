"use strict";
var cameraModule = require("camera");
var imageSourceModule = require("image-source");
var editViewModelBaseModule = require("../common/edit-view-model-base");
var notificationsModule = require("../../utils/notifications");
var navigationModule = require("../../utils/navigation");
var serviceModule = require("../../utils/service");
var constantsModule = require("../../utils/constants");
var EditTaskViewModel = (function (_super) {
    __extends(EditTaskViewModel, _super);
    function EditTaskViewModel(task) {
        _super.call(this, task);
        this.loadProject();
        this.loadPhoto();
    }
    Object.defineProperty(EditTaskViewModel.prototype, "project", {
        get: function () {
            return this._project;
        },
        set: function (value) {
            if (this._project !== value) {
                this._project = value;
                this.item.Project = this.project.Id;
                this.notifyPropertyChange("project", value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditTaskViewModel.prototype, "picture", {
        get: function () {
            return this._picture;
        },
        set: function (value) {
            if (this._picture != value) {
                this._picture = value;
                this.notifyPropertyChange("picture", value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditTaskViewModel.prototype, "deleteHeader", {
        get: function () {
            return constantsModule.deleteTaskHeader;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditTaskViewModel.prototype, "deleteMessage", {
        get: function () {
            return constantsModule.deleteTaskMessage;
        },
        enumerable: true,
        configurable: true
    });
    EditTaskViewModel.prototype.addItem = function (item) {
        return serviceModule.service.createTask(item);
    };
    EditTaskViewModel.prototype.updateItem = function (item) {
        return serviceModule.service.updateTask(item);
    };
    EditTaskViewModel.prototype.deleteItem = function (item) {
        return serviceModule.service.deleteTask(item);
    };
    EditTaskViewModel.prototype.takePicture = function () {
        var _this = this;
        var options = {
            width: 320,
            height: 480,
            keepAspectRatio: true
        };
        cameraModule.takePicture(options).then(function (picture) {
            _this.picture = picture;
        });
    };
    EditTaskViewModel.prototype.validate = function () {
        if (!this.item.Name || this.item.Name === "") {
            notificationsModule.showError("Please enter name.");
            return false;
        }
        return _super.prototype.validate.call(this);
    };
    EditTaskViewModel.prototype.onSaving = function (item) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.picture) {
                serviceModule.service.uploadPicture(_this.picture).then(function (data) {
                    item.Photo = data.result.Id;
                    resolve(false);
                }, reject);
            }
            else {
                resolve(false);
            }
        });
    };
    EditTaskViewModel.prototype.onItemDeleted = function (item) {
        _super.prototype.onItemDeleted.call(this, item);
        navigationModule.goBack();
    };
    EditTaskViewModel.prototype.loadPhoto = function () {
        var _this = this;
        if (this.item.Photo) {
            if (!this.beginLoading())
                return;
            serviceModule.service.getDownloadUrlFromId(this.item.Photo).then(function (url) {
                imageSourceModule.fromUrl(url).then(function (imageSource) {
                    _this.picture = imageSource;
                    _this.endLoading();
                });
            }).catch(function (error) {
                _this.endLoading();
            });
        }
    };
    EditTaskViewModel.prototype.loadProject = function () {
        var _this = this;
        if (this.item.Project) {
            if (!this.beginLoading())
                return;
            serviceModule.service.getProject(this.item.Project).then(function (project) {
                _this.project = project;
                _this.endLoading();
            }, function (error) {
                _this.endLoading();
            });
        }
    };
    return EditTaskViewModel;
}(editViewModelBaseModule.EditViewModelBase));
exports.EditTaskViewModel = EditTaskViewModel;
//# sourceMappingURL=edit-task-view-model.js.map