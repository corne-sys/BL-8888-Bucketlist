import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  // 1. Clean database
  await prisma.bucketlistItem.deleteMany();
  await prisma.place.deleteMany();
  await prisma.country.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();
  await prisma.setting.deleteMany();
  await prisma.media.deleteMany();

  // 2. Create admin user
  const passwordHash = await bcrypt.hash('DromenNanjagen2026!', 10);
  const admin = await prisma.user.create({
    data: {
      username: 'admin',
      passwordHash,
    },
  });
  console.log(`Created admin user: ${admin.username}`);

  // 3. Create global settings
  await prisma.setting.create({
    data: {
      id: 'global',
      websiteName: 'Mijn Bucket List',
      introText: 'Welkom op mijn persoonlijke levenskaart. Hier verzamel, orden en volg ik de dromen, doelen en bestemmingen die mij inspireren om bewuster te leven, de wereld te ontdekken en betekenisvol bij te dragen.',
      heroTitle: 'Mijn Bucket List',
      heroSubtitle: 'Steden, landen, ervaringen en doelen die mij inspireren om bewuster te leven, te reizen en bij te dragen aan een mooiere wereld.',
      defaultSeoTitle: 'Mijn Persoonlijke Bucketlist - Dromen, Ontdekken & Groeien',
      defaultSeoDescription: 'Welkom op mijn persoonlijke bucketlist en levenskaart. Ontdek mijn reisdoelen, avonturen en ambities voor persoonlijke groei.',
      socialShareImage: '/colosseum_sunset.png',
      email: 'contact@mijnlevensreis.nl',
      footerText: '© 2026 Mijn Bucket List. Ontwerp je eigen leven, volg je dromen en verleg je grenzen.',
    },
  });
  console.log('Created global settings');

  // 4. Create Categories
  const categoriesData = [
    {
      name: 'Avontuur',
      slug: 'avontuur',
      shortDescription: 'Grensverleggende en adrenalineverhogende ervaringen.',
      longDescription: 'Avontuur gaat over het stappen buiten je comfortzone, het overwinnen van angsten en het ervaren van de pure opwinding van het onbekende. Van diepzeeduiken tot bergbeklimmen, dit zijn de momenten die je hart sneller laten kloppen.',
      icon: 'Compass',
      image: 'https://images.unsplash.com/photo-1533240332313-0db49b439ad3?q=80&w=800',
      seoTitle: 'Avontuurlijke Bucketlist - Grensverleggende Ervaringen',
      seoDescription: 'Ontdek avonturen die grenzen verlegen en adrenaline verhogen. Van bergbeklimmen tot diepzeeduiken op mijn persoonlijke bucketlist.',
      status: 'actief',
      sortOrder: 1,
    },
    {
      name: 'Persoonlijke ontwikkeling',
      slug: 'persoonlijke-ontwikkeling',
      shortDescription: 'Doelen gericht op mentaal welzijn, leren en innerlijke groei.',
      longDescription: 'Innerlijke groei is de basis van een rijk leven. Deze categorie omvat doelen die bijdragen aan zelfkennis, intellectuele verbreding, nieuwe vaardigheden en het cultiveren van een bewuste en veerkrachtige levenshouding.',
      icon: 'BookOpen',
      image: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=800',
      seoTitle: 'Persoonlijke Ontwikkeling - Groeien en Leren',
      seoDescription: 'Mijn doelen voor innerlijke groei, levenslessen en het beheersen van nieuwe vaardigheden op mijn persoonlijke bucketlist.',
      status: 'actief',
      sortOrder: 2,
    },
    {
      name: 'Bijdrage aan de wereld',
      slug: 'bijdrage-aan-de-wereld',
      shortDescription: 'Vrijwilligerswerk, duurzaamheid en iets teruggeven aan de maatschappij.',
      longDescription: 'Een rijker leven bereik je niet alleen door te consumeren en te reizen, maar juist door bij te dragen. Deze projecten richten zich op het achterlaten van een positieve voetafdruk, het ondersteunen van anderen en het behoud van onze prachtige planeet.',
      icon: 'Heart',
      image: 'https://images.unsplash.com/photo-1469571486040-afbef0cd37bc?q=80&w=800',
      seoTitle: 'Bijdragen aan de Wereld - Maatschappelijke Doelen',
      seoDescription: 'Iets teruggeven aan de maatschappij. Ontdek mijn doelen voor vrijwilligerswerk en duurzaamheid op mijn bucketlist.',
      status: 'actief',
      sortOrder: 3,
    },
    {
      name: 'Landen bezoeken',
      slug: 'landen-bezoeken',
      shortDescription: 'Nieuwe culturen ontdekken en grenzen overschrijden.',
      longDescription: 'Reizen verbreedt je horizon als niets anders. Het ontdekken van nieuwe landen opent je ogen voor alternatieve manieren van leven, adembenemende landschappen en culturele rijkdommen die je kijk op de wereld voorgoed veranderen.',
      icon: 'Globe',
      image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=800',
      seoTitle: 'Landen Bezoeken - Reisdromen & Wereldkaart',
      seoDescription: 'De landen die ik absoluut wil bezoeken om culturen en landschappen te ontdekken. Mijn ultieme reisbucketlist.',
      status: 'actief',
      sortOrder: 4,
    },
    {
      name: 'Steden bezoeken',
      slug: 'steden-bezoeken',
      shortDescription: 'Bruisende metropolen en historische steden verkennen.',
      longDescription: 'Steden zijn de broeinesten van cultuur, architectuur en menselijke energie. Van historische steegjes in Europa tot futuristische wolkenkrabbers in Azië, elke stad vertelt haar eigen fascinerende verhaal.',
      icon: 'MapPin',
      image: 'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?q=80&w=800',
      seoTitle: 'Steden Bezoeken - Stedentrip & Cultuur',
      seoDescription: 'Van verborgen historische parels tot gigantische moderne metropolen die op mijn stedelijke bucketlist staan.',
      status: 'actief',
      sortOrder: 5,
    },
    {
      name: 'Natuur & buitenleven',
      slug: 'natuur-buitenleven',
      shortDescription: 'Kamperen, wandelen en verbinding maken met de wildernis.',
      longDescription: 'In de natuur vinden we rust, bezinning en pure schoonheid. Deze categorie omvat doelen waarbij de wilde natuur de hoofdrol speelt: van trektochten door nationale parken tot het slapen onder een heldere sterrenhemel.',
      icon: 'Trees',
      image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=800',
      seoTitle: 'Natuur & Buitenleven - Wildernis & Rust',
      seoDescription: 'Verbinding maken met de elementen. Ontdek mijn natuurdoelen en outdoor avonturen op deze bucketlist.',
      status: 'actief',
      sortOrder: 6,
    },
  ];

  const categoriesMap: { [key: string]: any } = {};
  for (const cat of categoriesData) {
    const created = await prisma.category.create({
      data: cat,
    });
    categoriesMap[created.slug] = created;
  }
  console.log(`Created ${Object.keys(categoriesMap).length} categories`);

  // 5. Create Countries
  const countriesData = [
    {
      name: 'Japan',
      slug: 'japan',
      continent: 'Azië',
      shortDescription: 'Een unieke samensmelting van eeuwenoude tradities en hypermoderne technologie.',
      longDescription: 'Japan fascineert op elk niveau. Van de serene boeddhistische tempels en shinto-heiligdommen in de historische hoofdstad Kyoto tot de neonverlichte, bruisende straten van Tokio. Het land biedt een ongeëvenaarde esthetiek, uitzonderlijk eten en een diepe respectvolle cultuur die indruk maakt op elke bezoeker.',
      visitReason: 'Ik wil Japan bezoeken om de diepe spirituele rust in de tempels te ervaren, de verfijnde Japanse keuken te proeven en de contrasten tussen traditie en futurisme met eigen ogen te zien.',
      bestTravelTime: 'Lente (maart t/m mei - kersenbloesem) en Herfst (september t/m november - herfstkleuren).',
      personalMotivation: 'Als tiener was ik al gefascineerd door Japanse tuinen en zen-filosofie. Dit land is voor mij de ultieme bestemming voor innerlijke rust en visuele inspiratie.',
      image: '/tokyo.png',
      status: 'nog_te_bezoeken',
      seoTitle: 'Mijn Japan Bucketlist - Tempels & Cultuur Ontdekken',
      seoDescription: 'Ontdek de mooiste reisdoelen en ervaringen in Japan op mijn persoonlijke bucketlist, waaronder de tempels van Kyoto en de zen-cultuur.',
      geoKeywords: 'bucketlist Japan, mooiste plekken in Japan, reisdoelen Japan, tempels Kyoto, reizen naar Japan',
    },
    {
      name: 'Noorwegen',
      slug: 'noorwegen',
      continent: 'Europa',
      shortDescription: 'Majestueuze fjorden, dramatische bergen en het magische dansende Noorderlicht.',
      longDescription: 'Noorwegen biedt een van de meest indrukwekkende natuurlandschappen ter wereld. De diepe fjorden die door gletsjers zijn uitgesleten, de steile kliffen, en de dichte dennenbossen nodigen uit tot avontuur. In de winter transformeert het noorden in een ijzig sprookje onder het Noorderlicht, terwijl in de zomer de middernachtzon eindeloze dagen brengt.',
      visitReason: 'Voor het maken van een epische roadtrip langs de fjorden, wildkamperen in de bergen en het zien van het Noorderlicht.',
      bestTravelTime: 'Juni t/m augustus voor wandelen en roadtrips; december t/m maart voor wintersport en het Noorderlicht.',
      personalMotivation: 'De ongerepte wildernis trekt mij enorm aan. Ik wil de stilte van de Noorse fjorden ervaren en mijn fysieke grenzen verlegen in de bergen.',
      image: 'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?q=80&w=1200',
      status: 'nog_te_bezoeken',
      seoTitle: 'Noorwegen Bucketlist - Fjorden, Bergen en Noorderlicht',
      seoDescription: 'Ontdek mijn reisplannen voor Noorwegen. Roadtrips door de fjorden and wandelingen door de ruige Scandinavische wildernis.',
      geoKeywords: 'bucketlist Noorwegen, roadtrip Noorwegen, mooiste fjorden Noorwegen, Noorderlicht zien, wildkamperen Noorwegen',
    },
    {
      name: 'Finland',
      slug: 'finland',
      continent: 'Europa',
      shortDescription: 'Het land van duizend meren, uitgestrekte bossen en het officiële huis van de Kerstman.',
      longDescription: 'Finland staat bekend om zijn ongerepte wildernis en diepe verbondenheid met de natuur. Van de uitgestrekte bossen en duizenden meren in het zuiden tot de magische, diep besneeuwde landschappen van Lapland in het noorden. Het is de ultieme bestemming voor stilte, winterse avonturen en de authentieke Finse saunacultuur.',
      visitReason: 'Het ervaren van de echte Finse saunacultuur, het maken van een tocht met husky-sledehonden door de sneeuw en slapen in een glazen iglo onder het poollicht.',
      bestTravelTime: 'December t/m maart voor winteravonturen en gegarandeerde sneeuw; juni t/m augustus voor kamperen bij de meren.',
      personalMotivation: 'Finland staat voor rust, minimalisme en verbinding met de aarde. Ik wil de pure stilte van de besneeuwde dennenbossen ervaren om helemaal op te laden.',
      image: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?q=80&w=1200',
      status: 'nog_te_bezoeken',
      seoTitle: 'Finland Bucketlist - Lapland, Poollicht & Saunacultuur',
      seoDescription: 'Ontdek mijn reisdromen voor Finland. Slapen in een glazen iglo, huskytochten maken en de rust van de Finse poolcirkel ervaren.',
      geoKeywords: 'bucketlist Finland, Lapland reizen, glazen iglo Finland, husky safari Lapland',
    },
    {
      name: 'Ierland',
      slug: 'ierland',
      continent: 'Europa',
      shortDescription: 'Het ruige, smaragdgroene eiland vol Keltische mystiek en adembenemende kustlijnen.',
      longDescription: 'Ierland betovert met zijn dramatische landschappen en legendarische gastvrijheid. Het eiland wordt gekenmerkt door glooiende groene heuvels, torenhoge kliffen zoals de Cliffs of Moher, eeuwenoude Keltische ruïnes en de gezellige sfeer in traditionele pubs waar live Keltische folkmuziek klinkt.',
      visitReason: 'Het bewandelen van de spectaculaire Cliffs of Moher, het rijden van de Ring of Kerry en het proeven van de gezellige sfeer in een traditionele pub in Dublin.',
      bestTravelTime: 'Mei t/m september (de zachtste en droogste maanden van het jaar).',
      personalMotivation: 'Ierse volksverhalen en Keltische muziek hebben mij altijd geïnspireerd. Ik wil deze magische geschiedenis aan de wilde Atlantische kust beleven.',
      image: '/ireland.png',
      status: 'nog_te_bezoeken',
      seoTitle: 'Ierland Bucketlist - Ruige Kliffen & Pub Cultuur',
      seoDescription: 'Verken mijn Ierland bucketlist. Wandelen langs de Cliffs of Moher en roadtrippen langs de ruige Wild Atlantic Way.',
      geoKeywords: 'bucketlist Ierland, Cliffs of Moher, Dublin bezoeken, Ring of Kerry, reizen naar Ierland',
    },
    {
      name: 'Israël',
      slug: 'israel',
      continent: 'Azië',
      shortDescription: 'Een kruispunt van religies, eeuwenoude geschiedenis en bruisende mediterrane stranden.',
      longDescription: 'Israël is een fascinerende bestemming waar millennia aan geschiedenis samenkomen. Van de heilige, in nevelen gehulde monumenten in de Oude Stad van Jeruzalem tot het hypermoderne, liberale en zonnige strandleven in Tel Aviv. De rijke cultuur en adembenemende landschappen van de Negev-woestijn maken het een diepe zintuiglijke reis.',
      visitReason: 'Het verkennen van de historische Oude Stad van Jeruzalem, drijven in de Dode Zee en de rijke culinaire smeltkroes in Tel Aviv ervaren.',
      bestTravelTime: 'Voorjaar (april t/m mei) en Najaar (september t/m oktober) wanneer de temperaturen ideaal zijn voor stadsbezoeken.',
      personalMotivation: 'De intense spirituele en historische betekenis van deze regio trekt mij aan. Ik wil begrijpen hoe geschiedenis en moderniteit hier samensmelten.',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1200',
      status: 'nog_te_bezoeken',
      seoTitle: 'Israël Bucketlist - Jeruzalem Oude Stad & Dode Zee',
      seoDescription: 'Mijn doelen in Israël. Historische wandeltochten door Jeruzalem, drijven in de Dode Zee en genieten van de culinaire hoogstandjes.',
      geoKeywords: 'bucketlist Israel, Jeruzalem oude stad, Dode Zee drijven, Tel Aviv reizen',
    },
    {
      name: 'Dubai',
      slug: 'dubai',
      continent: 'Azië',
      shortDescription: 'Een futuristische oase in de woestijn, bekend om zijn recordbrekende wolkenkrabbers.',
      longDescription: 'Dubai is uitgegroeid van een bescheiden vissersdorp tot een van de meest dynamische en luxueuze metropolen ter wereld. Het staat bekend om zijn gedurfde architectuur, zoals de iconische Burj Khalifa en de kunstmatige Palm-eilanden, gecombineerd met traditionele goud- en kruiden-soeks en een weidse, mysterieuze woestijn.',
      visitReason: 'Het bekijken van de zonsondergang vanaf de Burj Khalifa, een woestijnsafari maken en de futuristische architectuur bewonderen.',
      bestTravelTime: 'November t/m maart (wanneer het weer aangenaam warm is en niet het hele jaar extreem heet).',
      personalMotivation: 'Ik wil de contrasten zien tussen de hyper-futuristische metropool en de serene, oneindige woestijnduinen.',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200',
      status: 'nog_te_bezoeken',
      seoTitle: 'Dubai Bucketlist - Burj Khalifa & Woestijnavonturen',
      seoDescription: 'Mijn reisdromen voor Dubai. Het observatiedek van de Burj Khalifa beklimmen en roadtrippen door de uitgestrekte zandduinen.',
      geoKeywords: 'bucketlist Dubai, Burj Khalifa bezoeken, woestijnsafari Dubai, reizen naar Dubai',
    },
    {
      name: 'Jordania',
      slug: 'jordania',
      continent: 'Azië',
      shortDescription: 'Het land van de rozerode stad Petra, de uitgestrekte Wadi Rum-woestijn en antieke geschiedenis.',
      longDescription: 'Jordanië is een gastvrij koninkrijk in het Midden-Oosten boordevol historische wonderen. De absolute parel is Petra, de eeuwenoude hoofdstad van de Nabateeërs die in de rotsen is uitgehouwen. Daarnaast biedt de Wadi Rum-woestijn een buitenaards, rood landschap, en de Romeinse ruïnes van Jerash vertellen verhalen uit de oudheid.',
      visitReason: 'De verborgen stad Petra verkennen via de smalle Siq-kloof, overnachten in een bedoeïenentent in Wadi Rum, en Romeinse geschiedenis in Jerash ontdekken.',
      bestTravelTime: 'Maart t/m mei en september t/m november (aangenaam lenteweer en milde temperaturen).',
      personalMotivation: 'Het betreden van Petra en het aanschouwen van de schatkamer Al-Khazneh is een kinderdroom die ik werkelijkheid wil maken.',
      image: '/jordan.png',
      status: 'nog_te_bezoeken',
      seoTitle: 'Jordanië Bucketlist - Petra Wereldwonder & Wadi Rum',
      seoDescription: 'Ontdek Jordanië op mijn bucketlist. De rozerode schatten van Petra verkennen en slapen onder de woestijnsterren in Wadi Rum.',
      geoKeywords: 'bucketlist Jordanië, Petra wereldwonder, Wadi Rum woestijn, Jerash ruïnes',
    },
    {
      name: 'America',
      slug: 'america',
      continent: 'Noord-Amerika',
      shortDescription: 'Een gigantisch continent vol adembenemende nationale parken en legendarische metropolen.',
      longDescription: 'De Verenigde Staten van Amerika bieden een ongekende diversiteit. Van de wolkenkrabbers in New York City en de filmische sfeer in Los Angeles tot de buitenaardse natuur van Yellowstone, de gigantische diepten van de Grand Canyon, en de uitgestrekte bossen in het noordwesten. Het is het land van de roadtrip en ultieme avonturen.',
      visitReason: 'Het maken van een helikoptervlucht over de Grand Canyon, een legendarische roadtrip rijden over Route 66 en de energie van New York ervaren.',
      bestTravelTime: 'Voorjaar (april t/m juni) en najaar (september t/m november) zijn ideaal voor de meeste nationale parken.',
      personalMotivation: 'Nationale parken in Amerika zijn iconisch. Ik wil de overweldigende grootsheid van de natuur in de Grand Canyon in alle rust ervaren.',
      image: '/miami.png',
      status: 'nog_te_bezoeken',
      seoTitle: 'Amerika Bucketlist - Grand Canyon & Route 66 Roadtrip',
      seoDescription: 'Dromen van de Verenigde Staten. Helikoptervluchten over de Grand Canyon en roadtrippen door de mooiste nationale parken.',
      geoKeywords: 'bucketlist Amerika, Grand Canyon reizen, New York stedentrip, Route 66 roadtrip',
    },
    {
      name: 'Portugal',
      slug: 'portugal',
      continent: 'Europa',
      shortDescription: 'Het land van melancholische fado, historische kastelen en goudgele kliffen aan de Atlantische Oceaan.',
      longDescription: 'Portugal biedt een rijke geschiedenis, gastvrije cultuur en fantastisch klimaat. Van de charmante, heuvelachtige straatjes van Lissabon tot de wereldberoemde kustlijn van de Algarve.',
      visitReason: 'Voor het verkennen van historische steden, proeven van pastel de nata en surfen aan de Atlantische kust.',
      bestTravelTime: 'Voorjaar (april t/m juni) en najaar (september t/m oktober).',
      personalMotivation: 'De ontspannen Portugese cultuur, historische architectuur en heerlijke keuken trekken mij aan.',
      image: '/lisbon.png',
      status: 'nog_te_bezoeken',
      seoTitle: 'Mijn Portugal Bucketlist - Kastelen & Fado',
      seoDescription: 'Ontdek de mooiste reisdoelen in Portugal op mijn persoonlijke bucketlist, van Lissabon tot de Algarve.',
      geoKeywords: 'bucketlist Portugal, reizen naar Portugal, bezienswaardigheden Lissabon',
    },
    {
      name: 'Italië',
      slug: 'italie',
      continent: 'Europa',
      shortDescription: 'Een tijdloos meesterwerk van geschiedenis, adembenemende kustlijnen en de ultieme culinaire cultuur.',
      longDescription: 'Italië betovert iedereen met zijn ongeëvenaarde culturele rijkdommen, historische steden en schilderachtige landschappen. Van het Colosseum in Rome tot de dramatische, kleurrijke kliffen van de Amalfikust.',
      visitReason: 'Het proeven van de authentieke Italiaanse keuken, dwalen door historische ruïnes en relaxen aan de Amalfikust.',
      bestTravelTime: 'Voorjaar (april t/m juni) en najaar (september t/m oktober) om de hitte te vermijden.',
      personalMotivation: 'Italië staat symbool voor het goede leven (la dolce vita) en ongeëvenaarde kunst en cultuur.',
      image: '/italy.png',
      status: 'nog_te_bezoeken',
      seoTitle: 'Italië Bucketlist - Dolce Vita & Amalfikust',
      seoDescription: 'Verken mijn bucketlist voor Italië, met de mooiste routes langs de Amalfikust en cultuurhistorische parels.',
      geoKeywords: 'bucketlist Italie, reizen naar Italie, Amalfikust bezoeken',
    },
    {
      name: 'Turkije',
      slug: 'turkije',
      continent: 'Europa',
      shortDescription: 'Het betoverende kruispunt van Oost en West, rijk aan Byzantijnse, Romeinse en Ottomaanse schatten.',
      longDescription: 'Turkije is een fascinerend land waar continenten en culturen samenkomen. Met de adembenemende skyline van Istanbul gekenmerkt door minaretten, de unieke landschappen van Cappadochië en een rijke geschiedenis.',
      visitReason: 'Het bezoeken van de historische Hagia Sophia, een ballonvaart maken in Cappadochië en dwalen door de Grote Bazaar.',
      bestTravelTime: 'Voorjaar (april t/m mei) en najaar (september t/m november).',
      personalMotivation: 'De unieke ligging tussen Europa en Azië en de diepe historische lagen fascineren mij enorm.',
      image: '/istanbul.png',
      status: 'nog_te_bezoeken',
      seoTitle: 'Turkije Bucketlist - Istanbul & Cappadochië',
      seoDescription: 'Ontdek Turkije op mijn bucketlist. Eeuwenoude moskeeën bezoeken en ballonvaarten over feeërieke landschappen.',
      geoKeywords: 'bucketlist Turkije, Istanbul bezoeken, Hagia Sophia',
    },
  ];

  const countriesMap: { [key: string]: any } = {};
  for (const country of countriesData) {
    const created = await prisma.country.create({
      data: country,
    });
    countriesMap[created.slug] = created;
  }
  console.log(`Created ${Object.keys(countriesMap).length} countries`);

  // 6. Create Places
  const placesData = [
    {
      name: 'Lissabon',
      slug: 'lissabon',
      countryId: countriesMap['portugal'].id,
      type: 'Stad',
      shortDescription: 'De charmante hoofdstad van Portugal, gebouwd op zeven heuvels met prachtige gele trams.',
      longDescription: 'Lissabon is een van de oudste steden ter wereld en ademt een unieke sfeer uit. Bekend om haar pastelkleurige huizen, traditionele fado-muziek in de wijk Alfama en de iconische gele Tram 28 die rammelt door de smalle, steile straatjes.',
      whyVisit: 'Lissabon is de ultieme combinatie van geschiedenis, maritieme flair, heerlijk eten en fantastische uitkijkpunten (miradouros).',
      whatToDo: 'Rijden in Tram 28, pasteis de Belem proeven, en de zonsondergang bekijken vanaf Miradouro da Senhora do Monte.',
      bestTravelTime: 'Mei t/m september, wanneer de dagen lang, zonnig en warm zijn.',
      practicalTips: 'Draag comfortabele loopschoenen; de kasseien straten zijn steil en kunnen glad zijn.',
      image: '/lisbon.png',
      status: 'nog_te_bezoeken',
      seoTitle: 'Lissabon op mijn bucketlist - Trams, Fado & Heuvels',
      seoDescription: 'Ontdek waarom de charmante heuvels en historische trams van Lissabon hoog op mijn wensenlijst staan.',
      geoKeywords: 'Lissabon bezoeken, Tram 28 Lissabon, stedentrip Lissabon, Miradouro Lissabon',
    },
    {
      name: 'Amalfi Coast, Italië',
      slug: 'amalfi-coast',
      countryId: countriesMap['italie'].id,
      type: 'Kustgebied',
      shortDescription: 'Een van de meest dramatische en schilderachtige kustlijnen ter wereld, met pastelkleurige dorpen gebouwd op kliffen.',
      longDescription: 'De Amalfikust in het zuiden van Italië staat op de UNESCO Werelderfgoedlijst. Het gebied strekt zich uit langs steile kliffen die loodrecht in de azuurblauwe Tyrreense Zee storten, bezaaid met citroentuinen, luxe villa\'s en charmante dorpen zoals Positano en Amalfi.',
      whyVisit: 'Het ervaren van de ultieme Italiaanse kustdroom en het wandelen langs het spectaculaire "Pad van de Goden".',
      whatToDo: 'Wandelen over het Sentiero degli Dei, een boottocht maken langs Positano en verse Limoncello proeven.',
      bestTravelTime: 'Mei en september (heerlijke temperaturen en minder druk dan de hectische zomermaanden).',
      practicalTips: 'Neem de lokale veerboten in plaats van auto\'s om files op de smalle kustweg te vermijden en geniet van een geweldig uitzicht vanaf het water.',
      image: '/italy.png',
      status: 'nog_te_bezoeken',
      seoTitle: 'Amalfikust Bucketlist - Positano & Pad van de Goden',
      seoDescription: 'Mijn reisgids voor de legendarische Amalfikust in Italië. Wandelen langs de kliffen en genieten van de mediterrane zon.',
      geoKeywords: 'Amalfikust bezoeken, Positano reizen, Pad van de Goden wandelen, Amalfikust tips',
    },
    {
      name: 'Miami',
      slug: 'miami',
      countryId: countriesMap['america'].id,
      type: 'Stad',
      shortDescription: 'Een levendige metropool in Florida, beroemd om haar Art Deco architectuur en parelwitte stranden.',
      longDescription: 'Miami is een bruisende smeltkroes van Amerikaanse en Latijns-Amerikaanse culturen. De wijk South Beach is wereldberoemd om haar pastelkleurige Art Deco gebouwen uit de jaren 30, neonverlichting langs Ocean Drive en de wuivende palmbomen langs het brede zandstrand.',
      whyVisit: 'De unieke sfeer van kunst, zonlicht, Art Deco esthetiek en de nabijheid van de prachtige Everglades.',
      whatToDo: 'Wandelen langs de iconische Ocean Drive, de kleurrijke Wynwood Walls verkennen en een airboat-tour maken in de Everglades.',
      bestTravelTime: 'December t/m april (wanneer het weer droog, zonnig en aangenaam warm is).',
      practicalTips: 'Huur een fiets (Decobike) om de gehele lengte van het South Beach strandpad te verkennen en geniet van de zeebries.',
      image: '/miami.png',
      status: 'nog_te_bezoeken',
      seoTitle: 'Miami Bucketlist - Art Deco, Ocean Drive & South Beach',
      seoDescription: 'Mijn reisdromen voor Miami. Het ontdekken van de Art Deco geschiedenis en het genieten van de zon in Florida.',
      geoKeywords: 'Miami bezoeken, Ocean Drive Miami, Art Deco district Miami, South Beach reizen',
    },
    {
      name: 'Tokyo',
      slug: 'tokyo',
      countryId: countriesMap['japan'].id,
      type: 'Stad',
      shortDescription: 'De ultieme futuristische metropool, waar neonverlichte wolkenkrabbers en serene tempels harmonieus samenkomen.',
      longDescription: 'Tokio is de grootste en meest fascinerende metropool op aarde. Het is een stad van extreme contrasten: van het drukste voetgangerskruispunt ter wereld in Shibuya en de anime-cultuur in Akihabara, to de serene shinto-schrijnen in de uitgestrekte bossen van Yoyogi Park.',
      whyVisit: 'Om de ongeëvenaarde energie van de metropool te ervaren, de verfijnde eetkeuzes te ontdekken en futuristische kunstgalerieën te bezoeken.',
      whatToDo: 'Oversteken bij Shibuya Crossing, een sushi-ontbijt eten op de vismarkt en de zonsondergang over de stad bekijken vanaf Shibuya Sky.',
      bestTravelTime: 'Oktober t/m november (milde temperaturen en schitterende herfstkleuren) en april (kersenbloesem).',
      practicalTips: 'Koop een Suica of Pasmo IC-kaart voor naadloze toegang tot het uiterst efficiënte metrosysteem van de stad.',
      image: '/tokyo.png',
      status: 'nog_te_bezoeken',
      seoTitle: 'Tokyo Bucketlist - Shibuya, Neon & Contrasten',
      seoDescription: 'Waarom de hypermoderne metropool Tokio en haar verborgen tempels op mijn reisbucketlist staan.',
      geoKeywords: 'Tokyo bezoeken, Shibuya kruispunt, bezienswaardigheden Tokyo, reizen naar Tokyo',
    },
    {
      name: 'Istanbul',
      slug: 'istanbul',
      countryId: countriesMap['turkije'].id,
      type: 'Stad',
      shortDescription: 'De enige stad ter wereld die op twee continenten ligt, rijk aan eeuwenoude geschiedenis en prachtige moskeeën.',
      longDescription: 'Istanbul, het historische Constantinopel, is al eeuwenlang een strategisch en cultureel knooppunt tussen Europa en Azië. De stad wordt doorsneden door de rivier de Bosporus en wordt gedomineerd door adembenemende architectuur, zoals de Byzantijnse Hagia Sophia en de Ottomaanse Blauwe Moskee.',
      whyVisit: 'Het dwalen door millennia aan levende geschiedenis op het kruispunt van twee culturen en werelden.',
      whatToDo: 'De majestueuze Hagia Sophia van binnen bewonderen, varen op de Bosporus bij zonsondergang en verdwalen in de Grote Bazaar.',
      bestTravelTime: 'April t/m mei en september t/m november, wanneer het weer perfect is voor wandelingen.',
      practicalTips: 'Neem de tram (T1-lijn) om snel en goedkoop tussen de historische bezienswaardigheden in Sultanahmet te reizen.',
      image: '/istanbul.png',
      status: 'nog_te_bezoeken',
      seoTitle: 'Istanbul op mijn bucketlist - Moskeeën, Grote Bazaar & Bosporus',
      seoDescription: 'Mijn reiservaringen en motivatie voor het bezoeken van Istanbul op het kruispunt van twee continenten.',
      geoKeywords: 'Istanbul bezoeken, Hagia Sophia Istanbul, Grote Bazaar reizen, Bosporus boottocht',
    },
  ];

  const placesMap: { [key: string]: any } = {};
  for (const place of placesData) {
    const created = await prisma.place.create({
      data: place,
    });
    placesMap[created.slug] = created;
  }
  console.log(`Created ${Object.keys(placesMap).length} places`);

  // 7. Create Bucketlist Items
  const itemsData = [
    {
      title: 'De legendarische Tram 28 nemen in Lissabon',
      slug: 'tram-28-lissabon',
      shortDescription: 'Rammelen door de smalle, historische en steile straatjes van Lissabon in de iconische gele tram.',
      longDescription: 'Tram 28 in Lissabon is wereldberoemd. Deze ouderwetse, gele tram uit de jaren 30 piept, kraakt en rammelt over de steile heuvels en door de smalle straatjes van de historische wijken Alfama, Baixa en Graca. Het is een rijdend museum dat een fantastische blik biedt op het authentieke stadsleven.',
      personalMotivation: 'De nostalgie van oude transportmiddelen en de intieme ervaring van het dwalen door historische, kleurrijke volkswijken spreken mij erg aan.',
      whyOnList: 'Een iconische, culturele ervaring die de nostalgische ziel van de Portugese hoofdstad perfect tastbaar maakt.',
      experienceGoal: 'Leren genieten van het trage tempo van reizen en fotograferen vanuit een historisch rijdend voertuig.',
      image: '/lisbon.png',
      status: 'nog_te_doen',
      priority: 'gemiddeld',
      lifeArea: 'Cultuur',
      countryId: countriesMap['portugal'].id,
      placeId: placesMap['lissabon'].id,
      reflectionBefore: 'Ik verwacht een charmante, ietwat schommelende rit vol levendige stadsgeluiden en prachtige fotomomenten te midden van de waslijnen in Alfama.',
      isFeatured: true,
      seoTitle: 'Bucketlist: Rit maken in Tram 28 in Lissabon',
      seoDescription: 'Mijn motivatie en plannen om de legendarische Tram 28 in Lissabon te nemen en door de sfeervolle wijk Alfama te rijden.',
      geoKeywords: 'Tram 28 Lissabon, heuvels Alfama, reizen Lissabon, bucketlist Portugal',
    },
    {
      title: 'Wandelen over het "Pad van de Goden" aan de Amalfikust',
      slug: 'pad-van-de-goden-amalfikust',
      shortDescription: 'Wandelen over het legendarische bergpad met adembenemende vergezichten over de kliffen en Positano.',
      longDescription: 'Het "Pad van de Goden" (Sentiero degli Dei) is een van de mooiste wandelpaden in heel Europa. Het pad loopt hoog boven de Amalfikust, kronkelend langs citroenboomgaarden en diepe kloven, en biedt een spectaculair panoramisch uitzicht over de Tyrreense Zee en het schilderachtige klifdorp Positano.',
      personalMotivation: 'Ik wil de gezonde zeelucht opsnuiven, wandelen te midden van ruige mediterrane natuur en de dramatische Italiaanse landschappen fotograferen.',
      whyOnList: 'De ultieme combinatie van sportieve prestatie, adembenemende natuur en de pure schoonheid van de Italiaanse kust.',
      experienceGoal: 'Mentale rust en verbinding met de elementen vinden tijdens een indrukwekkende wandeltocht boven de wolken.',
      image: '/italy.png',
      status: 'nog_te_doen',
      priority: 'hoog',
      lifeArea: 'Natuur',
      countryId: countriesMap['italie'].id,
      placeId: placesMap['amalfi-coast'].id,
      reflectionBefore: 'Ik hoop op dit pad het gevoel te hebben dat ik letterlijk tussen de hemel en de diepblauwe zee zweef, met adembenemende Positano in het vizier.',
      isFeatured: true,
      seoTitle: 'Bucketlist: Wandelen over het Pad van de Goden (Sentiero degli Dei)',
      seoDescription: 'Plannen en inspiratie voor het bewandelen van de Amalfikust in Italië. Wandelen met uitzicht op Positano.',
      geoKeywords: 'Pad van de Goden wandelen, Sentiero degli Dei, Amalfikust wandelen, Positano tips',
    },
    {
      title: 'De historische Art Deco wijk verkennen in Miami',
      slug: 'art-deco-miami',
      shortDescription: 'De pastelkleurige parels en neonverlichting van de iconische Ocean Drive bewonderen.',
      longDescription: 'Het Art Deco Historic District in Miami Beach herbergt de grootste collectie Art Deco architectuur ter wereld. Dit doel is een architectonische en visuele ontdekkingsreis langs de prachtige, gerestaureerde hotels uit de jaren 30, gekenmerkt door geometrische vormen, pastelkleuren en sfeervolle neonverlichting bij avond.',
      personalMotivation: 'De unieke retro-esthetiek en geschiedenis van de jaren 30 fascineren mij. Ik wil de prachtige neonreclames fotograferen te midden van de palmbomen.',
      whyOnList: 'Het ontdekken van een uniek stuk Amerikaanse kunst- en architectuurgeschiedenis in een bruisende tropische setting.',
      experienceGoal: 'Het verdiepen van mijn kennis over vintage design en het vastleggen van de levendige contrasten in avondfotografie.',
      image: '/miami.png',
      status: 'nog_te_doen',
      priority: 'gemiddeld',
      lifeArea: 'Cultuur',
      countryId: countriesMap['america'].id,
      placeId: placesMap['miami'].id,
      reflectionBefore: 'Ik stel me een heerlijk warme avond voor met de geur van de zee, wuivende palmbomen en de betoverende gloed van vintage neonreclames.',
      isFeatured: false,
      seoTitle: 'Bucketlist: Art Deco District verkennen in Miami Beach',
      seoDescription: 'Waarom het legendarische Art Deco district en de pastelkleurige hotels op Ocean Drive in Miami op mijn bucketlist staan.',
      geoKeywords: 'Miami Art Deco, Ocean Drive Miami Beach, stedentrip Miami, neonfotografie Miami',
    },
    {
      title: 'Genieten van de zonsondergang vanaf Shibuya Sky in Tokio',
      slug: 'shibuya-sky-tokyo',
      shortDescription: 'Genieten van een 360-graden uitzicht over de neonmetropool en Mount Fuji vanaf een openluchtobservatiedek.',
      longDescription: 'Shibuya Sky is een spectaculair openluchtobservatiedek dat zich bijna 230 meter boven de beroemde Shibuya Crossing bevindt. Vanaf dit uitkijkpunt heb je een adembenemend, onbelemmerd 360-graden uitzicht over de schijnbaar oneindige neonzee van Tokio, met bij helder weer de iconische contouren van Mount Fuji aan de horizon.',
      personalMotivation: 'De gigantische schaal en futuristische energie van Tokio ervaren vanaf een hoogte die je letterlijk stil laat staan bij de grootsheid van de mens.',
      whyOnList: 'Een onvergetelijke visuele ervaring die de absolute grootsheid en neonpracht van de Japanse hoofdstad samenballen.',
      experienceGoal: 'Het verbreden van mijn perspectief op stedenbouw en het ervaren van een gevoel van diepe verwondering boven de miljoenenstad.',
      image: '/tokyo.png',
      status: 'nog_te_doen',
      priority: 'hoog',
      lifeArea: 'Avontuur',
      countryId: countriesMap['japan'].id,
      placeId: placesMap['tokyo'].id,
      reflectionBefore: 'Ik verwacht getuige te zijn van een adembenemend spektakel waarbij de zon langzaam rood ondergaat achter Mount Fuji en de metropool daaronder ontwaakt in neon.',
      isFeatured: true,
      seoTitle: 'Bucketlist: Shibuya Sky Zonsondergang & Tokyo Uitzicht',
      seoDescription: 'Mijn plannen om Tokio te bekijken vanaf Shibuya Sky. Genieten van 360-graden panorama\'s en Mount Fuji bij zonsondergang.',
      geoKeywords: 'Shibuya Sky Tokyo, uitzicht Mount Fuji, Shibuya Crossing bezoeken, Tokyo bucketlist',
    },
    {
      title: 'De majestueuze Hagia Sophia bewonderen in Istanbul',
      slug: 'hagia-sophia-istanbul',
      shortDescription: 'Het Byzantijnse meesterwerk en de gigantische zwevende koepel op het kruispunt van twee werelden bewonderen.',
      longDescription: 'De Hagia Sophia (Ayasofya) is een van de belangrijkste architectonische en historische monumenten ter wereld. Gebouwd in de 6e eeuw als christelijke kathedraal, later omgevormd tot moskee en nu een spiritueel monument. Het gebouw is beroemd om zijn revolutionaire, gigantische koepel die lijkt te zweven in het gouden licht, omringd door christelijke mozaïeken en islamitische kalligrafie.',
      personalMotivation: 'De tastbare geschiedenis en de harmonie tussen christelijke en islamitische kunstuitingen onder één gigantische koepel met eigen ogen ervaren.',
      whyOnList: 'Een diepe historische en spirituele bedevaart naar een van de grootste bouwwerken uit de menselijke geschiedenis.',
      experienceGoal: 'Het cultiveren van historisch besef, respect voor religieuze kunst en het ervaren van de spirituele rust in de monumentale ruimte.',
      image: '/istanbul.png',
      status: 'nog_te_doen',
      priority: 'gemiddeld',
      lifeArea: 'Groei',
      countryId: countriesMap['turkije'].id,
      placeId: placesMap['istanbul'].id,
      reflectionBefore: 'Ik verwacht dat de enorme schaal en het gouden licht dat door de koepelramen valt een diepe indruk van tijdloosheid en verwondering zullen achterlaten.',
      isFeatured: true,
      seoTitle: 'Bucketlist: Hagia Sophia Moskee in Istanbul bezoeken',
      seoDescription: 'Ontdek de spirituele pracht en rijke historie van de Hagia Sophia in Turkije. Kalligrafie, mozaïeken en de zwevende koepel.',
      geoKeywords: 'Hagia Sophia Istanbul, bezienswaardigheden Istanbul, reizen naar Turkije, Byzantijnse architectuur',
    },
  ];

  for (const item of itemsData) {
    // Determine category to link based on life area/tags
    const itemCategories: any[] = [];
    if (item.lifeArea === 'Groei') {
      itemCategories.push(categoriesMap['persoonlijke-ontwikkeling']);
    } else if (item.lifeArea === 'Avontuur') {
      itemCategories.push(categoriesMap['avontuur']);
    } else if (item.lifeArea === 'Bijdrage') {
      itemCategories.push(categoriesMap['bijdrage-aan-de-wereld']);
    } else if (item.lifeArea === 'Natuur') {
      itemCategories.push(categoriesMap['natuur-buitenleven']);
    } else if (item.lifeArea === 'Spirituele groei') {
      itemCategories.push(categoriesMap['spirituele-groei']);
    }

    // Add general travel categories if country/place is linked
    if (item.countryId) {
      itemCategories.push(categoriesMap['landen-bezoeken']);
    }
    if (item.placeId) {
      itemCategories.push(categoriesMap['steden-bezoeken']);
    }

    await prisma.bucketlistItem.create({
      data: {
        ...item,
        categories: {
          connect: itemCategories.filter(Boolean).map((c) => ({ id: c.id })),
        },
      },
    });
  }

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
