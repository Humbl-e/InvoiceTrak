// import {formatDistanceStrict, addSeconds} from 'date-fns';
// import {Platform} from 'react-native';
// import Moment from 'moment/min/moment-with-locales';
// import * as RNLocalize from 'react-native-localize';
// import 'moment/min/locales';
// import {minimalTimezoneSet} from 'compact-timezone-list';
// import BuildConfig from 'react-native-build-config';
// import I18n from '../i18n/i18n';
// import Base64 from './Base64';

// import {
//   PRESSURE,
//   MOTION,
//   SWITCH,
//   POWER,
//   HUMIDITY,
//   TEMPERATURE,
// } from '../config/Services';

// const ScreenSize = {
//   SMALL: 1,
//   MEDIUM: 2,
//   LARGE: 3,
//   XLARGE: 4,
// };

// export default {
//   calculateAge(dob) {
//     // birthday is a date
//     const ageDifMs =
//       Date.now() -
//       new Date(
//         dob.split('-')[0],
//         dob.split('-')[1],
//         dob.split('-')[2],
//       ).getTime();
//     const ageDate = new Date(ageDifMs); // miliseconds from epoch
//     return Math.abs(ageDate.getUTCFullYear() - 1970);
//   },
//   validateEmail(email) {
//     const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     return re.test(email);
//   },
//   validatePassword(password) {
//     const reg = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
//     return reg.test(password);
//   },
//   validatePhoneNumber(number) {
//     const regex = /^\d+$/;
//     return regex.test(number);
//   },
//   validateName(name, isDevice = false) {
//     let regex;
//     if (isDevice) {
//       regex = /^(?=.*[a-zA-z])([a-zA-z0-9._()\-]+\s)*[a-zA-z0-9_()\-]+$/;
//     } else {
//       regex = /^(?=.*[a-zA-z])([a-zA-z-0-9.]+\s)*[a-zA-z-0-9]+$/;
//     }
//     return regex.test(name);
//   },
//   getIdFromToken(idToken) {
//     const subId = idToken.sub.split('|')[1];
//     if (subId.indexOf('-') > -1) {
//       return subId.split('-')[1];
//     }
//     return subId;
//   },
//   convertNumber(number) {
//     if (number < 10) {
//       return `0${number}`;
//     }
//     return number;
//   },
//   getServicesFromDevices(devices) {
//     const services = devices.reduce((acc, device) => {
//       const servicesPerDevice = device.services;
//       delete device.services;
//       for (const s in servicesPerDevice) {
//         if (acc[servicesPerDevice[s].id]) {
//           acc[servicesPerDevice[s].id].devices.push(device);
//         } else {
//           const service = servicesPerDevice[s];
//           service.devices = [device];
//           acc[servicesPerDevice[s].id] = service;
//         }
//       }
//       return acc;
//     }, {});
//     return services;
//   },
//   convertMotionData(data) {
//     return data.map((item) => ({
//       value: item.state === 'motion' ? 0 : 1,
//       ts: item.ts,
//     }));
//   },
//   convertSwitchData(data) {
//     return data.map((item) => ({value: item.active ? 1 : 0, ts: item.ts}));
//   },
//   containsTextInDeviceClass(deviceClass, text) {
//     if (deviceClass.name.toLowerCase().includes(text)) {
//       return true;
//     }
//     return false;
//   },
//   convertMinsToHrsMins(minutes) {
//     let h = Math.floor(minutes / 60);
//     let m = minutes % 60;
//     h = h < 10 ? `0${h}` : h;
//     m = m < 10 ? `0${m}` : m;
//     return `${h}:${m}`;
//   },
//   convertSecsToHrsMins(seconds, is24Hours) {
//     // let minutes = this.UTCToSeconds(seconds, new Date()) / 60
//     const minutes = seconds / 60;
//     let h = Math.floor(minutes / 60);
//     let m = minutes % 60;
//     const is12hour = h < 12 ? 'am' : 'pm';

