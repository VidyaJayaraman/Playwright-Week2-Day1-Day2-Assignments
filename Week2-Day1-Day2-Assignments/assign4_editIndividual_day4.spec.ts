/*Assignment: 4 Edit Individuals
Test Steps:
1. Login to https://login.salesforce.com
2. Click on the toggle menu button from the left corner
3. Click View All and click Individuals from App Launcher 
4. Click on the Individuals tab 
5. Search the Individuals last name
6. Click on the Dropdown icon and Select Edit
7. Select Salutation as 'Mr'
8. Now enter the first name
9. Click on Save and Verify the first name 
*/

/*********************************************************   Test4 : Edit Individuals - SalesForce****************************************************************/


import { test, chromium, expect } from "@playwright/test";
import { clearScreenDown } from "readline";

test("Edit Individuals", async () => {

  const browser = await chromium.launch({ headless: false, channel: "chrome" });
  const browserContext = await browser.newContext();
  const page = await browserContext.newPage();
  await page.goto("https://login.salesforce.com");
  await page.locator("input[id='username'] ").fill("viddhu.j@gmail.com");
  await page.locator("input[id='password'] ").fill("Testcrm@789!");
  await page.locator("input[id='Login']").click();

  // Wait for the page to load as it take more time .
  await page.waitForLoadState('load');

  // Wait for the waffle icon to appear to click  
  //await page.waitForSelector("//div[@class='slds-icon-waffle']");
  await page.locator("//div[@class='slds-icon-waffle']").click();
  await page.locator("//button[text()='View All']").click();

  // Wait for the page to load as it take more time.
  await page.waitForLoadState('load');

  // Click on Individuals
  await page.locator("//p[text()='Individuals']").click();
  await page.waitForTimeout(5000);

  // Search Individual by name from the search box and click Enter from keyboard
  const lastName = "Testleaf";
  await page.waitForSelector("input[name='Individual-search-input']");
  await page.fill("input[name='Individual-search-input']", lastName);
  await page.keyboard.press('Enter');

  // click on the search result which has lastname

  await page.locator("//span[@data-aura-class='forceInlineEditCell']/a").nth(0).click();

  // click on edit icon

  await page.waitForSelector("//div[@title='Edit']");
  await page.locator("//div[@title='Edit']").click();

  // click on salutation dropdown menu and change it to "Mr."

  await page.locator("//div[contains(@class,'salutation')]").click();
  await page.locator("//a[contains(text(),'Mr.')]").nth(0).click();

  // Enter FirstName

  const firstName = "Anitha"
  await page.locator("//span[contains(text(),'First Name')]").fill(firstName);

  // Click on Save
  await page.locator("//button[@title='Save']").click();

  // Verify the Edited Individual firstname with Toast message.

  const output = await page.locator("//span[contains(@class,'toastMessage')]").innerText();
  console.log(output);
  expect(output).toContain(firstName);


})