const urlParser = document.createElement('a')



/*
提取一个url的hostname部分
*/
export function domain (url) {
  urlParser.href = url
  return urlParser.hostname
}


/*
计算一个时间，距离现在间隔多久，比如1分钟，1小时，1天。未来的时间，会返回负数。
*/
export function fromNow (time) {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour')
  } else {
    return pluralize(~~(between / 86400), ' day')
  }
}


/*
对一个 time次数 加单位。  也就是比如，如果次数为1，就返回1 comment，如果次数为2就返回2comments
*/
function pluralize(time, label) {
    if (time === 1) {
        return time + label
    }

    return time + label + 's';
}
