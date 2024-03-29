const moment = require('moment')

moment.locale('zh-CN')
// 文件创建时间date是东八区时间，但在其他电脑上访问需要处理成对应时区的时间
function format(date, i = 8) {
  let d = new Date(date);
  let len = d.getTime();
  let offset = d.getTimezoneOffset() * 60000; // 本地时间与GMT时间的偏移差
  let utcTime = len + offset; // 格尼威治时间
  return new Date(utcTime + 3600000 * i);
}

hexo.extend.helper.register("recent_data", function (date) {
    return moment(format(date)).fromNow();
});
