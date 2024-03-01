 
 /* Create a new browser instance
 * Create a new browser context
 * Create a new page
 * Load the url 
 * https://login.salesforce.com/
 * Print the url
 * Enter the username vidyar@testleaf.com
 * Enter the password Testleaf@1234
 * Click Login button
 * Verify the title of the page (using page.title() method)
 */// Try Implementing Fixtures in the above testcase 



 import {chromium ,expect,test  } from "@playwright/test";

 test("Login Sales Force", async({page})=> {

   // Fixtures used 
   //const browser = await chromium.launch({headless:false,channel:"chrome"});
   //const browserContext = await browser.newContext();
   // const page = await browserContext.newPage();

    await page.goto("https://login.salesforce.com");
    await page.waitForTimeout(3000);
    console.log(page.url());
    await page.locator("input[id='username'] ").fill("viddhu.j@gmail.com");  
    await page.locator("input[id='password'] ").fill("Testcrm@789!");                 
    await page.locator("input[id='Login']").click();
    // wait for the page to load
    await page.waitForLoadState('load');
    const title1 = await page.title();
    console.log("First loading title is " + title1);
    await page.waitForTimeout(6000);
    const title2 = await page.title();
    console.log(title2);
    expect(title2).toContain("Home | Salesforce");
            
 })


