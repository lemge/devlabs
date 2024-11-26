
//autotable_example_data.js
//这个文件用于存储autotable的示例数据，使用js格式是为了更好的添加注释，在使用过程中会使用json数据格式。
var example_data =
{
    "v": 20241126223040,//数据标号
    "colinfo": [//列信息
        {
            "col": "id",//列名
            "title": "ID",//列显示标题
            "defval": "",//列默认值  
            "tr":{//数据显示翻译，如性别列，1:男，2:女这类。也可以是数据库中得来的数据
                "val1":"show1",
                "val2":"show2"
            },
            "width": 50,//列宽，如果没有设定就是自适应
            "func": "",//列内容格式化,处理函数
            "show": "comm/fold/hidden",//列可见性，comm等同于常规显示，fold等同于折叠，hidden等同于隐藏。fold会折叠在数据行的下面进行显示。
            "inform": true,//是否在修改或新增表单中显示，默认为true，false为不显示
            "datatype": "int",//数据类型,form中的数据类型标志
            "infilter": true//是否可以根据此列进行过滤筛选
        },
    
    ],
    "action": [//动作
        {
            "url": "/user/add",//动作url
            "name": "添加",//动作按钮名称
            "key": "id"//动作key的col名
        },
        {
            "url": "/user/edit",//动作url
            "name": "编辑",//动作按钮名称
            "key": "id"//动作key的col名
        },
        {
            "url": "/user/delete",//动作url
            "name": "删除",//动作按钮名称
            "key": "id"//动作key的col名
        }
    ],
    "index": "id",//主键，表格数据行唯一标识
    "tablename": "user",//表显示名称
    "info":{//表格信息
        "rows": 2000,//表格数据行数
        "page":1,//当前页面
        "pagelen":10//每页显示行数
    },
    "data": [//数据
        [1, "thisisname", "thisisvalue"],
        [2, "this is 2 name", "this is 2 value"]
    ]
}