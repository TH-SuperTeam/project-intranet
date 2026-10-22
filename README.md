<!--
  INSTRUKTION
  Det här är projektets startsida. Ersätt allt i den här filen med information om ert projekt.
  Kommentarer som den här syns bara när man redigerar filen, inte på GitHub. Ta bort dem när ni är klara.
-->

# Projektnamn

<!-- En eller två meningar: vad gör applikationen och för vem? -->

> **Project Intranet:** Ett webbaserat intranät för studenter och personal på Teknikhögskolan, där användare kan hantera profiler, läsa nyheter och ta del av relevant information via en gemensam dashboard. Projektet utvecklas med Java/Spring Boot och React/TypeScript enligt Scrum.

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

Frontend är byggd med React, TypeScript och Vite.

#### Installera beroenden

Öppna en ny terminal i projektets rotmapp och gå till frontend-mappen:

```bash
cd frontend
```

Installera alla beroenden:

```bash
npm install
```

Detta behöver normalt bara göras första gången, eller när beroendena har ändrats.

#### Starta utvecklingsservern

Kör följande kommando:

```bash
npm run dev
```

Terminalen visar en lokal URL, vanligtvis:

```text
http://localhost:5173
```

Öppna URL:en i webbläsaren för att se applikationen. Vite uppdaterar normalt sidan automatiskt när du sparar ändringar i koden.

#### Kontrollera koden

För att kontrollera att frontend-koden bygger utan fel:

```bash
npm run build
```

För att kontrollera kodens kvalitet med ESLint:

```bash
npm run lint
```

#### Starta både frontend och backend

Frontend och backend körs i separata terminaler.

- **Terminal 1:** Starta backend enligt instruktionerna ovan. Den körs normalt på `http://localhost:8080`.
- **Terminal 2:** Starta frontend enligt instruktionerna ovan. Den körs normalt på `http://localhost:5173`.

När båda är igång kan frontend och backend utvecklas och testas parallellt.

**Tips:** Om `npm` inte känns igen i terminalen behöver Node.js installeras. Om du får problem med beroenden, kontrollera att du står i `frontend`-mappen och att du använder en Node.js-version som stöds av projektets Vite-version.

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
