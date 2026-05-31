# Mijn Levensreis - Persoonlijke & Professionele Bucketlist Website

Welkom bij **Mijn Levensreis**, een professionele, inspirerende en uitstekend vindbare full-stack bucketlist-website. Op deze website worden steden, landen, avontuurlijke ervaringen en levensdoelen overzichtelijk, warm en modern gepresenteerd en beheerd.

De website combineert een openbare, hoogwaardig gestylde frontend (met interactieve wereldkaart en geavanceerde filters) met een veilig beheerpaneel (`/admin`) om alle categorieën, landen, steden en bucketlist-items dynamisch bij te houden.

---

## 🌟 Belangrijkste Kenmerken

### Openbare Frontend
*   **Interactieve Wereldkaart (SVG)**: Een responsive, op maat gemaakte SVG-wereldkaart die landen kleurt op basis van hun status (*Wil bezoeken*, *Gepland*, *Bezocht*). Klikken op een land navigeert direct naar de detailpagina.
*   **Geavanceerde Filters & Zoeken**: Een snelle, dynamische zoek- en filterinterface op `/bucketlist` om dromen te filteren op status, prioriteit, land of categorie.
*   **Rijke Detailpagina's**: Dynamische detailpagina's voor landen (`/landen/[slug]`), plaatsen (`/plaatsen/[slug]`) en categorieën (`/categorieen/[slug]`).
*   **Rijk & Premium Design**: Een uitgebalanceerd kleurenpalet van nachtblauw (`#0B192C`) en zachte crème/beige zandtinten (`#F9F6F0`), verrijkt met warme gouden accenten (`#D4AF37`) en soepele Framer Motion micro-animaties.

### Beveiligde Admin Omgeving (`/admin`)
*   **Dashboard**: Live statistieken (totaal aantal doelen, bezochte landen, voltooiingspercentage) en handige snelkoppelingen.
*   **Volledige CRUD Panels**: Eenvoudig beheer van alle gegevens met validaties:
    *   **Categorieën**: Naam, slug, beschrijvingen en Lucide-iconen.
    *   **Landen & Steden**: Gedetailleerde info, continent, reistijden, foto's en status.
    *   **Bucketlist**: Beheer van doelen, prioriteiten, geplande/voltooide data, en geavanceerde vooraf/achteraf reflectieblokken.
*   **Media Manager**: Handige uploadzone voor afbeeldingen met de mogelijkheid om alt-teksten in te stellen en direct de paden te kopiëren voor gebruik in items.
*   **Instellingen**: Aanpassen van websitenaam, hero-titels, introductieteksten en standaard SEO-metadata.
*   **Rate-limiting & Brute Force Beveiliging**: De inlogpagina is beschermd tegen herhaalde inlogpogingen met een in-memory rate-limiter op `/api/admin/auth/login`.

---

## 🛠️ Technologie & Architectuur

*   **Framework**: Next.js 16+ (App Router) met TypeScript
*   **Styling**: Tailwind CSS v4 voor een modern en responsive grid-systeem
*   **Animaties**: Framer Motion voor vloeiende hover-effecten, scroll-reveals en overgangen
*   **Database & ORM**: Prisma ORM met een lokale **SQLite** database (`prisma/dev.db`) voor een direct werkende, zelfvoorziende database
*   **Beveiliging**: `jose` (JWT) in beveiligde `httpOnly` cookies en `bcryptjs` voor wachtwoordhashing
*   **SEO & GEO AI Optimization**:
    *   Volledige JSON-LD gestructureerde data (`WebSite`, `Place`, `TouristDestination`, `BreadcrumbList`) ingebouwd per pagina
    *   "Snelle Feiten" Q&A blokken voor optimale vindbaarheid in AI-zoekmachines (zoals Google Gemini en ChatGPT)
    *   Dynamisch gegenereerde `/sitemap.xml`
    *   Gepersonaliseerde `/robots.txt` die zoekmachines instrueert `/admin/*` niet te indexeren (`X-Robots-Tag` headers op admin routes)

---

## 📂 Project Structuur

```
/
├── prisma/
│   ├── schema.prisma       # Prisma database model
│   ├── seed.ts             # Seed script met 10 landen, steden en 10 bucketlist-items
│   └── dev.db              # SQLite database bestand (vooraf ingeladen)
├── public/
│   └── uploads/            # Uploadmap voor media manager
├── src/
│   ├── app/
│   │   ├── layout.tsx      # Globale layout (lettertypen, navigatie en footer)
│   │   ├── page.tsx        # Homepagina
│   │   ├── bucketlist/     # Interactieve bucketlist & wereldkaart
│   │   ├── landen/         # Overzicht en detailpagina's van landen
│   │   ├── plaatsen/       # Detailpagina's van steden/plekken
│   │   ├── categorieen/    # Overzicht en detailpagina's van de 12 levensgebieden
│   │   ├── admin/          # Beveiligd beheerpaneel (CRUDs, Media, Instellingen)
│   │   └── api/            # API REST-endpoints
│   ├── components/
│   │   ├── ui/             # Herbruikbare knoppen en inputs
│   │   ├── WorldMap.tsx    # Interactieve SVG Wereldkaart
│   │   ├── Breadcrumbs.tsx # SEO Breadcrumbs component
│   │   └── SchemaOrg.tsx   # JSON-LD Schema.org generator
│   ├── lib/
│   │   ├── db.ts           # Prisma database client
│   │   ├── auth.ts         # JWT / Cookie auth utilities
│   │   └── utils.ts        # CSS en slug helpers
│   └── middleware.ts       # Routebeveiliging & robots.txt headers
```

---

## 🚀 Aan de slag (Lokaal Starten)

### 1. Afhankelijkheden installeren
Zorg ervoor dat Node.js is geïnstalleerd. Run in de hoofdmap van het project:
```bash
npm install
```

### 2. Database Synchroniseren & Client Genereren
De SQLite database `prisma/dev.db` is al volledig gevuld met demo-data (10 landen, 10 plaatsen, 12 categorieën). Je hoeft alleen de Prisma client te genereren:
```bash
npx prisma generate
```

*(Optioneel)* Mocht je de database ooit leeg willen maken en opnieuw willen vullen met de originele seed-data, run dan:
```bash
npx prisma db push --force-accept-warnings
npx tsx prisma/seed.ts
```

### 3. Development Server Starten
Start de Next.js development server:
```bash
npm run dev
```
Open vervolgens [http://localhost:3000](http://localhost:3000) in je browser om de website te bekijken.

### 4. Production Build (Valideren)
Om een geoptimaliseerde productieversie te bouwen en te testen op compilatie:
```bash
npm run build
npm run start
```

---

## 🔐 Beheerderspaneel Inloggegevens

Om in te loggen op het beheerpaneel, navigeer naar [http://localhost:3000/admin](http://localhost:3000/admin) (of `/admin/login`).

*   **Gebruikersnaam**: `admin`
*   **Wachtwoord**: `DromenNanjagen2026!`

*Tip: Je kunt de website-instellingen, teksten, en SEO defaults direct aanpassen via de pagina "Instellingen" in het admin paneel.*
