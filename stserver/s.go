/*
 * @Description:
 * @Date: 2024-05-15 21:04:32
 * @LastEditors: lec
 * @LastEditTime: 2024-09-22 22:59:08
 */
package main

import "net/http"

func main() {
	http.Handle("/", http.StripPrefix("/", http.FileServer(http.Dir("../"))))
	println("Server started on port 8080")
	println("Visit http://localhost:8080 in your browser")
	http.ListenAndServe(":8080", nil)
}
