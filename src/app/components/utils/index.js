import Strategy, {checkType} from './strategy';
//import {session} from 'models/storage';

export * from './echart-config';
export * from './format-time';
export {checkType};

export function isUndefined(arg){
  return Strategy.isUndefined(arg);
}

export function isNull(arg){
  return Strategy.isNull(arg);
}

export function isInt(arg){
  return Strategy.isInt(arg);
}

const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g;
function isUrl(path) {
  return reg.test(path);
}
exports.isUrl = isUrl;
