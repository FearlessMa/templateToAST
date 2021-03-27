import parseAttrStr from './pasrAttrStr';

export default function parseToAST(templateStr) {
  if (typeof templateStr != 'string') throw new Error('templateStr is not string');

  // templateStr = templateStr.trim();
  const len = templateStr.length;

  //  标签 与 属性 分组
  const startTagReg = /^\<(\w+[1-6]?)([^\>]*)\>/;
  const endTagReg = /^\<\/(\w+[1-6]?)\>/;
  // 匹配不包含<的内容
  const contentReg = /([^\<]+)/;
  let idx = 0;
  const stack1 = [];
  const stack2 = [];
  while (idx < len - 1) {
    let str = templateStr.slice(idx);
    // console.log('str: ', str);

    if (startTagReg.test(str)) {
      // 处理开始标签 <>
      // 获取match 结果
      const res = str.match(startTagReg);
      // console.log('res: ', res);
      // 获取正则 分组的结果
      const word = res[1];
      const attrs = res[2];
      let attrList = []
      if(attrs)attrList= parseAttrStr(attrs);
      // console.log('attrs: ', attrs);
      console.log('开始标签', res[0]);
      stack1.push(word);
      stack2.push({
        tag: word,
        type: 1,
        attrs: attrList,
        children: []
      });
      // 增加匹配到的字符串长度 含有<>的
      idx += res[0].length;
    } else if (endTagReg.test(str)) {
      //处理结束标签 </>
      // 获取match 结果
      const res = str.match(endTagReg);
      // 获取正则 分组的结果
      const word = res[1];
      console.log('结束标签', res[0]);

      if (stack2.length > 1) {
        // stack1.pop();
        const child = stack2.pop();
        stack2[stack2.length - 1].children.push(child);
      }
      // 增加匹配到的字符串长度 含有</>的
      idx += res[0].length;
    } else if (contentReg.test(str)) {
      //处理结束标签 开始结束标签之间的内容
      // 获取match 结果
      const res = str.match(contentReg);
      // console.log('res: ', res);
      // 获取正则 分组的结果
      const word = res[1].trim();
      console.log('内容', word);

      if (word && stack1[stack1.length - 1]) {
        stack2[stack2.length - 1].children.push({ text: word, type: 3 });
      }

      // 增加匹配到的字符串长度 含有</>的
      // console.log('res[0].length: ', res[0].length);
      idx += res[0].length;
    }
    // console.log('str: ', str);
  }
  console.log('stack1: ', stack1);
  console.log('stack2: ', stack2);

  return templateStr;
}
