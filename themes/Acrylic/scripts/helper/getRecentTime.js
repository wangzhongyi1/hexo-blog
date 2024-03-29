const moment = require("moment");

moment.locale("zh-CN");
// 文件创建时间date是东八区时间，但在其他电脑上访问需要处理成对应时区的时间
function format(date) {
  // 获取当前机器所属时区
  const timeZone = 0 - new Date().getTimezoneOffset() / 60;
  let d = new Date(date);
  let len = d.getTime();
  let offset = d.getTimezoneOffset() * 60000; // 本地时间与GMT时间的偏移差
  let utcTime = len + offset; // 格尼威治时间
  return new Date(utcTime + 3600000 * timeZone);
}

/**
 * 东八区上午7点，东九区上午8点
 * @param {Date} date 东八区时间
 * @returns timestamp
 */
function format2(date) {
	const current = new Date();
	// 获取当前机器所属时区
  const timeZone = 0 - current.getTimezoneOffset() / 60;
	// 和东八区相差多少个时区
	const dist = 8 - timeZone;
	// 一个时区60分钟，相差多少毫秒
	const totalss = 60 * 60 * 1000 * Math.abs(dist);

	const target = new Date(date);

	return target.getTime() + totalss
}

hexo.extend.helper.register("recent_data", function (date) {
  return moment(format2(date)).fromNow();
});
