/*
 * @Description:
 * @Date: 2024-05-15 21:04:32
 * @LastEditors: lec
 * @LastEditTime: 2024-05-15 21:11:06
 */
package main

import "net/http"

func main() {
	http.Handle("/", http.StripPrefix("/", http.FileServer(http.Dir("../"))))
	println("Server started on port 8080")
	http.ListenAndServe(":8080", nil)
}
