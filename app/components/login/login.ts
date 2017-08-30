import observableModule = require("data/observable");

import pageModule = require("ui/page");

import loginViewModelModule = require("./login-view-model")

var viewModel : loginViewModelModule.LoginViewModel;
export function navigatingTo(args: observableModule.EventData) {
    var page = <pageModule.Page>args.object;
    viewModel = new loginViewModelModule.LoginViewModel();
    page.bindingContext = viewModel;
}

export function loginButtonTap(args : observableModule.EventData) {
    viewModel.login();
}

export function signUpButtonTap(args : observableModule.EventData) {
    viewModel.signUp();
}