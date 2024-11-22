var popmsgStru = {


    position_value: null,
    type_value: null,
    time_value: null,
    mask_value: null,
    msg_value: null,
    size_value: null,

    init: function () {
         var position_value="top-center";//top-center:上中,top-left:上左,top-right:上右,center-center:中中,center-left:中左,center-right:中右,bottom-center:下中,bottom-left:下左,bottom-right:下右
        var type_value= "com-msg";//com-msg:普通消息,info-msg:信息消息,success-msg:成功消息,warning-msg:警告消息,error-msg:错误消息
        var time_value= 3000;
        var mask_value= false;
        var msg_value= "提示信息";
        var size_value="m";//m:medium,s:small,l:large
        return this;
    },

    
   

   
    //设置位置
    pos: function (value="top-center") {
        this.position_value = value;
        return this;
    },
    //设置类型
    type: function (value="com-msg") {
        this.type_value = value;
        return this;
    },
    //设置时间
    time: function (value=3000) {
        this.time_value = value;
        return this;
    },
    //设置遮罩层
    mask: function (value=false) {
        this.mask_value = value;
        return this;
    },
    //设置信息
    body: function (value="提示信息") {
        this.msg_value = value;
        return this;
    },
    //设置大小
    size: function (value="m") {
        this.size_value = value;
        if(value=="l"){
            this.size_value="large-msg";
        }else if(value=="m"){
            this.size_value="medium-msg";
        }else if(value=="s"){
            this.size_value="small-msg";
        }
        return this;
    },
    //构造弹出消息盒子，承载消息，以便在同一位置显示多个消息可以依次显示
    createboxs: function () {
        console.log('popmsg createboxs');
        var box = document.createElement('div');
        box.className = 'popmsg-box';
        box.classList.add(this.position_value);//设置消息盒子位置
        document.body.appendChild(box);
        return box;
    },
    //如果消息盒子内部元素为空，则删除消息盒子
    removebox: function (box) {
        console.log(box);
        if (box.children.length == 0) {
            box.remove();
        }
    },
    createMsg: function () {
        var _this = this;
        console.log('popmsg createMsg');
        var msg = document.createElement('div');
        msg.className = 'popmsg-msg';
        msg.innerHTML = this.msg_value;
        msg.classList.add(this.type_value);//设置消息类型
        msg.classList.add(this.size_value);//设置消息大小
        //设置消息显示时间
        setTimeout(function () {
            _this.removeMsg(msg);
        }, _this.time_value);
        return msg;
    },
    //删除消息
    removeMsg: function (msg) {
        var msgParentElement=msg.parentElement;
        msg.remove();
        //删除遮罩层
        this.removeMask();
        console.log(msg);    
        this.removebox(msgParentElement);
    },
    //构建遮罩层
    createMask: function () {
        var _this = this;
        console.log('popmsg createMask');
        //检查是否存在遮罩层，如果存在，则不创建遮罩层
        var mask = document.querySelector('.popmsg-mask');
        if (mask) {
            console.log('popmsg 遮罩层已存在');
            return mask;
        }
        var mask = document.createElement('div');
        mask.className = 'popmsg-mask';
        document.body.appendChild(mask);
        //点击关闭遮罩层
        mask.addEventListener('click', function () {
            _this.removeMask();
        });
        return mask;
    },
    //删除遮罩层，检查是否有关联遮罩层的消息弹框，如果有就不删除遮罩层。
    removeMask: function () {
        console.log('popmsg removeMask');
        var popmsg_mask_has = document.querySelector('.popmsg-mask-has');//检查是否存在关联遮罩层的消息弹框
        if (!popmsg_mask_has) {
            var mask = document.querySelector('.popmsg-mask');
            if (mask) { 
                mask.remove();
            }
        }else{
            console.log('popmsg 有关联遮罩层的消息弹框，不删除遮罩层');
        }
    },
     //显示弹框
     msg: function () {
        // 显示弹框
        console.log('popmsg p');
        //检查是否存在position_value的消息盒子
        var box = document.querySelector('.' + this.position_value);
        if (!box) {
            box = this.createboxs();
        }
        var msg = this.createMsg();
        box.appendChild(msg);
        //检查是否启用遮罩层
        if (this.mask_value) {
            var mask = this.createMask();
            msg.classList.add('popmsg-mask-has');//标识消息弹框关联了遮罩层
        }
    }


}

var popmsg=popmsgStru.init()