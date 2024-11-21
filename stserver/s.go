/*
 * @Description:
 * @Date: 2024-05-15 21:04:32
 * @LastEditors: lec
 * @LastEditTime: 2024-09-22 22:59:08
 */
package main

import "net/http"

func main() {
	port:="8081"
	http.Handle("/", http.StripPrefix("/", http.FileServer(http.Dir("../"))))
	println("Server started on port "+port)
	println("Visit http://localhost:"+port+" in your browser")
	http.ListenAndServe(":"+port, nil)
}
