/*Test Steps:
Assignment: 1 Create Lead
1. Login to https://login.salesforce.com
2. Click on toggle menu button from the left corner
3. Click view All and click Sales from App Launcher
4. Click on Leads tab 
5. Click on New button
6. Select Salutation dropdown
7. Enter the Last Name
8. Enter the CompanyName 
9. Click Save and Verify Leads name created

/*********************************************************   Test1 : Create Lead - SalesForce****************************************************************/

import {chromium, expect, test} from "@playwright/test";

test("Create Lead in SalesForce" ,async() => {
const browser = await chromium.launch({headless:false,channel:"chrome"});
const browserContext = await browser.newContext();
const page = await browserContext.newPage();
const fName = "Vidya";
const lName = "Jayaraman";
const companyName = "Testleaf";

await page .goto("https://login.salesforce.com");
await page.locator("input[id='username'] ").fill("viddhu.j@gmail.com");  
await page.locator("input[id='password'] ").fill("Testcrm@789!");                 
await page.locator("input[id='Login']").click();

// Wait for the page to load as it take more time for me , Timeout does not helped in my case.
await page.waitForLoadState('load');

await page.locator("//div[@class='slds-icon-waffle']").click();
await page.locator("//button[text()='View All']").click();

// Wait for the page to load as it take more time
await page.waitForLoadState('load');

await page.locator("//p[text()='Sales']").click();
await page.locator("//a[@class='slds-context-bar__label-action dndItem']/span[text()='Leads']").click();
await page.locator("//button[contains(text(),'New')]").click();

// Create a Lead by giving mandatory details.

await page.locator("//button[@name='salutation']").click();
await page.locator("//span[text()='Mrs.']").click();
await page.locator("//input[@name='firstName']").fill(fName);
await page.locator("//input[@name='lastName']").fill(lName);
await page.locator("//input[@name='Company']").fill(companyName);
await page.locator("//button[@name='SaveEdit']").click();

// Get attribute of Title which has lead name from Toast Message ( Apply freeze dom to inspect Toast)

const actualOutput = await page.locator("//span[contains(@class,'toastMessage')]//div").getAttribute("title");

// verify the Actual output contains the expected firstname 

expect(actualOutput).toContain(fName);
console.log("Lead firstname : "+fName+" & last name : " + lName);
console.log("lead created by Script : "+ actualOutput);

})




