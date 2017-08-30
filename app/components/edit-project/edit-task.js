var datePickerViewModelModule = require("../date-picker/date-picker-view-model");
var timePickerViewModelModule = require("../time-picker/time-picker-view-model");
var navigationModule = require("../../utils/navigation");
var viewsModule = require("../../utils/views");
var viewModel;
function navigatedTo(args) {
    var page = args.object;
    viewModel = page.navigationContext;
    page.bindingContext = null;
    page.bindingContext = viewModel;
}
exports.navigatedTo = navigatedTo;
function takePictureButtonTap() {
    viewModel.takePicture();
}
exports.takePictureButtonTap = takePictureButtonTap;
function projectPickerTap() {
}
exports.projectPickerTap = projectPickerTap;
function datePickerTap() {
    navigationModule.navigate({
        moduleName: viewsModule.Views.datePicker,
        context: new datePickerViewModelModule.DatePickerViewModel(viewModel.item.DueDate, function (day, month, year) {
            var date = viewModel.item.DueDate;
            date.setDate(day);
            date.setMonth(month);
            date.setFullYear(year);
            viewModel.item.DueDate = date;
            console.log("DUE DATE: " + viewModel.item.DueDate);
        })
    });
}
exports.datePickerTap = datePickerTap;
function timePickerTap() {
    navigationModule.navigate({
        moduleName: viewsModule.Views.timePicker,
        context: new timePickerViewModelModule.TimePickerViewModel(viewModel.item.DueDate, function (hour, minute) {
            var date = viewModel.item.DueDate;
            date.setHours(hour);
            date.setMinutes(minute);
            viewModel.item.DueDate = date;
            console.log("DUE DATE: " + viewModel.item.DueDate);
            console.log("HOUR: " + hour + ":" + minute);
        })
    });
}
exports.timePickerTap = timePickerTap;
function reminderPickerTap() {
}
exports.reminderPickerTap = reminderPickerTap;
function saveButtonTap() {
    viewModel.save();
}
exports.saveButtonTap = saveButtonTap;
function deleteButtonTap() {
    viewModel.del();
}
exports.deleteButtonTap = deleteButtonTap;
//# sourceMappingURL=edit-task.js.map