import parseToAST from './parse';
const template = `
<div id="app" class="a b c 'd'" data-n="7">
  hello
  <h3>你好</h3>
  <ul class="box">
    <li>A</li>
    <li>B</li>
    <li>C</li>
  </ul>
</div>
`;
/* 
ast = [
  {
    tag: 'div',
    type:1, // 1 elm 节点 ，3 文本节点
    children:[
      { 
        text:'hello',
        type:3
      },
      {
        tag:'ul',
        type:1,
        text:'',
        children:[]
      }
    ]
  }
];
*/

render(template);

function render(template, elm) {
  const astList = parseToAST(template);
  // console.log('astList: ', astList);
}
