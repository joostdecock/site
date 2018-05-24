---
layout: blog
title: "Welkom op onze nieuwe website. Ze is AVG compatible, spreekt 3 talen, en ruikt nog wat naar natte verf"
linktitle: "Onze nieuwe website doet AVG and i18n"
img: paint.jpg
caption: "De belangrijkste wijziging is uiteraard dat we voor onze huiskleur van paars naar zwart zijn overgeschakeld"
author: joost
category: site
blurb: "Hier is onze nieuwe website. Ze is AVG compatibel, beschikbaar in drie talen, en er is beslist nog wat werk aan."
---

Morgen, op 25 mei, gaat de Algemene Verordering Gegevensbescherming (AVG) van de Europese Unie (EU) van kracht.
Vanaf dan riskeren bedrijven die de rechten van EU inwoners niet respecteren een fikse boete, tot 4% van hun jaarlijks zakencijfer.

Morgen is dus een belangrijk moment voor privacy online, want plots zijn 's werelds meest strengste
regels terzake van toepassing op een half miliard mensen.

## Je toestemming is nu een voorwaarde

Voor freesewing stelt de komst van AVG niet echt een probleem.
Niet alleen [hadden we een prima plan gemaakt](/nl/blog/gdpr-plan),
het enige wat we absoluut moesten toevoegen was het vragen om *toestemming*.

Het is niet langer toegestaan om je gegevens te verwerken zonder je toestemming.
Die toestemming moeten specifiek en gedetailleerd vragen.

Dus, we hebben nu twee vragen voor je:

 - Geef je ons de toestemming om je profiel gegevens te verwerken?
 - Geef je ons de toestemming om je model gegevens te verwerken?

We maken een onderscheid omdat het om verschillende zaken gaat.
Een profiel/account is noodzakelijk om je aan te melden op de site, commentaar te posten enzoverder.
Model gegevens zijn nodig om naaipatronen op maat te genereren.

Je zal door deze vragen begroet worden op het ogenblik dat ze relevant worden
(maw, wanneer we toegang moeten hebben tot de gegevens in kwestie)
en je kan je beslissing op elk ogenblik herzien [in je account instellingen](/nl/account).

## Het is onze plicht om je te informeren

Onder AVG is het aan ons om je te informeren over hoe we privacy aanpakken.
We hebben eerder al geschreven over [onze kijk op privacy](/nl/blog/privacy-choices), 
maar nu hebben we nood aan iets dat (iets) meer formeel is.

Dus, we hebben een [privacy beleid](/nl/privacy) opgesteld dat al deze zaken uitklaart.

Naast ons privacy beleid hebben we ook [een pagina opgezet die al je rechten op een rijtje zet](/nl/rights), 
met instructies hoe je van elk van die rechten gebruik kan maken.

Met deze wijzigingen hebben we onze plicht om je te informeren vervult.

## Privacy by design

Eén van de vagere vereisten van AVG, maar met een belangrijke impact, is het zogenaamde *privacy by design* 
We hebben dat advies ter harte genomen, en twee wijzigingen doorgevoerd die hierdoor geïnspireerd zijn:

 - Versleuteling van gegevens in rust
 - Afsluiten van slapende accounts

We versleutelen nu je profiel gegevens in rust.
Met andere woorden, onze databank bevat jouw informatie, maar deze informatie is versleuteld.
We ontcijferen de informatie alleen op het ogenblik dat we ze nodig hebben.

We gaan ook accounts afsluiten die al 12 maand non-actief zijn.
Concreet: Als je je gedurende een heel jaar niet aanmeld op de website, dan verwijderen we je account en al je gegevens.

Voor dat laatste gaan we wel een overgangsperiode voorzien daar we nog niet klaar zijn met alle wijzigingen die hiervoor nodig zijn.
En dat brengt me bij mijn volgende punt:

## Ook nieuw: Al de rest

Deze wijzigingen door de AVG leken ons een goeie gelegenheid om een aantal zaken te herbekijken, en eventueel te verbeteren.
Dat was althans het originele idee. Uiteindelijk hebben we de hele website opnieuw gemaakt.

Onze vorige website maakte gebruik van [Jekyll](https://jekyllrb.com/) om een statische website te genereren.
We hadden daar dan een hoop javascript code bij om de dynamische elementen te verzorgen.
Die aanpak deed wat het moest doen, maar had twee belangrijke nadelen:

 - Jekyll maakt gebruik van de Ruby programeertaal. Dat is alweer een andere taal, een andere paketbeheerder, en een ander ecosysteem dat potentiële vrijwillige medewerkers in hun hoofd moeten prenten. Dat wilden we graag vermijden. 
 - Die *hoop* JavaScript code mag je ook nogal letterlijk nemen. Onderhoudbaarheid van de code werd stilaan een probleem, en bovendien was het ook moeilijk voor nieuwe medewerkers om het allemaal te begrijpen.

Dus, om twee vliegen in één klap te slaan, hebben we de hele boel herschreven door gebruik te maken van [Vue.js](https://vuejs.org/) en [Nuxt](https://nuxtjs.org/). 
Onze volledige frontend (website dus) is nu geschreven in JavaScript — geen Ruby meer — en door Vue's modulaire aanpak en herbruikbare componenten zou het allemaal een stuk makkelijker moeten zijn om het te onderhouden.

## Internationalisatie, of i18n

Als we dan toch aan het herschrijven waren wilden we uiteraard een aantal leuke nieuwe functionaliteiten toevoegen.
De meest voor de hand liggende daarvan is dat we nu i18n (internationalisatie) ondersteunen.

Hoewel vertaalwerk een neverending story is hebben nu technisch alles op een rijtje om het te ondersteunen.
Vanaf vandaag is freesewing trouwens niet langer alleen beschikbaar [in het Engels](/blog/gdpr/ready), 
maar ook [in het Spaans](/es/blog/gdpr-ready), en [in het Nederlands](/nl/blog/gdpr-ready).

Ik wil graag [@AnnekeCaramin](/users/annekecaramin) 
en [@AlfaLyr](/users/alfalyr) bedanken, die onze taal coordinatoren zijn voor respectievelijk Nederlands en Spaans,
maar ook alle andere mensen die geholpen hebben met de vertaling.

Een overzicht van de status van de verschillende talen is [hier beschikbaar](/nl/i18n), 
en ik ben hoopvol dat we binnen korte tijd andere talen zullen kunnen inschakelen.

## Let op voor de natte verf

De publicatie van deze nieuwe website komt wellicht een beetje te vroeg.
We hebben nog een aantal [openstaande zaken die we moeten oplossen](https://github.com/freesewing/site/issues), 
en we missen nog een boel documentatie.

Maar, gezien de AVG-deadline ons extern wordt opgelegd hebben we niet echt een andere keuze dan ze nu te publiceren.
Tenminste, als we helemaal compatibel willen zijn met de AVG, en dat willen we.

We hopen dan ook dat we op jullie geduld kunnen rekenen terwijl we verder bouwen aan onze website en ons platform.
En aarzel niet om het ons te laten weten als er iets fout loopt.
