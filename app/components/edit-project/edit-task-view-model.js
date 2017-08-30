var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var cameraModule = require("camera");
var editViewModelBaseModule = require("../common/edit-view-model-base");
var notificationsModule = require("../../utils/notifications");
var navigationModule = require("../../utils/navigation");
var serviceModule = require("../../utils/service");
var EditTaskViewModel = (function (_super) {
    __extends(EditTaskViewModel, _super);
    function EditTaskViewModel(task) {
        _super.call(this, task);
        this.project = {
            Name: "To do"
        };
    }
    Object.defineProperty(EditTaskViewModel.prototype, "project", {
        get: function () {
            return this._project;
        },
        set: function (value) {
            if (this._project !== value) {
                this._project = value;
                this.notifyPropertyChanged("project", value);
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
                this.notifyPropertyChanged("picture", value);
            }
        },
        enumerable: true,
        configurable: true
    });
    EditTaskViewModel.prototype.createItem = function () {
        var item = _super.prototype.createItem.call(this);
        item.DueDate = new Date();
        item.ReminderDate = new Date();
        return item;
    };
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
        cameraModule.takePicture().then(function (picture) {
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
                });
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
    return EditTaskViewModel;
})(editViewModelBaseModule.EditViewModelBase);
exports.EditTaskViewModel = EditTaskViewModel;
//# sourceMappingURL=edit-task-view-model.js.map