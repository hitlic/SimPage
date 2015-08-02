/**
 * @Author: liuchen 
 * 
 * -----------------------------------------        使用说明 （1）-（6）      -------------------------------------------
 * 
 * 	（1）后端使用mybatis的pagehelper插件；
 *	（2）后端使用 pagehelper 的 PageHelper.startPage(pageNum, pageSize) 方法；
 *	（3）服务器返回 paehelper的PageInfo的JSON对象；
 * 	（4）CSS样式设置同 bootstrap 分页组件的样式设置一致；
 *	（5）例:
        <!-- JS代码 -->
        var sp=new SimPage({
	   container:"#pagePanel",              //*1* 存放页码面板的『容器id』 
	   url: '/ajax/url',                    //*2* ajax访问的『url』 
	   requestNameOfPageNum:'pageNum',      //*3* 『request中的参数名』, 默认为'pageNum', 
                                        	//     用于从request中获取PageHelper.startPage(pageNum, pageSize)的参数pageNum 
	   requestNameOfPageSize:'pageSize',    //*4* 『request中的参数名』, 默认为'pageSize', 
                                        	//     用于从request中获取PageHelper.startPage(pageNum, pageSize)的参数pageSize 
           pageSize:10,                         //*5* 『页面大小』，默认值10
           data:{ },                            //*6* ajax访问的『其他参数』
           method:'post',                       //*7* 『请求方法』，默认为 post, 如果为 get 则上述参数也可放在url中 
           length:10,                           //*8* 页码面板中显示的『页码数量』，默认值10
           onPageChange:function(page){         //*9* 『回调函数』，页面切换时返回的页面数据
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
 * （6）重要函数
        SimPage.refresh(pageNum, data)  //** 刷新页面，使用场景：页面删除、修改或添加一条记录后刷新页面
                                       //   pageNum为要显示的页面，默认为当前页面, data为ajax的访问数据, 含意同（5）中的 data
                                       //   该函数的两个参数在页面面要变动时使用，例：删除记录、输入检索条件进行搜索 
 * -----------------------------------------------------------------------------------------------------------------------
 **/

var SimPage=function(setting){
    if(setting==null){//如果没有参数，则退出
		return;
	}
	if(setting['url']==null){ alert("参数 'url' 缺失！"); return; }//url不能为空
	if(setting['container']==null){alert("参数 'container' 缺失！"); return;}//页码面板容器不能为空
		
	/**请求方法*/
    if(setting['method']==null) setting['method']='post';  
	
	/**请求参数名，用于PageHelper.startPage(pageNum, pageSize)的两个函数参数*/
	if(setting['requestNameOfPageSize']==null) {
		setting['requestNameOfPageSize']="pageSize";
    }
    if(setting['requestNameOfPageNum']==null) {
		setting['requestNameOfPageNum']="pageNum";
	}
	
	/**显示的最大页码数量*/
	if(setting['length']==null) setting['length']=10;
	/**每页的大小*/
	if(setting['pageSize']==null) setting['pageSize']=10;
	/**点击事件*/
	if(setting['onPageChange']==null){
		setting['onPageChange']=function(pageInfo){};
	}
	this.setting=setting;
	this.startPage=1;
	this.endPage=setting['length'];
	this.createPage(1);
	this.currentPage=1;
};

/**根据url及参数，ajax访问，创建页面*/
SimPage.prototype.createPage=function(pageNum){
	var params;
	if(this.setting['data']==null){
		params={};
	}else{
		params=this.setting['data'];
	}
	params[this.setting['requestNameOfPageNum']]=pageNum;
	params[this.setting['requestNameOfPageSize']]=this.setting['pageSize'];

	sp=this;
	$.ajax({
		url:this.setting['url'],
		type:this.setting['method'],
		data: params,
		dataType:"json",
		success:function (pageInfo){
			sp.createPanel(pageInfo);
			var userfun=sp.setting['onPageChange'];
			userfun(pageInfo);
		},
		error:function(){
			alert("参数错误！");
		}
	});
};

/**创建页码面板*/
SimPage.prototype.createPanel=function(pageInfo){
	var totalPage=pageInfo['pages'];
	var currentPage=pageInfo['pageNum'];
	this.currentPage=currentPage;
	var length=this.setting['length'];
	
	/**调整页码显示*/
	if(pageInfo['pages']==0 || pageInfo['pages']==null){
		this.endPage=0;
	}else{
		if(currentPage==1){
			this.startPage=1;
			this.endPage=length<pageInfo['pages']?length:pageInfo['pages'];
		}
		if(currentPage==pageInfo['pages']){
			this.startPage=pageInfo['pages']-length+1;
			this.endPage=pageInfo['pages'];
		}
	}
	if(currentPage==this.startPage){
		this.startPage = currentPage-parseInt(length/2);
		if(this.startPage<=1)
			this.startPage=1;
		this.endPage=this.startPage+length-1;
		if (this.endPage>=pageInfo['pages'])
			this.endPage=pageInfo['pages'];
	}else if(this.endPage==currentPage){
		this.endPage = currentPage+parseInt(length/2);
		if(this.endPage>=pageInfo['pages'])
			this.endPage=pageInfo['pages'];
		this.startPage=this.endPage-length+1;
		if(this.startPage<=1)
			this.startPage=1;
	}
	
	/**创建页码面板*/
	var html="<nav> <ul class='pagination'> <li> <a href='javascript:;' aria-label='First'> <span aria-hidden='true'>首页</span> </a> </li> <li> <a href='javascript:;' aria-label='Previous'> <span aria-hidden='true'>上页</span> </a> </li>";
	for(var i=this.startPage;i<=this.endPage;i++){
		if(currentPage==i){
            html+="<li class='active'> <span>"+i+"<span class='sr-only'>(current)</span></span> </li>";
		}else{
			html+="<li><a href='javascript:;' page='"+i+"'>"+i+"</a></li>";
		}
	}
	html+="<li> <a href='javascript:;' aria-label='Next'> <span aria-hidden='true'>下页</span> </a> </li> <li> <a href='javascript:;' aria-label='Last'> <span aria-hidden='true'>尾页</span> </a> </li> </ul> </nav>";
	$(this.setting['container']).html(html);
	
	sp=this;
	//绑定页码点击事件
	$(this.setting['container']).find("[page]").click(function(){
		sp.createPage($(this).attr('page'));
	});
	//绑定首页点击事件
	$(this.setting['container']).find("a[aria-label='First']").click(function(){
		sp.createPage(1);
	});
	//绑定上页点击事件
	$(this.setting['container']).find("a[aria-label='Previous']").click(function(){
		if(currentPage>1){
			sp.createPage(currentPage-1);
		}
	});
	//绑定下页点击事件
	$(this.setting['container']).find("a[aria-label='Next']").click(function(){
		if(currentPage<totalPage){
			sp.createPage(currentPage+1);
		}
	});
	//绑定尾页点击事件
	$(this.setting['container']).find("a[aria-label='Last']").click(function(){
		sp.createPage(totalPage);
	});
};

/**
 * 刷新页面
 * pageNum: 要显示的页面，默认为当前页面
 * data: ajax访问的其他条件，默认为null
 * 说明：这两个参数在动态添加检索条件时用，例：页面有过滤功能时
 * */
SimPage.prototype.refresh=function(pageNum, data){
	if(data!=null)
		this.setting['data']=data;
	if(pageNum==null)
		this.createPage(this.currentPage);
	else
		this.createPage(pageNum);
};

