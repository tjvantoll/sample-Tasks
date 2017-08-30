"use strict";
var applicationSettingsModule = require("application-settings");
var constantsModule = require("./constants");
var notificationsModule = require("./notifications");
var enums = require("ui/enums");
var everliveModule = require("../lib/everlive");
var TASK = "Task";
var PROJECT = "Project";
var DUE_DATE = "DueDate";
var Service = (function () {
    function Service() {
    }
    Object.defineProperty(Service.prototype, "isAuthenticated", {
        get: function () {
            return applicationSettingsModule.hasKey(constantsModule.authenticationTokenKey);
        },
        enumerable: true,
        configurable: true
    });
    Service.prototype.login = function (username, password) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var everlive = new everliveModule(constantsModule.telerikApiKey);
            everlive.Users.login(username, password, function (data) {
                _this.setupLocalSettings(data.result.access_token);
                resolve(data);
            }, function (error) {
                Service.showErrorAndReject(error, reject);
            });
        });
    };
    Service.prototype.logout = function () {
        this.clearLocalSettings();
        this.clearEverlive();
    };
    Service.prototype.signUp = function (username, password, additionalData) {
        return new Promise(function (resolve, reject) {
            var everlive = new everliveModule(constantsModule.telerikApiKey);
            everlive.Users.register(username, password, additionalData, resolve, function (error) {
                Service.showErrorAndReject(error, reject);
            });
        });
    };
    Service.prototype.clearEverlive = function () {
        if (this._everlive) {
            //this._everlive.offlineStorage.purgeAll();
            this._everlive = null;
        }
    };
    Service.prototype.getProjects = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var query = new everliveModule.Query();
            query.order("Name");
            var everlive = _this.createEverlive();
            everlive.data(PROJECT).get(query).then(function (data) {
                resolve(data.result);
            }, function (error) {
                Service.showErrorAndReject(error, reject);
            });
        });
    };
    Service.prototype.getProject = function (projectId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var everlive = _this.createEverlive();
            everlive.data(PROJECT).getById(projectId).then(function (data) {
                resolve(data.result);
            }, function (error) {
                Service.showErrorAndReject(error, reject);
            });
        });
    };
    Service.prototype.getOverdueTasks = function () {
        var now = new Date();
        var start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
        return this.getTasksBefore(start);
    };
    Service.prototype.getTasksForToday = function () {
        var now = new Date();
        var start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
        var end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
        end.setDate(start.getDate() + 1);
        return this.getTasksBetween(start, end);
    };
    Service.prototype.getTasksForTomorrow = function () {
        var now = new Date();
        var start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
        start.setDate(start.getDate() + 1);
        var end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
        end.setDate(start.getDate() + 2);
        return this.getTasksBetween(start, end);
    };
    Service.prototype.getTasksAfterTomorrow = function () {
        var now = new Date();
        var date = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
        date.setDate(date.getDate() + 2);
        return this.getTasksAfter(date);
    };
    Service.prototype.getTasksByProject = function (project) {
        var query = new everliveModule.Query();
        query
            .where()
            .eq(PROJECT, project.Id);
        return this.getTasks(query);
    };
    Service.prototype.createTask = function (task) {
        return this.createItem(TASK, task);
    };
    Service.prototype.updateTask = function (task) {
        return this.updateItem(TASK, task);
    };
    Service.prototype.deleteTask = function (task) {
        return this.deleteItem(TASK, task);
    };
    Service.prototype.createProject = function (project) {
        return this.createItem(PROJECT, project);
    };
    Service.prototype.updateProject = function (project) {
        return this.updateItem(PROJECT, project);
    };
    Service.prototype.getCurrentUser = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var everlive = _this.createEverlive();
            everlive.Users.currentUser().then(function (data) {
                resolve(data.result);
            }, function (error) {
                Service.showErrorAndReject(error, reject);
            });
        });
    };
    Service.prototype.updateUser = function (user) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var everlive = _this.createEverlive();
            everlive.Users.updateSingle(user, resolve, function (error) {
                Service.showErrorAndReject(error, reject);
            });
        });
    };
    Service.prototype.changeUserPassword = function (username, oldPassword, newPassword) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var everlive = _this.createEverlive();
            everlive.Users.changePassword(username, oldPassword, newPassword, true, resolve, function (error) {
                Service.showErrorAndReject(error, reject);
            });
        });
    };
    Service.prototype.deleteProject = function (project) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var everlive = _this.createEverlive();
            everlive.data(TASK).destroy({ Project: project.Id }, function (data) {
                _this.deleteItem(PROJECT, project).then(resolve, reject);
            }, function (error) {
                Service.showErrorAndReject(error, reject);
            });
        });
    };
    Service.prototype.getDownloadUrlFromId = function (fileId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var everlive = _this.createEverlive();
            everlive.Files.getDownloadUrlById(fileId).then(function (url) {
                resolve(url);
            }, function (error) {
                Service.showErrorAndReject(error, reject);
            });
        });
    };
    Service.prototype.uploadPicture = function (picture) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var everlive = _this.createEverlive();
            var file = {
                "Filename": "NativeScriptIsAwesome.jpg",
                "ContentType": "image/jpeg",
                "base64": picture.toBase64String(enums.ImageFormat.jpeg, 100)
            };
            everlive.Files.create(file, function (data) {
                resolve(data);
            }, function (error) {
                Service.showErrorAndReject(error, reject);
            });
        });
    };
    Service.prototype.createEverlive = function () {
        if (!this._everlive) {
            this._everlive = new everliveModule({
                apiKey: constantsModule.telerikApiKey,
                token: applicationSettingsModule.getString(constantsModule.authenticationTokenKey)
            });
        }
        return this._everlive;
    };
    Service.showErrorAndReject = function (error, reject) {
        notificationsModule.showError(error.message);
        reject(error);
    };
    Service.prototype.setupLocalSettings = function (authenticationTokenKey) {
        applicationSettingsModule.setString(constantsModule.authenticationTokenKey, authenticationTokenKey);
    };
    Service.prototype.clearLocalSettings = function () {
        applicationSettingsModule.remove(constantsModule.authenticationTokenKey);
    };
    Service.prototype.getTasksBetween = function (start, end) {
        var query = new everliveModule.Query();
        query
            .where()
            .and()
            .gte(DUE_DATE, start)
            .lt(DUE_DATE, end)
            .done();
        return this.getTasks(query);
    };
    Service.prototype.getTasksBefore = function (date) {
        var query = new everliveModule.Query();
        query
            .where()
            .lt(DUE_DATE, date);
        return this.getTasks(query);
    };
    Service.prototype.getTasksAfter = function (date) {
        var query = new everliveModule.Query();
        query
            .where()
            .or()
            .gte(DUE_DATE, date)
            .eq(DUE_DATE, null)
            .done();
        return this.getTasks(query);
    };
    Service.prototype.getTasks = function (query) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            query.order("Name");
            var everlive = _this.createEverlive();
            everlive.data(TASK).get(query).then(function (data) {
                resolve(data.result);
            }, function (error) {
                Service.showErrorAndReject(error, reject);
            });
        });
    };
    Service.prototype.createItem = function (dataName, item) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var everlive = _this.createEverlive();
            everlive.data(dataName).create(item, function (result) {
                resolve(result);
            }, function (error) {
                Service.showErrorAndReject(error, reject);
            });
        });
    };
    Service.prototype.updateItem = function (dataName, item) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var everlive = _this.createEverlive();
            everlive.data(dataName).updateSingle(item, resolve, function (error) {
                Service.showErrorAndReject(error, reject);
            });
        });
    };
    Service.prototype.deleteItem = function (dataName, item) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var everlive = _this.createEverlive();
            everlive.data(dataName).destroySingle({ Id: item.Id }, resolve, function (error) {
                Service.showErrorAndReject(error, reject);
            });
        });
    };
    return Service;
}());
exports.Service = Service;
exports.service = new Service();
//# sourceMappingURL=service.js.map