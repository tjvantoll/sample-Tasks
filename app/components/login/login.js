"use strict";
var loginViewModelModule = require("./login-view-model");
var viewModel;
function navigatingTo(args) {
    var page = args.object;
    viewModel = new loginViewModelModule.LoginViewModel();
    page.bindingContext = viewModel;
}
exports.navigatingTo = navigatingTo;
function loginButtonTap(args) {
    viewModel.login();
}
exports.loginButtonTap = loginButtonTap;
function signUpButtonTap(args) {
    viewModel.signUp();
}
exports.signUpButtonTap = signUpButtonTap;
//# sourceMappingURL=login.js.map