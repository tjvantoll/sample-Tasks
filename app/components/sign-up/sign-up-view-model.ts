import viewModelBaseModule = require("../common/view-model-base");

import serviceModule = require("../../utils/service");
import navigationModule = require("../../utils/navigation");
import viewsModule = require("../../utils/views");

export class SignUpViewModel extends viewModelBaseModule.ViewModelBase {
    private _name: string;
    private _email: string;
    private _username: string;
    private _password: string;
    private _confirmPassword: string;

    constructor() {
        super();

        this.name = "";
        this.email = "";
        this.username = "";
        this.password = "";
        this.confirmPassword = "";
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        if (this._name !== value) {
            this._name = value;
            this.notifyPropertyChange("name", value);
        }
    }

    get email(): string {
        return this._email;
    }

    set email(value: string) {
        if (this._email !== value) {
            this._email = value;
            this.notifyPropertyChange("email", value);
        }
    }

    get username(): string {
        return this._username;
    }

    set username(value: string) {
        if (this._username !== value) {
            this._username = value;
            this.notifyPropertyChange("username", value);
        }
    }

    get password(): string {
        return this._password;
    }

    set password(value: string) {
        if (this._password !== value) {
            this._password = value;
            this.notifyPropertyChange("password", value);
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

    signUp() {
        if (this.validate()) {
            if (!this.beginLoading())return;
            serviceModule.service.signUp(this.username, this.password, { Email: this.email, DisplayName: this.name }).then((data: any) => {
                serviceModule.service.login(this.username, this.password).then((data: any) => {
                    this.endLoading();
                    navigationModule.navigate({
                        moduleName: viewsModule.Views.main
                    });
                },(error: any) => {
                        this.endLoading();
                    })

            },(error: any) => {
                    this.endLoading();
                    this.clearPassword();
                });
        }
        else {
            this.clearPassword();
        }
    }

    login() {
        navigationModule.navigate({
            moduleName: viewsModule.Views.login,
            backstackVisible: false
        });
    }

    private clearPassword() {
        this.password = "";
        this.confirmPassword = "";
    }

    private validate(): boolean {
        if (!this.name || this.name === "") {
            this.showError("Please enter your name.");
            return false;
        }

        if (!this.email || this.email == "") {
            this.showError("Please enter your email.");
            return false;
        }

        if (!this.username || this.username == "") {
            this.showError("Please enter username.");
            return false;
        }

        if (!this.password || this.password == "") {
            this.showError("Please enter password.");
            return false;
        }

        if (this.confirmPassword != this.password) {
            this.showError("Passwords did not match.");
            return false;
        }

        return true;
    }
}
