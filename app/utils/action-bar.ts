import platformModule = require("platform");

import frameModule = require("ui/frame");
import enumsModule = require("ui/enums");
import navigationModule = require("./navigation");

var attached = false;
export function attachToActionBarEvents() {
    if (!attached) {
        if (platformModule.device.os == platformModule.platformNames.android) {
            var topmost = frameModule.topmost();
            topmost.android.on(frameModule.Frame.androidOptionSelectedEvent, androidOptionSelected);
        }

        attached = true;
    }
}

export function showBackNavigation() {
    if (platformModule.device.os == platformModule.platformNames.android) {
        attachToActionBarEvents();
        var topmost = frameModule.topmost();
        topmost.android.actionBar.setDisplayHomeAsUpEnabled(true);
    }
}

export function hideBackNavigation() {
    if (platformModule.device.os == platformModule.platformNames.android) {
        var topmost = frameModule.topmost();
        topmost.android.actionBar.setDisplayHomeAsUpEnabled(false);
    }
}

export function showApplicationBar() {
    if (platformModule.device.os == platformModule.platformNames.ios) {
        var topmost = frameModule.topmost();
        topmost.ios.navBarVisibility = enumsModule.NavigationBarVisibility.always;
    }
}


function androidOptionSelected(args: frameModule.AndroidOptionEventData) {
    if (args.item.getItemId() === (<any>global.android).R.id.home) {
        navigationModule.goBack();
        args.handled = true;
    }
}