# F1 Team Management API 🏎️

RESTful API zbudowane w frameworku NestJS do zarządzania zespołami Formuły 1. Aplikacja pozwala na rejestrację stajni wyścigowych, zarządzanie budżetem (Cost Cap), rekrutację personelu oraz przypisywanie bolidów, z zachowaniem  izolacji danych między użytkownikami.

## 🚀 Główne funkcjonalności

* **Bezpieczeństwo i Autoryzacja:** Implementacja JWT chroniąca wybrane zasoby. Zabezpieczenia przed atakami typu IDOR - użytkownik może modyfikować wyłącznie własny zespół i personel.
* **Transakcyjny Budżet (Cost Cap):** Zatrudnianie pracowników z wysokimi kontraktami dynamicznie i bezpiecznie (transakcje bazodanowe) uszczupla dostępny budżet stajni. API blokuje operacje przekraczające limit finansowy.
* **Zaawansowana Analityka w Bazie:** Dedykowany dashboard statystyczny generowany "w locie" przy użyciu agregacji Prisma (`_sum`, `groupBy`).
* **Miękkie Usuwanie (Soft Delete):** Zwalnianie pracowników nie usuwa ich permanentnie z bazy danych, zachowując spójność historyczną dla audytów, a jednocześnie ukrywając ich przed aktywnymi filtrami.
* **Dynamiczne Filtrowanie:** Możliwość wyszukiwania personelu poprzez parametry zapytań (Query Parameters), np. po roli w zespole lub minimalnych zarobkach.
* **Rygorystyczna Walidacja:** Ochrona przed nieprawidłowymi danymi (np. ujemne wartości budżetu, zbyt długie ciągi znaków) przy pomocy `class-validator`.

## 🛠️ Technologie

* **Framework:** NestJS (TypeScript)
* **Baza Danych:** PostgreSQL
* **ORM:** Prisma
* **Dokumentacja:** Swagger (OpenAPI)
* **Zabezpieczenia:** Passport.js (JWT), bcrypt

## ⚙️ Uruchomienie projektu

1. Zainstaluj zależności:
`npm install`

2. Skonfiguruj zmienne środowiskowe:
Utwórz plik `.env` w głównym folderze projektu i wskaż adres do swojej bazy PostgreSQL. Zmienna dla klucza autoryzacji jest opcjonalna - przygotowałem bezpieczny fallback, aby ułatwić testowanie.

```env
DATABASE_URL="postgresql://twoj_uzytkownik:twoje_haslo@localhost:5432/nazwa_bazy"
# JWT_SECRET="opcjonalny_wlasny_klucz" (jeśli pominięte, aplikacja użyje domyślnego klucza)
```

3. Wypchnij schemat do bazy danych:
`npx prisma db push`

4. Uruchom serwer w trybie deweloperskim:
`npm run start:dev`

## 📖 Dokumentacja API

Interaktywna dokumentacja Swagger jest dostępna po uruchomieniu serwera pod adresem:
`http://localhost:3000/api`

---
**Autor:** Wojciech Stróżyński
