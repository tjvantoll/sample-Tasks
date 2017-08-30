"use strict";
var editViewModelBaseModule = require("../common/edit-view-model-base");
var notificationsModule = require("../../utils/notifications");
var navigationModule = require("../../utils/navigation");
var serviceModule = require("../../utils/service");
var constantsModule = require("../../utils/constants");
var EditProjectViewModel = (function (_super) {
    __extends(EditProjectViewModel, _super);
    function EditProjectViewModel(project) {
        _super.call(this, project);
    }
    Object.defineProperty(EditProjectViewModel.prototype, "deleteHeader", {
        get: function () {
            return constantsModule.deleteProjectMessage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditProjectViewModel.prototype, "deleteMessage", {
        get: function () {
            return constantsModule.deleteProjectMessage;
        },
        enumerable: true,
        configurable: true
    });
    EditProjectViewModel.prototype.addItem = function (item) {
        return serviceModule.service.createProject(item);
    };
    EditProjectViewModel.prototype.updateItem = function (item) {
        return serviceModule.service.updateProject(item);
    };
    EditProjectViewModel.prototype.deleteItem = function (item) {
        return serviceModule.service.deleteProject(item);
    };
    EditProjectViewModel.prototype.validate = function () {
        if (!this.item.Name || this.item.Name === "") {
            notificationsModule.showError("Please enter name.");
            return false;
        }
        return _super.prototype.validate.call(this);
    };
    EditProjectViewModel.prototype.onItemDeleted = function (item) {
        _super.prototype.onItemDeleted.call(this, item);
        navigationModule.goBack();
    };
    return EditProjectViewModel;
}(editViewModelBaseModule.EditViewModelBase));
exports.EditProjectViewModel = EditProjectViewModel;
//# sourceMappingURL=edit-project-view-model.js.map