import moment from 'moment';
const TableFormat = 'YYYY年MM月DD日';
const NormalFormat = 'YYYY年MM月DD日 HH时mm分';

function formatTableTime(timestamp){
  if(timestamp === null){
    return '';
  }
  let date = moment(timestamp);
  return date.isValid() ? date.format(TableFormat) : '';
}

function formatNormalTime(timestamp){
  if(timestamp === null){
    return '';
  }
  let date = moment(timestamp);
  return date.isValid() ? date.format(NormalFormat) : '';
}

function formatDotTime(timestamp, containTime){
  let f = 'YYYY.MM.DD' + (containTime ? ' HH:mm' : ''),
  date = moment(timestamp);
  return date.isValid() ? date.format(f) : '';
}

function formatFromNow(timestamp, systemTime){
  if(timestamp === null){
    return '';
  }
  moment.updateLocale('en', {
    relativeTime: {
      s  : '不足 1 分钟',
      ss : '不足 1 分钟',
      m:  "1 分钟",
      mm: "%d 分钟",
      h:  "1 小时",
      hh: "%d 小时",
      d:  "1 天",
      dd: "%d 天",
      M:  "1 个月",
      MM: "%d 个月",
      y:  "1 年",
      yy: "%d 年"
    }
  });
  if(systemTime){
    return moment(timestamp).from(systemTime, true);
  }
  return moment(timestamp).fromNow('day');
}

function formatDateRange(dateRange){
  let range = dateRange.split('/'),
  fStr = 'YYYYMMDD', start, end;
  if(range.length == 1){
    start = moment().subtract(dateRange, 'days');
    end = moment();
  }else{
    start = moment(range[0]);
    end = moment(range[1]);
  }
  start = start.format(fStr);
  end = end.format(fStr);
  return start + '/' + end;
}

const format = {
  tableTime: formatTableTime,
  normalTime: formatNormalTime,
  dotTime: formatDotTime,
  fromNow: formatFromNow,
  dateRange: formatDateRange,
};
export {format};