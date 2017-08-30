import viewModelBaseModule = require("../common/view-model-base");
import navigationModule = require("../../utils/navigation");

export class TimePickerViewModel extends viewModelBaseModule.ViewModelBase {
    private _hour: number;
    private _minute: number;
    private _selectedCallback: (hour: number, minute: number) => void;

    constructor(selectedDate: Date, selectedCallback: (hour: number, minute: number) => void) {
        super();

        this.hour = selectedDate.getHours();
        this.minute = selectedDate.getMinutes();

        this._selectedCallback = selectedCallback;
    }

    get hour(): number {
        return this._hour;
    }

    set hour(value: number) {
        if (this._hour !== value) {
            this._hour = value;
            this.notifyPropertyChange("hour", value);
        }
    }

    get minute(): number {
        return this._minute;
    }

    set minute(value: number) {
        if (this._minute !== value) {
            this._minute = value;
            this.notifyPropertyChange("minute", value);
        }
    }

    done() {
        this._selectedCallback(this.hour, this.minute);
        navigationModule.goBack();
    }
}