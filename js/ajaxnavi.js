document.addEventListener('DOMContentLoaded', function() {
    const naviElements = document.querySelectorAll('.dl-navi');

    naviElements.forEach(naviElement => {
        const dataSource = naviElement.getAttribute('data-navi-source');
        //构造折叠展开按钮并添加到naviElement中
        var foldButton=document.createElement('button');
        foldButton.classList.add('dl-navi-fold');
        foldButton.textContent='≡';
        foldButton.setAttribute('title','展开');
        naviElement.appendChild(foldButton);
        foldButton.addEventListener('click', function(e) {
            var btntitle=e.target.getAttribute('title');
            console.log(naviElement,"naviElement");
            var navList=naviElement.querySelector('.dl-navi-list');
            
            if (btntitle=='展开') {
                //执行展开操作
                navList.style.height='auto';
                e.target.textContent='-';
                e.target.setAttribute('title','折叠');
            } else {
                //执行折叠操作
                resizeNavi(naviElement);
                e.target.textContent='≡';
                e.target.setAttribute('title','展开');
            }
            
        });
        
        if (dataSource) {
            fetch(dataSource)
                .then(response => response.json())
                .then(data => {
                    const navList = document.createElement('ul');
                    navList.classList.add('dl-navi-list');

                    data.forEach(item => {
                        const navItem = document.createElement('li');
                        navItem.classList.add('dl-navi-item');

                        const link = document.createElement('a');
                        if (item.url) {
                            link.href = item.url;
                        }
                        link.textContent = item.title;

                        if (item.class) {
                            link.classList.add(item.class);
                        }

                        if (item.id) {
                            link.id = item.id;
                        }

                        if (item.title) {
                            link.title = item.title;
                        }

                        navItem.appendChild(link);
                        navList.appendChild(navItem);
                    });

                    naviElement.appendChild(navList);
                    resizeNavi(naviElement);
                    //当appendChild完成时，调整尺寸
                })
                .catch(error => console.error('Error fetching navigation data:', error));
        }
    });
});




//调整尺寸，当dl-navi-list的高度大于dl-navi-item的高度时，调整dl-navi-list的高度为dl-navi-item的高度，并显示折叠展开按钮
var resizeNavi = function(naviElement) {
    console.log('resizeNavi');
    var navList = naviElement.querySelector('.dl-navi-list');
    if (navList) { // 检查navList是否存在
        var navListHeight = navList.scrollHeight;
        var naviListItem = navList.querySelector('.dl-navi-item');
        if (naviListItem) { // 检查naviListItem是否存在
            var naviListItemHeight = naviListItem.clientHeight;
            if (navListHeight > naviListItemHeight) {
                navList.style.height = naviListItemHeight + 'px';
                //显示折叠展开按钮
                naviElement.querySelector('.dl-navi-fold').style.display = 'block';
                naviElement.style.paddingRight = '30px';
                
            }
        }
    }
}


