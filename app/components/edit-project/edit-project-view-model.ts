import cameraModule = require("camera");
import imageSourceModule = require("image-source");
import observableModule = require("data/observable");

import editViewModelBaseModule = require("../common/edit-view-model-base");
import notificationsModule = require("../../utils/notifications");
import navigationModule = require("../../utils/navigation");
import serviceModule = require("../../utils/service");
import constantsModule = require("../../utils/constants");

export class EditProjectViewModel extends editViewModelBaseModule.EditViewModelBase {
    constructor(project?: any) {
        super(project);
    }

    get deleteHeader(): string {
        return constantsModule.deleteProjectMessage;
    }

    get deleteMessage(): string {
        return constantsModule.deleteProjectMessage;
    }

    addItem(item: any): Promise<any> {
        return serviceModule.service.createProject(item);
    }

    updateItem(item: any): Promise<any> {
        return serviceModule.service.updateProject(item);
    }

    deleteItem(item: any): Promise<any> {
        return serviceModule.service.deleteProject(item);
    }

    validate(): boolean {
        if (!this.item.Name || this.item.Name === "") {
            notificationsModule.showError("Please enter name.");
            return false;
        }

        return super.validate();
    }

    onItemDeleted(item: any) {
        super.onItemDeleted(item);
        navigationModule.goBack();
    }
}