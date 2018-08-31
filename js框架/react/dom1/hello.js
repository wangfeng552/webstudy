var arr=[
    <h1>niasdf</h1>,
    <h2>{2 + 2}</h2>,
    <p>新增数组</p>
]

ReactDOM.render(
  /*注释*/
  <div>
      {arr}
      <h3>{1 > 2 ? 'yes' : "no"}</h3>
      {/*注释...*/}
      <h1 data-myattribute="somevalue">niasdf</h1>
  </div>,
  document.querySelector("#wf")
)

// 1、在标签内部的注释需要花括号

// 2、在标签外的的注释不能使用花括号