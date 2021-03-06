(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/forms'), require('@angular/common'), require('moment')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/forms', '@angular/common', 'moment'], factory) :
	(factory((global['ng2-date-picker'] = {}),global.ng.core,global.ng.forms,global.ng.common,global.moment));
}(this, (function (exports,core,forms,common,momentNs) { 'use strict';

var ECalendarMode = {};
ECalendarMode.Day = 0;
ECalendarMode.DayTime = 1;
ECalendarMode.Month = 2;
ECalendarMode.Time = 3;
ECalendarMode[ECalendarMode.Day] = "Day";
ECalendarMode[ECalendarMode.DayTime] = "DayTime";
ECalendarMode[ECalendarMode.Month] = "Month";
ECalendarMode[ECalendarMode.Time] = "Time";
var ECalendarValue = {};
ECalendarValue.Moment = 1;
ECalendarValue.MomentArr = 2;
ECalendarValue.String = 3;
ECalendarValue.StringArr = 4;
ECalendarValue[ECalendarValue.Moment] = "Moment";
ECalendarValue[ECalendarValue.MomentArr] = "MomentArr";
ECalendarValue[ECalendarValue.String] = "String";
ECalendarValue[ECalendarValue.StringArr] = "StringArr";
var DomHelper = (function () {
    function DomHelper() {
    }
    /**
     * @param {?} element
     * @param {?} container
     * @param {?} anchor
     * @param {?} drops
     * @return {?}
     */
    DomHelper.setYAxisPosition = function (element, container, anchor, drops) {
        var /** @type {?} */ anchorRect = anchor.getBoundingClientRect();
        var /** @type {?} */ containerRect = container.getBoundingClientRect();
        var /** @type {?} */ bottom = anchorRect.bottom - containerRect.top;
        var /** @type {?} */ top = anchorRect.top - containerRect.top;
        if (drops === 'down') {
            element.style.top = (bottom + 1 + 'px');
        }
        else {
            element.style.top = (top - 1 - element.scrollHeight) + 'px';
        }
    };
    /**
     * @param {?} element
     * @param {?} container
     * @param {?} anchor
     * @param {?} dimElem
     * @param {?} opens
     * @return {?}
     */
    DomHelper.setXAxisPosition = function (element, container, anchor, dimElem, opens) {
        var /** @type {?} */ anchorRect = anchor.getBoundingClientRect();
        var /** @type {?} */ containerRect = container.getBoundingClientRect();
        var /** @type {?} */ left = anchorRect.left - containerRect.left;
        if (opens === 'right') {
            element.style.left = left + 'px';
        }
        else {
            element.style.left = left - dimElem.offsetWidth + anchor.offsetWidth + 'px';
        }
    };
    /**
     * @param {?} el
     * @return {?}
     */
    DomHelper.isTopInView = function (el) {
        var top = el.getBoundingClientRect().top;
        return (top >= 0);
    };
    /**
     * @param {?} el
     * @return {?}
     */
    DomHelper.isBottomInView = function (el) {
        var bottom = el.getBoundingClientRect().bottom;
        return (bottom <= window.innerHeight);
    };
    /**
     * @param {?} el
     * @return {?}
     */
    DomHelper.isLeftInView = function (el) {
        var left = el.getBoundingClientRect().left;
        return (left >= 0);
    };
    /**
     * @param {?} el
     * @return {?}
     */
    DomHelper.isRightInView = function (el) {
        var right = el.getBoundingClientRect().right;
        return (right <= window.innerWidth);
    };
    /**
     * @param {?} config
     * @return {?}
     */
    DomHelper.prototype.appendElementToPosition = function (config) {
        var _this = this;
        var container = config.container, element = config.element;
        if (!container.style.position || container.style.position === 'static') {
            container.style.position = 'relative';
        }
        if (element.style.position !== 'absolute') {
            element.style.position = 'absolute';
        }
        element.style.visibility = 'hidden';
        setTimeout(function () {
            _this.setElementPosition(config);
            element.style.visibility = 'visible';
        });
    };
    /**
     * @param {?} __0
     * @return {?}
     */
    DomHelper.prototype.setElementPosition = function (_a) {
        var element = _a.element, container = _a.container, anchor = _a.anchor, dimElem = _a.dimElem, drops = _a.drops, opens = _a.opens;
        DomHelper.setYAxisPosition(element, container, anchor, 'down');
        DomHelper.setXAxisPosition(element, container, anchor, dimElem, 'right');
        if (drops !== 'down' && drops !== 'up') {
            if (DomHelper.isBottomInView(dimElem)) {
                DomHelper.setYAxisPosition(element, container, anchor, 'down');
            }
            else if (DomHelper.isTopInView(dimElem)) {
                DomHelper.setYAxisPosition(element, container, anchor, 'up');
            }
        }
        else {
            DomHelper.setYAxisPosition(element, container, anchor, drops);
        }
        if (opens !== 'left' && opens !== 'right') {
            if (DomHelper.isRightInView(dimElem)) {
                DomHelper.setXAxisPosition(element, container, anchor, dimElem, 'right');
            }
            else if (DomHelper.isLeftInView(dimElem)) {
                DomHelper.setXAxisPosition(element, container, anchor, dimElem, 'left');
            }
        }
        else {
            DomHelper.setXAxisPosition(element, container, anchor, dimElem, opens);
        }
    };
    return DomHelper;
}());
DomHelper.decorators = [
    { type: core.Injectable },
];
/**
 * @nocollapse
 */
DomHelper.ctorParameters = function () { return []; };
var moment = momentNs;
var UtilsService = (function () {
    function UtilsService() {
    }
    /**
     * @param {?} func
     * @param {?} wait
     * @return {?}
     */
    UtilsService.debounce = function (func, wait) {
        var /** @type {?} */ timeout;
        return function () {
            var /** @type {?} */ context = this, /** @type {?} */ args = arguments;
            timeout = clearTimeout(timeout);
            setTimeout(function () {
                func.apply(context, args);
            }, wait);
        };
    };
    
    /**
     * @param {?} size
     * @return {?}
     */
    UtilsService.prototype.createArray = function (size) {
        return new Array(size).fill(1);
    };
    /**
     * @param {?} date
     * @param {?} format
     * @return {?}
     */
    UtilsService.prototype.convertToMoment = function (date, format) {
        if (!date) {
            return null;
        }
        else if (typeof date === 'string') {
            return moment(date, format);
        }
        else {
            return date.clone();
        }
    };
    /**
     * @param {?} date
     * @param {?} format
     * @return {?}
     */
    UtilsService.prototype.isDateValid = function (date, format) {
        if (date === '') {
            return true;
        }
        return moment(date, format, true).isValid();
    };
    /**
     * @param {?} current
     * @param {?} selected
     * @param {?} allowMultiSelect
     * @param {?} minDate
     * @return {?}
     */
    UtilsService.prototype.getDefaultDisplayDate = function (current, selected, allowMultiSelect, minDate) {
        if (current) {
            return current.clone();
        }
        else if (minDate && minDate.isAfter(moment())) {
            return minDate.clone();
        }
        else if (allowMultiSelect) {
            if (selected && selected[selected.length]) {
                return selected[selected.length].clone();
            }
        }
        else if (selected && selected[0]) {
            return selected[0].clone();
        }
        return moment();
    };
    /**
     * @param {?} value
     * @param {?} allowMultiSelect
     * @return {?}
     */
    UtilsService.prototype.getInputType = function (value, allowMultiSelect) {
        if (Array.isArray(value)) {
            if (!value.length) {
                return ECalendarValue.MomentArr;
            }
            else if (typeof value[0] === 'string') {
                return ECalendarValue.StringArr;
            }
            else if (moment.isMoment(value[0])) {
                return ECalendarValue.MomentArr;
            }
        }
        else {
            if (typeof value === 'string') {
                return ECalendarValue.String;
            }
            else if (moment.isMoment(value)) {
                return ECalendarValue.Moment;
            }
        }
        return allowMultiSelect ? ECalendarValue.MomentArr : ECalendarValue.Moment;
    };
    /**
     * @param {?} value
     * @param {?} format
     * @param {?} allowMultiSelect
     * @return {?}
     */
    UtilsService.prototype.convertToMomentArray = function (value, format, allowMultiSelect) {
        switch (this.getInputType(value, allowMultiSelect)) {
            case (ECalendarValue.String):
                return value ? [moment(/** @type {?} */ (value), format, true)] : [];
            case (ECalendarValue.StringArr):
                return ((value)).map(function (v) { return v ? moment(v, format, true) : null; }).filter(Boolean);
            case (ECalendarValue.Moment):
                return value ? [((value)).clone()] : [];
            case (ECalendarValue.MomentArr):
                return ((value) || []).map(function (v) { return v.clone(); });
            default:
                return [];
        }
    };
    /**
     * @param {?} format
     * @param {?} value
     * @param {?} convertTo
     * @return {?}
     */
    UtilsService.prototype.convertFromMomentArray = function (format, value, convertTo) {
        switch (convertTo) {
            case (ECalendarValue.String):
                return value[0] && value[0].format(format);
            case (ECalendarValue.StringArr):
                return value.filter(Boolean).map(function (v) { return v.format(format); });
            case (ECalendarValue.Moment):
                return value[0] ? value[0].clone() : value[0];
            case (ECalendarValue.MomentArr):
                return value ? value.map(function (v) { return v.clone(); }) : value;
            default:
                return value;
        }
    };
    /**
     * @template T
     * @param {?} obj
     * @return {?}
     */
    UtilsService.prototype.clearUndefined = function (obj) {
        if (!obj) {
            return obj;
        }
        Object.keys(obj).forEach(function (key) { return (obj[key] === undefined) && delete obj[key]; });
        return obj;
    };
    /**
     * @param {?} isMultiple
     * @param {?} currentlySelected
     * @param {?} date
     * @param {?=} granularity
     * @return {?}
     */
    UtilsService.prototype.updateSelected = function (isMultiple, currentlySelected, date, granularity) {
        if (granularity === void 0) { granularity = 'day'; }
        var /** @type {?} */ isSelected = !date.selected;
        if (isMultiple) {
            return isSelected
                ? currentlySelected.concat([date.date])
                : currentlySelected.filter(function (d) { return !d.isSame(date.date, granularity); });
        }
        else {
            return isSelected ? [date.date] : [];
        }
    };
    /**
     * @param {?} element
     * @param {?} selector
     * @return {?}
     */
    UtilsService.prototype.closestParent = function (element, selector) {
        if (!element) {
            return undefined;
        }
        var /** @type {?} */ match = (element.querySelector(selector));
        return match || this.closestParent(element.parentElement, selector);
    };
    /**
     * @param {?} m
     * @return {?}
     */
    UtilsService.prototype.onlyTime = function (m) {
        return m && moment.isMoment(m) && moment(m.format('HH:mm:ss'), 'HH:mm:ss');
    };
    /**
     * @param {?} calendarType
     * @return {?}
     */
    UtilsService.prototype.granularityFromType = function (calendarType) {
        switch (calendarType) {
            case 'time':
                return 'second';
            case 'daytime':
                return 'second';
            default:
                return calendarType;
        }
    };
    /**
     * @param {?} __0
     * @param {?} format
     * @param {?} calendarType
     * @return {?}
     */
    UtilsService.prototype.createValidator = function (_a, format, calendarType) {
        var _this = this;
        var minDate = _a.minDate, maxDate = _a.maxDate, minTime = _a.minTime, maxTime = _a.maxTime;
        var /** @type {?} */ isValid;
        var /** @type {?} */ value;
        var /** @type {?} */ validators = [];
        var /** @type {?} */ granularity = this.granularityFromType(calendarType);
        if (minDate) {
            var /** @type {?} */ md_1 = this.convertToMoment(minDate, format);
            validators.push({
                key: 'minDate',
                isValid: function () {
                    var /** @type {?} */ _isValid = value.every(function (val) { return val.isSameOrAfter(md_1, granularity); });
                    isValid = isValid ? _isValid : false;
                    return _isValid;
                }
            });
        }
        if (maxDate) {
            var /** @type {?} */ md_2 = this.convertToMoment(maxDate, format);
            validators.push({
                key: 'maxDate',
                isValid: function () {
                    var /** @type {?} */ _isValid = value.every(function (val) { return val.isSameOrBefore(md_2, granularity); });
                    isValid = isValid ? _isValid : false;
                    return _isValid;
                }
            });
        }
        if (minTime) {
            var /** @type {?} */ md_3 = this.onlyTime(this.convertToMoment(minTime, format));
            validators.push({
                key: 'minTime',
                isValid: function () {
                    var /** @type {?} */ _isValid = value.every(function (val) { return _this.onlyTime(val).isSameOrAfter(md_3); });
                    isValid = isValid ? _isValid : false;
                    return _isValid;
                }
            });
        }
        if (maxTime) {
            var /** @type {?} */ md_4 = this.onlyTime(this.convertToMoment(maxTime, format));
            validators.push({
                key: 'maxTime',
                isValid: function () {
                    var /** @type {?} */ _isValid = value.every(function (val) { return _this.onlyTime(val).isSameOrBefore(md_4); });
                    isValid = isValid ? _isValid : false;
                    return _isValid;
                }
            });
        }
        return function (inputVal) {
            isValid = true;
            value = _this.convertToMomentArray(inputVal, format, true).filter(Boolean);
            if (!value.every(function (val) { return val.isValid(); })) {
                return {
                    format: {
                        given: inputVal
                    }
                };
            }
            var /** @type {?} */ errors = validators.reduce(function (map, err) {
                if (!err.isValid()) {
                    map[err.key] = {
                        given: value
                    };
                }
                return map;
            }, {});
            return !isValid ? errors : null;
        };
    };
    /**
     * @param {?} value
     * @return {?}
     */
    UtilsService.prototype.datesStringToStringArray = function (value) {
        return (value || '').split('|').map(function (m) { return m.trim(); }).filter(Boolean);
    };
    /**
     * @param {?} value
     * @param {?} format
     * @return {?}
     */
    UtilsService.prototype.getValidMomentArray = function (value, format) {
        var _this = this;
        return this.datesStringToStringArray(value)
            .filter(function (d) { return _this.isDateValid(d, format); })
            .map(function (d) { return moment(d, format); });
    };
    /**
     * @param {?} showGoToCurrent
     * @param {?} mode
     * @param {?} min
     * @param {?} max
     * @return {?}
     */
    UtilsService.prototype.shouldShowCurrent = function (showGoToCurrent, mode, min, max) {
        return showGoToCurrent &&
            mode !== 'time' &&
            this.isDateInRange(moment(), min, max);
    };
    /**
     * @param {?} date
     * @param {?} from
     * @param {?} to
     * @return {?}
     */
    UtilsService.prototype.isDateInRange = function (date, from, to) {
        return date.isBetween(from, to, 'day', '[]');
    };
    /**
     * @param {?} obj
     * @param {?} format
     * @param {?} props
     * @return {?}
     */
    UtilsService.prototype.convertPropsToMoment = function (obj, format, props) {
        var _this = this;
        props.forEach(function (prop) {
            if (obj.hasOwnProperty(prop)) {
                obj[prop] = _this.convertToMoment(obj[prop], format);
            }
        });
    };
    /**
     * @template T
     * @param {?} prevConf
     * @param {?} currentConf
     * @return {?}
     */
    UtilsService.prototype.shouldResetCurrentView = function (prevConf, currentConf) {
        if (prevConf && currentConf) {
            if (!prevConf.min && currentConf.min) {
                return true;
            }
            else if (prevConf.min && currentConf.min && !prevConf.min.isSame(currentConf.min, 'd')) {
                return true;
            }
            else if (!prevConf.max && currentConf.max) {
                return true;
            }
            else if (prevConf.max && currentConf.max && !prevConf.max.isSame(currentConf.max, 'd')) {
                return true;
            }
            return false;
        }
        return false;
    };
    return UtilsService;
}());
UtilsService.decorators = [
    { type: core.Injectable },
];
/**
 * @nocollapse
 */
UtilsService.ctorParameters = function () { return []; };
var moment$1 = momentNs;
var DayCalendarService = (function () {
    /**
     * @param {?} utilsService
     */
    function DayCalendarService(utilsService) {
        this.utilsService = utilsService;
        this.DAYS = ['su', 'mo', 'tu', 'we', 'th', 'fr', 'sa'];
        this.DEFAULT_CONFIG = {
            showNearMonthDays: true,
            showWeekNumbers: false,
            firstDayOfWeek: 'su',
            weekDayFormat: 'ddd',
            format: 'DD-MM-YYYY',
            allowMultiSelect: false,
            monthFormat: 'MMM, YYYY',
            enableMonthSelector: true,
            locale: moment$1.locale(),
            dayBtnFormat: 'DD',
            unSelectOnClick: true
        };
    }
    /**
     * @param {?} currentMonth
     * @param {?} monthArray
     * @return {?}
     */
    DayCalendarService.prototype.removeNearMonthWeeks = function (currentMonth, monthArray) {
        if (monthArray[monthArray.length - 1].find(function (day) { return day.date.isSame(currentMonth, 'month'); })) {
            return monthArray;
        }
        else {
            return monthArray.slice(0, -1);
        }
    };
    /**
     * @param {?} config
     * @return {?}
     */
    DayCalendarService.prototype.getConfig = function (config) {
        var /** @type {?} */ _config = (Object.assign({}, this.DEFAULT_CONFIG, this.utilsService.clearUndefined(config)));
        this.utilsService.convertPropsToMoment(_config, _config.format, ['min', 'max']);
        moment$1.locale(_config.locale);
        return _config;
    };
    /**
     * @param {?} firstDayOfWeek
     * @return {?}
     */
    DayCalendarService.prototype.generateDaysMap = function (firstDayOfWeek) {
        var /** @type {?} */ firstDayIndex = this.DAYS.indexOf(firstDayOfWeek);
        var /** @type {?} */ daysArr = this.DAYS.slice(firstDayIndex, 7).concat(this.DAYS.slice(0, firstDayIndex));
        return daysArr.reduce(function (map, day, index) {
            map[day] = index;
            return map;
        }, /** @type {?} */ ({}));
    };
    /**
     * @param {?} config
     * @param {?} month
     * @param {?} selected
     * @return {?}
     */
    DayCalendarService.prototype.generateMonthArray = function (config, month, selected) {
        var _this = this;
        var /** @type {?} */ monthArray = [];
        var /** @type {?} */ firstDayOfWeekIndex = this.DAYS.indexOf(config.firstDayOfWeek);
        var /** @type {?} */ firstDayOfBoard = month.clone().startOf('month');
        while (firstDayOfBoard.day() !== firstDayOfWeekIndex) {
            firstDayOfBoard.subtract(1, 'day');
        }
        var /** @type {?} */ current = firstDayOfBoard.clone();
        var /** @type {?} */ prevMonth = month.clone().subtract(1, 'month');
        var /** @type {?} */ nextMonth = month.clone().add(1, 'month');
        var /** @type {?} */ today = moment$1();
        var /** @type {?} */ daysOfCalendar = this.utilsService.createArray(42)
            .reduce(function (array) {
            array.push({
                date: current.clone(),
                selected: !!selected.find(function (selectedDay) { return current.isSame(selectedDay, 'day'); }),
                currentMonth: current.isSame(month, 'month'),
                prevMonth: current.isSame(prevMonth, 'month'),
                nextMonth: current.isSame(nextMonth, 'month'),
                currentDay: current.isSame(today, 'day'),
                disabled: _this.isDateDisabled(current, config)
            });
            current.add(1, 'day');
            if (current.format('HH') !== '00') {
                current.startOf('day').add(1, 'day');
            }
            return array;
        }, []);
        daysOfCalendar.forEach(function (day, index) {
            var /** @type {?} */ weekIndex = Math.floor(index / 7);
            if (!monthArray[weekIndex]) {
                monthArray.push([]);
            }
            monthArray[weekIndex].push(day);
        });
        if (!config.showNearMonthDays) {
            monthArray = this.removeNearMonthWeeks(month, monthArray);
        }
        return monthArray;
    };
    /**
     * @param {?} firstDayOfWeek
     * @return {?}
     */
    DayCalendarService.prototype.generateWeekdays = function (firstDayOfWeek) {
        var /** @type {?} */ weekdayNames = {
            su: moment$1().day(0),
            mo: moment$1().day(1),
            tu: moment$1().day(2),
            we: moment$1().day(3),
            th: moment$1().day(4),
            fr: moment$1().day(5),
            sa: moment$1().day(6)
        };
        var /** @type {?} */ weekdays = [];
        var /** @type {?} */ daysMap = this.generateDaysMap(firstDayOfWeek);
        for (var /** @type {?} */ dayKey in daysMap) {
            if (daysMap.hasOwnProperty(dayKey)) {
                weekdays[daysMap[dayKey]] = weekdayNames[dayKey];
            }
        }
        return weekdays;
    };
    /**
     * @param {?} date
     * @param {?} config
     * @return {?}
     */
    DayCalendarService.prototype.isDateDisabled = function (date, config) {
        if (config.isDayDisabledCallback) {
            return config.isDayDisabledCallback(date);
        }
        if (config.min && date.isBefore(config.min, 'day')) {
            return true;
        }
        return !!(config.max && date.isAfter(config.max, 'day'));
    };
    /**
     * @param {?} config
     * @param {?} month
     * @return {?}
     */
    DayCalendarService.prototype.getHeaderLabel = function (config, month) {
        if (config.monthFormatter) {
            return config.monthFormatter(month);
        }
        return month.format(config.monthFormat);
    };
    /**
     * @param {?} min
     * @param {?} currentMonthView
     * @return {?}
     */
    DayCalendarService.prototype.shouldShowLeft = function (min, currentMonthView) {
        return min ? min.isBefore(currentMonthView, 'month') : true;
    };
    /**
     * @param {?} max
     * @param {?} currentMonthView
     * @return {?}
     */
    DayCalendarService.prototype.shouldShowRight = function (max, currentMonthView) {
        return max ? max.isAfter(currentMonthView, 'month') : true;
    };
    /**
     * @param {?} firstDayOfWeek
     * @return {?}
     */
    DayCalendarService.prototype.generateDaysIndexMap = function (firstDayOfWeek) {
        var /** @type {?} */ firstDayIndex = this.DAYS.indexOf(firstDayOfWeek);
        var /** @type {?} */ daysArr = this.DAYS.slice(firstDayIndex, 7).concat(this.DAYS.slice(0, firstDayIndex));
        return daysArr.reduce(function (map, day, index) {
            map[index] = day;
            return map;
        }, /** @type {?} */ ({}));
    };
    /**
     * @param {?} componentConfig
     * @return {?}
     */
    DayCalendarService.prototype.getMonthCalendarConfig = function (componentConfig) {
        return this.utilsService.clearUndefined({
            min: componentConfig.min,
            max: componentConfig.max,
            format: componentConfig.format,
            isNavHeaderBtnClickable: true,
            allowMultiSelect: false,
            yearFormat: componentConfig.yearFormat,
            yearFormatter: componentConfig.yearFormatter,
            monthBtnFormat: componentConfig.monthBtnFormat,
            monthBtnFormatter: componentConfig.monthBtnFormatter,
            monthBtnCssClassCallback: componentConfig.monthBtnCssClassCallback,
            multipleYearsNavigateBy: componentConfig.multipleYearsNavigateBy,
            showMultipleYearsNavigation: componentConfig.showMultipleYearsNavigation,
            showGoToCurrent: componentConfig.showGoToCurrent
        });
    };
    /**
     * @param {?} config
     * @param {?} day
     * @return {?}
     */
    DayCalendarService.prototype.getDayBtnText = function (config, day) {
        if (config.dayBtnFormatter) {
            return config.dayBtnFormatter(day);
        }
        return day.format(config.dayBtnFormat);
    };
    /**
     * @param {?} config
     * @param {?} day
     * @return {?}
     */
    DayCalendarService.prototype.getDayBtnCssClass = function (config, day) {
        if (config.dayBtnCssClassCallback) {
            return config.dayBtnCssClassCallback(day);
        }
        return '';
    };
    return DayCalendarService;
}());
DayCalendarService.decorators = [
    { type: core.Injectable },
];
/**
 * @nocollapse
 */
DayCalendarService.ctorParameters = function () { return [
    { type: UtilsService, },
]; };
var moment$3 = momentNs;
var FIRST_PM_HOUR = 12;
var TimeSelectService = (function () {
    /**
     * @param {?} utilsService
     */
    function TimeSelectService(utilsService) {
        this.utilsService = utilsService;
        this.DEFAULT_CONFIG = {
            hours12Format: 'hh',
            hours24Format: 'HH',
            meridiemFormat: 'A',
            minutesFormat: 'mm',
            minutesInterval: 1,
            secondsFormat: 'ss',
            secondsInterval: 1,
            showSeconds: false,
            showTwentyFourHours: false,
            timeSeparator: ':',
            locale: moment$3.locale()
        };
    }
    /**
     * @param {?} config
     * @return {?}
     */
    TimeSelectService.prototype.getConfig = function (config) {
        var /** @type {?} */ timeConfigs = {
            maxTime: this.utilsService.onlyTime(config && config.maxTime),
            minTime: this.utilsService.onlyTime(config && config.minTime)
        };
        var /** @type {?} */ _config = (Object.assign({}, this.DEFAULT_CONFIG, this.utilsService.clearUndefined(config), timeConfigs));
        moment$3.locale(_config.locale);
        return _config;
    };
    /**
     * @param {?} config
     * @return {?}
     */
    TimeSelectService.prototype.getTimeFormat = function (config) {
        return (config.showTwentyFourHours ? config.hours24Format : config.hours12Format)
            + config.timeSeparator + config.minutesFormat
            + (config.showSeconds ? (config.timeSeparator + config.secondsFormat) : '')
            + (config.showTwentyFourHours ? '' : ' ' + config.meridiemFormat);
    };
    /**
     * @param {?} config
     * @param {?} t
     * @return {?}
     */
    TimeSelectService.prototype.getHours = function (config, t) {
        var /** @type {?} */ time = t || moment$3();
        return time && time.format(config.showTwentyFourHours ? config.hours24Format : config.hours12Format);
    };
    /**
     * @param {?} config
     * @param {?} t
     * @return {?}
     */
    TimeSelectService.prototype.getMinutes = function (config, t) {
        var /** @type {?} */ time = t || moment$3();
        return time && time.format(config.minutesFormat);
    };
    /**
     * @param {?} config
     * @param {?} t
     * @return {?}
     */
    TimeSelectService.prototype.getSeconds = function (config, t) {
        var /** @type {?} */ time = t || moment$3();
        return time && time.format(config.secondsFormat);
    };
    /**
     * @param {?} config
     * @param {?} time
     * @return {?}
     */
    TimeSelectService.prototype.getMeridiem = function (config, time) {
        return time && time.format(config.meridiemFormat);
    };
    /**
     * @param {?} config
     * @param {?} time
     * @param {?} unit
     * @return {?}
     */
    TimeSelectService.prototype.decrease = function (config, time, unit) {
        var /** @type {?} */ amount = 1;
        switch (unit) {
            case 'minute':
                amount = config.minutesInterval;
                break;
            case 'second':
                amount = config.secondsInterval;
                break;
        }
        return time.clone().subtract(amount, unit);
    };
    /**
     * @param {?} config
     * @param {?} time
     * @param {?} unit
     * @return {?}
     */
    TimeSelectService.prototype.increase = function (config, time, unit) {
        var /** @type {?} */ amount = 1;
        switch (unit) {
            case 'minute':
                amount = config.minutesInterval;
                break;
            case 'second':
                amount = config.secondsInterval;
                break;
        }
        return time.clone().add(amount, unit);
    };
    /**
     * @param {?} time
     * @return {?}
     */
    TimeSelectService.prototype.toggleMeridiem = function (time) {
        if (time.hours() < FIRST_PM_HOUR) {
            return time.clone().add(12, 'hour');
        }
        else {
            return time.clone().subtract(12, 'hour');
        }
    };
    /**
     * @param {?} config
     * @param {?} time
     * @param {?} unit
     * @return {?}
     */
    TimeSelectService.prototype.shouldShowDecrease = function (config, time, unit) {
        if (!config.min && !config.minTime) {
            return true;
        }
        var /** @type {?} */ newTime = this.decrease(config, time, unit);
        return (!config.min || config.min.isSameOrBefore(newTime))
            && (!config.minTime || config.minTime.isSameOrBefore(this.utilsService.onlyTime(newTime)));
    };
    /**
     * @param {?} config
     * @param {?} time
     * @param {?} unit
     * @return {?}
     */
    TimeSelectService.prototype.shouldShowIncrease = function (config, time, unit) {
        if (!config.max && !config.maxTime) {
            return true;
        }
        var /** @type {?} */ newTime = this.increase(config, time, unit);
        return (!config.max || config.max.isSameOrAfter(newTime))
            && (!config.maxTime || config.maxTime.isSameOrAfter(this.utilsService.onlyTime(newTime)));
    };
    /**
     * @param {?} config
     * @param {?} time
     * @return {?}
     */
    TimeSelectService.prototype.shouldShowToggleMeridiem = function (config, time) {
        if (!config.min && !config.max && !config.minTime && !config.maxTime) {
            return true;
        }
        var /** @type {?} */ newTime = this.toggleMeridiem(time);
        return (!config.max || config.max.isSameOrAfter(newTime))
            && (!config.min || config.min.isSameOrBefore(newTime))
            && (!config.maxTime || config.maxTime.isSameOrAfter(this.utilsService.onlyTime(newTime)))
            && (!config.minTime || config.minTime.isSameOrBefore(this.utilsService.onlyTime(newTime)));
    };
    return TimeSelectService;
}());
TimeSelectService.decorators = [
    { type: core.Injectable },
];
/**
 * @nocollapse
 */
TimeSelectService.ctorParameters = function () { return [
    { type: UtilsService, },
]; };
var moment$2 = momentNs;
var DAY_FORMAT = 'YYYYMMDD';
var TIME_FORMAT = 'HH:mm:ss';
var COMBINED_FORMAT = DAY_FORMAT + TIME_FORMAT;
var DayTimeCalendarService = (function () {
    /**
     * @param {?} utilsService
     * @param {?} dayCalendarService
     * @param {?} timeSelectService
     */
    function DayTimeCalendarService(utilsService, dayCalendarService, timeSelectService) {
        this.utilsService = utilsService;
        this.dayCalendarService = dayCalendarService;
        this.timeSelectService = timeSelectService;
        this.DEFAULT_CONFIG = {
            locale: moment$2.locale()
        };
    }
    /**
     * @param {?} config
     * @return {?}
     */
    DayTimeCalendarService.prototype.getConfig = function (config) {
        var /** @type {?} */ _config = Object.assign({}, this.DEFAULT_CONFIG, this.timeSelectService.getConfig(config), this.dayCalendarService.getConfig(config));
        moment$2.locale(config.locale);
        return _config;
    };
    /**
     * @param {?} current
     * @param {?} day
     * @param {?} config
     * @return {?}
     */
    DayTimeCalendarService.prototype.updateDay = function (current, day, config) {
        var /** @type {?} */ time = current ? current : moment$2();
        var /** @type {?} */ updated = moment$2(day.format(DAY_FORMAT) + time.format(TIME_FORMAT), COMBINED_FORMAT);
        if (config.min) {
            var /** @type {?} */ min = (config.min);
            updated = min.isAfter(updated) ? min : updated;
        }
        if (config.max) {
            var /** @type {?} */ max = (config.max);
            updated = max.isBefore(updated) ? max : updated;
        }
        return updated;
    };
    /**
     * @param {?} current
     * @param {?} time
     * @return {?}
     */
    DayTimeCalendarService.prototype.updateTime = function (current, time) {
        var /** @type {?} */ day = current ? current : moment$2();
        return moment$2(day.format(DAY_FORMAT) + time.format(TIME_FORMAT), COMBINED_FORMAT);
    };
    return DayTimeCalendarService;
}());
DayTimeCalendarService.decorators = [
    { type: core.Injectable },
];
/**
 * @nocollapse
 */
DayTimeCalendarService.ctorParameters = function () { return [
    { type: UtilsService, },
    { type: DayCalendarService, },
    { type: TimeSelectService, },
]; };
var moment$4 = momentNs;
var DatePickerService = (function () {
    /**
     * @param {?} utilsService
     * @param {?} timeSelectService
     * @param {?} daytimeCalendarService
     */
    function DatePickerService(utilsService, timeSelectService, daytimeCalendarService) {
        this.utilsService = utilsService;
        this.timeSelectService = timeSelectService;
        this.daytimeCalendarService = daytimeCalendarService;
        this.onPickerClosed = new core.EventEmitter();
        this.defaultConfig = {
            closeOnSelect: true,
            closeOnSelectDelay: 100,
            format: 'DD-MM-YYYY',
            openOnFocus: true,
            openOnClick: true,
            onOpenDelay: 0,
            disableKeypress: false,
            showNearMonthDays: true,
            showWeekNumbers: false,
            enableMonthSelector: true,
            showGoToCurrent: true,
            locale: moment$4.locale()
        };
    }
    /**
     * @param {?} config
     * @param {?=} mode
     * @return {?}
     */
    DatePickerService.prototype.getConfig = function (config, mode) {
        if (mode === void 0) { mode = 'daytime'; }
        var /** @type {?} */ _config = (Object.assign({}, this.defaultConfig, { format: this.getDefaultFormatByMode(mode) }, this.utilsService.clearUndefined(config)));
        this.utilsService.convertPropsToMoment(_config, _config.format, ['min', 'max']);
        if (config && config.allowMultiSelect && config.closeOnSelect === undefined) {
            _config.closeOnSelect = false;
        }
        moment$4.locale(_config.locale);
        return _config;
    };
    /**
     * @param {?} pickerConfig
     * @return {?}
     */
    DatePickerService.prototype.getDayConfigService = function (pickerConfig) {
        return {
            min: pickerConfig.min,
            max: pickerConfig.max,
            isDayDisabledCallback: pickerConfig.isDayDisabledCallback,
            weekDayFormat: pickerConfig.weekDayFormat,
            showNearMonthDays: pickerConfig.showNearMonthDays,
            showWeekNumbers: pickerConfig.showWeekNumbers,
            firstDayOfWeek: pickerConfig.firstDayOfWeek,
            format: pickerConfig.format,
            allowMultiSelect: pickerConfig.allowMultiSelect,
            monthFormat: pickerConfig.monthFormat,
            monthFormatter: pickerConfig.monthFormatter,
            enableMonthSelector: pickerConfig.enableMonthSelector,
            yearFormat: pickerConfig.yearFormat,
            yearFormatter: pickerConfig.yearFormatter,
            dayBtnFormat: pickerConfig.dayBtnFormat,
            dayBtnFormatter: pickerConfig.dayBtnFormatter,
            dayBtnCssClassCallback: pickerConfig.dayBtnCssClassCallback,
            monthBtnFormat: pickerConfig.monthBtnFormat,
            monthBtnFormatter: pickerConfig.monthBtnFormatter,
            monthBtnCssClassCallback: pickerConfig.monthBtnCssClassCallback,
            multipleYearsNavigateBy: pickerConfig.multipleYearsNavigateBy,
            showMultipleYearsNavigation: pickerConfig.showMultipleYearsNavigation,
            locale: pickerConfig.locale,
            returnedValueType: pickerConfig.returnedValueType,
            showGoToCurrent: pickerConfig.showGoToCurrent,
            unSelectOnClick: pickerConfig.unSelectOnClick
        };
    };
    /**
     * @param {?} pickerConfig
     * @return {?}
     */
    DatePickerService.prototype.getDayTimeConfigService = function (pickerConfig) {
        return this.daytimeCalendarService.getConfig(pickerConfig);
    };
    /**
     * @param {?} pickerConfig
     * @return {?}
     */
    DatePickerService.prototype.getTimeConfigService = function (pickerConfig) {
        return this.timeSelectService.getConfig(pickerConfig);
    };
    /**
     * @return {?}
     */
    DatePickerService.prototype.pickerClosed = function () {
        this.onPickerClosed.emit();
    };
    /**
     * @param {?} value
     * @param {?} config
     * @return {?}
     */
    DatePickerService.prototype.isValidInputDateValue = function (value, config) {
        var _this = this;
        value = value ? value : '';
        var /** @type {?} */ datesStrArr = this.utilsService.datesStringToStringArray(value);
        return datesStrArr.every(function (date) { return _this.utilsService.isDateValid(date, config.format); });
    };
    /**
     * @param {?} value
     * @param {?} config
     * @return {?}
     */
    DatePickerService.prototype.convertInputValueToMomentArray = function (value, config) {
        value = value ? value : '';
        var /** @type {?} */ datesStrArr = this.utilsService.datesStringToStringArray(value);
        return this.utilsService.convertToMomentArray(datesStrArr, config.format, config.allowMultiSelect);
    };
    /**
     * @param {?} mode
     * @return {?}
     */
    DatePickerService.prototype.getDefaultFormatByMode = function (mode) {
        switch (mode) {
            case 'day':
                return 'DD-MM-YYYY';
            case 'daytime':
                return 'DD-MM-YYYY HH:mm:ss';
            case 'time':
                return 'HH:mm:ss';
            case 'month':
                return 'MMM, YYYY';
        }
    };
    return DatePickerService;
}());
DatePickerService.decorators = [
    { type: core.Injectable },
];
/**
 * @nocollapse
 */
DatePickerService.ctorParameters = function () { return [
    { type: UtilsService, },
    { type: TimeSelectService, },
    { type: DayTimeCalendarService, },
]; };
var DatePickerComponent = (function () {
    /**
     * @param {?} dayPickerService
     * @param {?} domHelper
     * @param {?} elemRef
     * @param {?} renderer
     * @param {?} utilsService
     * @param {?} cd
     */
    function DatePickerComponent(dayPickerService, domHelper, elemRef, renderer, utilsService, cd) {
        this.dayPickerService = dayPickerService;
        this.domHelper = domHelper;
        this.elemRef = elemRef;
        this.renderer = renderer;
        this.utilsService = utilsService;
        this.cd = cd;
        this.isInitialized = false;
        this.mode = 'day';
        this.placeholder = '';
        this.disabled = false;
        this.open = new core.EventEmitter();
        this.close = new core.EventEmitter();
        this.onChange = new core.EventEmitter();
        this.onBlur = new core.EventEmitter();
        this.onGoToCurrent = new core.EventEmitter();
        this.onLeftNav = new core.EventEmitter();
        this.onRightNav = new core.EventEmitter();
        this._areCalendarsShown = false;
        this.hideStateHelper = false;
        this._selected = [];
        this.isFocusedTrigger = false;
        this.handleInnerElementClickUnlisteners = [];
        this.globalListnersUnlisteners = [];
        this.api = {
            open: this.showCalendars.bind(this),
            close: this.hideCalendar.bind(this),
            moveCalendarTo: this.moveCalendarTo.bind(this)
        };
    }
    Object.defineProperty(DatePickerComponent.prototype, "selected", {
        /**
         * @return {?}
         */
        get: function () {
            return this._selected;
        },
        /**
         * @param {?} selected
         * @return {?}
         */
        set: function (selected) {
            this._selected = selected;
            this.inputElementValue = ((this.utilsService
                .convertFromMomentArray(this.componentConfig.format, selected, ECalendarValue.StringArr)))
                .join(' | ');
            var /** @type {?} */ val = this.processOnChangeCallback(selected);
            this.onChangeCallback(val, false);
            this.onChange.emit(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatePickerComponent.prototype, "areCalendarsShown", {
        /**
         * @return {?}
         */
        get: function () {
            return this._areCalendarsShown;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            if (value) {
                this.startGlobalListeners();
                this.domHelper.appendElementToPosition({
                    container: this.appendToElement,
                    element: this.calendarWrapper,
                    anchor: this.inputElementContainer,
                    dimElem: this.popupElem,
                    drops: this.componentConfig.drops,
                    opens: this.componentConfig.opens
                });
            }
            else {
                this.stopGlobalListeners();
                this.dayPickerService.pickerClosed();
            }
            this._areCalendarsShown = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatePickerComponent.prototype, "openOnFocus", {
        /**
         * @return {?}
         */
        get: function () {
            return this.componentConfig.openOnFocus;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatePickerComponent.prototype, "openOnClick", {
        /**
         * @return {?}
         */
        get: function () {
            return this.componentConfig.openOnClick;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatePickerComponent.prototype, "currentDateView", {
        /**
         * @return {?}
         */
        get: function () {
            return this._currentDateView;
        },
        /**
         * @param {?} date
         * @return {?}
         */
        set: function (date) {
            this._currentDateView = date;
            if (this.dayCalendarRef) {
                this.dayCalendarRef.moveCalendarTo(date);
            }
            if (this.monthCalendarRef) {
                this.monthCalendarRef.moveCalendarTo(date);
            }
            if (this.dayTimeCalendarRef) {
                this.dayTimeCalendarRef.moveCalendarTo(date);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DatePickerComponent.prototype.onClick = function () {
        if (!this.openOnClick) {
            return;
        }
        if (!this.isFocusedTrigger && !this.disabled) {
            this.hideStateHelper = true;
            if (!this.areCalendarsShown) {
                this.showCalendars();
            }
        }
    };
    /**
     * @return {?}
     */
    DatePickerComponent.prototype.onBodyClick = function () {
        if (!this.hideStateHelper && this.areCalendarsShown) {
            this.hideCalendar();
        }
        this.hideStateHelper = false;
    };
    /**
     * @return {?}
     */
    DatePickerComponent.prototype.onScroll = function () {
        if (this.areCalendarsShown) {
            this.domHelper.setElementPosition({
                container: this.appendToElement,
                element: this.calendarWrapper,
                anchor: this.inputElementContainer,
                dimElem: this.popupElem,
                drops: this.componentConfig.drops,
                opens: this.componentConfig.opens
            });
        }
    };
    /**
     * @param {?} value
     * @return {?}
     */
    DatePickerComponent.prototype.writeValue = function (value) {
        this.inputValue = value;
        if (value || value === '') {
            this.selected = this.utilsService
                .convertToMomentArray(value, this.componentConfig.format, this.componentConfig.allowMultiSelect);
            this.init();
        }
        else {
            this.selected = [];
        }
        this.cd.markForCheck();
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    DatePickerComponent.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    /**
     * @param {?} _
     * @param {?} changedByInput
     * @return {?}
     */
    DatePickerComponent.prototype.onChangeCallback = function (_, changedByInput) {
    };
    
    /**
     * @param {?} fn
     * @return {?}
     */
    DatePickerComponent.prototype.registerOnTouched = function (fn) {
    };
    /**
     * @param {?} formControl
     * @return {?}
     */
    DatePickerComponent.prototype.validate = function (formControl) {
        return this.validateFn(formControl.value);
    };
    /**
     * @param {?} selected
     * @return {?}
     */
    DatePickerComponent.prototype.processOnChangeCallback = function (selected) {
        if (typeof selected === 'string') {
            return selected;
        }
        else {
            return this.utilsService.convertFromMomentArray(this.componentConfig.format, selected, this.componentConfig.returnedValueType || this.inputValueType);
        }
    };
    /**
     * @return {?}
     */
    DatePickerComponent.prototype.initValidators = function () {
        this.validateFn = this.utilsService.createValidator({
            minDate: this.minDate,
            maxDate: this.maxDate,
            minTime: this.minTime,
            maxTime: this.maxTime
        }, this.componentConfig.format, this.mode);
        this.onChangeCallback(this.processOnChangeCallback(this.selected), false);
    };
    /**
     * @return {?}
     */
    DatePickerComponent.prototype.ngOnInit = function () {
        this.isInitialized = true;
        this.init();
        this.initValidators();
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    DatePickerComponent.prototype.ngOnChanges = function (changes) {
        if (this.isInitialized) {
            var minDate = changes.minDate, maxDate = changes.maxDate, minTime = changes.minTime, maxTime = changes.maxTime;
            this.init();
            if (minDate || maxDate || minTime || maxTime) {
                this.initValidators();
            }
        }
    };
    /**
     * @return {?}
     */
    DatePickerComponent.prototype.ngAfterViewInit = function () {
        this.setElementPositionInDom();
    };
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    DatePickerComponent.prototype.setDisabledState = function (isDisabled) {
        this.disabled = isDisabled;
    };
    /**
     * @return {?}
     */
    DatePickerComponent.prototype.setElementPositionInDom = function () {
        this.calendarWrapper = (this.calendarContainer.nativeElement);
        this.setInputElementContainer();
        this.popupElem = this.elemRef.nativeElement.querySelector('.dp-popup');
        this.handleInnerElementClick(this.popupElem);
        var appendTo = this.componentConfig.appendTo;
        if (appendTo) {
            if (typeof appendTo === 'string') {
                this.appendToElement = (document.querySelector(/** @type {?} */ (appendTo)));
            }
            else {
                this.appendToElement = (appendTo);
            }
        }
        else {
            this.appendToElement = this.elemRef.nativeElement;
        }
        this.appendToElement.appendChild(this.calendarWrapper);
    };
    /**
     * @return {?}
     */
    DatePickerComponent.prototype.setInputElementContainer = function () {
        this.inputElementContainer = this.componentConfig.inputElementContainer
            || this.elemRef.nativeElement.querySelector('.dp-input-container')
            || document.body;
    };
    /**
     * @param {?} element
     * @return {?}
     */
    DatePickerComponent.prototype.handleInnerElementClick = function (element) {
        var _this = this;
        this.handleInnerElementClickUnlisteners.push(this.renderer.listen(element, 'click', function () {
            _this.hideStateHelper = true;
        }));
    };
    /**
     * @return {?}
     */
    DatePickerComponent.prototype.init = function () {
        this.componentConfig = this.dayPickerService.getConfig(this.config, this.mode);
        this.currentDateView = this.displayDate
            ? this.utilsService.convertToMoment(this.displayDate, this.componentConfig.format).clone()
            : this.utilsService
                .getDefaultDisplayDate(this.currentDateView, this.selected, this.componentConfig.allowMultiSelect, this.componentConfig.min);
        this.inputValueType = this.utilsService.getInputType(this.inputValue, this.componentConfig.allowMultiSelect);
        this.dayCalendarConfig = this.dayPickerService.getDayConfigService(this.componentConfig);
        this.dayTimeCalendarConfig = this.dayPickerService.getDayTimeConfigService(this.componentConfig);
        this.timeSelectConfig = this.dayPickerService.getTimeConfigService(this.componentConfig);
    };
    /**
     * @return {?}
     */
    DatePickerComponent.prototype.inputFocused = function () {
        var _this = this;
        if (!this.openOnFocus) {
            return;
        }
        this.isFocusedTrigger = true;
        setTimeout(function () {
            _this.hideStateHelper = false;
            if (!_this.areCalendarsShown) {
                _this.showCalendars();
            }
            _this.isFocusedTrigger = false;
        }, this.componentConfig.onOpenDelay);
    };
    /**
     * @param {?} value
     * @return {?}
     */
    DatePickerComponent.prototype.inputBlurred = function (value) {
        this.onBlur.emit(value);
    };
    /**
     * @return {?}
     */
    DatePickerComponent.prototype.showCalendars = function () {
        this.hideStateHelper = true;
        this.areCalendarsShown = true;
        if (this.timeSelectRef) {
            this.timeSelectRef.api.triggerChange();
        }
        this.open.emit();
        this.cd.markForCheck();
    };
    /**
     * @return {?}
     */
    DatePickerComponent.prototype.hideCalendar = function () {
        this.areCalendarsShown = false;
        if (this.dayCalendarRef) {
            this.dayCalendarRef.api.toggleCalendarMode(ECalendarMode.Day);
        }
        this.close.emit();
        this.cd.markForCheck();
    };
    /**
     * @param {?} value
     * @param {?=} inputElement
     * @return {?}
     */
    DatePickerComponent.prototype.onViewDateChange = function (value, inputElement) {
        if (inputElement) {
            var /** @type {?} */ lastValue = value[value.length - 1];
            if (value.length === 3 && lastValue !== '-') {
                value = [value.slice(0, 2), value[value.length - 1]].join('-');
                inputElement.value = [value.slice(0, 2), value[value.length - 1]].join('-');
            }
            if (value.length === 6 && lastValue !== '-') {
                value = [value.slice(0, 5), value[value.length - 1]].join('-');
                inputElement.value = [value.slice(0, 5), value[value.length - 1]].join('-');
            }
        }
        if (this.dayPickerService.isValidInputDateValue(value, this.componentConfig)) {
            this.selected = this.dayPickerService.convertInputValueToMomentArray(value, this.componentConfig);
            this.currentDateView = this.selected.length
                ? this.utilsService.getDefaultDisplayDate(null, this.selected, this.componentConfig.allowMultiSelect, this.componentConfig.min)
                : this.currentDateView;
        }
        else {
            this._selected = this.utilsService
                .getValidMomentArray(value, this.componentConfig.format);
            this.onChangeCallback(this.processOnChangeCallback(value), true);
        }
    };
    /**
     * @param {?} date
     * @param {?} granularity
     * @param {?=} ignoreClose
     * @return {?}
     */
    DatePickerComponent.prototype.dateSelected = function (date, granularity, ignoreClose) {
        this.selected = this.utilsService
            .updateSelected(this.componentConfig.allowMultiSelect, this.selected, date, granularity);
        if (!ignoreClose) {
            this.onDateClick();
        }
    };
    /**
     * @return {?}
     */
    DatePickerComponent.prototype.onDateClick = function () {
        if (this.componentConfig.closeOnSelect) {
            setTimeout(this.hideCalendar.bind(this), this.componentConfig.closeOnSelectDelay);
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    DatePickerComponent.prototype.onKeyPress = function (event) {
        switch (event.keyCode) {
            case (9):
            case (27):
                this.hideCalendar();
                break;
        }
    };
    /**
     * @param {?} date
     * @return {?}
     */
    DatePickerComponent.prototype.moveCalendarTo = function (date) {
        var /** @type {?} */ momentDate = this.utilsService.convertToMoment(date, this.componentConfig.format);
        this.currentDateView = momentDate;
    };
    /**
     * @param {?} change
     * @return {?}
     */
    DatePickerComponent.prototype.onLeftNavClick = function (change) {
        this.onLeftNav.emit(change);
    };
    /**
     * @param {?} change
     * @return {?}
     */
    DatePickerComponent.prototype.onRightNavClick = function (change) {
        this.onRightNav.emit(change);
    };
    /**
     * @return {?}
     */
    DatePickerComponent.prototype.startGlobalListeners = function () {
        var _this = this;
        this.globalListnersUnlisteners.push(this.renderer.listen(document, 'keydown', function (e) {
            _this.onKeyPress(e);
        }), this.renderer.listen(document, 'scroll', function () {
            _this.onScroll();
        }), this.renderer.listen(document, 'click', function () {
            _this.onBodyClick();
        }));
    };
    /**
     * @return {?}
     */
    DatePickerComponent.prototype.stopGlobalListeners = function () {
        this.globalListnersUnlisteners.forEach(function (ul) { return ul(); });
        this.globalListnersUnlisteners = [];
    };
    /**
     * @return {?}
     */
    DatePickerComponent.prototype.ngOnDestroy = function () {
        this.handleInnerElementClickUnlisteners.forEach(function (ul) { return ul(); });
        if (this.appendToElement) {
            this.appendToElement.removeChild(this.calendarWrapper);
        }
    };
    return DatePickerComponent;
}());
DatePickerComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'dp-date-picker',
                template: "\n    <div [ngClass]=\"{'dp-open': areCalendarsShown}\">\n      <div class=\"dp-input-container\"\n           [hidden]=\"componentConfig.hideInputContainer\"\n           [attr.data-hidden]=\"componentConfig.hideInputContainer\">\n        <input type=\"text\" #datePickerTextInput\n               class=\"dp-picker-input\"\n               [placeholder]=\"placeholder\"\n               [ngModel]=\"inputElementValue\"\n               (ngModelChange)=\"onViewDateChange($event, datePickerTextInput)\"\n               (focus)=\"inputFocused()\"\n               (blur)=\"inputBlurred($event.target.value)\"\n               [readonly]=\"componentConfig.disableKeypress\"\n               [disabled]=\"disabled\"/>\n      </div>\n      <div #container>\n        <div class=\"dp-popup {{theme}}\"\n             [ngSwitch]=\"mode\"\n             [hidden]=\"!_areCalendarsShown\"\n             [attr.data-hidden]=\"!_areCalendarsShown\">\n          <dp-day-calendar #dayCalendar\n                           *ngSwitchCase=\"'day'\"\n                           [config]=\"dayCalendarConfig\"\n                           [ngModel]=\"_selected\"\n                           [displayDate]=\"displayDate\"\n                           [theme]=\"theme\"\n                           (onSelect)=\"dateSelected($event, 'day')\"\n                           (onGoToCurrent)=\"onGoToCurrent.emit()\"\n                           (onLeftNav)=\"onLeftNavClick($event)\"\n                           (onRightNav)=\"onRightNavClick($event)\">\n          </dp-day-calendar>\n\n          <dp-month-calendar #monthCalendar\n                             *ngSwitchCase=\"'month'\"\n                             [config]=\"dayCalendarConfig\"\n                             [ngModel]=\"_selected\"\n                             [displayDate]=\"displayDate\"\n                             [theme]=\"theme\"\n                             (onSelect)=\"dateSelected($event, 'month')\"\n                             (onGoToCurrent)=\"onGoToCurrent.emit()\"\n                             (onLeftNav)=\"onLeftNavClick($event)\"\n                             (onRightNav)=\"onRightNavClick($event)\">\n          </dp-month-calendar>\n\n          <dp-time-select #timeSelect\n                          *ngSwitchCase=\"'time'\"\n                          [config]=\"timeSelectConfig\"\n                          [ngModel]=\"_selected && _selected[0]\"\n                          (onChange)=\"dateSelected($event, 'second', true)\"\n                          [theme]=\"theme\">\n          </dp-time-select>\n\n          <dp-day-time-calendar #daytimeCalendar\n                                *ngSwitchCase=\"'daytime'\"\n                                [config]=\"dayTimeCalendarConfig\"\n                                [displayDate]=\"displayDate\"\n                                [ngModel]=\"_selected && _selected[0]\"\n                                [theme]=\"theme\"\n                                (onChange)=\"dateSelected($event, 'second', true)\"\n                                (onGoToCurrent)=\"onGoToCurrent.emit()\"\n                                (onLeftNav)=\"onLeftNavClick($event)\"\n                                (onRightNav)=\"onRightNavClick($event)\">\n          </dp-day-time-calendar>\n        </div>\n      </div>\n    </div>\n  ",
                styles: ["\n    dp-date-picker {\n      display: inline-block;\n    }\n    dp-date-picker.dp-material .dp-picker-input {\n      -webkit-box-sizing: border-box;\n              box-sizing: border-box;\n      height: 30px;\n      width: 213px;\n      font-size: 13px;\n      outline: none;\n    }\n    dp-date-picker .dp-input-container {\n      position: relative;\n    }\n    dp-date-picker .dp-selected {\n      background: #106CC8;\n      color: #FFFFFF;\n    }\n    .dp-popup {\n      position: relative;\n      background: #FFFFFF;\n      -webkit-box-shadow: 1px 1px 5px 0 rgba(0, 0, 0, 0.1);\n              box-shadow: 1px 1px 5px 0 rgba(0, 0, 0, 0.1);\n      border-left: 1px solid rgba(0, 0, 0, 0.1);\n      border-right: 1px solid rgba(0, 0, 0, 0.1);\n      border-bottom: 1px solid rgba(0, 0, 0, 0.1);\n      z-index: 9999;\n      white-space: nowrap;\n    }\n  "],
                encapsulation: core.ViewEncapsulation.None,
                changeDetection: core.ChangeDetectionStrategy.OnPush,
                providers: [
                    DatePickerService,
                    DayTimeCalendarService,
                    DayCalendarService,
                    TimeSelectService,
                    {
                        provide: forms.NG_VALUE_ACCESSOR,
                        useExisting: core.forwardRef(function () { return DatePickerComponent; }),
                        multi: true
                    },
                    {
                        provide: forms.NG_VALIDATORS,
                        useExisting: core.forwardRef(function () { return DatePickerComponent; }),
                        multi: true
                    }
                ]
            },] },
];
/**
 * @nocollapse
 */
DatePickerComponent.ctorParameters = function () { return [
    { type: DatePickerService, },
    { type: DomHelper, },
    { type: core.ElementRef, },
    { type: core.Renderer, },
    { type: UtilsService, },
    { type: core.ChangeDetectorRef, },
]; };
DatePickerComponent.propDecorators = {
    'config': [{ type: core.Input },],
    'mode': [{ type: core.Input },],
    'placeholder': [{ type: core.Input },],
    'disabled': [{ type: core.Input },],
    'displayDate': [{ type: core.Input },],
    'theme': [{ type: core.HostBinding, args: ['class',] }, { type: core.Input },],
    'minDate': [{ type: core.Input },],
    'maxDate': [{ type: core.Input },],
    'minTime': [{ type: core.Input },],
    'maxTime': [{ type: core.Input },],
    'open': [{ type: core.Output },],
    'close': [{ type: core.Output },],
    'onChange': [{ type: core.Output },],
    'onBlur': [{ type: core.Output },],
    'onGoToCurrent': [{ type: core.Output },],
    'onLeftNav': [{ type: core.Output },],
    'onRightNav': [{ type: core.Output },],
    'calendarContainer': [{ type: core.ViewChild, args: ['container',] },],
    'dayCalendarRef': [{ type: core.ViewChild, args: ['dayCalendar',] },],
    'monthCalendarRef': [{ type: core.ViewChild, args: ['monthCalendar',] },],
    'dayTimeCalendarRef': [{ type: core.ViewChild, args: ['daytimeCalendar',] },],
    'timeSelectRef': [{ type: core.ViewChild, args: ['timeSelect',] },],
    'onClick': [{ type: core.HostListener, args: ['click',] },],
    'onScroll': [{ type: core.HostListener, args: ['window:resize',] },],
};
var DatePickerDirectiveService = (function () {
    /**
     * @param {?} utilsService
     */
    function DatePickerDirectiveService(utilsService) {
        this.utilsService = utilsService;
    }
    /**
     * @param {?} attachTo
     * @param {?} baseElement
     * @return {?}
     */
    DatePickerDirectiveService.prototype.convertToHTMLElement = function (attachTo, baseElement) {
        if (typeof attachTo === 'string') {
            return this.utilsService.closestParent(baseElement, attachTo);
        }
        else if (attachTo) {
            return attachTo.nativeElement;
        }
        return undefined;
    };
    /**
     * @param {?=} config
     * @param {?=} baseElement
     * @param {?=} attachTo
     * @return {?}
     */
    DatePickerDirectiveService.prototype.getConfig = function (config, baseElement, attachTo) {
        if (config === void 0) { config = {}; }
        var /** @type {?} */ _config = Object.assign({}, config);
        _config.hideInputContainer = true;
        if (baseElement) {
            _config.inputElementContainer = attachTo
                ? this.convertToHTMLElement(attachTo, baseElement.nativeElement)
                : baseElement.nativeElement;
        }
        return _config;
    };
    return DatePickerDirectiveService;
}());
DatePickerDirectiveService.decorators = [
    { type: core.Injectable },
];
/**
 * @nocollapse
 */
DatePickerDirectiveService.ctorParameters = function () { return [
    { type: UtilsService, },
]; };
var DatePickerDirective = (function () {
    /**
     * @param {?} viewContainerRef
     * @param {?} elemRef
     * @param {?} componentFactoryResolver
     * @param {?} service
     * @param {?} formControl
     */
    function DatePickerDirective(viewContainerRef, elemRef, componentFactoryResolver, service, formControl) {
        this.viewContainerRef = viewContainerRef;
        this.elemRef = elemRef;
        this.componentFactoryResolver = componentFactoryResolver;
        this.service = service;
        this.formControl = formControl;
        this._mode = 'day';
        this.open = new core.EventEmitter();
        this.close = new core.EventEmitter();
        this.onChange = new core.EventEmitter();
        this.onGoToCurrent = new core.EventEmitter();
        this.onLeftNav = new core.EventEmitter();
        this.onRightNav = new core.EventEmitter();
    }
    Object.defineProperty(DatePickerDirective.prototype, "config", {
        /**
         * @return {?}
         */
        get: function () {
            return this._config;
        },
        /**
         * @param {?} config
         * @return {?}
         */
        set: function (config) {
            this._config = this.service.getConfig(config, this.viewContainerRef.element, this.attachTo);
            this.updateDatepickerConfig();
            this.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatePickerDirective.prototype, "attachTo", {
        /**
         * @return {?}
         */
        get: function () {
            return this._attachTo;
        },
        /**
         * @param {?} attachTo
         * @return {?}
         */
        set: function (attachTo) {
            this._attachTo = attachTo;
            this._config = this.service.getConfig(this.config, this.viewContainerRef.element, this.attachTo);
            this.updateDatepickerConfig();
            this.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatePickerDirective.prototype, "theme", {
        /**
         * @return {?}
         */
        get: function () {
            return this._theme;
        },
        /**
         * @param {?} theme
         * @return {?}
         */
        set: function (theme) {
            this._theme = theme;
            if (this.datePicker) {
                this.datePicker.theme = theme;
            }
            this.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatePickerDirective.prototype, "mode", {
        /**
         * @return {?}
         */
        get: function () {
            return this._mode;
        },
        /**
         * @param {?} mode
         * @return {?}
         */
        set: function (mode) {
            this._mode = mode;
            if (this.datePicker) {
                this.datePicker.mode = mode;
            }
            this.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatePickerDirective.prototype, "minDate", {
        /**
         * @return {?}
         */
        get: function () {
            return this._minDate;
        },
        /**
         * @param {?} minDate
         * @return {?}
         */
        set: function (minDate) {
            this._minDate = minDate;
            if (this.datePicker) {
                this.datePicker.minDate = minDate;
                this.datePicker.ngOnInit();
            }
            this.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatePickerDirective.prototype, "maxDate", {
        /**
         * @return {?}
         */
        get: function () {
            return this._maxDate;
        },
        /**
         * @param {?} maxDate
         * @return {?}
         */
        set: function (maxDate) {
            this._maxDate = maxDate;
            if (this.datePicker) {
                this.datePicker.maxDate = maxDate;
                this.datePicker.ngOnInit();
            }
            this.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatePickerDirective.prototype, "minTime", {
        /**
         * @return {?}
         */
        get: function () {
            return this._minTime;
        },
        /**
         * @param {?} minTime
         * @return {?}
         */
        set: function (minTime) {
            this._minTime = minTime;
            if (this.datePicker) {
                this.datePicker.minTime = minTime;
                this.datePicker.ngOnInit();
            }
            this.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatePickerDirective.prototype, "maxTime", {
        /**
         * @return {?}
         */
        get: function () {
            return this._maxTime;
        },
        /**
         * @param {?} maxTime
         * @return {?}
         */
        set: function (maxTime) {
            this._maxTime = maxTime;
            if (this.datePicker) {
                this.datePicker.maxTime = maxTime;
                this.datePicker.ngOnInit();
            }
            this.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatePickerDirective.prototype, "displayDate", {
        /**
         * @return {?}
         */
        get: function () {
            return this._displayDate;
        },
        /**
         * @param {?} displayDate
         * @return {?}
         */
        set: function (displayDate) {
            this._displayDate = displayDate;
            this.updateDatepickerConfig();
            this.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DatePickerDirective.prototype.ngOnInit = function () {
        this.datePicker = this.createDatePicker();
        this.api = this.datePicker.api;
        this.updateDatepickerConfig();
        this.attachModelToDatePicker();
        this.datePicker.theme = this.theme;
    };
    /**
     * @return {?}
     */
    DatePickerDirective.prototype.createDatePicker = function () {
        var /** @type {?} */ factory = this.componentFactoryResolver.resolveComponentFactory(DatePickerComponent);
        return this.viewContainerRef.createComponent(factory).instance;
    };
    /**
     * @return {?}
     */
    DatePickerDirective.prototype.attachModelToDatePicker = function () {
        var _this = this;
        if (!this.formControl) {
            return;
        }
        this.datePicker.onViewDateChange(this.formControl.value);
        this.formControl.valueChanges.subscribe(function (value) {
            if (value !== _this.datePicker.inputElementValue) {
                _this.datePicker.onViewDateChange(value);
            }
        });
        var /** @type {?} */ setup = true;
        this.datePicker.registerOnChange(function (value, changedByInput) {
            if (value) {
                var /** @type {?} */ isMultiselectEmpty = setup && Array.isArray(value) && !value.length;
                if (!isMultiselectEmpty && !changedByInput) {
                    _this.formControl.control.setValue(_this.datePicker.inputElementValue);
                }
            }
            var /** @type {?} */ errors = _this.datePicker.validateFn(value);
            if (!setup) {
                _this.formControl.control.markAsDirty({
                    onlySelf: true
                });
            }
            else {
                setup = false;
            }
            if (errors) {
                if (errors.hasOwnProperty('format')) {
                    var given = errors['format'].given;
                    _this.datePicker.inputElementValue = given;
                    if (!changedByInput) {
                        _this.formControl.control.setValue(given);
                    }
                }
                _this.formControl.control.setErrors(errors);
            }
        });
    };
    /**
     * @return {?}
     */
    DatePickerDirective.prototype.onClick = function () {
        this.datePicker.onClick();
    };
    /**
     * @return {?}
     */
    DatePickerDirective.prototype.onFocus = function () {
        this.datePicker.inputFocused();
    };
    /**
     * @return {?}
     */
    DatePickerDirective.prototype.updateDatepickerConfig = function () {
        if (this.datePicker) {
            this.datePicker.minDate = this.minDate;
            this.datePicker.maxDate = this.maxDate;
            this.datePicker.minTime = this.minTime;
            this.datePicker.maxTime = this.maxTime;
            this.datePicker.mode = this.mode || 'day';
            this.datePicker.displayDate = this.displayDate;
            this.datePicker.config = this.config;
            this.datePicker.open = this.open;
            this.datePicker.close = this.close;
            this.datePicker.onChange = this.onChange;
            this.datePicker.onGoToCurrent = this.onGoToCurrent;
            this.datePicker.onLeftNav = this.onLeftNav;
            this.datePicker.onRightNav = this.onRightNav;
            this.datePicker.init();
            if (this.datePicker.componentConfig.disableKeypress) {
                this.elemRef.nativeElement.setAttribute('readonly', true);
            }
            else {
                this.elemRef.nativeElement.removeAttribute('readonly');
            }
        }
    };
    /**
     * @return {?}
     */
    DatePickerDirective.prototype.markForCheck = function () {
        if (this.datePicker) {
            this.datePicker.cd.markForCheck();
        }
    };
    return DatePickerDirective;
}());
DatePickerDirective.decorators = [
    { type: core.Directive, args: [{
                exportAs: 'dpDayPicker',
                providers: [DatePickerDirectiveService],
                selector: '[dpDayPicker]'
            },] },
];
/**
 * @nocollapse
 */
DatePickerDirective.ctorParameters = function () { return [
    { type: core.ViewContainerRef, },
    { type: core.ElementRef, },
    { type: core.ComponentFactoryResolver, },
    { type: DatePickerDirectiveService, },
    { type: forms.NgControl, decorators: [{ type: core.Optional },] },
]; };
DatePickerDirective.propDecorators = {
    'config': [{ type: core.Input, args: ['dpDayPicker',] },],
    'attachTo': [{ type: core.Input },],
    'theme': [{ type: core.Input },],
    'mode': [{ type: core.Input },],
    'minDate': [{ type: core.Input },],
    'maxDate': [{ type: core.Input },],
    'minTime': [{ type: core.Input },],
    'maxTime': [{ type: core.Input },],
    'displayDate': [{ type: core.Input },],
    'open': [{ type: core.Output },],
    'close': [{ type: core.Output },],
    'onChange': [{ type: core.Output },],
    'onGoToCurrent': [{ type: core.Output },],
    'onLeftNav': [{ type: core.Output },],
    'onRightNav': [{ type: core.Output },],
    'onClick': [{ type: core.HostListener, args: ['click',] },],
    'onFocus': [{ type: core.HostListener, args: ['focus',] },],
};
var moment$5 = momentNs;
var DayCalendarComponent = (function () {
    /**
     * @param {?} dayCalendarService
     * @param {?} utilsService
     * @param {?} cd
     */
    function DayCalendarComponent(dayCalendarService, utilsService, cd) {
        this.dayCalendarService = dayCalendarService;
        this.utilsService = utilsService;
        this.cd = cd;
        this.onSelect = new core.EventEmitter();
        this.onMonthSelect = new core.EventEmitter();
        this.onNavHeaderBtnClick = new core.EventEmitter();
        this.onGoToCurrent = new core.EventEmitter();
        this.onLeftNav = new core.EventEmitter();
        this.onRightNav = new core.EventEmitter();
        this.CalendarMode = ECalendarMode;
        this.isInited = false;
        this.currentCalendarMode = ECalendarMode.Day;
        this._shouldShowCurrent = true;
        this.api = {
            moveCalendarsBy: this.moveCalendarsBy.bind(this),
            moveCalendarTo: this.moveCalendarTo.bind(this),
            toggleCalendarMode: this.toggleCalendarMode.bind(this)
        };
    }
    Object.defineProperty(DayCalendarComponent.prototype, "selected", {
        /**
         * @return {?}
         */
        get: function () {
            return this._selected;
        },
        /**
         * @param {?} selected
         * @return {?}
         */
        set: function (selected) {
            this._selected = selected;
            this.onChangeCallback(this.processOnChangeCallback(selected));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DayCalendarComponent.prototype, "currentDateView", {
        /**
         * @return {?}
         */
        get: function () {
            return this._currentDateView;
        },
        /**
         * @param {?} current
         * @return {?}
         */
        set: function (current) {
            this._currentDateView = current.clone();
            this.weeks = this.dayCalendarService
                .generateMonthArray(this.componentConfig, this._currentDateView, this.selected);
            this.navLabel = this.dayCalendarService.getHeaderLabel(this.componentConfig, this._currentDateView);
            this.showLeftNav = this.dayCalendarService.shouldShowLeft(this.componentConfig.min, this.currentDateView);
            this.showRightNav = this.dayCalendarService.shouldShowRight(this.componentConfig.max, this.currentDateView);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DayCalendarComponent.prototype.ngOnInit = function () {
        this.isInited = true;
        this.init();
        this.initValidators();
    };
    /**
     * @return {?}
     */
    DayCalendarComponent.prototype.init = function () {
        this.componentConfig = this.dayCalendarService.getConfig(this.config);
        this.selected = this.selected || [];
        this.currentDateView = this.displayDate
            ? this.utilsService.convertToMoment(this.displayDate, this.componentConfig.format).clone()
            : this.utilsService
                .getDefaultDisplayDate(this.currentDateView, this.selected, this.componentConfig.allowMultiSelect, this.componentConfig.min);
        this.weekdays = this.dayCalendarService
            .generateWeekdays(this.componentConfig.firstDayOfWeek);
        this.inputValueType = this.utilsService.getInputType(this.inputValue, this.componentConfig.allowMultiSelect);
        this.monthCalendarConfig = this.dayCalendarService.getMonthCalendarConfig(this.componentConfig);
        this._shouldShowCurrent = this.shouldShowCurrent();
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    DayCalendarComponent.prototype.ngOnChanges = function (changes) {
        if (this.isInited) {
            var minDate = changes.minDate, maxDate = changes.maxDate, config = changes.config;
            this.handleConfigChange(config);
            this.init();
            if (minDate || maxDate) {
                this.initValidators();
            }
        }
    };
    /**
     * @param {?} value
     * @return {?}
     */
    DayCalendarComponent.prototype.writeValue = function (value) {
        this.inputValue = value;
        if (value) {
            this.selected = this.utilsService
                .convertToMomentArray(value, this.componentConfig.format, this.componentConfig.allowMultiSelect);
            this.inputValueType = this.utilsService
                .getInputType(this.inputValue, this.componentConfig.allowMultiSelect);
        }
        else {
            this.selected = [];
        }
        this.weeks = this.dayCalendarService
            .generateMonthArray(this.componentConfig, this.currentDateView, this.selected);
        this.cd.markForCheck();
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    DayCalendarComponent.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    /**
     * @param {?} _
     * @return {?}
     */
    DayCalendarComponent.prototype.onChangeCallback = function (_) {
    };
    
    /**
     * @param {?} fn
     * @return {?}
     */
    DayCalendarComponent.prototype.registerOnTouched = function (fn) {
    };
    /**
     * @param {?} formControl
     * @return {?}
     */
    DayCalendarComponent.prototype.validate = function (formControl) {
        if (this.minDate || this.maxDate) {
            return this.validateFn(formControl.value);
        }
        else {
            return function () { return null; };
        }
    };
    /**
     * @param {?} value
     * @return {?}
     */
    DayCalendarComponent.prototype.processOnChangeCallback = function (value) {
        return this.utilsService.convertFromMomentArray(this.componentConfig.format, value, this.componentConfig.returnedValueType || this.inputValueType);
    };
    /**
     * @return {?}
     */
    DayCalendarComponent.prototype.initValidators = function () {
        this.validateFn = this.utilsService.createValidator({ minDate: this.minDate, maxDate: this.maxDate }, this.componentConfig.format, 'day');
        this.onChangeCallback(this.processOnChangeCallback(this.selected));
    };
    /**
     * @param {?} day
     * @return {?}
     */
    DayCalendarComponent.prototype.dayClicked = function (day) {
        if (day.selected && !this.componentConfig.unSelectOnClick) {
            return;
        }
        this.selected = this.utilsService
            .updateSelected(this.componentConfig.allowMultiSelect, this.selected, day);
        this.weeks = this.dayCalendarService
            .generateMonthArray(this.componentConfig, this.currentDateView, this.selected);
        this.onSelect.emit(day);
    };
    /**
     * @param {?} day
     * @return {?}
     */
    DayCalendarComponent.prototype.getDayBtnText = function (day) {
        return this.dayCalendarService.getDayBtnText(this.componentConfig, day.date);
    };
    /**
     * @param {?} day
     * @return {?}
     */
    DayCalendarComponent.prototype.getDayBtnCssClass = function (day) {
        var /** @type {?} */ cssClasses = {
            'dp-selected': day.selected,
            'dp-current-month': day.currentMonth,
            'dp-prev-month': day.prevMonth,
            'dp-next-month': day.nextMonth,
            'dp-current-day': day.currentDay
        };
        var /** @type {?} */ customCssClass = this.dayCalendarService.getDayBtnCssClass(this.componentConfig, day.date);
        if (customCssClass) {
            cssClasses[customCssClass] = true;
        }
        return cssClasses;
    };
    /**
     * @return {?}
     */
    DayCalendarComponent.prototype.onLeftNavClick = function () {
        var /** @type {?} */ from = this.currentDateView.clone();
        this.moveCalendarsBy(this.currentDateView, -1, 'month');
        var /** @type {?} */ to = this.currentDateView.clone();
        this.onLeftNav.emit({ from: from, to: to });
    };
    /**
     * @return {?}
     */
    DayCalendarComponent.prototype.onRightNavClick = function () {
        var /** @type {?} */ from = this.currentDateView.clone();
        this.moveCalendarsBy(this.currentDateView, 1, 'month');
        var /** @type {?} */ to = this.currentDateView.clone();
        this.onRightNav.emit({ from: from, to: to });
    };
    /**
     * @param {?} change
     * @return {?}
     */
    DayCalendarComponent.prototype.onMonthCalendarLeftClick = function (change) {
        this.onLeftNav.emit(change);
    };
    /**
     * @param {?} change
     * @return {?}
     */
    DayCalendarComponent.prototype.onMonthCalendarRightClick = function (change) {
        this.onRightNav.emit(change);
    };
    /**
     * @param {?} change
     * @return {?}
     */
    DayCalendarComponent.prototype.onMonthCalendarSecondaryLeftClick = function (change) {
        this.onRightNav.emit(change);
    };
    /**
     * @param {?} change
     * @return {?}
     */
    DayCalendarComponent.prototype.onMonthCalendarSecondaryRightClick = function (change) {
        this.onLeftNav.emit(change);
    };
    /**
     * @param {?} weekday
     * @return {?}
     */
    DayCalendarComponent.prototype.getWeekdayName = function (weekday) {
        if (this.componentConfig.weekDayFormatter) {
            return this.componentConfig.weekDayFormatter(weekday.day());
        }
        return weekday.format(this.componentConfig.weekDayFormat);
    };
    /**
     * @param {?} mode
     * @return {?}
     */
    DayCalendarComponent.prototype.toggleCalendarMode = function (mode) {
        if (this.currentCalendarMode !== mode) {
            this.currentCalendarMode = mode;
            this.onNavHeaderBtnClick.emit(mode);
        }
        this.cd.markForCheck();
    };
    /**
     * @param {?} month
     * @return {?}
     */
    DayCalendarComponent.prototype.monthSelected = function (month) {
        this.currentDateView = month.date.clone();
        this.currentCalendarMode = ECalendarMode.Day;
        this.onMonthSelect.emit(month);
    };
    /**
     * @param {?} current
     * @param {?} amount
     * @param {?=} granularity
     * @return {?}
     */
    DayCalendarComponent.prototype.moveCalendarsBy = function (current, amount, granularity) {
        if (granularity === void 0) { granularity = 'month'; }
        this.currentDateView = current.clone().add(amount, granularity);
        this.cd.markForCheck();
    };
    /**
     * @param {?} to
     * @return {?}
     */
    DayCalendarComponent.prototype.moveCalendarTo = function (to) {
        if (to) {
            this.currentDateView = this.utilsService.convertToMoment(to, this.componentConfig.format);
        }
        this.cd.markForCheck();
    };
    /**
     * @return {?}
     */
    DayCalendarComponent.prototype.shouldShowCurrent = function () {
        return this.utilsService.shouldShowCurrent(this.componentConfig.showGoToCurrent, 'day', this.componentConfig.min, this.componentConfig.max);
    };
    /**
     * @return {?}
     */
    DayCalendarComponent.prototype.goToCurrent = function () {
        this.currentDateView = moment$5();
        this.onGoToCurrent.emit();
    };
    /**
     * @param {?} config
     * @return {?}
     */
    DayCalendarComponent.prototype.handleConfigChange = function (config) {
        if (config) {
            var /** @type {?} */ prevConf = this.dayCalendarService.getConfig(config.previousValue);
            var /** @type {?} */ currentConf = this.dayCalendarService.getConfig(config.currentValue);
            if (this.utilsService.shouldResetCurrentView(prevConf, currentConf)) {
                this._currentDateView = null;
            }
        }
    };
    return DayCalendarComponent;
}());
DayCalendarComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'dp-day-calendar',
                template: "\n    <div class=\"dp-day-calendar-container\" *ngIf=\"currentCalendarMode ===  CalendarMode.Day\">\n      <dp-calendar-nav\n          [label]=\"navLabel\"\n          [showLeftNav]=\"showLeftNav\"\n          [showRightNav]=\"showRightNav\"\n          [isLabelClickable]=\"componentConfig.enableMonthSelector\"\n          [showGoToCurrent]=\"_shouldShowCurrent\"\n          [theme]=\"theme\"\n          (onLeftNav)=\"onLeftNavClick()\"\n          (onRightNav)=\"onRightNavClick()\"\n          (onLabelClick)=\"toggleCalendarMode(CalendarMode.Month)\"\n          (onGoToCurrent)=\"goToCurrent()\">\n      </dp-calendar-nav>\n\n      <div class=\"dp-calendar-wrapper\"\n           [ngClass]=\"{'dp-hide-near-month': !componentConfig.showNearMonthDays}\">\n        <div class=\"dp-weekdays\">\n          <span class=\"dp-calendar-weekday\"\n                *ngFor=\"let weekday of weekdays\"\n                [innerText]=\"getWeekdayName(weekday)\">\n          </span>\n        </div>\n        <div class=\"dp-calendar-week\" *ngFor=\"let week of weeks\">\n          <span class=\"dp-week-number\"\n                *ngIf=\"componentConfig.showWeekNumbers\"\n                [innerText]=\"week[0].date.isoWeek()\">\n          </span>\n          <button type=\"button\"\n                  class=\"dp-calendar-day\"\n                  *ngFor=\"let day of week\"\n                  (click)=\"dayClicked(day)\"\n                  [disabled]=\"day.disabled\"\n                  [ngClass]=\"getDayBtnCssClass(day)\"\n                  [innerText]=\"getDayBtnText(day)\">\n          </button>\n        </div>\n      </div>\n    </div>\n\n    <dp-month-calendar\n        *ngIf=\"currentCalendarMode ===  CalendarMode.Month\"\n        [config]=\"monthCalendarConfig\"\n        [displayDate]=\"_currentDateView\"\n        [theme]=\"theme\"\n        (onSelect)=\"monthSelected($event)\"\n        (onNavHeaderBtnClick)=\"toggleCalendarMode(CalendarMode.Day)\"\n        (onLeftNav)=\"onMonthCalendarLeftClick($event)\"\n        (onRightNav)=\"onMonthCalendarRightClick($event)\"\n        (onLeftSecondaryNav)=\"onMonthCalendarSecondaryLeftClick($event)\"\n        (onRightSecondaryNav)=\"onMonthCalendarSecondaryRightClick($event)\">\n    </dp-month-calendar>\n  ",
                styles: ["\n    dp-day-calendar {\n      display: inline-block;\n    }\n    dp-day-calendar .dp-day-calendar-container {\n      background: #FFFFFF;\n    }\n    dp-day-calendar .dp-calendar-wrapper {\n      -webkit-box-sizing: border-box;\n              box-sizing: border-box;\n      border: 1px solid #000000;\n    }\n    dp-day-calendar .dp-calendar-wrapper .dp-calendar-weekday:first-child {\n      border-left: none;\n    }\n    dp-day-calendar .dp-weekdays {\n      font-size: 15px;\n      margin-bottom: 5px;\n    }\n    dp-day-calendar .dp-calendar-weekday {\n      -webkit-box-sizing: border-box;\n              box-sizing: border-box;\n      display: inline-block;\n      width: 30px;\n      text-align: center;\n      border-left: 1px solid #000000;\n      border-bottom: 1px solid #000000;\n    }\n    dp-day-calendar .dp-calendar-day {\n      -webkit-box-sizing: border-box;\n              box-sizing: border-box;\n      width: 30px;\n      height: 30px;\n      cursor: pointer;\n    }\n    dp-day-calendar .dp-selected {\n      background: #106CC8;\n      color: #FFFFFF;\n    }\n    dp-day-calendar .dp-prev-month,\n    dp-day-calendar .dp-next-month {\n      opacity: 0.5;\n    }\n    dp-day-calendar .dp-hide-near-month .dp-prev-month,\n    dp-day-calendar .dp-hide-near-month .dp-next-month {\n      visibility: hidden;\n    }\n    dp-day-calendar .dp-week-number {\n      position: absolute;\n      font-size: 9px;\n    }\n    dp-day-calendar.dp-material .dp-calendar-weekday {\n      height: 25px;\n      width: 30px;\n      line-height: 25px;\n      color: #7a7a7a;\n      border: none;\n    }\n    dp-day-calendar.dp-material .dp-calendar-wrapper {\n      border: 1px solid #E0E0E0;\n    }\n    dp-day-calendar.dp-material .dp-calendar-month,\n    dp-day-calendar.dp-material .dp-calendar-day {\n      -webkit-box-sizing: border-box;\n              box-sizing: border-box;\n      background: #FFFFFF;\n      border-radius: 50%;\n      border: none;\n      outline: none;\n    }\n    dp-day-calendar.dp-material .dp-calendar-month:hover,\n    dp-day-calendar.dp-material .dp-calendar-day:hover {\n      background: #E0E0E0;\n    }\n    dp-day-calendar.dp-material .dp-selected {\n      background: #106CC8;\n      color: #FFFFFF;\n    }\n    dp-day-calendar.dp-material .dp-selected:hover {\n      background: #106CC8;\n    }\n    dp-day-calendar.dp-material .dp-current-day {\n      border: 1px solid #106CC8;\n    }\n  "],
                encapsulation: core.ViewEncapsulation.None,
                changeDetection: core.ChangeDetectionStrategy.OnPush,
                providers: [
                    DayCalendarService,
                    {
                        provide: forms.NG_VALUE_ACCESSOR,
                        useExisting: core.forwardRef(function () { return DayCalendarComponent; }),
                        multi: true
                    },
                    {
                        provide: forms.NG_VALIDATORS,
                        useExisting: core.forwardRef(function () { return DayCalendarComponent; }),
                        multi: true
                    }
                ]
            },] },
];
/**
 * @nocollapse
 */
DayCalendarComponent.ctorParameters = function () { return [
    { type: DayCalendarService, },
    { type: UtilsService, },
    { type: core.ChangeDetectorRef, },
]; };
DayCalendarComponent.propDecorators = {
    'config': [{ type: core.Input },],
    'displayDate': [{ type: core.Input },],
    'minDate': [{ type: core.Input },],
    'maxDate': [{ type: core.Input },],
    'theme': [{ type: core.HostBinding, args: ['class',] }, { type: core.Input },],
    'onSelect': [{ type: core.Output },],
    'onMonthSelect': [{ type: core.Output },],
    'onNavHeaderBtnClick': [{ type: core.Output },],
    'onGoToCurrent': [{ type: core.Output },],
    'onLeftNav': [{ type: core.Output },],
    'onRightNav': [{ type: core.Output },],
};
var moment$7 = momentNs;
var MonthCalendarService = (function () {
    /**
     * @param {?} utilsService
     */
    function MonthCalendarService(utilsService) {
        this.utilsService = utilsService;
        this.DEFAULT_CONFIG = {
            allowMultiSelect: false,
            yearFormat: 'YYYY',
            format: 'MM-YYYY',
            isNavHeaderBtnClickable: false,
            monthBtnFormat: 'MMM',
            locale: moment$7.locale(),
            multipleYearsNavigateBy: 10,
            showMultipleYearsNavigation: false,
            unSelectOnClick: true
        };
    }
    /**
     * @param {?} config
     * @return {?}
     */
    MonthCalendarService.prototype.getConfig = function (config) {
        var /** @type {?} */ _config = (Object.assign({}, this.DEFAULT_CONFIG, this.utilsService.clearUndefined(config)));
        this.utilsService.convertPropsToMoment(_config, _config.format, ['min', 'max']);
        moment$7.locale(_config.locale);
        return _config;
    };
    /**
     * @param {?} config
     * @param {?} year
     * @param {?=} selected
     * @return {?}
     */
    MonthCalendarService.prototype.generateYear = function (config, year, selected) {
        var _this = this;
        if (selected === void 0) { selected = null; }
        var /** @type {?} */ index = year.clone().startOf('year');
        return this.utilsService.createArray(3).map(function () {
            return _this.utilsService.createArray(4).map(function () {
                var /** @type {?} */ date = index.clone();
                var /** @type {?} */ month = {
                    date: date,
                    selected: !!selected.find(function (s) { return index.isSame(s, 'month'); }),
                    currentMonth: index.isSame(moment$7(), 'month'),
                    disabled: _this.isMonthDisabled(date, config),
                    text: _this.getMonthBtnText(config, date)
                };
                index.add(1, 'month');
                return month;
            });
        });
    };
    /**
     * @param {?} date
     * @param {?} config
     * @return {?}
     */
    MonthCalendarService.prototype.isMonthDisabled = function (date, config) {
        if (config.min && date.isBefore(config.min, 'month')) {
            return true;
        }
        return !!(config.max && date.isAfter(config.max, 'month'));
    };
    /**
     * @param {?} min
     * @param {?} currentMonthView
     * @return {?}
     */
    MonthCalendarService.prototype.shouldShowLeft = function (min, currentMonthView) {
        return min ? min.isBefore(currentMonthView, 'year') : true;
    };
    /**
     * @param {?} max
     * @param {?} currentMonthView
     * @return {?}
     */
    MonthCalendarService.prototype.shouldShowRight = function (max, currentMonthView) {
        return max ? max.isAfter(currentMonthView, 'year') : true;
    };
    /**
     * @param {?} config
     * @param {?} year
     * @return {?}
     */
    MonthCalendarService.prototype.getHeaderLabel = function (config, year) {
        if (config.yearFormatter) {
            return config.yearFormatter(year);
        }
        return year.format(config.yearFormat);
    };
    /**
     * @param {?} config
     * @param {?} month
     * @return {?}
     */
    MonthCalendarService.prototype.getMonthBtnText = function (config, month) {
        if (config.monthBtnFormatter) {
            return config.monthBtnFormatter(month);
        }
        return month.format(config.monthBtnFormat);
    };
    /**
     * @param {?} config
     * @param {?} month
     * @return {?}
     */
    MonthCalendarService.prototype.getMonthBtnCssClass = function (config, month) {
        if (config.monthBtnCssClassCallback) {
            return config.monthBtnCssClassCallback(month);
        }
        return '';
    };
    return MonthCalendarService;
}());
MonthCalendarService.decorators = [
    { type: core.Injectable },
];
/**
 * @nocollapse
 */
MonthCalendarService.ctorParameters = function () { return [
    { type: UtilsService, },
]; };
var moment$6 = momentNs;
var MonthCalendarComponent = (function () {
    /**
     * @param {?} monthCalendarService
     * @param {?} utilsService
     * @param {?} cd
     */
    function MonthCalendarComponent(monthCalendarService, utilsService, cd) {
        this.monthCalendarService = monthCalendarService;
        this.utilsService = utilsService;
        this.cd = cd;
        this.onSelect = new core.EventEmitter();
        this.onNavHeaderBtnClick = new core.EventEmitter();
        this.onGoToCurrent = new core.EventEmitter();
        this.onLeftNav = new core.EventEmitter();
        this.onRightNav = new core.EventEmitter();
        this.onLeftSecondaryNav = new core.EventEmitter();
        this.onRightSecondaryNav = new core.EventEmitter();
        this.isInited = false;
        this._shouldShowCurrent = true;
        this.api = {
            toggleCalendar: this.toggleCalendarMode.bind(this),
            moveCalendarTo: this.moveCalendarTo.bind(this)
        };
    }
    Object.defineProperty(MonthCalendarComponent.prototype, "selected", {
        /**
         * @return {?}
         */
        get: function () {
            return this._selected;
        },
        /**
         * @param {?} selected
         * @return {?}
         */
        set: function (selected) {
            this._selected = selected;
            this.onChangeCallback(this.processOnChangeCallback(selected));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MonthCalendarComponent.prototype, "currentDateView", {
        /**
         * @return {?}
         */
        get: function () {
            return this._currentDateView;
        },
        /**
         * @param {?} current
         * @return {?}
         */
        set: function (current) {
            this._currentDateView = current.clone();
            this.yearMonths = this.monthCalendarService
                .generateYear(this.componentConfig, this._currentDateView, this.selected);
            this.navLabel = this.monthCalendarService.getHeaderLabel(this.componentConfig, this.currentDateView);
            this.showLeftNav = this.monthCalendarService.shouldShowLeft(this.componentConfig.min, this._currentDateView);
            this.showRightNav = this.monthCalendarService.shouldShowRight(this.componentConfig.max, this.currentDateView);
            this.showSecondaryLeftNav = this.componentConfig.showMultipleYearsNavigation && this.showLeftNav;
            this.showSecondaryRightNav = this.componentConfig.showMultipleYearsNavigation && this.showRightNav;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    MonthCalendarComponent.prototype.ngOnInit = function () {
        this.isInited = true;
        this.init();
        this.initValidators();
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    MonthCalendarComponent.prototype.ngOnChanges = function (changes) {
        if (this.isInited) {
            var minDate = changes.minDate, maxDate = changes.maxDate, config = changes.config;
            this.handleConfigChange(config);
            this.init();
            if (minDate || maxDate) {
                this.initValidators();
            }
        }
    };
    /**
     * @return {?}
     */
    MonthCalendarComponent.prototype.init = function () {
        this.componentConfig = this.monthCalendarService.getConfig(this.config);
        this.selected = this.selected || [];
        this.currentDateView = this.displayDate
            ? this.displayDate
            : this.utilsService
                .getDefaultDisplayDate(this.currentDateView, this.selected, this.componentConfig.allowMultiSelect, this.componentConfig.min);
        this.inputValueType = this.utilsService.getInputType(this.inputValue, this.componentConfig.allowMultiSelect);
        this._shouldShowCurrent = this.shouldShowCurrent();
    };
    /**
     * @param {?} value
     * @return {?}
     */
    MonthCalendarComponent.prototype.writeValue = function (value) {
        this.inputValue = value;
        if (value) {
            this.selected = this.utilsService
                .convertToMomentArray(value, this.componentConfig.format, this.componentConfig.allowMultiSelect);
            this.yearMonths = this.monthCalendarService
                .generateYear(this.componentConfig, this.currentDateView, this.selected);
            this.inputValueType = this.utilsService.getInputType(this.inputValue, this.componentConfig.allowMultiSelect);
        }
        this.cd.markForCheck();
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    MonthCalendarComponent.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    /**
     * @param {?} _
     * @return {?}
     */
    MonthCalendarComponent.prototype.onChangeCallback = function (_) {
    };
    
    /**
     * @param {?} fn
     * @return {?}
     */
    MonthCalendarComponent.prototype.registerOnTouched = function (fn) {
    };
    /**
     * @param {?} formControl
     * @return {?}
     */
    MonthCalendarComponent.prototype.validate = function (formControl) {
        if (this.minDate || this.maxDate) {
            return this.validateFn(formControl.value);
        }
        else {
            return function () { return null; };
        }
    };
    /**
     * @param {?} value
     * @return {?}
     */
    MonthCalendarComponent.prototype.processOnChangeCallback = function (value) {
        return this.utilsService.convertFromMomentArray(this.componentConfig.format, value, this.componentConfig.returnedValueType || this.inputValueType);
    };
    /**
     * @return {?}
     */
    MonthCalendarComponent.prototype.initValidators = function () {
        this.validateFn = this.validateFn = this.utilsService.createValidator({ minDate: this.minDate, maxDate: this.maxDate }, this.componentConfig.format, 'month');
        this.onChangeCallback(this.processOnChangeCallback(this.selected));
    };
    /**
     * @param {?} month
     * @return {?}
     */
    MonthCalendarComponent.prototype.monthClicked = function (month) {
        if (month.selected && !this.componentConfig.unSelectOnClick) {
            return;
        }
        this.selected = this.utilsService
            .updateSelected(this.componentConfig.allowMultiSelect, this.selected, month, 'month');
        this.yearMonths = this.monthCalendarService
            .generateYear(this.componentConfig, this.currentDateView, this.selected);
        this.onSelect.emit(month);
    };
    /**
     * @return {?}
     */
    MonthCalendarComponent.prototype.onLeftNavClick = function () {
        var /** @type {?} */ from = this.currentDateView.clone();
        this.currentDateView = this.currentDateView.clone().subtract(1, 'year');
        var /** @type {?} */ to = this.currentDateView.clone();
        this.yearMonths = this.monthCalendarService.generateYear(this.componentConfig, this.currentDateView, this.selected);
        this.onLeftNav.emit({ from: from, to: to });
    };
    /**
     * @return {?}
     */
    MonthCalendarComponent.prototype.onLeftSecondaryNavClick = function () {
        var /** @type {?} */ navigateBy = this.componentConfig.multipleYearsNavigateBy;
        var /** @type {?} */ isOutsideRange = this.componentConfig.min &&
            this.currentDateView.year() - this.componentConfig.min.year() < navigateBy;
        if (isOutsideRange) {
            navigateBy = this.currentDateView.year() - this.componentConfig.min.year();
        }
        var /** @type {?} */ from = this.currentDateView.clone();
        this.currentDateView = this.currentDateView.clone().subtract(navigateBy, 'year');
        var /** @type {?} */ to = this.currentDateView.clone();
        this.onLeftSecondaryNav.emit({ from: from, to: to });
    };
    /**
     * @return {?}
     */
    MonthCalendarComponent.prototype.onRightNavClick = function () {
        var /** @type {?} */ from = this.currentDateView.clone();
        this.currentDateView = this.currentDateView.clone().add(1, 'year');
        var /** @type {?} */ to = this.currentDateView.clone();
        this.onRightNav.emit({ from: from, to: to });
    };
    /**
     * @return {?}
     */
    MonthCalendarComponent.prototype.onRightSecondaryNavClick = function () {
        var /** @type {?} */ navigateBy = this.componentConfig.multipleYearsNavigateBy;
        var /** @type {?} */ isOutsideRange = this.componentConfig.max &&
            this.componentConfig.max.year() - this.currentDateView.year() < navigateBy;
        if (isOutsideRange) {
            navigateBy = this.componentConfig.max.year() - this.currentDateView.year();
        }
        var /** @type {?} */ from = this.currentDateView.clone();
        this.currentDateView = this.currentDateView.clone().add(navigateBy, 'year');
        var /** @type {?} */ to = this.currentDateView.clone();
        this.onRightSecondaryNav.emit({ from: from, to: to });
    };
    /**
     * @return {?}
     */
    MonthCalendarComponent.prototype.toggleCalendarMode = function () {
        this.onNavHeaderBtnClick.emit();
    };
    /**
     * @param {?} month
     * @return {?}
     */
    MonthCalendarComponent.prototype.getMonthBtnCssClass = function (month) {
        var /** @type {?} */ cssClass = {
            'dp-selected': month.selected,
            'dp-current-month': month.currentMonth
        };
        var /** @type {?} */ customCssClass = this.monthCalendarService.getMonthBtnCssClass(this.componentConfig, month.date);
        if (customCssClass) {
            cssClass[customCssClass] = true;
        }
        return cssClass;
    };
    /**
     * @return {?}
     */
    MonthCalendarComponent.prototype.shouldShowCurrent = function () {
        return this.utilsService.shouldShowCurrent(this.componentConfig.showGoToCurrent, 'month', this.componentConfig.min, this.componentConfig.max);
    };
    /**
     * @return {?}
     */
    MonthCalendarComponent.prototype.goToCurrent = function () {
        this.currentDateView = moment$6();
        this.onGoToCurrent.emit();
    };
    /**
     * @param {?} to
     * @return {?}
     */
    MonthCalendarComponent.prototype.moveCalendarTo = function (to) {
        if (to) {
            this.currentDateView = this.utilsService.convertToMoment(to, this.componentConfig.format);
            this.cd.markForCheck();
        }
    };
    /**
     * @param {?} config
     * @return {?}
     */
    MonthCalendarComponent.prototype.handleConfigChange = function (config) {
        if (config) {
            var /** @type {?} */ prevConf = this.monthCalendarService.getConfig(config.previousValue);
            var /** @type {?} */ currentConf = this.monthCalendarService.getConfig(config.currentValue);
            if (this.utilsService.shouldResetCurrentView(prevConf, currentConf)) {
                this._currentDateView = null;
            }
        }
    };
    return MonthCalendarComponent;
}());
MonthCalendarComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'dp-month-calendar',
                template: "\n    <div class=\"dp-month-calendar-container\">\n      <dp-calendar-nav\n          [label]=\"navLabel\"\n          [showLeftNav]=\"showLeftNav\"\n          [showLeftSecondaryNav]=\"showSecondaryLeftNav\"\n          [showRightNav]=\"showRightNav\"\n          [showRightSecondaryNav]=\"showSecondaryRightNav\"\n          [isLabelClickable]=\"componentConfig.isNavHeaderBtnClickable\"\n          [showGoToCurrent]=\"shouldShowCurrent()\"\n          [theme]=\"theme\"\n          (onLeftNav)=\"onLeftNavClick()\"\n          (onLeftSecondaryNav)=\"onLeftSecondaryNavClick()\"\n          (onRightNav)=\"onRightNavClick()\"\n          (onRightSecondaryNav)=\"onRightSecondaryNavClick()\"\n          (onLabelClick)=\"toggleCalendarMode()\"\n          (onGoToCurrent)=\"goToCurrent()\">\n      </dp-calendar-nav>\n\n      <div class=\"dp-calendar-wrapper\">\n        <div class=\"dp-months-row\" *ngFor=\"let monthRow of yearMonths\">\n          <button type=\"button\"\n                  class=\"dp-calendar-month\"\n                  *ngFor=\"let month of monthRow\"\n                  [disabled]=\"month.disabled\"\n                  [ngClass]=\"getMonthBtnCssClass(month)\"\n                  (click)=\"monthClicked(month)\"\n                  [innerText]=\"month.text\">\n          </button>\n        </div>\n      </div>\n    </div>\n  ",
                styles: ["\n    dp-month-calendar {\n      display: inline-block;\n    }\n    dp-month-calendar .dp-month-calendar-container {\n      background: #FFFFFF;\n    }\n    dp-month-calendar .dp-calendar-wrapper {\n      border: 1px solid #000000;\n    }\n    dp-month-calendar .dp-calendar-month {\n      -webkit-box-sizing: border-box;\n              box-sizing: border-box;\n      width: 52.5px;\n      height: 52.5px;\n      cursor: pointer;\n    }\n    dp-month-calendar .dp-calendar-month.dp-selected {\n      background: #106CC8;\n      color: #FFFFFF;\n    }\n    dp-month-calendar.dp-material .dp-calendar-weekday {\n      height: 25px;\n      width: 30px;\n      line-height: 25px;\n      background: #E0E0E0;\n      border: 1px solid #E0E0E0;\n    }\n    dp-month-calendar.dp-material .dp-calendar-wrapper {\n      border: 1px solid #E0E0E0;\n    }\n    dp-month-calendar.dp-material .dp-calendar-month {\n      -webkit-box-sizing: border-box;\n              box-sizing: border-box;\n      background: #FFFFFF;\n      border-radius: 50%;\n      border: none;\n      outline: none;\n    }\n    dp-month-calendar.dp-material .dp-calendar-month:hover {\n      background: #E0E0E0;\n    }\n    dp-month-calendar.dp-material .dp-selected {\n      background: #106CC8;\n      color: #FFFFFF;\n    }\n    dp-month-calendar.dp-material .dp-selected:hover {\n      background: #106CC8;\n    }\n    dp-month-calendar.dp-material .dp-current-month {\n      border: 1px solid #106CC8;\n    }\n  "],
                encapsulation: core.ViewEncapsulation.None,
                changeDetection: core.ChangeDetectionStrategy.OnPush,
                providers: [
                    MonthCalendarService,
                    {
                        provide: forms.NG_VALUE_ACCESSOR,
                        useExisting: core.forwardRef(function () { return MonthCalendarComponent; }),
                        multi: true
                    },
                    {
                        provide: forms.NG_VALIDATORS,
                        useExisting: core.forwardRef(function () { return MonthCalendarComponent; }),
                        multi: true
                    }
                ]
            },] },
];
/**
 * @nocollapse
 */
MonthCalendarComponent.ctorParameters = function () { return [
    { type: MonthCalendarService, },
    { type: UtilsService, },
    { type: core.ChangeDetectorRef, },
]; };
MonthCalendarComponent.propDecorators = {
    'config': [{ type: core.Input },],
    'displayDate': [{ type: core.Input },],
    'minDate': [{ type: core.Input },],
    'maxDate': [{ type: core.Input },],
    'theme': [{ type: core.HostBinding, args: ['class',] }, { type: core.Input },],
    'onSelect': [{ type: core.Output },],
    'onNavHeaderBtnClick': [{ type: core.Output },],
    'onGoToCurrent': [{ type: core.Output },],
    'onLeftNav': [{ type: core.Output },],
    'onRightNav': [{ type: core.Output },],
    'onLeftSecondaryNav': [{ type: core.Output },],
    'onRightSecondaryNav': [{ type: core.Output },],
};
var moment$8 = momentNs;
var TimeSelectComponent = (function () {
    /**
     * @param {?} timeSelectService
     * @param {?} utilsService
     * @param {?} cd
     */
    function TimeSelectComponent(timeSelectService, utilsService, cd) {
        this.timeSelectService = timeSelectService;
        this.utilsService = utilsService;
        this.cd = cd;
        this.onChange = new core.EventEmitter();
        this.isInited = false;
        this.api = {
            triggerChange: this.emitChange.bind(this)
        };
    }
    Object.defineProperty(TimeSelectComponent.prototype, "selected", {
        /**
         * @return {?}
         */
        get: function () {
            return this._selected;
        },
        /**
         * @param {?} selected
         * @return {?}
         */
        set: function (selected) {
            this._selected = selected;
            this.calculateTimeParts(this.selected);
            this.showDecHour = this.timeSelectService.shouldShowDecrease(this.componentConfig, this._selected, 'hour');
            this.showDecMinute = this.timeSelectService.shouldShowDecrease(this.componentConfig, this._selected, 'minute');
            this.showDecSecond = this.timeSelectService.shouldShowDecrease(this.componentConfig, this._selected, 'second');
            this.showIncHour = this.timeSelectService.shouldShowIncrease(this.componentConfig, this._selected, 'hour');
            this.showIncMinute = this.timeSelectService.shouldShowIncrease(this.componentConfig, this._selected, 'minute');
            this.showIncSecond = this.timeSelectService.shouldShowIncrease(this.componentConfig, this._selected, 'second');
            this.showToggleMeridiem = this.timeSelectService.shouldShowToggleMeridiem(this.componentConfig, this._selected);
            this.onChangeCallback(this.processOnChangeCallback(selected));
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    TimeSelectComponent.prototype.ngOnInit = function () {
        this.isInited = true;
        this.init();
        this.initValidators();
    };
    /**
     * @return {?}
     */
    TimeSelectComponent.prototype.init = function () {
        this.componentConfig = this.timeSelectService.getConfig(this.config);
        this.selected = this.selected || moment$8();
        this.inputValueType = this.utilsService.getInputType(this.inputValue, false);
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    TimeSelectComponent.prototype.ngOnChanges = function (changes) {
        if (this.isInited) {
            var minDate = changes.minDate, maxDate = changes.maxDate, minTime = changes.minTime, maxTime = changes.maxTime;
            this.init();
            if (minDate || maxDate || minTime || maxTime) {
                this.initValidators();
            }
        }
    };
    /**
     * @param {?} value
     * @return {?}
     */
    TimeSelectComponent.prototype.writeValue = function (value) {
        this.inputValue = value;
        if (value) {
            var /** @type {?} */ momentValue = this.utilsService
                .convertToMomentArray(value, this.timeSelectService.getTimeFormat(this.componentConfig), false)[0];
            if (momentValue.isValid()) {
                this.selected = momentValue;
                this.inputValueType = this.utilsService
                    .getInputType(this.inputValue, false);
            }
        }
        this.cd.markForCheck();
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    TimeSelectComponent.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    /**
     * @param {?} _
     * @return {?}
     */
    TimeSelectComponent.prototype.onChangeCallback = function (_) {
    };
    
    /**
     * @param {?} fn
     * @return {?}
     */
    TimeSelectComponent.prototype.registerOnTouched = function (fn) {
    };
    /**
     * @param {?} formControl
     * @return {?}
     */
    TimeSelectComponent.prototype.validate = function (formControl) {
        if (this.minDate || this.maxDate || this.minTime || this.maxTime) {
            return this.validateFn(formControl.value);
        }
        else {
            return function () { return null; };
        }
    };
    /**
     * @param {?} value
     * @return {?}
     */
    TimeSelectComponent.prototype.processOnChangeCallback = function (value) {
        return this.utilsService.convertFromMomentArray(this.timeSelectService.getTimeFormat(this.componentConfig), [value], this.componentConfig.returnedValueType || this.inputValueType);
    };
    /**
     * @return {?}
     */
    TimeSelectComponent.prototype.initValidators = function () {
        this.validateFn = this.utilsService.createValidator({
            minDate: this.minDate,
            maxDate: this.maxDate,
            minTime: this.minTime,
            maxTime: this.maxTime
        }, undefined, 'day');
        this.onChangeCallback(this.processOnChangeCallback(this.selected));
    };
    /**
     * @param {?} unit
     * @return {?}
     */
    TimeSelectComponent.prototype.decrease = function (unit) {
        this.selected = this.timeSelectService.decrease(this.componentConfig, this.selected, unit);
        this.emitChange();
    };
    /**
     * @param {?} unit
     * @return {?}
     */
    TimeSelectComponent.prototype.increase = function (unit) {
        this.selected = this.timeSelectService.increase(this.componentConfig, this.selected, unit);
        this.emitChange();
    };
    /**
     * @return {?}
     */
    TimeSelectComponent.prototype.toggleMeridiem = function () {
        this.selected = this.timeSelectService.toggleMeridiem(this.selected);
        this.emitChange();
    };
    /**
     * @return {?}
     */
    TimeSelectComponent.prototype.emitChange = function () {
        this.onChange.emit({ date: this.selected, selected: false });
        this.cd.markForCheck();
    };
    /**
     * @param {?} time
     * @return {?}
     */
    TimeSelectComponent.prototype.calculateTimeParts = function (time) {
        this.hours = this.timeSelectService.getHours(this.componentConfig, time);
        this.minutes = this.timeSelectService.getMinutes(this.componentConfig, time);
        this.seconds = this.timeSelectService.getSeconds(this.componentConfig, time);
        this.meridiem = this.timeSelectService.getMeridiem(this.componentConfig, time);
    };
    return TimeSelectComponent;
}());
TimeSelectComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'dp-time-select',
                template: "\n    <ul class=\"dp-time-select-controls\">\n      <li class=\"dp-time-select-control dp-time-select-control-hours\">\n        <button type=\"button\"\n                class=\"dp-time-select-control-up\"\n                [disabled]=\"!showIncHour\"\n                (click)=\"increase('hour')\">\n        </button>\n        <span class=\"dp-time-select-display-hours\"\n              [innerText]=\"hours\">\n        </span>\n        <button type=\"button\"\n                class=\"dp-time-select-control-down\"\n                [disabled]=\"!showDecHour\"\n                (click)=\"decrease('hour')\"></button>\n      </li>\n      <li class=\"dp-time-select-control dp-time-select-separator\"\n          [innerText]=\"componentConfig.timeSeparator\">\n      </li>\n      <li class=\"dp-time-select-control dp-time-select-control-minutes\">\n        <button type=\"button\"\n                class=\"dp-time-select-control-up\"\n                [disabled]=\"!showIncMinute\"\n                (click)=\"increase('minute')\"></button>\n        <span class=\"dp-time-select-display-minutes\"\n              [innerText]=\"minutes\">\n        </span>\n        <button type=\"button\"\n                [disabled]=\"!showDecMinute\" class=\"dp-time-select-control-down\"\n                (click)=\"decrease('minute')\"></button>\n      </li>\n      <ng-container *ngIf=\"componentConfig.showSeconds\">\n        <li class=\"dp-time-select-control dp-time-select-separator\"\n            [innerText]=\"componentConfig.timeSeparator\">\n        </li>\n        <li class=\"dp-time-select-control dp-time-select-control-seconds\">\n          <button type=\"button\"\n                  class=\"dp-time-select-control-up\"\n                  [disabled]=\"!showIncSecond\"\n                  (click)=\"increase('second')\"></button>\n          <span class=\"dp-time-select-display-seconds\"\n                [innerText]=\"seconds\">\n          </span>\n          <button type=\"button\"\n                  class=\"dp-time-select-control-down\"\n                  [disabled]=\"!showDecSecond\"\n                  (click)=\"decrease('second')\"></button>\n        </li>\n      </ng-container>\n      <li class=\"dp-time-select-control dp-time-select-control-meridiem\" *ngIf=\"!componentConfig.showTwentyFourHours\">\n        <button type=\"button\"\n                class=\"dp-time-select-control-up\"\n                [disabled]=\"!showToggleMeridiem\"\n                (click)=\"toggleMeridiem()\"></button>\n        <span class=\"dp-time-select-display-meridiem\"\n              [innerText]=\"meridiem\">\n        </span>\n        <button type=\"button\"\n                class=\"dp-time-select-control-down\"\n                [disabled]=\"!showToggleMeridiem\"\n                (click)=\"toggleMeridiem()\"></button>\n      </li>\n    </ul>\n  ",
                styles: ["\n    dp-time-select {\n      display: inline-block;\n    }\n    dp-time-select .dp-time-select-controls {\n      margin: 0;\n      padding: 0;\n      text-align: center;\n      line-height: normal;\n      background: #FFFFFF;\n    }\n    dp-time-select .dp-time-select-control {\n      display: inline-block;\n      width: 35px;\n      margin: 0 auto;\n      vertical-align: middle;\n      font-size: inherit;\n      letter-spacing: 1px;\n    }\n    dp-time-select .dp-time-select-control-up,\n    dp-time-select .dp-time-select-control-down {\n      position: relative;\n      display: block;\n      width: 24px;\n      height: 24px;\n      margin: 3px auto;\n      cursor: pointer;\n    }\n    dp-time-select .dp-time-select-control-up::before,\n    dp-time-select .dp-time-select-control-down::before {\n      position: relative;\n      content: '';\n      display: inline-block;\n      height: 8px;\n      width: 8px;\n      vertical-align: baseline;\n      border-style: solid;\n      border-width: 2px 2px 0 0;\n      -webkit-transform: rotate(0deg);\n              transform: rotate(0deg);\n    }\n    dp-time-select .dp-time-select-control-up::before {\n      -webkit-transform: rotate(-45deg);\n              transform: rotate(-45deg);\n      top: 4px;\n    }\n    dp-time-select .dp-time-select-control-down::before {\n      -webkit-transform: rotate(135deg);\n              transform: rotate(135deg);\n    }\n    dp-time-select .dp-time-select-separator {\n      width: 5px;\n    }\n    dp-time-select.dp-material .dp-time-select-control-up,\n    dp-time-select.dp-material .dp-time-select-control-down {\n      -webkit-box-sizing: border-box;\n              box-sizing: border-box;\n      background: transparent;\n      border: none;\n      outline: none;\n      border-radius: 50%;\n    }\n    dp-time-select.dp-material .dp-time-select-control-up::before,\n    dp-time-select.dp-material .dp-time-select-control-down::before {\n      left: 0;\n    }\n    dp-time-select.dp-material .dp-time-select-control-up:hover,\n    dp-time-select.dp-material .dp-time-select-control-down:hover {\n      background: #E0E0E0;\n    }\n  "],
                encapsulation: core.ViewEncapsulation.None,
                changeDetection: core.ChangeDetectionStrategy.OnPush,
                providers: [
                    TimeSelectService,
                    {
                        provide: forms.NG_VALUE_ACCESSOR,
                        useExisting: core.forwardRef(function () { return TimeSelectComponent; }),
                        multi: true
                    },
                    {
                        provide: forms.NG_VALIDATORS,
                        useExisting: core.forwardRef(function () { return TimeSelectComponent; }),
                        multi: true
                    }
                ]
            },] },
];
/**
 * @nocollapse
 */
TimeSelectComponent.ctorParameters = function () { return [
    { type: TimeSelectService, },
    { type: UtilsService, },
    { type: core.ChangeDetectorRef, },
]; };
TimeSelectComponent.propDecorators = {
    'config': [{ type: core.Input },],
    'displayDate': [{ type: core.Input },],
    'minDate': [{ type: core.Input },],
    'maxDate': [{ type: core.Input },],
    'minTime': [{ type: core.Input },],
    'maxTime': [{ type: core.Input },],
    'theme': [{ type: core.HostBinding, args: ['class',] }, { type: core.Input },],
    'onChange': [{ type: core.Output },],
};
var CalendarNavComponent = (function () {
    function CalendarNavComponent() {
        this.isLabelClickable = false;
        this.showLeftNav = true;
        this.showLeftSecondaryNav = false;
        this.showRightNav = true;
        this.showRightSecondaryNav = false;
        this.leftNavDisabled = false;
        this.leftSecondaryNavDisabled = false;
        this.rightNavDisabled = false;
        this.rightSecondaryNavDisabled = false;
        this.showGoToCurrent = true;
        this.onLeftNav = new core.EventEmitter();
        this.onLeftSecondaryNav = new core.EventEmitter();
        this.onRightNav = new core.EventEmitter();
        this.onRightSecondaryNav = new core.EventEmitter();
        this.onLabelClick = new core.EventEmitter();
        this.onGoToCurrent = new core.EventEmitter();
    }
    /**
     * @return {?}
     */
    CalendarNavComponent.prototype.leftNavClicked = function () {
        this.onLeftNav.emit();
    };
    /**
     * @return {?}
     */
    CalendarNavComponent.prototype.leftSecondaryNavClicked = function () {
        this.onLeftSecondaryNav.emit();
    };
    /**
     * @return {?}
     */
    CalendarNavComponent.prototype.rightNavClicked = function () {
        this.onRightNav.emit();
    };
    /**
     * @return {?}
     */
    CalendarNavComponent.prototype.rightSecondaryNavClicked = function () {
        this.onRightSecondaryNav.emit();
    };
    /**
     * @return {?}
     */
    CalendarNavComponent.prototype.labelClicked = function () {
        this.onLabelClick.emit();
    };
    return CalendarNavComponent;
}());
CalendarNavComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'dp-calendar-nav',
                template: "\n    <div class=\"dp-calendar-nav-container\">\n      <div class=\"dp-nav-header\">\n        <span [hidden]=\"isLabelClickable\"\n              [attr.data-hidden]=\"isLabelClickable\"\n              [innerText]=\"label\">\n        </span>\n        <button type=\"button\"\n                class=\"dp-nav-header-btn\"\n                [hidden]=\"!isLabelClickable\"\n                [attr.data-hidden]=\"!isLabelClickable\"\n                (click)=\"labelClicked()\"\n                [innerText]=\"label\">\n        </button>\n      </div>\n\n      <div class=\"dp-nav-btns-container\">\n        <div class=\"dp-calendar-nav-container-left\">\n          <button type=\"button\"\n                  class=\"dp-calendar-secondary-nav-left\"\n                  *ngIf=\"showLeftSecondaryNav\"\n                  [disabled]=\"leftSecondaryNavDisabled\"\n                  (click)=\"leftSecondaryNavClicked()\">\n          </button>\n          <button type=\"button\"\n                  class=\"dp-calendar-nav-left\"\n                  [hidden]=\"!showLeftNav\"\n                  [attr.data-hidden]=\"!showLeftNav\"\n                  [disabled]=\"leftNavDisabled\"\n                  (click)=\"leftNavClicked()\">\n          </button>\n        </div>\n        <button type=\"button\"\n                class=\"dp-current-location-btn\"\n                *ngIf=\"showGoToCurrent\"\n                (click)=\"onGoToCurrent.emit()\">\n        </button>\n        <div class=\"dp-calendar-nav-container-right\">\n          <button type=\"button\"\n                  class=\"dp-calendar-nav-right\"\n                  [hidden]=\"!showRightNav\"\n                  [attr.data-hidden]=\"!showRightNav\"\n                  [disabled]=\"rightNavDisabled\"\n                  (click)=\"rightNavClicked()\">\n          </button>\n          <button type=\"button\"\n                  class=\"dp-calendar-secondary-nav-right\"\n                  *ngIf=\"showRightSecondaryNav\"\n                  [disabled]=\"rightSecondaryNavDisabled\"\n                  (click)=\"rightSecondaryNavClicked()\">\n          </button>\n        </div>\n      </div>\n    </div>\n  ",
                styles: ["\n    dp-calendar-nav .dp-calendar-nav-container {\n      position: relative;\n      -webkit-box-sizing: border-box;\n              box-sizing: border-box;\n      height: 25px;\n      border: 1px solid #000000;\n      border-bottom: none;\n    }\n    dp-calendar-nav .dp-nav-date-btn {\n      -webkit-box-sizing: border-box;\n              box-sizing: border-box;\n      height: 25px;\n      border: 1px solid #000000;\n      border-bottom: none;\n    }\n    dp-calendar-nav .dp-nav-btns-container {\n      position: absolute;\n      top: 50%;\n      -webkit-transform: translateY(-50%);\n              transform: translateY(-50%);\n      right: 5px;\n      display: inline-block;\n    }\n    dp-calendar-nav .dp-calendar-nav-container-left,\n    dp-calendar-nav .dp-calendar-nav-container-right {\n      display: inline-block;\n    }\n    dp-calendar-nav .dp-calendar-nav-left,\n    dp-calendar-nav .dp-calendar-nav-right,\n    dp-calendar-nav .dp-calendar-secondary-nav-left,\n    dp-calendar-nav .dp-calendar-secondary-nav-right {\n      position: relative;\n      width: 16px;\n      cursor: pointer;\n    }\n    dp-calendar-nav .dp-calendar-nav-left,\n    dp-calendar-nav .dp-calendar-nav-right {\n      line-height: 0;\n    }\n    dp-calendar-nav .dp-calendar-nav-left::before,\n    dp-calendar-nav .dp-calendar-nav-right::before {\n      position: relative;\n      content: '';\n      display: inline-block;\n      height: 8px;\n      width: 8px;\n      vertical-align: baseline;\n      border-style: solid;\n      border-width: 2px 2px 0 0;\n      -webkit-transform: rotate(45deg);\n              transform: rotate(45deg);\n    }\n    dp-calendar-nav .dp-calendar-secondary-nav-left,\n    dp-calendar-nav .dp-calendar-secondary-nav-right {\n      padding: 0;\n    }\n    dp-calendar-nav .dp-calendar-secondary-nav-left::before,\n    dp-calendar-nav .dp-calendar-secondary-nav-right::before,\n    dp-calendar-nav .dp-calendar-secondary-nav-left::after,\n    dp-calendar-nav .dp-calendar-secondary-nav-right::after {\n      position: relative;\n      content: '';\n      display: inline-block;\n      height: 8px;\n      width: 8px;\n      vertical-align: baseline;\n      border-style: solid;\n      border-width: 2px 2px 0 0;\n      -webkit-transform: rotate(45deg);\n              transform: rotate(45deg);\n    }\n    dp-calendar-nav .dp-calendar-secondary-nav-left::before,\n    dp-calendar-nav .dp-calendar-secondary-nav-right::before {\n      right: -10px;\n    }\n    dp-calendar-nav .dp-calendar-secondary-nav-right {\n      left: initial;\n      right: 5px;\n    }\n    dp-calendar-nav .dp-calendar-nav-left::before {\n      position: relative;\n      content: '';\n      display: inline-block;\n      height: 8px;\n      width: 8px;\n      vertical-align: baseline;\n      border-style: solid;\n      border-width: 2px 2px 0 0;\n      -webkit-transform: rotate(-135deg);\n              transform: rotate(-135deg);\n    }\n    dp-calendar-nav .dp-calendar-secondary-nav-left::before,\n    dp-calendar-nav .dp-calendar-secondary-nav-left::after {\n      position: relative;\n      content: '';\n      display: inline-block;\n      height: 8px;\n      width: 8px;\n      vertical-align: baseline;\n      border-style: solid;\n      border-width: 2px 2px 0 0;\n      -webkit-transform: rotate(-135deg);\n              transform: rotate(-135deg);\n    }\n    dp-calendar-nav .dp-calendar-secondary-nav-left::before {\n      right: -10px;\n    }\n    dp-calendar-nav .dp-nav-header {\n      position: absolute;\n      top: 50%;\n      -webkit-transform: translateY(-50%);\n              transform: translateY(-50%);\n      left: 5px;\n      display: inline-block;\n      font-size: 13px;\n    }\n    dp-calendar-nav .dp-nav-header-btn {\n      cursor: pointer;\n    }\n    dp-calendar-nav .dp-current-location-btn {\n      position: relative;\n      top: -1px;\n      height: 16px;\n      width: 16px;\n      vertical-align: middle;\n      background: rgba(0, 0, 0, 0.6);\n      border: 1px solid rgba(0, 0, 0, 0.6);\n      outline: none;\n      border-radius: 50%;\n      -webkit-box-shadow: inset 0 0 0 3px #FFFFFF;\n              box-shadow: inset 0 0 0 3px #FFFFFF;\n      cursor: pointer;\n    }\n    dp-calendar-nav .dp-current-location-btn:hover {\n      background: #000000;\n    }\n    dp-calendar-nav.dp-material .dp-calendar-nav-container {\n      height: 30px;\n      border: 1px solid #E0E0E0;\n    }\n    dp-calendar-nav.dp-material .dp-calendar-nav-left,\n    dp-calendar-nav.dp-material .dp-calendar-nav-right,\n    dp-calendar-nav.dp-material .dp-calendar-secondary-nav-left,\n    dp-calendar-nav.dp-material .dp-calendar-secondary-nav-right {\n      border: none;\n      background: #FFFFFF;\n      outline: none;\n      font-size: 16px;\n      padding: 0;\n    }\n    dp-calendar-nav.dp-material .dp-calendar-secondary-nav-left,\n    dp-calendar-nav.dp-material .dp-calendar-secondary-nav-right {\n      width: 20px;\n    }\n    dp-calendar-nav.dp-material .dp-nav-header-btn {\n      height: 20px;\n      width: 80px;\n      border: none;\n      background: #FFFFFF;\n      outline: none;\n    }\n    dp-calendar-nav.dp-material .dp-nav-header-btn:hover {\n      background: rgba(0, 0, 0, 0.05);\n    }\n    dp-calendar-nav.dp-material .dp-nav-header-btn:active {\n      background: rgba(0, 0, 0, 0.1);\n    }\n  "],
                encapsulation: core.ViewEncapsulation.None,
                changeDetection: core.ChangeDetectionStrategy.OnPush
            },] },
];
/**
 * @nocollapse
 */
CalendarNavComponent.ctorParameters = function () { return []; };
CalendarNavComponent.propDecorators = {
    'label': [{ type: core.Input },],
    'isLabelClickable': [{ type: core.Input },],
    'showLeftNav': [{ type: core.Input },],
    'showLeftSecondaryNav': [{ type: core.Input },],
    'showRightNav': [{ type: core.Input },],
    'showRightSecondaryNav': [{ type: core.Input },],
    'leftNavDisabled': [{ type: core.Input },],
    'leftSecondaryNavDisabled': [{ type: core.Input },],
    'rightNavDisabled': [{ type: core.Input },],
    'rightSecondaryNavDisabled': [{ type: core.Input },],
    'showGoToCurrent': [{ type: core.Input },],
    'theme': [{ type: core.HostBinding, args: ['class',] }, { type: core.Input },],
    'onLeftNav': [{ type: core.Output },],
    'onLeftSecondaryNav': [{ type: core.Output },],
    'onRightNav': [{ type: core.Output },],
    'onRightSecondaryNav': [{ type: core.Output },],
    'onLabelClick': [{ type: core.Output },],
    'onGoToCurrent': [{ type: core.Output },],
};
var DayTimeCalendarComponent = (function () {
    /**
     * @param {?} dayTimeCalendarService
     * @param {?} utilsService
     * @param {?} cd
     */
    function DayTimeCalendarComponent(dayTimeCalendarService, utilsService, cd) {
        this.dayTimeCalendarService = dayTimeCalendarService;
        this.utilsService = utilsService;
        this.cd = cd;
        this.onChange = new core.EventEmitter();
        this.onGoToCurrent = new core.EventEmitter();
        this.onLeftNav = new core.EventEmitter();
        this.onRightNav = new core.EventEmitter();
        this.isInited = false;
        this.api = {
            moveCalendarTo: this.moveCalendarTo.bind(this)
        };
    }
    Object.defineProperty(DayTimeCalendarComponent.prototype, "selected", {
        /**
         * @return {?}
         */
        get: function () {
            return this._selected;
        },
        /**
         * @param {?} selected
         * @return {?}
         */
        set: function (selected) {
            this._selected = selected;
            this.onChangeCallback(this.processOnChangeCallback(selected));
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DayTimeCalendarComponent.prototype.ngOnInit = function () {
        this.isInited = true;
        this.init();
        this.initValidators();
    };
    /**
     * @return {?}
     */
    DayTimeCalendarComponent.prototype.init = function () {
        this.componentConfig = this.dayTimeCalendarService.getConfig(this.config);
        this.inputValueType = this.utilsService.getInputType(this.inputValue, false);
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    DayTimeCalendarComponent.prototype.ngOnChanges = function (changes) {
        if (this.isInited) {
            var minDate = changes.minDate, maxDate = changes.maxDate;
            this.init();
            if (minDate || maxDate) {
                this.initValidators();
            }
        }
    };
    /**
     * @param {?} value
     * @return {?}
     */
    DayTimeCalendarComponent.prototype.writeValue = function (value) {
        this.inputValue = value;
        if (value) {
            this.selected = this.utilsService
                .convertToMomentArray(value, this.componentConfig.format, false)[0];
            this.inputValueType = this.utilsService
                .getInputType(this.inputValue, false);
        }
        else {
            this.selected = null;
        }
        this.cd.markForCheck();
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    DayTimeCalendarComponent.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    /**
     * @param {?} _
     * @return {?}
     */
    DayTimeCalendarComponent.prototype.onChangeCallback = function (_) {
    };
    
    /**
     * @param {?} fn
     * @return {?}
     */
    DayTimeCalendarComponent.prototype.registerOnTouched = function (fn) {
    };
    /**
     * @param {?} formControl
     * @return {?}
     */
    DayTimeCalendarComponent.prototype.validate = function (formControl) {
        if (this.minDate || this.maxDate) {
            return this.validateFn(formControl.value);
        }
        else {
            return function () { return null; };
        }
    };
    /**
     * @param {?} value
     * @return {?}
     */
    DayTimeCalendarComponent.prototype.processOnChangeCallback = function (value) {
        return this.utilsService.convertFromMomentArray(this.componentConfig.format, [value], this.componentConfig.returnedValueType || this.inputValueType);
    };
    /**
     * @return {?}
     */
    DayTimeCalendarComponent.prototype.initValidators = function () {
        this.validateFn = this.utilsService.createValidator({
            minDate: this.minDate,
            maxDate: this.maxDate
        }, undefined, 'daytime');
        this.onChangeCallback(this.processOnChangeCallback(this.selected));
    };
    /**
     * @param {?} day
     * @return {?}
     */
    DayTimeCalendarComponent.prototype.dateSelected = function (day) {
        this.selected = this.dayTimeCalendarService.updateDay(this.selected, day.date, this.config);
        this.emitChange();
    };
    /**
     * @param {?} time
     * @return {?}
     */
    DayTimeCalendarComponent.prototype.timeChange = function (time) {
        this.selected = this.dayTimeCalendarService.updateTime(this.selected, time.date);
        this.emitChange();
    };
    /**
     * @return {?}
     */
    DayTimeCalendarComponent.prototype.emitChange = function () {
        this.onChange.emit({ date: this.selected, selected: false });
    };
    /**
     * @param {?} to
     * @return {?}
     */
    DayTimeCalendarComponent.prototype.moveCalendarTo = function (to) {
        if (to) {
            this.dayCalendarRef.moveCalendarTo(to);
        }
    };
    /**
     * @param {?} change
     * @return {?}
     */
    DayTimeCalendarComponent.prototype.onLeftNavClick = function (change) {
        this.onLeftNav.emit(change);
    };
    /**
     * @param {?} change
     * @return {?}
     */
    DayTimeCalendarComponent.prototype.onRightNavClick = function (change) {
        this.onRightNav.emit(change);
    };
    return DayTimeCalendarComponent;
}());
DayTimeCalendarComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'dp-day-time-calendar',
                template: "\n    <dp-day-calendar #dayCalendar\n                     [config]=\"componentConfig\"\n                     [ngModel]=\"_selected\"\n                     [theme]=\"theme\"\n                     [displayDate]=\"displayDate\"\n                     (onSelect)=\"dateSelected($event)\"\n                     (onGoToCurrent)=\"onGoToCurrent.emit()\"\n                     (onLeftNav)=\"onLeftNavClick($event)\"\n                     (onRightNav)=\"onRightNavClick($event)\">\n    </dp-day-calendar>\n    <dp-time-select #timeSelect\n                    [config]=\"componentConfig\"\n                    [ngModel]=\"_selected\"\n                    (onChange)=\"timeChange($event)\"\n                    [theme]=\"theme\">\n    </dp-time-select>\n  ",
                styles: ["\n    dp-day-time-calendar {\n      display: inline-block;\n    }\n    dp-day-time-calendar dp-time-select {\n      display: block;\n      border: 1px solid #000000;\n      border-top: 0;\n    }\n    dp-day-time-calendar.dp-material dp-time-select {\n      border: 1px solid #E0E0E0;\n      border-top: 0;\n    }\n  "],
                changeDetection: core.ChangeDetectionStrategy.OnPush,
                encapsulation: core.ViewEncapsulation.None,
                providers: [
                    DayTimeCalendarService,
                    DayCalendarService,
                    TimeSelectService,
                    {
                        provide: forms.NG_VALUE_ACCESSOR,
                        useExisting: core.forwardRef(function () { return DayTimeCalendarComponent; }),
                        multi: true
                    },
                    {
                        provide: forms.NG_VALIDATORS,
                        useExisting: core.forwardRef(function () { return DayTimeCalendarComponent; }),
                        multi: true
                    }
                ]
            },] },
];
/**
 * @nocollapse
 */
DayTimeCalendarComponent.ctorParameters = function () { return [
    { type: DayTimeCalendarService, },
    { type: UtilsService, },
    { type: core.ChangeDetectorRef, },
]; };
DayTimeCalendarComponent.propDecorators = {
    'config': [{ type: core.Input },],
    'displayDate': [{ type: core.Input },],
    'minDate': [{ type: core.Input },],
    'maxDate': [{ type: core.Input },],
    'theme': [{ type: core.HostBinding, args: ['class',] }, { type: core.Input },],
    'onChange': [{ type: core.Output },],
    'onGoToCurrent': [{ type: core.Output },],
    'onLeftNav': [{ type: core.Output },],
    'onRightNav': [{ type: core.Output },],
    'dayCalendarRef': [{ type: core.ViewChild, args: ['dayCalendar',] },],
};
var DpDatePickerModule = (function () {
    function DpDatePickerModule() {
    }
    return DpDatePickerModule;
}());
DpDatePickerModule.decorators = [
    { type: core.NgModule, args: [{
                providers: [
                    DomHelper,
                    UtilsService
                ],
                declarations: [
                    DatePickerComponent,
                    DatePickerDirective,
                    DayCalendarComponent,
                    MonthCalendarComponent,
                    CalendarNavComponent,
                    TimeSelectComponent,
                    DayTimeCalendarComponent
                ],
                entryComponents: [
                    DatePickerComponent
                ],
                imports: [
                    common.CommonModule,
                    forms.FormsModule
                ],
                exports: [
                    DatePickerComponent,
                    DatePickerDirective,
                    MonthCalendarComponent,
                    DayCalendarComponent,
                    TimeSelectComponent,
                    DayTimeCalendarComponent
                ]
            },] },
];
/**
 * @nocollapse
 */
DpDatePickerModule.ctorParameters = function () { return []; };

exports.ECalendarMode = ECalendarMode;
exports.ECalendarValue = ECalendarValue;
exports.DatePickerComponent = DatePickerComponent;
exports.DatePickerDirective = DatePickerDirective;
exports.DayCalendarComponent = DayCalendarComponent;
exports.DayTimeCalendarComponent = DayTimeCalendarComponent;
exports.TimeSelectComponent = TimeSelectComponent;
exports.MonthCalendarComponent = MonthCalendarComponent;
exports.DpDatePickerModule = DpDatePickerModule;
exports.ɵi = CalendarNavComponent;
exports.ɵa = DomHelper;
exports.ɵb = UtilsService;
exports.ɵg = DatePickerDirectiveService;
exports.ɵc = DatePickerService;
exports.ɵf = DayCalendarService;
exports.ɵe = DayTimeCalendarService;
exports.ɵh = MonthCalendarService;
exports.ɵd = TimeSelectService;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ng2-date-picker.umd.js.map
