import viewModelBaseModule = require("../common/view-model-base");

import serviceModule = require("../../utils/service");
import navigationModule = require("../../utils/navigation");
import viewsModule = require("../../utils/views");

export class EditProfileViewModel extends viewModelBaseModule.ViewModelBase {
    private _user: any;
    private _oldPassword: string;
    private _newPassword: string;
    private _confirmPassword: string;

    constructor(user: any) {
        super();

        this._user = user;
    }

    get user(): any {
        return this._user;
    }

    get oldPassword(): string {
        return this._oldPassword;
    }

    set oldPassword(value: string) {
        if (this._oldPassword !== value) {
            this._oldPassword = value;
            this.notifyPropertyChange("oldPassword", value);
        }
    }

    get newPassword(): string {
        return this._newPassword;
    }

    set newPassword(value: string) {
        if (this._newPassword !== value) {
            this._newPassword = value;
            this.notifyPropertyChange("newPassword", value);
        }
    }

    get confirmPassword(): string {
        return this._confirmPassword;
    }

    set confirmPassword(value: string) {
        if (this._confirmPassword !== value) {
            this._confirmPassword = value;
            this.notifyPropertyChange("confirmPassword", value);
        }
    }

    save() {
        if (this.validate()) {
            if (!this.beginLoading())return;
            serviceModule.service.updateUser(this.user).then(result => {
                if (this.oldPassword) {
                    serviceModule.service.changeUserPassword(this.user.Username, this.oldPassword, this.newPassword).then(result => {
                        this.clearPasswords();
                        this.endLoading();
                    }, error => {
                            this.clearPasswords();
                            this.endLoading();
                        });
                }
                else {
                    this.clearPasswords();
                    this.endLoading();
                }
            }, error => {
                    this.endLoading();
                });
        }
        else {
            this.clearPasswords();
        }
    }

    private clearPasswords() {
        this.oldPassword = "";
        this.newPassword = "";
        this.confirmPassword = "";
    }

    validate(): boolean {
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
    }
}