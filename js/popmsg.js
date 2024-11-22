var popmsg = function(){



return (function () {
    var position_value = "top-center"; // 默认位置
    var type_value = "com-msg"; // 默认类型
    var time_value = 3000; // 默认时间
    var mask_value = false; // 默认不显示遮罩
    var msg_value = "提示信息"; // 默认消息
    var size_value = "medium-msg"; // 默认大小
    var handclose_value=false;//是否需要手动关闭

    var init = function () {
        // 重置所有参数为默认值
        position_value = "top-center";
        type_value = "com-msg";
        time_value = 3000;
        mask_value = false;
        msg_value = "提示信息";
        size_value = "m";
        return this;
    };

    var createboxs = function () {
        console.log('popmsg createboxs');
        var box = document.createElement('div');
        box.className = 'popmsg-box';
        box.classList.add(position_value); // 设置消息盒子位置
        document.body.appendChild(box);
        return box;
    };

    var removebox = function (box) {
        console.log(box);
        if (box.children.length == 0) {
            box.remove();
        }
    };


    var createMsg = function () {
        console.log('popmsg createMsg');
        var msg = document.createElement('div');
        msg.className = 'popmsg-msg';
        msg.classList.add(type_value); // 设置消息类型
        msg.classList.add(size_value); // 设置消息大小
        var msgmain=document.createElement('div');//消息与关闭按钮
        msgmain.className = 'popmsg-msg-main';
        var msgbody = document.createElement('div');
        msgbody.className = 'popmsg-msg-body';
        msgbody.innerHTML = msg_value;
        msgmain.appendChild(msgbody);
        msg.appendChild(msgmain);

        // 添加倒计时条
        var timer_box=document.createElement('div');
        timer_box.classList.add('popmsg-timer-box');
        var timer = document.createElement('div');
        timer.className = 'popmsg-timer';
        timer_box.appendChild(timer);
        msg.appendChild(timer_box);

        // 如果需要手动关闭
        if (handclose_value) {
            // 添加关闭按钮
            var closebtn = document.createElement('div');
            closebtn.className = 'popmsg-close';
            closebtn.innerHTML = '×';
            msgmain.appendChild(closebtn);
            closebtn.addEventListener('click', function () {
                removeMsg(msg);
            });
        } else {
            if(time_value==-1){
                return msg;
            }
            // 设置倒计时
            var countdown = time_value / 100; // 转换为秒
            var widthPercentage = 100; // 倒计时条的初始宽度
            timer.style.width = widthPercentage + '%'; // 设置初始宽度

            var interval = setInterval(function () {
                countdown--;
                widthPercentage = (countdown / (time_value / 100)) * 100; // 计算剩余宽度百分比
                timer.style.width = widthPercentage + '%'; // 更新倒计时条宽度

                if (countdown <= 0) {
                    clearInterval(interval);
                    removeMsg(msg);
                }
            }, 100);
        }

        return msg;
    };

    var removeMsg = function (msg) {
        var msgParentElement = msg.parentElement;
        msg.remove();
        removeMask();
        console.log(msg);
        removebox(msgParentElement);
    };

    var createMask = function () {
        console.log('popmsg createMask');
        var mask = document.querySelector('.popmsg-mask');
        if (mask) {
            console.log('popmsg 遮罩层已存在');
            return mask;
        }
        mask = document.createElement('div');
        mask.className = 'popmsg-mask';
        document.body.appendChild(mask);
        // mask.addEventListener('click', removeMask);
        return mask;
    };

    var removeMask = function () {
        console.log('popmsg removeMask');
        var popmsg_mask_has = document.querySelector('.popmsg-mask-has');
        if (!popmsg_mask_has) {
            var mask = document.querySelector('.popmsg-mask');
            if (mask) {
                mask.remove();
            }
        } else {
            console.log('popmsg 有关联遮罩层的消息弹框，不删除遮罩层');
        }
    };

    var msg = function (quick_msg) {
        console.log('popmsg p');
        var box = document.querySelector('.' + position_value);
        if (!box) {
            box = createboxs();
        }
        if(quick_msg){
            msg_value=quick_msg;
        }

        var message = createMsg();
        box.appendChild(message);
        if (mask_value) {
            createMask();
            message.classList.add('popmsg-mask-has');
        }
        return message;
    };

    

    return {
        init: init,
        pos: function (value = "top-center") {
            position_value = value;
            return this;
        },
        type: function (value = "com-msg") {
            type_value = value;
            return this;
        },
        time: function (value = 3000) {
            time_value = value;
            return this;
        },
        mask: function (value = false) {
            mask_value = value;
            return this;
        },
        body: function (value = "提示信息") {
            msg_value = value;
            return this;
        },
        size: function (value = "m") {
            if (value == "l") {
                size_value = "large-msg";
            } else if (value == "m") {
                size_value = "medium-msg";
            } else if (value == "s") {
                size_value = "small-msg";
            }
            return this;
        },
        msg: msg,
        createMask:createMask,
        removeMask:removeMask,
        removeMsg:removeMsg,
        handclose:function(value=false){
            handclose_value=value;
            return this;
        }
        
    };
})();
}