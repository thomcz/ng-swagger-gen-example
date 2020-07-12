# ng-swagger-gen-example
# Motivation
Im einem aktuellen Projekt verwenden wir ng-swagger-gen und ng-openapi-gen um interfaces und web service clients aus unserer Swagger 2.0 oder OpenApi 3 Spezifikation zu generieren.
Im Folgenden möchte ich das am Beispiel von ng-openapi-gen zeigen. Dazu gehört:
- 
- 

Zu beginn haben wir unser Backend mithilfe des HttpClient aufgerufen

```
...
constructor(private httpClient: HttpClient) { ... }
...
getSomeData() {
    return this.httpClient.get(`https://someapi.org/v2/getSomeData?input=someInput`);
}
...
```

Dies hat aber zu Problemene geführt, wenn sich das BE geändert hat oder es falsch aufgerufen wurde. Wir wollten an dieser Stelle mehr Typsicherheit und compile Fehler, wenn es zu Änderungen kommt.

# Die Idee
Mithilfe von ng-swagger-gen und ng-openapi-gen können wir aus unserer Swagger Spezifikation Schnittstellen für unser Frontend generieren und erhalten kompilierfehler sobald sich etwas am BE ändert. 

# Implementierung
## Unser BE
Der Code ist hier. Im Folgenden Beispiel nutzen wir ein HelloWorld Controller der auf anfrage ein Hello World zurückgibt:
```
data class Greeting(val content: String)

@GetMapping("/api/hello", produces = [MediaType.APPLICATION_JSON_VALUE])
    fun hello(): Greeting = Greeting("Hello World!")
```
und das war es schon auf BE Seite.

## Unser FE
Im FE haben wir jetzt 2 Möglichkeiten den Endpunkt aufzurufen. 
Zum einen können wir das ganze mithilfe des HttpClient aufrufen
```
hello:Observable<Object>
constructor(private httpClient: HttpClient) { 
    this.hello = this.httpClient.get(`http://localhost:8080/api/hello`);
}
```
im Html subscriben wir das Observable und zeigen den Inhalt an
```
{{(hello|async)|json}}
```
Mit diesem Ansatz habne wir folgende Probleme: ...

Mithilfe von ng-openapi-gen können wir diese Probleme lösen.

Dazu müssen wir das Paket installieren
```
npm i ng-openapi-gen
```

und legen im package.json einen Task an

```
{
    ...
    "scripts": {
        "ng-openapi-gen": "ng-openapi-gen",
        ...
    }
}
```
um den Pfad der Spezifikation angeben zu könnne benötigt es im Hauptverzeichnis eine ```ng-openapi-gen.json``` mit folgenden Inhalt:
```
{
    "$schema": "node_modules/ng-openapi-gen/ng-openapi-gen-schema.json",
    "input": "http://localhost:8080/v3/api-docs",
    "output": "src/generated-backend",
    "ignoreUnusedModels": false
  }
```
Wenn wir jetzt unser BE laufen lassen und den ```ng-openapi-gen.json``` Task laufen lassen wird in src/generated-backend unsere BE-Schnittstelle generiert. Um das verwenden zu können muss im im app.module.ts das backend modul eingebunden werden
```

@NgModule({
  declarations: [
    ...
  ],
  imports: [
    ...
    ApiModule
  ],
  ...
})
export class AppModule { }
```
Jetzt können wir die generierte Schnittstelle in unserer Komponente verwenden:

```
hello:Observable<Greeting>
constructor(private greetingService: HelloWorldRestControllerService) { 
   this.hello = this.greetingService.hello();
}
```
was direkt auffällt, ist, dass wir einen konkreten Typ für das Observable angeben können.

Wenn sich jetzt unser BE ändert

# Part 2 
Integration in Build Prozess