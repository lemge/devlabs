/*
 * @Author: lec
 * @Date: 2024-11-27 14:24:21
 * @LastEditTime: 2024-11-29 10:18:17
 * @Description: autotable,自动表格，载入json数据生成CURD表格
 */
var autotable={

    table_box:null,//表格盒子
    data_source:null,//数据源url
    data:null,//数据
    pagenow:1,//当前页
    pagelen:10,//每页行数
    rows:0,//总行数
    totalpage:1,//总页数
    reqargs:{},//请求参数
    pbl:2,//当前页左右显示的页码数量

    /*
     * @description: 初始化函数
     * @return {*}
     */
    init:function(box_id){
        this.table_box=document.getElementById(box_id);
        console.log(this.table_box);
        return this;
    },
    /*
     * @description: 设置数据源
     * @return {*}
     */
    datasource:function(url){
        this.data_source=url;
        return this;
    },

    //ajax从远程地址data_source加载数据，使用原生ajax
    load_data:function(){
        var _this=this;
        var xhr=new XMLHttpRequest();
        var url=_this.data_source;
        var str="";
        for(var key in _this.reqargs){
            if(str!=""){
                str+="&";
            }
            str+=key+"="+_this.reqargs[key];
        }
        if(str!=""){
            url+="?"+str;
        }
        xhr.open('get',url);
        console.log(url);
        xhr.onload=function(){
            _this.data=JSON.parse(xhr.responseText);
            console.log(_this.data);
            _this.startStruct();
        }
        xhr.send();
    },
    //开始构建
    startStruct:function(){
        this.initData();
        this.buildTopBar();
        this.buildTable();
        this.buildBottomBar();

    },
    //初始化数据
    initData:function(){
        var _this=this;
        _this.totalpage=_this.data.pageinfo.rows/_this.data.pageinfo.pagelen;
        _this.totalpage=parseInt(_this.totalpage)+1;

        _this.pagenow=_this.data.pageinfo.page;
        _this.pagelen=_this.data.pageinfo.pagelen;
        _this.rows=_this.data.pageinfo.rows;

    },
    //构建top操作栏
    buildTopBar:function(){
        var _this=this;
        //创建top_bar
        this.top_bar=document.createElement("div");
        this.top_bar.className="top_bar";
        this.table_box.appendChild(this.top_bar);
        //遍历this.data.action中的元素，构建按钮
        for(var i=0;i<this.data.action.length;i++){
            var canuse=["添加"]
            if (canuse.indexOf(this.data.action[i].name)>-1) {
                //继续执行添加
            }else{
                continue;
            }
            var action=this.data.action[i];
            var button=document.createElement("button");
            button.classList.add("dl-btn");
            button.innerHTML=action.name;
            button.dataset.actinfo=i;
            button.addEventListener("click",function(){
                //执行动作
                console.log(action);
                if (action.act=="add") {
                    //执行编辑动作
                    _this.setdiaform(button,action.act);
                }
            }.bind(this));
            this.top_bar.appendChild(button);
        }
    },
    //构建表格
    buildTable:function(){
        var _this=this;
        var canuse=["编辑","删除"]
        var isctl=false;
        //检查action中是否包含canuse中的元素
        for(var i=0;i<this.data.action.length;i++){
            var action=this.data.action[i];
            if (canuse.indexOf(action.name)>-1) {
                //继续执行添加
                isctl=true;
                break;
            }
        }
        //创建表格
        this.table=document.createElement("table");
        this.table.classList.add("dl-table");
        this.table_box.appendChild(this.table);
        //创建标题行
        var tr=document.createElement("tr");
        this.table.appendChild(tr);
        for(var i=0;i<this.data.colinfo.length;i++){
            var colinfo=this.data.colinfo[i];
            var th=document.createElement("th");
            th.innerHTML=colinfo.title;
            tr.appendChild(th);
        }
        //创建操作列
        if(isctl){
            var th=document.createElement("th");
            th.innerHTML="操作";
            tr.appendChild(th);
        }
        //遍历data中的数据，创建数据行,创建数据行时，检测action的操作，创建每行的操作
        for(var i=0;i<this.data.data.length;i++){
            var data=this.data.data[i];
            var tr=document.createElement("tr");
            this.table.appendChild(tr);
            for(var j=0;j<this.data.colinfo.length;j++){
                var colinfo=this.data.colinfo[j];
                var td=document.createElement("td");
                td.innerHTML=data[j]
                tr.appendChild(td);
            }
            //创建操作列
            var td=document.createElement("td");
            tr.appendChild(td);
            for(var j=0;j<this.data.action.length;j++){
                var action=this.data.action[j];
                //检查action是否在canuse中，如果在，创建按钮，如果不在，跳过
                if (canuse.indexOf(action.name)>-1) {
                    //继续执行添加
                }else{
                    continue;
                }
                var button=document.createElement("button");
                button.classList.add("dl-btn");
                button.classList.add("dl-btn-sm");
                button.innerHTML=action.name;
                button.dataset.actid=i;
                button.dataset.actinfo=j;
                button.addEventListener("click",function(e){
                    //执行动作
                    this.btnaction(e.target);
                }.bind(this));
                td.appendChild(button);
            }
        }
    },
    //按钮动作相应
    btnaction:function(thisbtn){
        var _this=this;
        var thisrow=_this.data.data[thisbtn.dataset.actid];
        var thisaction=_this.data.action[thisbtn.dataset.actinfo];
        console.log("thisrow",thisrow);
        console.log("thisaction",thisaction);
        //执行动作
        //delete
        if(thisaction.act=="delete"){
            //执行删除动作
            var thisdia=dia().title('删除').body('确定要删除【'+thisrow[0]+'】吗?')
                            
            .setbtn('取消','red',function(){
                // alert('取消');
                console.log('取消');
                this.dia.des();
            })

            .setbtn('确定','blue',function(){
                // alert('确定'); 
                console.log("确定");
                this.dia.des();
                _this.deleteaction(thisaction.url,{key:thisrow[0]});
            })
            .to();
            
        }else if(thisaction.act=="edit"){
            //执行编辑动作
            this.setdiaform(thisbtn,thisaction.act);
        }

    },
    deleteaction:function(url,info){
        //执行删除动作
        //向url发送请求，请求方式为post，请求参数为info
        var xhr=new XMLHttpRequest();
        xhr.open('post',url);
        // xhr.setRequestHeader('Content-Type','application/json');
        xhr.send(JSON.stringify(info));
        xhr.onload=function(){
            console.log(xhr.responseText);
        }
        console.log(url);
        console.log(info);
    },
    editaction:function(url,info){
        //执行编辑动作
        //向url发送请求，请求方式为post，请求参数为info
        var xhr=new XMLHttpRequest();
        xhr.open('post',url);
        // xhr.setRequestHeader('Content-Type','application/json');
        xhr.send(info);
        xhr.onload=function(){
            console.log(xhr.responseText);
        }
    },
    addaction:function(thisbtn){
        //执行添加动作
    },
    //根据colinfo内容设置对话框表单
    setdiaform:function(thisbtn,acttype){
        var _this=this;
        //创建对话框

        var thisrow=_this.data.data[thisbtn.dataset.actid];
        var thisaction=_this.data.action[thisbtn.dataset.actinfo];
        //创建表单
        var form=document.createElement("form");
        form.classList.add("dl-form");
        
        //遍历this.data.colinfo中的数据，创建表单项
        for(var i=0;i<this.data.colinfo.length;i++){
            var colinfo=this.data.colinfo[i];
            if(colinfo.inform){
                //在修改或新增表单中显示
            }else{
                continue;
            }
            var div=document.createElement("div");
            div.classList.add("dl-form-item");
            form.appendChild(div);
            var label=document.createElement("label");
            label.innerHTML=colinfo.title;
            div.appendChild(label);
            var input=document.createElement("input");
            input.classList.add("dl-form-control");
            input.placeholder=colinfo.defval;
            input.name=colinfo.col;
            if (acttype=="edit") {
                input.value=thisrow[i];
            }
            div.appendChild(input);
        }
        var thisdia=dia().title(thisaction.name).body(form);
        thisdia.setbtn('取消','red',function(){
            // alert('取消');
            console.log('取消');
            this.dia.des();
        })
        .setbtn('更新','blue',function(){
            console.log("更新");
            console.log(form);
            var formdata=new FormData(form);
            if (acttype=="edit") {
                formdata.set("key",thisrow[0]);
            }
            console.log(formdata);
            _this.editaction(thisaction.url,formdata);
            // this.dia.des();
        })
        .to();
    },
    //改变页码
    changePage:function(page){
        //执行动作
        if (page>this.totalpage) {
            page=this.totalpage;
        }
        if (page<1) {
            page=1;
        }
        this.reqargs.page=page;
        this.pagenow=page;
        console.log(page);
        this.testfunc();
    },
    //清理table_box
    clearTableBox:function(){
        this.table_box.innerHTML="";
    },
    //testfunc
    testfunc:function(){
        this.clearTableBox();
        this.buildTopBar();
        this.buildTable();
        this.buildBottomBar();
        // this.load_data();
    },
    //构建bottom操作栏
    buildBottomBar:function(){
        //创建bottom_bar
        var _this=this;
        this.bottom_bar=document.createElement("div");
        this.bottom_bar.className="bottom_bar";
        this.table_box.appendChild(this.bottom_bar);
        //根据pageinfo中的数据，创建分页按钮
    
        //页面指示器
        var pageindicator=document.createElement("div");
        pageindicator.classList.add("dl-tag-w");
        pageindicator.innerHTML="第"+_this.pagenow+"页/共"+_this.totalpage+"页";
        this.bottom_bar.appendChild(pageindicator);
        //创建第一页按钮
        var button=document.createElement("button");
        button.classList.add("dl-btn");
        button.innerHTML="<<";
        button.title="跳转到首页";       
        button.dataset.toPage=1;
        if(_this.pagenow==1){
            button.disabled=true;
        }
        button.addEventListener("click",function(e){
            //执行动作
            _this.changePage(e.target.dataset.toPage);
        });
        this.bottom_bar.appendChild(button);


        //创建上一页按钮
        var button=document.createElement("button");
        button.classList.add("dl-btn");
        button.innerHTML="<";
        button.title="上一页";
        button.dataset.toPage=_this.pagenow-1;
        if(_this.pagenow==1){
            button.disabled=true;
        }
        button.addEventListener("click",function(e){
            //执行动作
            _this.changePage(e.target.dataset.toPage);
        });
        this.bottom_bar.appendChild(button);
        

        //创建分页按钮
        for(var i=0;i<_this.totalpage;i++){

            //只显示当前页的前后两页   
            if(Math.abs(i+1-_this.pagenow)<=_this.pbl || (i<5 && _this.pagenow<(_this.pbl+1)) || (i>=_this.totalpage-5 && _this.pagenow>_this.totalpage-(_this.pbl+1))){
                
            }else{
                //跳过不添加
                continue;
            }

            var button=document.createElement("button");
            button.classList.add("dl-btn");
            // button.classList.add("dl-btn-sm");
            button.innerHTML=i+1;
            if (i+1==_this.pagenow) {
                button.classList.add("dl-btn-blue");
            }
            button.dataset.toPage=i+1;
            button.addEventListener("click",(e)=>{
                //执行动作
                _this.changePage(e.target.dataset.toPage);
            });
            this.bottom_bar.appendChild(button);
        }

        //创建下一页按钮
        var button=document.createElement("button");
        button.classList.add("dl-btn");
        button.innerHTML=">";
        button.title="下一页";
        button.dataset.toPage=parseInt(_this.pagenow)+1;
        if(_this.pagenow==_this.totalpage){
            button.disabled=true;   
        }
        button.addEventListener("click",function(e){
            //执行动作
            _this.changePage(e.target.dataset.toPage);
        });
        this.bottom_bar.appendChild(button);
        //跳转到最后一页
        var button=document.createElement("button");
        button.classList.add("dl-btn");
        button.innerHTML=">>";
        button.title="跳转到最后一页";
        button.dataset.toPage=_this.totalpage;
        if(_this.pagenow==_this.totalpage){
            button.disabled=true;   
        }
        button.addEventListener("click",function(e){
            //执行动作
            _this.changePage(e.target.dataset.toPage);
        });
        this.bottom_bar.appendChild(button);
        //特定页码跳转
        //添加输入框
            var input=document.createElement("input");
        input.type="number";
        input.classList.add("dl-form-control-com");
        input.style.width="80px";
        input.placeholder="页码";
        this.bottom_bar.appendChild(input);
        //添加跳转按钮  
        var button=document.createElement("button");
        button.classList.add("dl-btn");
        button.innerHTML="跳转";
        button.addEventListener("click",function(e){
            //执行动作
            _this.changePage(input.value);
        });
        this.bottom_bar.appendChild(button);
    },
}
//获取唯一随机值
function getuuid(){
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}
/*
 * @description: 调用autotable
 * @return {*}
 */
function at(){
    return autotable
}