//     if (is24Hours) {
//       h = h;
//       m = m < 10 ? `0${Math.floor(m)}` : Math.floor(m);
//     } else {
//       h = h < 12 ? h : h - 12;
//       m = m < 10 ? `0${Math.floor(m)}` : Math.floor(m);
//     }
//     return is24Hours ? `${h}:${m}` : `${h}:${m}${is12hour}`;
//   },
//   convertToCountMinutes(minutes) {
//     const h = Math.floor(minutes / 60);
//     const m = minutes % 60;
//     return h > 0
//       ? `${h + I18n.t('hours')} ${m}${I18n.t('minutes')}`
//       : m + I18n.t('minutes');
//   },
//   getDateStart(data, offset = 0) {
//     let now = new Date();
//     if (data.length > 0) {
//       now = new Date(data[0].ts * 1000);
//     }
//     now.setHours(offset, 0, 0, 0);
//     return now;
//   },
//   getDateEnd(data, offset = 23) {
//     let now = new Date();
//     if (data.length > 0) {
//       now = new Date(data[0].ts * 1000);
//     }
//     now.setHours(offset, 59, 59, 999);
//     return now;
//   },
//   convertBoolData(data) {
//     const newData = [];
//     if (data.length > 0 && data[0].value === 0) {
//       newData.push({
//         value: 1,
//         ts: this.getDateStart(data).getTime() / 1000,
//       });
//     }
//     for (const d in data) {
//       if (data[d].value === 1 || d === 0) {
//         newData.push(data[d]);
//       } else {
//         newData.push({value: 1, ts: data[d].ts});
//         newData.push(data[d]);
//       }
//     }
//     return newData;
//   },
//   getScreenSize(pageWidth) {
//     if (pageWidth > 960) {
//       return ScreenSize.XLARGE;
//     }
//     if (pageWidth > 640) {
//       return ScreenSize.LARGE;
//     }
//     if (pageWidth > 420) {
//       return ScreenSize.MEDIUM;
//     }
//     return ScreenSize.SMALL;
//   },
//   getColumnNumberForPageWith(pageWidth) {
//     const screenSize = this.getScreenSize(pageWidth);
//     switch (screenSize) {
//       case ScreenSize.SMALL:
//         return 3;
//       case ScreenSize.MEDIUM:
//         return 4;
//       case ScreenSize.LARGE:
//         return 5;
//       case ScreenSize.XLARGE:
//         return 6;
//       default:
//         return 3;
//     }
//   },
//   isBooleanService(type) {
//     return (
//       type === PRESSURE || type === MOTION || type === SWITCH || type === POWER
//     );
//   },
//   alertsEnabled(type) {
//     return (
//       type === PRESSURE ||
//       type === MOTION ||
//       type === SWITCH ||
//       type === POWER ||
//       type === HUMIDITY ||
//       type === TEMPERATURE
//     );
//   },
//   getSuffixForState(type, value) {
//     switch (type) {
//       case POWER:
//         return value ? I18n.t('on') : I18n.t('off');
//       case SWITCH:
//         return value ? I18n.t('open') : I18n.t('closed');
//       case MOTION:
//         return value ? I18n.t('detected') : I18n.t('notDetected');
//       case HUMIDITY:
//         return value ? `${value}%` : '-:-%';
//       case TEMPERATURE:
//         return value ? `${Number.parseFloat(value).toFixed(1)}°` : '-:-°';
//       default:
//         return '';
//     }
//   },
//   getServiceStatusTextForValue(type, value, timestamp) {
//     switch (type) {
//       case SWITCH:
//         return value === 1
//           ? I18n.t('open').toUpperCase()
//           : value === 0
//           ? I18n.t('closed').toUpperCase()
//           : I18n.t('na');
//       case MOTION:
//         return value === 0 || value === 1 ? I18n.t('motion') : I18n.t('na');
//       case HUMIDITY:
//         return value ? `${value}%` : '-:-%';
//       case TEMPERATURE:
//         return value ? `${Number.parseFloat(value).toFixed(1)}°` : '-:-°';
//       case POWER:
//         return value === 1
//           ? I18n.t('on').toUpperCase()
//           : value === 0
//           ? I18n.t('off').toUpperCase()
//           : I18n.t('na');
//       default:
//         return I18n.t('na');
//     }
//   },
//   getTimeStamp(type, is24Hours, timestamp) {
//     if (!timestamp) {
//       return I18n.t('na');
//     }
//     switch (type) {
//       case SWITCH:
//       case MOTION:
//       case HUMIDITY:
//       case TEMPERATURE:
//       case POWER:
//         const locale = RNLocalize.getLocales()[0].languageTag;
//         return Moment.unix(timestamp)
//           .locale(
//             locale.indexOf('-') === -1
//               ? locale
//               : locale.substr(0, locale.indexOf('-')),
//           )
//           .calendar(null, {
//             sameDay: is24Hours ? '[Today at] H:mm' : '[Today at] h:mma',
//             lastDay: is24Hours ? '[Yesterday at] H:mm' : '[Yesterday at] h:mma',
//             lastWeek: is24Hours
//               ? '[Last] ddd [at] H:mm'
//               : '[Last] ddd [at] h:mma',
//           });
//       default:
//         return I18n.t('na');
//     }
//   },
//   convertAlertsToTimeline(alerts) {
//     return alerts.map((alert) => {
//       const newAlert = alert;
//       newAlert.time = `${formatDistanceStrict(
//         new Date(alert.ts * 1000),
//         new Date(),
//       )} ago`;
//       return newAlert;
//     });
//   },
//   convertDateToMinutes(date) {
//     let minutes = date.getHours() * 60;
//     minutes += date.getMinutes();
//     return minutes;
//   },
//   convertSecondsToDate(minutes) {
//     let date = new Date();
//     date.setHours(0, 0, 0, 0);
//     date = addSeconds(date, minutes * 60);
//     return date;
//   },
//   getInitialAlertValue(type) {
//     switch (type) {
//       case TEMPERATURE:
//         return 18;
//       case HUMIDITY:
//         return 80;
//       default:
//         return 1;
//     }
//   },
//   convertDecimalToBinaryString(decimal) {
//     const binary = decimal.toString(2).split('').reverse();
//     if (binary.length < 3) {
//       do {
//         binary.push('0');
//       } while (binary.length < 3);
//     }
//     return binary.join('');
//   },
//   toggleStringBinary(binary, index) {
//     const binaryArray = binary.split('');
//     const newValue = binaryArray[index] === '1' ? '0' : '1';
//     binaryArray.splice(index, 1, newValue);
//     return binaryArray.join('');
//   },
//   getNotifyType(binaryString) {
//     let types = '';
//     if (binaryString.charAt(0) === '1') {
//       types += I18n.t('email');
//     }
//     if (binaryString.charAt(1) === '1') {
//       types += (types.length > 0 ? ', ' : '') + I18n.t('sms');
//     }
//     if (binaryString.charAt(2) === '1') {
//       types += (types.length > 0 ? ', ' : '') + I18n.t('push');
//     }
//     return types;
//   },
//   isAndroid() {
//     return Platform.OS === 'android';
//   },
//   addFooter(array) {
//     if (array.length === 0 || array[array.length - 1] > 0) {
//       array.push(-1);
//     }
//     return array;
//   },
//   convertArrayToObjectWithKey(array) {
//     return array.map((item) => ({key: item}));
//   },
//   hasAssignedPatient(patients) {
//     for (const p in patients) {
//       if (patients[p].hubId || patients[p].hub) {
//         return true;
//       }
//     }
//     return false;
//   },
//   getUnassignedPatientIds(patientIds, patientsById) {
//     const unassignedPatientIds = [];
//     for (const p in patientIds) {
//       if (!patientsById[patientIds[p]].hub) {
//         unassignedPatientIds.push(patientIds[p]);
//       }
//     }
//     return unassignedPatientIds;
//   },
//   getProfileUri(id, fileKey) {
//     const mode = BuildConfig.ENV;
//     if ((id, fileKey)) {
//       return `https://${mode}-files.memohub.co.uk/memo/files/patient/${id}/avatar?fileKey=${fileKey}`;
//     }
//     if (id) {
//       return `https://${mode}-files.memohub.co.uk/memo/files/patient/${id}/avatar`;
//     }
//     return `https://${mode}-files.memohub.co.uk/memo/files/patient//avatar`;
//   },
//   convertImageToBinary(base64Data) {
//     const binary_string = Base64.atob(base64Data);
//     const len = binary_string.length;
//     const bytes = new Uint8Array(new ArrayBuffer(len));
//     for (let i = 0; i < len; i++) {
//       bytes[i] = binary_string.charCodeAt(i);
//     }
//     return bytes;
//   },
//   getTimes(startOffset, endOffset) {
//     const durationInHours = endOffset - startOffset + 1;
//     const durationInSeconds = (durationInHours * 3600) / 8;
//     const times = [];
//     Array(8)
//       .fill(0)
//       .forEach((item, index) =>
//         times.push(
//           this.convertSecsToHrsMins(
//             index * durationInSeconds + startOffset * 3600,
//             true,
//           ),
//         ),
//       );
//     return times;
//   },
//   getOffsetDate(offset) {
//     const date = new Date();
//     date.setTime(date.getTime() - offset * 24 * 3600000);
//     return date;
//   },
//   getOffsetFromDate(date) {
//     const now = new Date();
//     now.setHours(12);
//     date.setHours(12);
//     const offset = now.getTime() - date.getTime();
//     const days = Math.round(offset / (1000 * 60 * 60 * 24));
//     return days;
//   },
//   adjustPinchBoundaries(start, end, deltaDevided) {
//     if (
//       Math.floor(start - deltaDevided) < 0 &&
//       Math.floor(end + deltaDevided) > 23
//     ) {
//       return [0, 23];
//     }
//     if (Math.floor(start - deltaDevided) < 0) {
//       return [0, end + deltaDevided];
//     }
//     if (Math.floor(end + deltaDevided) > 23) {
//       return [start - deltaDevided, 23];
//     }
//     return [Math.floor(start - deltaDevided), Math.floor(end + deltaDevided)];
//   },
//   adjustPinchDelta(delta, zoomLevel) {
//     if (delta >= zoomLevel / 2) {
//       if (zoomLevel % 2 === 0) {
//         return zoomLevel / 2 - 1;
//       }
//       return Math.floor(zoomLevel / 2);
//     }
//     return Math.floor(delta);
//   },
//   getTranslateValues(start, end, delta) {
//     if (Math.round(start + delta) < 0) {
//       return [0, end - start];
//     }
//     if (Math.round(end + delta) > 23) {
//       return [23 - (end - start), 23];
//     }
//     return [Math.round(start + delta), Math.round(end + delta)];
//   },
//   getAlertValue(type, value = 0) {
//     switch (type) {
//       case HUMIDITY:
//         return `${value}%`;
//       case TEMPERATURE:
//         return `${value}°`;
//       case PRESSURE:
//         return value === 1 ? I18n.t('occupied') : I18n.t('notOccupied');
//       case MOTION:
//         return value === 1 ? I18n.t('detected') : I18n.t('notDetected');
//       case SWITCH:
//         return value === 1 ? I18n.t('opened') : I18n.t('closed');
//       case POWER:
//         return value === 1 ? I18n.t('inUse') : I18n.t('notUsed');
//     }
//   },
//   getTimeZoneForOffset(offset) {
//     for (const t in minimalTimezoneSet) {
//       if (minimalTimezoneSet[t].offset === offset) {
//         return minimalTimezoneSet[t].label;
//       }
//     }
//     return minimalTimezoneSet[12].label;
//   },
//   compareProps(nextProps, currentProps) {
//     for (const index in nextProps) {
//       if (nextProps[index] !== currentProps[index]) {
//         return console.log(index, currentProps[index], '-->', nextProps[index]);
//       }
//     }
//   },
//   getAccountId(login) {
//     if (login.accounts.length > 0) {
//       for (const a in login.accounts) {
//         if (
//           login.accounts[a].ownedBy === login.organisationId ||
//           login.accounts[a].ownedBy === login.userId
//         ) {
//           return login.accounts[a].id;
//         }
//       }
//     }
//     return login.accounts[0].id;
//   },
//   chunkString(str, length) {
//     return str.match(new RegExp(`.{1,${length}}`, 'g'));
//   },
//   capitaliseWord(string) {
//     return string.charAt(0).toUpperCase() + string.slice(1);
//   },
//   filterDiscreteServices(serviceIds) {
//     return serviceIds.filter((id) => id === '4' || id === '12' || id === '14');
//   },
//   filterDiscreteAndAlarmServices(serviceIds, services) {
//     return serviceIds.filter(
//       (id) =>
//         services[id].dtype === 'Discrete' || services[id].dtype === 'Alarm',
//     );
//   },
//   shortenString(string) {
//     string.replace(/hours|minutes/g, function (word) {
//       if (word === 'hours') {
//         return I18n.t('hrs');
//       }
//       if (word === 'hour') {
//         return I18n.t('hr');
//       }
//       if (word === 'minutes') {
//         return I18n.t('mins');
//       }
//       if (word === 'minute') {
//         return I18n.t('min');
//       }
//     });
//     return string;
//   },
// };
