import { myBrowser } from './browser.js';
import { scrapeData } from './scrape.js'
import { URLs } from './URL.js'

import path from 'path';
import fs from "fs";

const proxyIP = '184.169.231.206';
const proxyPort = '3000';
// const proxyServer = 'http://' + proxyIP + ':' + proxyPort;
const proxyServer = '';


// Create page
const browser = await myBrowser.start(proxyServer); // start a browser
const page = await browser.newPage();
//await page.setRequestInterception(true)
//await page.on('request', (req) => {
//    if (
//        req.resourceType() === 'image' ||
//        req.resourceType() == 'stylesheet' ||
//        req.resourceType() == 'font'
//    ) {
//        req.abort();
//    }
//    else {
//        req.continue();
//    }
//});

// set page's browser user agent
const agents = ["Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36" ,"Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36", "Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36"];
// import randomUseragent from 'random-useragent';
// set request interception
var randomAgents = agents[Math.floor(Math.random() * agents.length)];
// const randomAgents = randomUseragent.getRandom(); // gets a random user agent string
await page.setUserAgent(randomAgents);

await page.setViewport({
	width: 1366,
	height: 768,
	//deviceScaleFactor: 1,
	//hasTouch: false,
	isLandscape: true,
	//isMobile: false,
});

// Crawl urls
const links = await URLs.getURLs();

for( const linkObj of links ){

	const link 				= linkObj.link;
	const Location			= linkObj.location;
	// goto
	await page.goto( link, { timeout: 0 } );
	
	try{
		await page.waitForXPath( 'title' );
	}
	catch(err){
console.log( '---- ! Page found' );
		continue;
	}

    // Scrape the listing
    await scrapeData.scraping( page, location );
    
	// end
	console.log( "Location " + location + ", category " + category + " scraped!" ); 
}



console.log( "Google Business scraped." ); 

console.log( '' );
console.log( '<<<' );
console.log( 'Finished' );

