import cameraModule = require("camera");
import imageSourceModule = require("image-source");
import observableModule = require("data/observable");

import editViewModelBaseModule = require("../common/edit-view-model-base");
import notificationsModule = require("../../utils/notifications");
import navigationModule = require("../../utils/navigation");
import serviceModule = require("../../utils/service");
import constantsModule = require("../../utils/constants");

export class EditTaskViewModel extends editViewModelBaseModule.EditViewModelBase {
    private _project: any;
    private _picture: imageSourceModule.ImageSource;

    constructor(task?: any) {
        super(task);

        this.loadProject();
        this.loadPhoto();
    }

    get project(): any {
        return this._project;
    }

    set project(value: any) {
        if (this._project !== value) {
            this._project = value;
            this.item.Project = this.project.Id;
            this.notifyPropertyChange("project", value);
        }
    }

    get picture(): imageSourceModule.ImageSource {
        return this._picture;
    }

    set picture(value: imageSourceModule.ImageSource) {
        if (this._picture != value) {
            this._picture = value;
            this.notifyPropertyChange("picture", value);
        }
    }

    get deleteHeader(): string {
        return constantsModule.deleteTaskHeader;
    }

    get deleteMessage(): string {
        return constantsModule.deleteTaskMessage;
    }

    addItem(item: any): Promise<any> {
        return serviceModule.service.createTask(item);
    }

    updateItem(item: any): Promise<any> {
        return serviceModule.service.updateTask(item);
    }

    deleteItem(item: any): Promise<any> {
        return serviceModule.service.deleteTask(item);
    }

    takePicture() {
        var options: cameraModule.CameraOptions = {
            width: 320,
            height: 480,
            keepAspectRatio: true
        };
        cameraModule.takePicture(options).then(picture => {
            this.picture = picture;
        });
    }

    validate(): boolean {
        if (!this.item.Name || this.item.Name === "") {
            notificationsModule.showError("Please enter name.");
            return false;
        }

        return super.validate();
    }

    onSaving(item: any): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            if (this.picture) {
                serviceModule.service.uploadPicture(this.picture).then(data => {
                    item.Photo = data.result.Id;
                    resolve(false);
                }, reject);
            }
            else {
                resolve(false);
            }
        });
    }

    onItemDeleted(item: any) {
        super.onItemDeleted(item);
        navigationModule.goBack();
    }

    loadPhoto() {
        if (this.item.Photo) {
            if (!this.beginLoading())return;
            serviceModule.service.getDownloadUrlFromId(this.item.Photo).then(url => {
                imageSourceModule.fromUrl(url).then(imageSource => {
                    this.picture = imageSource;
                    this.endLoading();
                });
            }).catch(error => {
                this.endLoading()
            });
        }
    }

    loadProject() {
        if (this.item.Project) {
            if (!this.beginLoading())return;
            serviceModule.service.getProject(this.item.Project).then(project => {
                this.project = project;
                this.endLoading();
            }, error => {
                    this.endLoading();
                });
        }
    }
}
