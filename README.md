# SimPage
JS paging tools based on Mybatis plugin of PageHelper (基于Mybatis 插件 PageHelper)的JS分页工具

（1）后端使用mybatis的pagehelper插件；
（2）后端使用 pagehelper 的 PageHelper.startPage(pageNum, pageSize) 方法；
（3）服务器返回 paehelper的PageInfo的JSON对象；
（4）CSS样式设置同 bootstrap 分页组件的样式设置一致；
（5）例:

 <!-- JS代码 -->
 var sp=new SimPage({
  container:"#pagePanel",              //*1* 存放页码面板的『容器id』
  url: '/ajax/route/route_routePage',  //*2* ajax访问的『url』 
  requestNameOfPageNum:'pageNum',      //*3* 『request中的参数名』, 默认为'pageNum', 
                                       //	  用于从request中获取PageHelper.startPage(pageNum, pageSize)的参数pageNum 
