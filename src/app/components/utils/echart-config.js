import Strategy from './strategy';

function toChineseUnit(num_val) {
  var return_val = '-';
  var abs = Math.abs(num_val);
  if (abs > Math.pow(10, 12)) {
    return_val = toDecimal(abs / Math.pow(10, 12)).toString() + "万亿";
  } else if (abs > Math.pow(10, 8)) {
    return_val = toDecimal(abs / Math.pow(10, 8)).toString() + "亿";
  } else if (abs > Math.pow(10, 4)) {
    return_val = toDecimal(abs / Math.pow(10, 4)).toString() + "万";
  } else {
    return_val = abs.toString();
  }
  return return_val;
}
  
function toDecimal(num_val){
  if(isNaN(num_val)) return '-';
  if((num_val.toString()).indexOf('.')!=-1){
    if (num_val.toString().split(".")[1].length <= 2) {
      num_val = Math.round(num_val*100)/100;
      return num_val;
    }
    var return_val = parseFloat(num_val);
    return_val = Math.round(num_val * 100) / 100;
    return return_val;
  }else{
    return num_val;
  }
}

let setOption = (data) => {
  let arrSeries = [];
  if (data.series) {
    arrSeries = JSON.parse(JSON.stringify(data.series));
  }
  let option = {
    tooltip: {
      triggerOn: 'click',
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      },
      formatter: function (params) {
        var res = params[0].name;
        for (var i = 0, l = params.length; i < l; i++) {
          res += '<br/>' + params[i].marker + params[i].seriesName + ' : ';
          if(!!params[i].data && typeof params[i].data === 'object' && 'extra' in params[i].data) {
            res += params[i].data.extra;
          }else {
            res += (params[i].value==null ? '-' : params[i].value);
          }
        }
        return res;
      }
    },
    grid: {
      backgroundColor: '#1f1d1d'
    },
    legend: {
      x: 'left',
      y: 'top',
      itemGap: 20,
      // orient: 'vertical',
      textStyle: {
        color: '#fff',
        lineHeight: 56,
        fontSize: 14,
      },
      data: data.legend
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: data.xAxis,
      splitLine: {
        show: true,
        lineStyle: {
          color: '#444242'
        }
      }
    },
    yAxis: {
      type: 'value',
      min: 'dataMin',
      max: 'dataMax',
      splitLine: {
        show: true,
        lineStyle: {
          color: '#444242'
        }
      }
    },
    grid: {
      left: '2%',
      right: '2%',
      top: '70px',
      bottom: '5%',
      containLabel: true
    },
    textStyle: {
      color: '#d8d9da'
    },
    color: ['#8ee804', '#ba43a9', '#1f78c1', '#ef843c', '#508642', '#70dbed', '#e24d42', '#e3e606', '#fba5d3', '#f9e2d2',
      '#40238f', '#a7e0bf', '#f2007f', '#f3f7ad', '#01cab7', '#8d815b', '#008bd0', '#87005e', '#85666c', '#a49ce7'],
    series: data.series
  };
  return {arrSeries, option};
}
let resetOption = (restSeries) => {
  restSeries.map((item) => {
    item.itemStyle = {
      normal: {
        lineStyle: Strategy.isUndefined(item.lineStyle) ? {type: 'solid'} : item.lineStyle
      }
    };
  });
  return restSeries;
}
function getOption(data){
  let {arrSeries, option} = setOption(data);
  if(data.series) {
    option.series = resetOption(arrSeries);
  }
  return option;
}

export {toChineseUnit, toDecimal, getOption};