package de.thomcz.swaggergenerator

import org.springframework.http.MediaType
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
class HelloWorldRestController() {

    @GetMapping("/api/hello", produces = [MediaType.APPLICATION_JSON_VALUE])
    fun hello(@RequestParam name: String): Greeting = Greeting("Hello $name!")

}