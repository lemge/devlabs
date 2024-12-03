document.addEventListener('DOMContentLoaded', function() {
    const naviElements = document.querySelectorAll('.dl-navi');

    naviElements.forEach(naviElement => {
        const dataSource = naviElement.getAttribute('data-navi-source');
        
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
                })
                .catch(error => console.error('Error fetching navigation data:', error));
        }
    });
});


