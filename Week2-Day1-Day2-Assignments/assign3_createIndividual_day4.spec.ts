/*
Assignment: 3 Create Individuals
Test Steps: 
1. Login to https://login.salesforce.com
2. Click on the toggle menu button from the left corner
3. Click View All and click Individuals from App Launcher
4. Click on the Dropdown icon in the Individuals tab
5. Click on New Individual
6. Enter the Last Name
7. Click save and verify Individuals Name
*/

/*********************************************************   Test3 : Create Individuals - SalesForce****************************************************************/


import { test, chromium, expect } from "@playwright/test";

test("Create Individuals", async () => {

  const browser = await chromium.launch({ headless: false, channel: "msedge" });
  const browserContext = await browser.newContext();
  const page = await browserContext.newPage();
  await page.goto("https://login.salesforce.com");
  await page.locator("input[id='username'] ").fill("viddhu.j@gmail.com");
  await page.locator("input[id='password'] ").fill("Testcrm@789!");
  await page.locator("input[id='Login']").click();

  // Wait for the page to load as it take more time .
  await page.waitForLoadState('load');
  // Wait for the waffle icon to appear to click  

  await page.waitForSelector("//div[@class='slds-icon-waffle']");
  await page.locator("//div[@class='slds-icon-waffle']").click();
  await page.locator("//button[text()='View All']").click();

  // Wait for the page to load as it take more time.
  await page.waitForLoadState('load');

  // Click on Individuals
  await page.locator("//p[text()='Individuals']").click();

  // click on dropdown Individuals

  await page.locator("//span[contains(text(),'Individuals')]/ancestor::one-app-nav-bar-menu-button").click();

  //Click on New Individual      
  await page.locator("//span [text()='New Individual']").click();

  // Enter Salutation 

  await page.locator("(//a[contains(text(),'None')])[1]").click();
  await page.locator("//a[contains(text(),'Dr')]").click();

  // Enter LastName
  const lastName = "Testleaf";
  await page.locator("//span[contains(text(),'Last Name')]").fill(lastName),

  // Click on Save
  await page.locator("//button[@title='Save']").click();

  // Verify the created Individual with Toast message.

  const output = await page.locator("//span[contains(@class,'toastMessage')]").innerText();
  console.log(output);
  expect(output).toContain(lastName);

})