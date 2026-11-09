# Gruppkontrakt

**Grupp:** SuperTeam  
**Datum:** 2026-10-13

## Tillgänglighet

- Vi jobbar vardagar kl. 9–16.
- Daily standup kl. 9.00 tis–fre om inget annat kommuniceras.
- Scrum Master loggar the daily standups.
- Kvällar och helger är frivilligt. Ingen förväntas svara då.
- Under arbetstid svarar vi på meddelanden inom 2 timmar.

## Kommunikation

- Slack för snabba frågor och daglig kontakt.
- Frågor om specifik kod tas i `#code-comments`.
- Vi ger feedback på koden, inte på personen.

## Närvaro och frånvaro

- Frånvaro meddelas i `#meeting-channel`.
- Den som missar daily standup skriver sin rad i loggen själv samma dag.

## Arbetsfördelning

- Vi kommer överens om vilka "Att göra" vi ansvarar för.
- Den som kört fast i mer än en timme ber om hjälp.
- Den som blir klar hjälper till med granskning innan den tar en ny story.
- Det är ok att lägga in nya issues/user stories i backlogen individuellt, men de ska inte sättas som To-Do innan en sprint planning. På sprint planning går vi igenom de tillsammans, rangordnar och accepterar.

## Beslut

- Mindre beslut tar den som äger frågan.
- Större beslut (stack, arkitektur, större ändringar i MVP) tas gemensamt och skrivs in i beslutsloggen.
- Om vi inte kommer överens röstar vi. Vid lika har Product Owner sista ordet om vad som byggs.

## Kod och kvalitet

- Pull requests granskas inom 24 timmar på vardagar.
- Man mergar sin egen pull request efter godkänd review.
- Commits sker löpande under kodning. När något fungerar committar man.
- Man ska mergea in dev innan man pushar sin branch.
- Vi namnger branches på engelska och med prefix:

| Prefix | Beskrivning |
|--------|-------------|
| `feature/` | Ny funktionalitet |
| `fix/` | Buggfixar |
| `hotfix/` | Akuta buggar, ofta i produktion |
| `chore/` | Underhåll, dependencies, konfiguration |
| `refactor/` | Förbättra kod utan att ändra funktionalitet |
| `test/` | Skriva eller förbättra tester |
| `docs/` | Dokumentation |
| `ci/` | CI/CD, exempelvis GitHub Actions |

## Om någon inte följer kontraktet

1. Vi tar upp det direkt med personen.
2. Om det fortsätter tar vi upp det på retron.
3. Om det fortfarande inte löser sig tar vi upp det med läraren.

## Underskrifter

**Vi har läst kontraktet och är överens om det.**

| Namn | Datum | Rev. datum
|------|-------|------|
| Sofie Törnqvist | 2026-10-13 | 2026-11-03 |
| Josefine Asplund | 2026-10-13 | 2026-11-03 |
| Mette Karlsson | 2026-10-13 | 2026-11-03 |
| Inna Kuljanac | 2026-10-13 | 2026-11-03 |
| Caroline Enggren | 2026-10-13 | 2026-11-03 |

## Ändringar

| Datum | Ändring | Anledning |
|-------|---------|-----------|
| 2026-10-22 | Ändrade merge-punkten under Kod och kvalitet och la till daily standup. | Förberedelser inför första sprinten. |
| 2026-11-03 | La till merge med dev under Kod och kvalitet samt individuella issues under Arbetsfördelning | Resultat av första retron. |
