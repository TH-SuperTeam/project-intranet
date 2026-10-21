<!--
  INSTRUKTION
  Det här är projektets startsida. Ersätt allt i den här filen med information om ert projekt.
  Kommentarer som den här syns bara när man redigerar filen, inte på GitHub. Ta bort dem när ni är klara.
-->

# Projektnamn

<!-- En eller två meningar: vad gör applikationen och för vem? -->

> **Exempel (Sysslo):** En webbapp där studenter som delar lägenhet fördelar och bockar av hushållssysslor.

## Teamet

| Namn | GitHub |
|---|---|
| | |
| | |
| | |
| | |

## Teknik

<!-- Frontend, backend, databas och eventuella större bibliotek. Motivera valet i docs/beslutslogg.md. -->

| Del | Teknik |
|---|---|
| Frontend | |
| Backend | |
| Databas | |

## Kom igång

### 1. Klona projektet

```bash
git clone <repo-url>
cd <projektmapp>
```

### 2. Konfigurera databasen

Projektet använder MySQL. Se till att MySQL är installerat och att databasen `school_intranet` är skapad.

1. Gå till `backend/src/main/resources/`.
2. Kopiera filen `application.properties.example`.
3. Döp kopian till `application.properties`.
4. Öppna filen och fyll i dina egna MySQL-uppgifter:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/school_intranet
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD
```

**Viktigt:** `application.properties` innehåller lokala inloggningsuppgifter och ska inte pushas till GitHub. Kontrollera att filen finns i `.gitignore`.

### 3. Starta backend

Öppna terminalen i projektets rotmapp:

```bash
cd backend
```

Starta Spring Boot på Windows:

```powershell
.\mvnw.cmd spring-boot:run
```

Backend körs normalt på `http://localhost:8080`.

### 4. Starta frontend

*Instruktioner för frontend läggs till när den är uppsatt.*

## Dokumentation

| Dokument | Innehåll |
|---|---|
| [Gruppkontrakt](docs/gruppkontrakt.md) | Hur vi samarbetar |
| [Definition of Done](docs/definition-of-done.md) | När en story räknas som klar |
| [MVP](docs/mvp.md) | Vad som ingår i första versionen |
| [Databasschema](docs/databasschema.md) | Tabeller och relationer |
| [Beslutslogg](docs/beslutslogg.md) | Viktiga beslut och varför |
| [Sprintar](docs/sprintar/) | Planning, standups, review och retro per sprint |
| [Individuella reflektioner](docs/reflektioner/) | En per person, lämnas in vecka 8 |

## Board

<!-- Länk till ert projekt i GitHub Projects. -->

[Länk till boarden]()