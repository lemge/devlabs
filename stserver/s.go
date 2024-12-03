/*
 * @Description:
 * @Date: 2024-05-15 21:04:32
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-11-29 10:14:19
 */
package main

import (
	"encoding/json"
	"net/http"
)

var exampleData = map[string]any{
	"v": 20241126223040, //数据标号
	"colinfo": []map[string]any{ //列信息
		{
			"col":    "id", //列名
			"title":  "编号", //列显示标题
			"defval": "",   //列默认值
			"tr": map[string]string{ //数据显示翻译，如性别列，1:男，2:女这类。也可以是数据库中得来的数据
				"val1": "show1",
				"val2": "show2",
			},
			"width":    50,                 //列宽，如果没有设定就是自适应
			"func":     "",                 //列的计算公式
			"show":     "comm/fold/hidden", //列可见性，comm等同于常规显示，fold等同于折叠，hidden等同于隐藏。fold会折叠在数据行的下面进行显示。
			"inform":   false,               //是否在修改或新增表单中显示，则为true，false为不显示
			"datatype": "int",              //数据类型,form中的数据类型标志
			"infilter": true,               //是否在过滤器中显示，则为true，false为不显示
		},
		{
			"col":    "title", //列名
			"title":  "标题",    //列显示标题
			"defval": "",      //列默认值
			"tr": map[string]string{ //数据显示翻译，如性别列，1:男，2:女这类。也可以是数据库中得来的数据
				"val1": "show1",
				"val2": "show2",
			},
			"width":    50,                 //列宽，如果没有设定就是自适应
			"func":     "",                 //列的计算公式
			"show":     "comm/fold/hidden", //列可见性，comm等同于常规显示，fold等同于折叠，hidden等同于隐藏。fold会折叠在数据行的下面进行显示。
			"inform":   true,               //是否在修改或新增表单中显示，则为true，false为不显示
			"datatype": "int",              //数据类型,form中的数据类型标志
			"infilter": true,               //是否在过滤器中显示，则为true，false为不显示
		},
		{
			"col":    "main", //列名
			"title":  "内容",   //列显示标题
			"defval": "",     //列默认值
			"tr": map[string]string{ //数据显示翻译，如性别列，1:男，2:女这类。也可以是数据库中得来的数据
				"val1": "show1",
				"val2": "show2",
			},
			"width":    50,                 //列宽，如果没有设定就是自适应
			"func":     "",                 //列的计算公式
			"show":     "comm/fold/hidden", //列可见性，comm等同于常规显示，fold等同于折叠，hidden等同于隐藏。fold会折叠在数据行的下面进行显示。
			"inform":   true,               //是否在修改或新增表单中显示，则为true，false为不显示
			"datatype": "int",              //数据类型,form中的数据类型标志
			"infilter": true,               //是否在过滤器中显示，则为true，false为不显示
		},
		{
			"col":    "img", //列名
			"title":  "附图",  //列显示标题
			"defval": "",    //列默认值
			"tr": map[string]string{ //数据显示翻译，如性别列，1:男，2:女这类。也可以是数据库中得来的数据
				"val1": "show1",
				"val2": "show2",
			},
			"width":    50,                 //列宽，如果没有设定就是自适应
			"func":     "",                 //列的计算公式
			"show":     "comm/fold/hidden", //列可见性，comm等同于常规显示，fold等同于折叠，hidden等同于隐藏。fold会折叠在数据行的下面进行显示。
			"inform":   true,               //是否在修改或新增表单中显示，则为true，false为不显示
			"datatype": "int",              //数据类型,form中的数据类型标志
			"infilter": true,               //是否在过滤器中显示，则为true，false为不显示
		},
	},
	"action": []map[string]any{ //动作
		{
			"url":  "/user/add", //动作url
			"name": "添加",        //动作按钮名称
			"act":  "add",       //动作标识
			"key":  "id",        //动作按钮的key
		},
		{
			"url":  "/user/edit",
			"name": "编辑",
			"act":  "edit",
			"key":  "id",
		},
		{
			"url":  "/user/delete",
			"name": "删除",
			"act":  "delete",
			"key":  "id",
		},
	},
	"index":     "id",   //主键，表格数据行唯一标识
	"tablename": "user", //表显示名称
	"pageinfo": map[string]any{ //表格信息
		"rows":    200, //表格数据行数
		"page":    1,   //当前页
		"pagelen": 30,  //每页显示行数
	},
	"data": [][]any{ //表格数据
		{1, "thisisname", "thisisvalue", "/img/e.jpeg"},
		{2, "this is 2 name", "this is 2 value", "/img/e.jpeg"},
	},
}

// 示例数据，访问http://localhost:8081/example,返回json格式的示例数据
func handleExample(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	enc := json.NewEncoder(w)
	enc.Encode(exampleData)
}

var naviinfo = []map[string]any{
	{
		"title": "导航栏",
	},
	{
		"title": "首页",
		"url":   "/index.html",
	},
	{
		"title": "自动表格",
		"url":   "/autotable.html",
	},
	{
		"title": "按钮",
		"url":   "/buttons.html",
	},
	{
		"title": "颜色",
		"url":   "/color.html",
	},
	{
		"title": "标签",
		"url":   "/tag.html",
	},
	{
		"title": "表单",
		"url":   "/form.html",
		"id":    "test-id",
		"class": "test-class",
	},
	
}

//导航信息
func handleNaviinfo(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	enc := json.NewEncoder(w)
	enc.Encode(naviinfo)
}

func main() {
	port := "8081"
	http.Handle("/", http.StripPrefix("/", http.FileServer(http.Dir("../"))))
	http.HandleFunc("/example", handleExample)
	http.HandleFunc("/naviinfo", handleNaviinfo)
	println("Server started on port " + port)
	println("Visit http://localhost:" + port + " in your browser")
	http.ListenAndServe(":"+port, nil)
}
