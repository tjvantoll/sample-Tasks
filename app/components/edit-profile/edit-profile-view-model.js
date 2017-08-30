"use strict";
var viewModelBaseModule = require("../common/view-model-base");
var serviceModule = require("../../utils/service");
var EditProfileViewModel = (function (_super) {
    __extends(EditProfileViewModel, _super);
    function EditProfileViewModel(user) {
        _super.call(this);
        this._user = user;
    }
    Object.defineProperty(EditProfileViewModel.prototype, "user", {
        get: function () {
            return this._user;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditProfileViewModel.prototype, "oldPassword", {
        get: function () {
            return this._oldPassword;
        },
        set: function (value) {
            if (this._oldPassword !== value) {
                this._oldPassword = value;
                this.notifyPropertyChange("oldPassword", value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditProfileViewModel.prototype, "newPassword", {
        get: function () {
            return this._newPassword;
        },
        set: function (value) {
            if (this._newPassword !== value) {
                this._newPassword = value;
                this.notifyPropertyChange("newPassword", value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EditProfileViewModel.prototype, "confirmPassword", {
        get: function () {
            return this._confirmPassword;
        },
        set: function (value) {
            if (this._confirmPassword !== value) {
                this._confirmPassword = value;
                this.notifyPropertyChange("confirmPassword", value);
            }
        },
        enumerable: true,
        configurable: true
    });
    EditProfileViewModel.prototype.save = function () {
        var _this = this;
        if (this.validate()) {
            if (!this.beginLoading())
                return;
            serviceModule.service.updateUser(this.user).then(function (result) {
                if (_this.oldPassword) {
                    serviceModule.service.changeUserPassword(_this.user.Username, _this.oldPassword, _this.newPassword).then(function (result) {
                        _this.clearPasswords();
                        _this.endLoading();
                    }, function (error) {
                        _this.clearPasswords();
                        _this.endLoading();
                    });
                }
                else {
                    _this.clearPasswords();
                    _this.endLoading();
                }
            }, function (error) {
                _this.endLoading();
            });
        }
        else {
            this.clearPasswords();
        }
    };
    EditProfileViewModel.prototype.clearPasswords = function () {
        this.oldPassword = "";
        this.newPassword = "";
        this.confirmPassword = "";
    };
    EditProfileViewModel.prototype.validate = function () {
        if (!this.user.DisplayName || this.user.DisplayName === "") {
            this.showError("Please enter your name.");
            return false;
        }
        if (!this.user.Email || this.user.Email === "") {
            this.showError("Please enter your email.");
            return false;
        }
        if (this.oldPassword) {
            if (!this.newPassword || this.newPassword === "") {
                this.showError("Please enter new password.");
                return false;
            }
            if (this.newPassword !== this.confirmPassword) {
                this.showError("Passwords did not match.");
            }
        }
        return true;
    };
    return EditProfileViewModel;
}(viewModelBaseModule.ViewModelBase));
exports.EditProfileViewModel = EditProfileViewModel;
//# sourceMappingURL=edit-profile-view-model.js.map