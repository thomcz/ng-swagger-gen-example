package de.thomcz.swaggergenerator

import org.springframework.stereotype.Service

@Service
class CalculatorService {
    fun sum(summandA: Int, summandB: Int): Int = summandA + summandB
}