document.addEventListener('DOMContentLoaded', function() {
    const treeLists = document.querySelectorAll('.dl-tlist');

    treeLists.forEach(treeList => {
        const dataSource = treeList.getAttribute('data-tlist-source');
        
        if (dataSource) {
            fetch(dataSource)
                .then(response => response.json())
                .then(data => {
                    const tree = createTree(data.items);
                    treeList.appendChild(tree);
                })
                .catch(error => console.error('Error fetching tree list data:', error));
        }
    });

    function createTree(items) {
        const ul = document.createElement('ul');
        ul.classList.add('dl-tlist-list');

        items.forEach(item => {
            const li = document.createElement('li');
            li.classList.add('dl-tlist-item');
            const link = document.createElement('a');
            var icon = document.createElement('i');
            link.appendChild(icon);
            var tspan = document.createElement('span');
            tspan.textContent = item.title;
            link.appendChild(tspan);
            if (item.url) {
                link.href = item.url;
            }

            if (item.class) {
                link.classList.add(item.class);
            }

            if (item.id) {
                link.id = item.id;
            }

            if (item.title) {
                link.title = item.title;
            }

            li.appendChild(link);

            if (item.type === 'fold' && item.items && item.items.length > 0) {
                //添加特殊class，用于样式控制
                li.classList.add('dl-tlist-fold');
                const subTree = createTree(item.items);
                subTree.style.display = 'none'; // 初始状态为折叠
                li.appendChild(subTree);

                // 添加折叠/展开功能
                link.addEventListener('click', function(e) {
                    e.preventDefault(); // 阻止默认链接行为
                    if (subTree.style.display === 'none') {
                        subTree.style.display = 'flex';
                        li.classList.add('dl-tlist-fold-open');
                    } else {
                        subTree.style.display = 'none';
                        li.classList.remove('dl-tlist-fold-open');
                    }
                });
            }

            ul.appendChild(li);
        });

        return ul;
    }
});
