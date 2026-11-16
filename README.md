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
| Inna Kuljanac | |
| Caroline Enggren | |
| Josefine Asplund | |
| Sofie Törnqvist | |
| Mette Karlsson | |

## Teknik

<!-- Frontend, backend, databas och eventuella större bibliotek. Motivera valet i docs/beslutslogg.md. -->

| Del | Teknik |
|---|---|
| Frontend | TypeScript, React |
| Backend | Java, Spring Boot |
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

### 3. Konfigurera JWT (JSON Web Token)

Backend använder JWT (JSON Web Token) för att hantera autentisering och säkerställa att endast inloggade användare kan komma åt skyddade endpoints.

JWT-nyckeln används för att signera och verifiera tokens. Av säkerhetsskäl ska nyckeln aldrig sparas direkt i källkoden eller pushas till GitHub.

Varje utvecklare behöver därför skapa en egen lokal JWT-nyckel innan backend startas.

#### 1. Generera en JWT-nyckel

För att skapa en säker JWT-nyckel används OpenSSL.

Öppna terminalen och kör:

```bash
openssl rand -base64 32
```

Kommandot genererar en slumpmässig nyckel på 32 bytes, kodad i Base64.

Exempel på resultat:

```text
aB3xYz9KpQ7mN2vL5wR8sT1uE4fG6hJ0kM3nP5qS7vA=
```

**Viktigt:** Exemplet ovan är endast illustrativt. Använd alltid din egen genererade nyckel.

Kopiera den genererade nyckeln. Den behövs i nästa steg.

Varje utvecklare ska generera sin egen nyckel. Det är inte nödvändigt att dela JWT-nycklar med övriga gruppmedlemmar.

**Alternativ för Windows (PowerShell)**

Om OpenSSL inte är installerat på din dator kan du istället generera en JWT-nyckel direkt via PowerShell.

Öppna PowerShell och kör:

```powershell
$bytes = New-Object byte[] 32
$rng = [System.Security.Cryptography.RandomNumberGenerator]::Create()
$rng.GetBytes($bytes)
[Convert]::ToBase64String($bytes)
$rng.Dispose()
```

Kommandot genererar en slumpmässig nyckel på 32 bytes, kodad i Base64.

Kopiera resultatet och använd det i nästa steg på samma sätt som med OpenSSL.

#### 2. Konfigurera JWT-nyckeln lokalt

JWT-konfigurationen finns i backendens:

`backend/src/main/resources/application.properties`

Där finns följande inställningar:

```properties
# JWT configuration
jwt.secret=${JWT_SECRET}
jwt.expiration=3600000
```

- `jwt.secret` hämtar JWT-nyckeln från en lokal miljövariabel som heter `JWT_SECRET`.
- `jwt.expiration` anger hur länge en JWT-token är giltig, i millisekunder.

Standardinställningen är `3600000`, vilket motsvarar **1 timme**.

I din fil `backend/src/main/resources/application-local.properties` lägger du till ```JWT_SECRET=DIN_JWT_NYCKEL_123456```

### 4. Konfigurera Trafiklab API

Transportwidgeten använder Trafiklabs API för att hämta aktuella bussavgångar.

Varje utvecklare utanför projektgruppen behöver skapa en egen API-nyckel via [Trafiklab](https://www.trafiklab.se/).

1. Skapa ett konto på Trafiklab.
2. Skapa ett projekt och aktivera Realtime API.
3. Generera en API-nyckel.

Lägg sedan till följande i `backend/src/main/resources/application-local.properties`:

```properties
TRAFIKLAB_API_KEY=DIN_EGEN_API_NYCKEL
```

API-nyckeln hämtas automatiskt av backendens konfiguration. Filen `application-local.properties` är lokal och ska inte pushas till GitHub.

**Viktigt:** Dela aldrig din API-nyckel offentligt eller lägg in den direkt i källkoden.

### 5. Starta backend

Öppna terminalen i projektets rotmapp:

```bash
cd backend
```

Starta Spring Boot på Windows:

```powershell
.\mvnw.cmd spring-boot:run
```

Backend körs normalt på `http://localhost:8080`.

### 6. Starta frontend

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
