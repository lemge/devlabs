// 对话框组件
//链式操作
var dia = function(){

return (function(){
    //参数
    var title_value = '';
    var body_value = '';
    var btn_list = [];
    var box_obj=null;
    var mask_obj=null;
    var init = function(){
        return this;
    }
    // 创建对话框
    var to = function(){
        console.log('dia');
        var _this = this;
        // 创建对话框
        var box = document.createElement('div');
        this.box_obj = box;
        box.className = 'dl-dialogue';
        document.body.appendChild(box);
        //标题盒子
        var title_box = document.createElement('div');  
        title_box.className = 'dl-dialogue-title-box';
        box.appendChild(title_box);
        //设置标题
        var title = document.createElement('div');
        title.className = 'dl-dialogue-title';
        title.innerHTML = title_value;
        title_box.appendChild(title);
        //设置关闭按钮
        var close = document.createElement('div');
        close.className = 'dl-dialogue-close';
        close.innerHTML = '×';
        close.addEventListener('click', function(){
            _this.des();
        });
        title_box.appendChild(close);
        //设置内容
        var body = document.createElement('div');
        body.className = 'dl-dialogue-body';
        body.innerHTML = body_value;
        box.appendChild(body);

        //设置消息 footer
        var footer = document.createElement('div');
        footer.className = 'dl-dialogue-footer';
        box.appendChild(footer);
        //设置按钮
        btn_list.forEach(function(btn){
            var btn_dom = document.createElement('button');
            btn_dom.className = 'dl-btn dl-btn-'+btn.type;
            btn_dom.innerHTML = btn.text;
            btn_dom.dataset.dia = _this;
            btn_dom.addEventListener('click', function() {
                btn.callback(); // 调用按钮的回调函数
            });
            footer.appendChild(btn_dom);
        });

        
        //移动对话框        
        dia_move(this.box_obj);

        //显示遮罩层 
        this.mask();

        return this;
    }
    //将dom转为dia对象
    var domget=function(domid){
        var domobj=document.getElementById(domid)
        this.box_obj=domobj
        //创建全局变量以domid为变量名存储当前this
        window["dia"][domid] = this;
        return this;
    }
   
    //设置按钮
    var setbtn = function(text,type,callback){
        btn_list.push({text:text,type:type,callback:callback,dia:this});
        return this;
    }
    //设置对话框标题
    var title = function(t){
        title_value = t;
        return this;
    }
    //设置对话框内容
    var body = function(b){
        body_value = b;
        return this;
    }
    
    //销毁对话框
    var des = function(){
        console.log('des');
        this.box_obj.remove();
        this.desmask();
    }
    //隐藏
    var hid=function(){
        console.log("hid")
        this.box_obj.style.display="none"
        this.desmask();
    }
    //遮罩层
    var mask = function(){
        //设置遮罩层
        var mask = document.createElement('div');
        this.mask_obj = mask;
        console.log("-------------",this);
        mask.className = 'dl-dialogue-mask';
        //生成随机字符串作为mask的id
        var randomId = 'mask_' + Math.random().toString(36).substr(2, 9);
        mask.id = randomId;
        document.body.appendChild(mask);
        return this;
    }
    //销毁遮罩层
    var desmask = function(){
        this.mask_obj.remove();
        return this;
    }
    //返回对象
    return {
        init:init,
        to:to,
        title:title,
        body:body,
        des:des,
        mask:mask,
        desmask:desmask,
        setbtn:setbtn,
        btn_list:btn_list,
        domget:domget,
        hid:hid,
    }

})()
}


//调整dia的窗口位置
var dia_move = function(box){
    box.style.visibility = 'visible';
    var bot_top = box.offsetHeight/2;
    var bot_left = box.offsetWidth/2;
    box.style.top = `calc(50% - ${bot_top}px)`;
    box.style.left = `calc(50% - ${bot_left}px)`;
    console.log(box);
}

//当点击class为dl-dia-btn的按钮时，弹出对应的对话框
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.dl-dia-btn').forEach(function(btn){
        btn.addEventListener('click', function(){
           //获取对话框id
           var dia_id = btn.dataset.dia;
           console.log(dia_id);
           //获取对话框
           var diaobj=dia().domget(dia_id)
           var dia_dom=diaobj.box_obj
           //获取关闭按钮
           var close = dia_dom.querySelector('.dl-dialogue-close');
           
           //添加关闭事件
           close.addEventListener('click', function(){
                dia_dom.style.display = 'none';
            });

            //显示对话框
           dia_dom.style.display = 'block';
           //显示遮罩层 
        //    dia_dom.dataset.maskid=dia().mask().mask_obj.id;
        diaobj.mask();
           dia_move(dia_dom);
        });
    });
});