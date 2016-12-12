'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Select = require('./Select');

var _Select2 = _interopRequireDefault(_Select);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var formatOption = function () {
  function formatOption(option, disabledOptions, displayFunc) {
    var disabled = false;
    if (disabledOptions && disabledOptions.indexOf(option) >= 0) {
      disabled = true;
    }

    return {
      value: option,
      disabled: disabled,
      display: displayFunc(option)
    };
  }

  return formatOption;
}();

var militaryToStandard = function () {
  function militaryToStandard(hour) {
    var number = hour % 12 ? hour % 12 : 12;
    var suffix = hour < 12 ? 'am' : 'pm';
    return number + ' ' + suffix;
  }

  return militaryToStandard;
}();

var militaryHourDisplay = function () {
  function militaryHourDisplay(value) {
    value < 10 ? '0' + value : '' + value;
  }

  return militaryHourDisplay;
}();

var identity = function () {
  function identity(value) {
    return value;
  }

  return identity;
}();

var Combobox = _react2['default'].createClass({
  displayName: 'Combobox',

  propTypes: {
    format: _react.PropTypes.string,
    defaultOpenValue: _react.PropTypes.object,
    prefixCls: _react.PropTypes.string,
    value: _react.PropTypes.object,
    onChange: _react.PropTypes.func,
    showHour: _react.PropTypes.bool,
    showMinute: _react.PropTypes.bool,
    showSecond: _react.PropTypes.bool,
    hourOptions: _react.PropTypes.array,
    minuteOptions: _react.PropTypes.array,
    secondOptions: _react.PropTypes.array,
    disabledHours: _react.PropTypes.func,
    disabledMinutes: _react.PropTypes.func,
    disabledSeconds: _react.PropTypes.func,
    onCurrentSelectPanelChange: _react.PropTypes.func,
    military: _react.PropTypes.bool,
    hoursDisplayFunc: _react.PropTypes.func,
    minutesDisplayFunc: _react.PropTypes.func,
    secondsDisplayFunc: _react.PropTypes.func
  },

  onItemChange: function () {
    function onItemChange(type, itemValue) {
      var _props = this.props,
          onChange = _props.onChange,
          defaultOpenValue = _props.defaultOpenValue;

      var value = (this.props.value || defaultOpenValue).clone();
      if (type === 'hour') {
        value.hour(itemValue);
      } else if (type === 'minute') {
        value.minute(itemValue);
      } else {
        value.second(itemValue);
      }
      onChange(value);
    }

    return onItemChange;
  }(),
  onEnterSelectPanel: function () {
    function onEnterSelectPanel(range) {
      this.props.onCurrentSelectPanelChange(range);
    }

    return onEnterSelectPanel;
  }(),
  getHourSelect: function () {
    function getHourSelect(hour) {
      var _props2 = this.props,
          prefixCls = _props2.prefixCls,
          hourOptions = _props2.hourOptions,
          disabledHours = _props2.disabledHours,
          showHour = _props2.showHour,
          military = _props2.military,
          hoursDisplayFunc = _props2.hoursDisplayFunc;

      if (!showHour) {
        return null;
      }
      var disabledOptions = disabledHours();
      var displayFunc = hoursDisplayFunc || (!military ? militaryToStandard : identity);

      return _react2['default'].createElement(_Select2['default'], {
        prefixCls: prefixCls,
        options: hourOptions.map(function (option) {
          return formatOption(option, disabledOptions, displayFunc);
        }),
        selectedIndex: hourOptions.indexOf(hour),
        type: 'hour',
        onSelect: this.onItemChange,
        onMouseEnter: this.onEnterSelectPanel.bind(this, 'hour')
      });
    }

    return getHourSelect;
  }(),
  getMinuteSelect: function () {
    function getMinuteSelect(minute) {
      var _props3 = this.props,
          prefixCls = _props3.prefixCls,
          minuteOptions = _props3.minuteOptions,
          disabledMinutes = _props3.disabledMinutes,
          defaultOpenValue = _props3.defaultOpenValue,
          showMinute = _props3.showMinute,
          minutesDisplayFunc = _props3.minutesDisplayFunc;

      if (!showMinute) {
        return null;
      }
      var value = this.props.value || defaultOpenValue;
      var disabledOptions = disabledMinutes(value.hour());
      var displayFunc = minutesDisplayFunc || identity;

      return _react2['default'].createElement(_Select2['default'], {
        prefixCls: prefixCls,
        options: minuteOptions.map(function (option) {
          return formatOption(option, disabledOptions, displayFunc);
        }),
        selectedIndex: minuteOptions.indexOf(minute),
        type: 'minute',
        onSelect: this.onItemChange,
        onMouseEnter: this.onEnterSelectPanel.bind(this, 'minute')
      });
    }

    return getMinuteSelect;
  }(),
  getSecondSelect: function () {
    function getSecondSelect(second) {
      var _props4 = this.props,
          prefixCls = _props4.prefixCls,
          secondOptions = _props4.secondOptions,
          disabledSeconds = _props4.disabledSeconds,
          showSecond = _props4.showSecond,
          defaultOpenValue = _props4.defaultOpenValue,
          secondsDisplayFunc = _props4.secondsDisplayFunc;

      if (!showSecond) {
        return null;
      }
      var value = this.props.value || defaultOpenValue;
      var disabledOptions = disabledSeconds(value.hour(), value.minute());
      var displayFunc = secondsDisplayFunc || identity;

      return _react2['default'].createElement(_Select2['default'], {
        prefixCls: prefixCls,
        options: secondOptions.map(function (option) {
          return formatOption(option, disabledOptions, displayFunc);
        }),
        selectedIndex: secondOptions.indexOf(second),
        type: 'second',
        onSelect: this.onItemChange,
        onMouseEnter: this.onEnterSelectPanel.bind(this, 'second')
      });
    }

    return getSecondSelect;
  }(),
  render: function () {
    function render() {
      var _props5 = this.props,
          prefixCls = _props5.prefixCls,
          defaultOpenValue = _props5.defaultOpenValue;

      var value = this.props.value || defaultOpenValue;
      return _react2['default'].createElement(
        'div',
        { className: prefixCls + '-combobox' },
        this.getHourSelect(value.hour()),
        this.getMinuteSelect(value.minute()),
        this.getSecondSelect(value.second())
      );
    }

    return render;
  }()
});

exports['default'] = Combobox;