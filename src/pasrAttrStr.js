export default function parseAttrStr(attrStr) {
  // [{name:key,value:value},...]
  // attrStr =` id="app" class="a b c 'd'"`
  if (!attrStr) return;
  attrStr = attrStr.trim();
  console.log('attrStr: ', attrStr);
  // console.log('JSON.stringify attrStr: ', JSON.stringify({ a: attrStr }));
  let attrList = [];
  const stack = [];
  let idx = 0;
  for (let i = 0; i < attrStr.length; i++) {
    const iAtChar = attrStr[i];
    const stackTop = stack[stack.length - 1];
    if (iAtChar == '"' || iAtChar == "'") {
      if (stackTop == iAtChar) {
        stack.pop();
      } else {
        stack.push(iAtChar);
      }
    }
    if (iAtChar == ' ' && stack.length == 0) {
      attrList = attrList.concat(parseStr(attrStr, idx, i));
      idx = i;
    }
  }
  attrList = attrList.concat(parseStr(attrStr, idx));
  return attrList;
}
function parseStr(attrStr, idx, i) {
  let str = attrStr.slice(idx, i);
  return getAttr(str);
}
function getAttr(str) {
  const list = [];
  let [k, v] = str.split('=');
  k = k.trim();
  v = v.slice(1,v.length-1).trim();
  if (v.includes(' ')) {
    const vList = v.split(' ');
    vList.forEach((value) => {
      list.push({ name: k, value });
    });
  } else {
    list.push({ name: k, value: v });
  }
  return list;
}
