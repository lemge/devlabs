// 对话框组件
//链式操作
var dia = function(){

return (function(){
    //参数
    var title_value = '';
    var body_value = '';
    var init = function(){
        return this;
    }
    // 创建对话框
    var to = function(){
        console.log('dia');
        // 创建对话框
        var box = document.createElement('div');
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
            box.remove();
            mask.remove();
        });
        title_box.appendChild(close);
        //设置内容
        var body = document.createElement('div');
        body.className = 'dl-dialogue-body';
        body.innerHTML = body_value;
        box.appendChild(body);

        //设置遮罩层
        var mask = document.createElement('div');
        mask.className = 'dl-dialogue-mask';
        document.body.appendChild(mask);


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
    // 销毁对话框
    var des = function(dia){
        dia.remove();
        return this;
    }
    //遮罩层
    var mask = function(){
        return this;
    }
    //销毁遮罩层
    var desmask = function(m){
        m.remove();
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
        desmask:desmask
    }

})()
}

//当点击class为dl-dia-btn的按钮时，弹出对应的对话框
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.dl-dia-btn').forEach(function(btn){
        btn.addEventListener('click', function(){
           //获取对话框id
           var dia_id = btn.dataset.dia;
           console.log(dia_id);
           //获取对话框
           var dia = document.getElementById(dia_id);
           //获取关闭按钮
           var close = dia.querySelector('.dl-dialogue-close');
           
           //添加关闭事件
           close.addEventListener('click', function(){
                dia.style.display = 'none';
            });

            //显示对话框
           dia.style.display = 'block';
        });
    });
});