package de.thomcz.swaggergenerator

import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.Test

internal class HelloWorldRestControllerTest {

    private val helloWorldRestController = HelloWorldRestController()

    @Test
    fun hello_testGreeting() {
        val name = "Test"

        val greeting = helloWorldRestController.hello(name)

        assertThat(greeting.content).isEqualTo("Hello $name!")
    }
}