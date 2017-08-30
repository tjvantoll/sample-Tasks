import viewModelBaseModule = require("../common/view-model-base");
import navigationModule = require("../../utils/navigation");

export class DatePickerViewModel extends viewModelBaseModule.ViewModelBase {
    private _day: number;
    private _month: number;
    private _year: number;
    private _selectedCallback: (day: number, month: number, year: number) => void;

    constructor(selectedDate: Date, selectedCallback: (day: number, month: number, year: number) => void) {
        super();

        this.day = selectedDate.getDate();
        this.month = selectedDate.getMonth() + 1;
        this.year = selectedDate.getFullYear();

        this._selectedCallback = selectedCallback;
    }

    get day(): number {
        return this._day;
    }

    set day(value: number) {
        if (this._day !== value) {
            this._day = value;
            this.notifyPropertyChange("day", value);
        }
    }

    get month(): number {
        return this._month;
    }

    set month(value: number) {
        if (this._month !== value) {
            this._month = value;
            this.notifyPropertyChange("month", value);
        }
    }

    get year(): number {
        return this._year;
    }

    set year(value: number) {
        if (this._year !== value) {
            this._year = value;
            this.notifyPropertyChange("year", value);
        }
    }

    done() {
        this._selectedCallback(this.day, this.month - 1, this.year);
        navigationModule.goBack();
    }
}