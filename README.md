# SimPage
JS paging tools based on Mybatis plugin of PageHelper (基于Mybatis 插件 PageHelper)的JS分页工具

（1）后端使用mybatis的pagehelper插件；

（2）后端使用 pagehelper 的 PageHelper.startPage(pageNum, pageSize) 方法；

（3）服务器返回 paehelper的PageInfo的JSON对象；

（4）CSS样式设置同 bootstrap 分页组件的样式设置一致；

（5）例:

  <!-- JS代码 -->

  var sp=new SimPage({

  container:"#pagePanel",              //-1- 存放页码面板的『容器id』

  url: '/ajax/route/route_routePage',  //-2- ajax访问的『url』 

  requestNameOfPageNum:'pageNum',      //-3- 『request中的参数名』, 默认为'pageNum',

                                       //	   用于从request中获取PageHelper.startPage(pageNum, 

                                       //    pageSize)的参数pageNum 

  requestNameOfPageSize:'pageSize',    //-4- 『request中的参数名』, 默认为'pageSize', 

                                       //	   用于从request中获取PageHelper.startPage(pageNum, 

                                       //    pageSize)的参数pageSize 

    pageSize:10,                       //-5- 『页面大小』，默认值10

    data:{ },                          //-6- ajax访问的『其他参数』

    method:'post',                     //-7- 『请求方法』，默认为 post, 如果为 get 

                                       //    则上述参数也可放在url中 

    length:10,                         //-8- 页码面板中显示的『页码数量』，默认值10

    onPageChange:function(page){       //-9- 『回调函数』，页面切换时返回的页面数据

        alert(page['pageNum']);

        alert(page['pageSize']);

        alert(page['size']);

        alert(page['startRow']);

        alert(page['endRow']);

        alert(page['total']);

        alert(page['pages']);

        alert(page['list']); //数据列表

    }

 });

  <!-- HTML代码 -->

  <div id="pagePanel"></div>

6）重要函数
  SimPage.refresh(pageNum, data)       //   刷新页面，使用场景：页面删除、修改或添加一条记录后刷新页面

                                       //   pageNum为要显示的页面，默认为当前页面, 

                                       //   data为ajax的访问数据, 含意同（5）中的 data

                                       //   该函数的两个参数在页面面要变动时使用，例：删除记录、输入检索

                                       //   条件进行搜索 
