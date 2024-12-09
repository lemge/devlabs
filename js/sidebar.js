// 边栏组件
document.addEventListener('DOMContentLoaded', () => {
    var sf = sidebarfunc;
    const foldButtons = document.querySelectorAll('.dl-sidebar-fold');
    //遍历dl-sidebar-box
    const sidebarBoxs = document.querySelectorAll('.dl-sidebar-box');
    sidebarBoxs.forEach(sidebarBox => {
        const mask = document.createElement('div');
        mask.className = 'dl-sidebar-mask';
        sidebarBox.appendChild(mask);
        mask.addEventListener('click', (e) => {
            //获取e.target的父级元素    
            const targetObj = e.target.parentElement.querySelector('.dl-sidebar');
            console.log(targetObj);
            if (targetObj) {
                sf.switch(targetObj);
            }
        });
    });


    foldButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const targetId = e.target.getAttribute('data-target');
            const sidebar = document.getElementById(targetId);



            if (sidebar) {
                sf.switch(sidebar);
            }
        });
    });


});

var sidebarfunc = {

    //切换
    switch: function (targetObj) {
        console.log(targetObj.offsetWidth);
        if (targetObj.offsetWidth > 0) {
            this.closeFunc(targetObj);
        } else {
            this.openFunc(targetObj);
        }
    },

    openFunc: function (targetObj) {
        //判断是否是移动端
        if (window.innerWidth < 768) {
            this.open(targetObj);
            this.maskshow(targetObj.parentElement.querySelector('.dl-sidebar-mask'));
        } else {
            this.open(targetObj);
        }
    },

    closeFunc: function (targetObj) {
        //判断是否是移动端
        if (window.innerWidth < 768) {
            this.close(targetObj);
            this.maskhide(targetObj.parentElement.querySelector('.dl-sidebar-mask'));
        } else {
            this.close(targetObj);
        }
    },

    open: function (targetObj) {
        targetObj.classList.remove('dl-sidebar-closed');
        targetObj.classList.add('dl-sidebar-open');
    },
    close: function (targetObj) {
        targetObj.classList.remove('dl-sidebar-open');
        targetObj.classList.add('dl-sidebar-closed');
    },
    maskshow: function (maskObj) {
        maskObj.classList.add('dl-sidebar-mask-show');
        maskObj.classList.remove('dl-sidebar-mask-hide');
    },
    maskhide: function (maskObj) {
        maskObj.classList.add('dl-sidebar-mask-hide');
        maskObj.classList.remove('dl-sidebar-mask-show');
    }
}