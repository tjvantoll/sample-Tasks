import observableModule = require("data/observable");

import viewModelBaseModule = require("../common/view-model-base");

import serviceModule = require("../../utils/service");
import navigationModule = require("../../utils/navigation");
import viewsModule = require("../../utils/views");

export class LoginViewModel extends viewModelBaseModule.ViewModelBase {
    private _username: string;
    private _password: string;

    constructor() {
        super();

        this._username = "";
        this._password = "";
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

    login() {
        if (this.validate()) {
            if (!this.beginLoading())return;
            serviceModule.service.login(this.username, this.password).then((data: any) => {
                navigationModule.navigate({
                    moduleName: viewsModule.Views.main
                });
                this.endLoading();
            },(error: any) => {
                    this.clearPassword();
                    this.endLoading();
                });
        }
        else {
            this.clearPassword();
        }
    }

    signUp() {
        navigationModule.navigate({
            moduleName: viewsModule.Views.signUp,
            backstackVisible: false
        });
    }

    private clearPassword() {
        this.password = "";
    }

    private validate(): boolean {
        if (!this.username || this.username === "") {
            this.showError("Please enter username.");
            return false;
        }

        if (!this.password || this.password === "") {
            this.showError("Please enter password.");
            return false;
        }

        return true;
    }
}
