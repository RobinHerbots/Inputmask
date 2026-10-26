/*!
 * inputmask
 * https://github.com/RobinHerbots/Inputmask
 * Copyright (c) 2010 - 2026 Robin Herbots
 * Licensed under the MIT license
 * Version: 5.1.0-beta.40
 */
const a={dayNames:["Mon","Tue","Wed","Thu","Fri","Sat","Sun","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],monthNames:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","January","February","March","April","May","June","July","August","September","October","November","December"],ordinalSuffix:["st","nd","rd","th"],AM:"AM",PM:"PM"};function e(e){return e?{dayNames:e.dayNames||a.dayNames,monthNames:e.monthNames||a.monthNames,ordinalSuffix:e.ordinalSuffix||a.ordinalSuffix,AM:e.AM||a.AM,PM:e.PM||a.PM}:{...a}}export{a as defaultI18n,e as mergeI18n};
//# sourceMappingURL=date.i18n.mjs.map
