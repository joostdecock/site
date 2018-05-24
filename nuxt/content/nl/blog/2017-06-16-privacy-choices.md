---
layout: blog
title: "De keuzes die ik gemaakt heb om je privacy te beschermen. Of waarom je geen cookies krijgt."
linktitle: "Keuzes aangaande privacy"
img: fence.jpg
caption: "Foto door [Herbert](https://pixabay.com/en/users/herbert2512-2929941/)"
author: joost
category: site
translators: joostdecock
blurb: "Ik wou doen wat correct was. Dit zijn de keuzes die ik heb gemaakt."
---
Het internet ondergraaft steeds meer je privacy. Facebook, Google, en een kluwen aan advertentie netwerken houden allemaal in de gaten wat er zich afspeelt in je browser. Ze volgen je op het web van site tot site, en verzamelen zoveel mogelijk informatie over je om je te profileren. Die informatie verkopen ze dan aan adverteerders.

Sorry voor het taalgebruik, maar ik heb een hekel aan die shit.

> Facebook, Google, en een kluwen aan advertentie netwerken houden allemaal in de gaten wat er zich afspeelt in je browser.
{.quote}

Het bouwen van deze site is een prima gelegenheid om even stil te staan over hoe het anders kan. 

Om te verzekeren dat ik een deel ben van de oplossing, en niet van het probleem, heb ik de volgende keuzes gemaakt:

## Overal encryptie

Laten we alles over https doen. Dat is gewoon [gezond verstand](https://letsencrypt.org/) in 2017. 

## Geen advertenties

Dit is ook zo'n no-brainer. De advertentie netwerken staan met stip bovenaan het lijstje van bedrijven die je in de gaten houden op het internet. Ik wil ze dan ook nergens in de buurt van deze site.

Gelukkig is dat geen probleem voor ons, daar we niet de helaas klassieke  _Geef iets gratis weg, en verkoop je gebruikers hun gegevens_ regels van het internet volgen.

## Geen externe code

Deze site laad geen externe JavaScript code. Geen enkele. Dat betekend dat ik een aantal dingen heb moeten herbekijken die typisch afhankelijk zijn van externe code.

Er is geen Facebook _Vind ik leuk_ knop, of Twitter integratie. We hebben nog steeds links onder onze blogposts om ze te delen (hint hint) maar die geruiken een simpele HTML link die tracking voorkomt.

In dezelfde categorie kan je je ook niet aanmelden met en social media account. Ja, zo'n _Inloggen met Facebook_ knop is handig, maar ook een absolute nachtmerrie voor wat het doet met je privacy.

Voor een statisch gegenereerde website als deze ([zie deze blogpost over JAMstack voor meer info](/blog/nl/freesewing-goes-jamstack/)) [Disqus](https://disqus.com/) is zowat de standaard voor commentaren. Maar Disqus is echt wel verschrikkelijk als het om privacy gaat, dus dat was een grote vette nee voor mij.

Een gelijkaardig verhaal voor authenticatie waar ik even [Auth0](https://auth0.com/) overwogen heb. Maar daar ook was ik bezorgd over tracking, dus heb ik dat plan laten varen.

Uiteindelijk heb ik dan maar mijn mouwen opgestroopt en de authenticatie en commentaren zelf geimplementeerd. De tijd zal uitwijzen of dat een goeie keuze was.

## Geen cookies
We gebruiken geen cookies. Uiteraard geen cookies van derden, maar zelfs geen cookies van onszelf.

In de plaats daarvan gebruiken we _local storage_. Dat is beter want in tegenstelling tot cookies wordt de informatie in local storage niet meegezonden met elke request.

## Geen analytics
Ik gebruikte [Google Analytics](https://analytics.google.com/) op [makemypattern](https://makemypattern.com/). Het is makkelijk en krachtig, maar uiteraard een tracking nachtmerrie. Dus dat moest ook overboord.

De situatie is iets gecompliceerder doordat deze statische site wordt gehost door [Netlify](https://www.netlify.com/). Ik heb dus geen server logs die me toelaten om de analytics aan de server zijde af te handelen.

Voor het grootste deel heb ik gewoon beslist dat ik geen nood heb aan analytics. 
Ik hoef niet te weten hoeveel mensen de site bezoeken. Ik weet nog steeds hoeveel mensen zich inschrijven, of hoeveel naaipatronen we genereren. Beide zijn prima indicatoeren voor hoe goed of slecht het gaat met de site.

Maar er is 1 ding dat ik wel graag had gehouden van analytics: referral logs. 
Het is altijd leuk om door het lijstje te bladeren en uit te vissen wanneer er
[iemand](https://www.reddit.com/r/freepatterns/comments/4zh5nr/is_there_software_to_generate_sewing_patterns/) 
[naar](http://www.makery.uk/2016/08/the-refashioners-2016-joost/) 
[jou heeft](https://closetcasepatterns.com/week-sewing-blogs-vol-98/)
[gelinkt](https://opensource.com/life/16/11/free-open-sewing-patterns). 

Ook hier heb ik mijn eigen minimale oplossing geimplementeerd. Als je op deze site terecht komt van een externe link geven we dat door aan onze eigen backend. Op die manier houden we wel een log bij van de referral, maar zonder enige tracking.

Wellicht is het ijdelheid, maar als ik een baaldag heb is het vaak een leuke opkikker om wat door die referrals te bladeren (als het tenminste geen Rusissche referral spam is). Misschien heb ik het fout, maar ik duff te wedden dat heel wat mensen met een eigen blog dat gevoel kennen.
