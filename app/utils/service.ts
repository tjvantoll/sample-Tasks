import applicationSettingsModule = require("application-settings");
import imageSourceModule = require("image-source");

import constantsModule = require("./constants");
import notificationsModule = require("./notifications");
import enums = require("ui/enums");

var everliveModule = require("../lib/everlive");

var TASK = "Task";
var PROJECT = "Project";
var DUE_DATE = "DueDate";

export class Service {
    private _everlive: any;

    get isAuthenticated(): boolean {
        return applicationSettingsModule.hasKey(constantsModule.authenticationTokenKey);
    }

    login(username: string, password: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            var everlive = new everliveModule(constantsModule.telerikApiKey);
            everlive.Users.login(username, password,(data: any) => {
                this.setupLocalSettings(data.result.access_token);
                resolve(data);
            }, error => {
                    Service.showErrorAndReject(error, reject);
                })
        });
    }

    logout() {
        this.clearLocalSettings();
        this.clearEverlive();
    }

    signUp(username: string, password: string, additionalData: any): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            var everlive = new everliveModule(constantsModule.telerikApiKey);
            everlive.Users.register(username, password, additionalData, resolve, error => {
                Service.showErrorAndReject(error, reject);
            })
        });
    }

    clearEverlive() {
        if (this._everlive) {
            //this._everlive.offlineStorage.purgeAll();
            this._everlive = null;
        }
    }

    getProjects(): Promise<any[]> {
        return new Promise<any[]>((resolve, reject) => {
            var query = new everliveModule.Query();
            query.order("Name");
            var everlive = this.createEverlive();
            everlive.data(PROJECT).get(query).then(data => {
                resolve(<any[]>data.result);
            }, error => {
                    Service.showErrorAndReject(error, reject);
                })
        });
    }

    getProject(projectId: number): Promise<any> {
        return new Promise<any[]>((resolve, reject) => {
            var everlive = this.createEverlive();
            everlive.data(PROJECT).getById(projectId).then(data => {
                resolve(data.result);
            }, error => {
                    Service.showErrorAndReject(error, reject);
                })
        });
    }

    getOverdueTasks(): Promise<any[]> {
        var now = new Date();
        var start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);

        return this.getTasksBefore(start);
    }

    getTasksForToday(): Promise<any[]> {
        var now = new Date();
        var start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
        var end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
        end.setDate(start.getDate() + 1);

        return this.getTasksBetween(start, end);
    }

    getTasksForTomorrow(): Promise<any[]> {
        var now = new Date();
        var start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
        start.setDate(start.getDate() + 1);
        var end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
        end.setDate(start.getDate() + 2);

        return this.getTasksBetween(start, end);
    }

    getTasksAfterTomorrow(): Promise<any[]> {
        var now = new Date();
        var date = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
        date.setDate(date.getDate() + 2);

        return this.getTasksAfter(date);
    }

    getTasksByProject(project: any): Promise<any[]> {
        var query = new everliveModule.Query();
        query
            .where()
            .eq(PROJECT, project.Id)

        return this.getTasks(query);

    }

    createTask(task: any): Promise<any> {
        return this.createItem(TASK, task);
    }

    updateTask(task: any): Promise<any> {
        return this.updateItem(TASK, task);
    }

    deleteTask(task: any): Promise<any> {
        return this.deleteItem(TASK, task);
    }

    createProject(project: any): Promise<any> {
        return this.createItem(PROJECT, project);
    }

    updateProject(project: any): Promise<any> {
        return this.updateItem(PROJECT, project);
    }

    getCurrentUser(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            var everlive = this.createEverlive();
            everlive.Users.currentUser().then((data) => {
                resolve(data.result);
            }, error => {
                    Service.showErrorAndReject(error, reject);
                })
        });
    }

    updateUser(user: any): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            var everlive = this.createEverlive();
            everlive.Users.updateSingle(user, resolve, error => {
                Service.showErrorAndReject(error, reject)
            });
        });
    }

    changeUserPassword(username: string, oldPassword: string, newPassword: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            var everlive = this.createEverlive();
            everlive.Users.changePassword(username, oldPassword, newPassword, true, resolve, error => {
                Service.showErrorAndReject(error, reject);
            });
        });
    }

    deleteProject(project: any): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            var everlive = this.createEverlive();
            everlive.data(TASK).destroy({ Project: project.Id }, data => {
                this.deleteItem(PROJECT, project).then(resolve, reject);
            }, error => {
                    Service.showErrorAndReject(error, reject);
                });
        });
    }

    getDownloadUrlFromId(fileId: any): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            var everlive = this.createEverlive();
            everlive.Files.getDownloadUrlById(fileId).then(url => {
                resolve(url);
            }, error => {
                    Service.showErrorAndReject(error, reject);
                });
        });
    }

    uploadPicture(picture: imageSourceModule.ImageSource): Promise<any> {
        return new Promise<string>((resolve, reject) => {
            var everlive = this.createEverlive();
            var file = {
                "Filename": "NativeScriptIsAwesome.jpg",
                "ContentType": "image/jpeg",
                "base64": picture.toBase64String(enums.ImageFormat.jpeg, 100)
            };

            everlive.Files.create(file,
                function (data) {
                    resolve(data);
                }, function (error) {
                    Service.showErrorAndReject(error, reject);
                });
        });
    }

    private createEverlive(): any {
        if (!this._everlive) {
            this._everlive = new everliveModule({
                apiKey: constantsModule.telerikApiKey,
                token: applicationSettingsModule.getString(constantsModule.authenticationTokenKey)
            });
        }

        return this._everlive;
    }

    private static showErrorAndReject(error: any, reject: (e: any) => void) {
        notificationsModule.showError(error.message);
        reject(error);
    }

    private setupLocalSettings(authenticationTokenKey: string) {
        applicationSettingsModule.setString(constantsModule.authenticationTokenKey, authenticationTokenKey);
    }

    private clearLocalSettings() {
        applicationSettingsModule.remove(constantsModule.authenticationTokenKey);
    }

    private getTasksBetween(start: Date, end: Date): Promise<any[]> {
        var query = new everliveModule.Query();
        query
            .where()
            .and()
            .gte(DUE_DATE, start)
            .lt(DUE_DATE, end)
            .done();

        return this.getTasks(query);
    }

    private getTasksBefore(date: Date): Promise<any[]> {
        var query = new everliveModule.Query();
        query
            .where()
            .lt(DUE_DATE, date);

        return this.getTasks(query);
    }

    private getTasksAfter(date: Date): Promise<any[]> {
        var query = new everliveModule.Query();
        query
            .where()
            .or()
            .gte(DUE_DATE, date)
            .eq(DUE_DATE, null)
            .done();

        return this.getTasks(query);
    }

    private getTasks(query: any): Promise<any[]> {
        return new Promise<any[]>((resolve, reject) => {
            query.order("Name");
            var everlive = this.createEverlive();
            everlive.data(TASK).get(query).then(data => {
                resolve(<any[]>data.result);
            }, error => {
                    Service.showErrorAndReject(error, reject);
                })
        });
    }

    private createItem(dataName: string, item: any): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            var everlive = this.createEverlive();
            everlive.data(dataName).create(item, result => {
                resolve(result);
            }, error => {
                    Service.showErrorAndReject(error, reject);
                })
        });
    }

    private updateItem(dataName: string, item: any): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            var everlive = this.createEverlive();
            everlive.data(dataName).updateSingle(item, resolve, error => {
                Service.showErrorAndReject(error, reject);
            })
        });
    }

    private deleteItem(dataName: string, item: any): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            var everlive = this.createEverlive();
            everlive.data(dataName).destroySingle({ Id: item.Id }, resolve, error => {
                Service.showErrorAndReject(error, reject);
            })
        });
    }
}

export var service = new Service();
