This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).
PRIMER APLIKACIJE GENESYS CLIENT CHAT-A I KOMUNIKACIJU SA BOTOM PREKO SOCKET-A, INTEGRACIJA SA SAJTOM PREKO SNIPPET-A
NIJE SVE IMPLEMENTIRANO I PRILAGOĐENO JE PRIMERU JER JE BEZ GENESYS-A
## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Create new next.js app using react

create-next-app@latest

Then answer the questions.

## page.js by default is server component

for client component use directive 'use client'

'use client';
export default functuon MyFunc() {
return ( JSX syntax code );
}
## set default language in storage 

localStorage.setItem('i18nextLng', 'sr-Cyrl');

## aplikacija
🔔 1. Ideja je da se otvori web socket Genesys-a, bot salje poruke kao agent, a klijent odgovara sa tipom user.
		Razmenjuje se komunikacija kroz cet sa botom dok klijent ne uspostavi vezu sa slobodnim operaterom, 
		Klijentska aplikacija je zaduzena samo za cet klijenta i bota dok za deo sa operaterom je zaduzen Genesys.
		
🔔 2. KLIJENTSKA APLIKACIJA NIJE ISPROGRAMIRANA DO KRAJA 

## dodatne izmene
💬 2. UI/UX unapređenja
•	Dark mode / light mode switch
•	Animacije poruka (FadeIn, SlideUp)
•	Bubble chat stil (kao u Messengeru / WhatsApp-u)
•	Tooltipovi iznad dugmadi (upload, close chat)
•	Vizualni prikaz priloga (npr. thumbnails za slike)
________________________________________
🔔 3. Notifikacije
•	Dodaj desktop notifikacije (Notification API) za nove poruke kada je tab u backgroundu:
js
CopyEdit
if (document.hidden && Notification.permission === "granted") {
   new Notification("Nova poruka od agenta", { body: poruka });
}
________________________________________
📥 4. Drag & Drop Upload fajlova
•	Omogućiti da korisnik samo prevuče fajl u prozor chata da se uploaduje.
•	Vizualni prikaz dok traje upload (progress bar).
5. Search po istoriji poruka
Ako već prikazuješ istoriju, možeš dodati input polje za pretragu.
