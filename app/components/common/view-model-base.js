"use strict";
var platformModule = require("platform");
var observableModule = require("data/observable");
var enumsModule = require("ui/enums");
var dialogsModule = require("ui/dialogs");
var connectivity = require("connectivity");
var stringsModule = require("../../resources/strings");
var ViewModelBase = (function (_super) {
    __extends(ViewModelBase, _super);
    function ViewModelBase() {
        _super.call(this);
        this._loadingCount = 0;
    }
    Object.defineProperty(ViewModelBase.prototype, "isLoading", {
        get: function () {
            return this._isLoading;
        },
        set: function (value) {
            if (this._isLoading != value) {
                this._isLoading = value;
                this.notifyPropertyChange("isLoading", value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewModelBase.prototype, "androidVisibility", {
        get: function () {
            if (platformModule.device.os === platformModule.platformNames.android) {
                return enumsModule.Visibility.visible;
            }
            return enumsModule.Visibility.collapsed;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewModelBase.prototype, "iosVisibility", {
        get: function () {
            if (platformModule.device.os === platformModule.platformNames.ios) {
                return enumsModule.Visibility.visible;
            }
            return enumsModule.Visibility.collapsed;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewModelBase.prototype, "strings", {
        get: function () {
            return stringsModule.strings;
        },
        enumerable: true,
        configurable: true
    });
    ViewModelBase.prototype.beginLoading = function () {
        if (connectivity.getConnectionType() === connectivity.connectionType.none) {
            this.showError("No internet connection.");
            return false;
        }
        if (!this._loadingCount) {
            this.isLoading = true;
        }
        this._loadingCount++;
        return true;
    };
    ViewModelBase.prototype.endLoading = function () {
        if (this._loadingCount > 0) {
            this._loadingCount--;
            if (!this._loadingCount) {
                this.isLoading = false;
            }
        }
    };
    ViewModelBase.prototype.showError = function (error) {
        dialogsModule.alert({ title: "Error", message: error, okButtonText: "Close" });
    };
    ViewModelBase.prototype.showInfo = function (message) {
        dialogsModule.alert({ title: "Info", message: message, okButtonText: "OK" });
    };
    return ViewModelBase;
}(observableModule.Observable));
exports.ViewModelBase = ViewModelBase;
//# sourceMappingURL=view-model-base.js.map