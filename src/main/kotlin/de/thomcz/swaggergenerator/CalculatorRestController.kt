package de.thomcz.swaggergenerator

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
class CalculatorRestController(private val calculatorService: CalculatorService) {

    @GetMapping("/sum")
    fun sun(@RequestParam(value = "summandA", defaultValue = "0") summandA: Int, @RequestParam(value = "summandB", defaultValue = "0") summandB: Int): Int =
            calculatorService.sum(summandA, summandB)

}