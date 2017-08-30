"use strict";
var signUpViewModelModule = require("./sign-up-view-model");
var viewModel;
function navigatingTo(args) {
    var page = args.object;
    viewModel = new signUpViewModelModule.SignUpViewModel();
    page.bindingContext = viewModel;
}
exports.navigatingTo = navigatingTo;
function signUpButtonTap(args) {
    viewModel.signUp();
}
exports.signUpButtonTap = signUpButtonTap;
function loginButtonTap(args) {
    viewModel.login();
}
exports.loginButtonTap = loginButtonTap;
//# sourceMappingURL=sign-up.js.map