"use strict";
var platformModule = require("platform");
var frameModule = require("ui/frame");
var enumsModule = require("ui/enums");
var navigationModule = require("./navigation");
var attached = false;
function attachToActionBarEvents() {
    if (!attached) {
        if (platformModule.device.os == platformModule.platformNames.android) {
            var topmost = frameModule.topmost();
            topmost.android.on(frameModule.Frame.androidOptionSelectedEvent, androidOptionSelected);
        }
        attached = true;
    }
}
exports.attachToActionBarEvents = attachToActionBarEvents;
function showBackNavigation() {
    if (platformModule.device.os == platformModule.platformNames.android) {
        attachToActionBarEvents();
        var topmost = frameModule.topmost();
        topmost.android.actionBar.setDisplayHomeAsUpEnabled(true);
    }
}
exports.showBackNavigation = showBackNavigation;
function hideBackNavigation() {
    if (platformModule.device.os == platformModule.platformNames.android) {
        var topmost = frameModule.topmost();
        topmost.android.actionBar.setDisplayHomeAsUpEnabled(false);
    }
}
exports.hideBackNavigation = hideBackNavigation;
function showApplicationBar() {
    if (platformModule.device.os == platformModule.platformNames.ios) {
        var topmost = frameModule.topmost();
        topmost.ios.navBarVisibility = enumsModule.NavigationBarVisibility.always;
    }
}
exports.showApplicationBar = showApplicationBar;
function androidOptionSelected(args) {
    if (args.item.getItemId() === global.android.R.id.home) {
        navigationModule.goBack();
        args.handled = true;
    }
}
//# sourceMappingURL=action-bar.js.map