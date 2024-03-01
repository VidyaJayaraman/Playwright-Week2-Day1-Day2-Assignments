/* Assignment: 2 Edit Lead

http://leaftaps.com/opentaps/control/main			
1. Launch the browser
2. Enter the username
3. Enter the password
4. Click Login
5. Click CRM/SFA link
6. Click Leads link
7. Click on Create Lead
8. Enter company name
9. Enter first name
10.Enter last name
11.Click on Create Lead button  
12.Click Edit
13.Change the company name
14.Click Update */


/*********************************************************   Test2 : Edit Lead - Leaftaps****************************************************************/


import { chromium, expect, test } from "@playwright/test";

test("Edit Lead", async () => {
    const browser = await chromium.launch({ headless: false, channel: "chrome" });
    const browserContext = await browser.newContext();
    const page = await browserContext.newPage();
    await page.goto("http://leaftaps.com/opentaps/control/main");
    await page.fill("input[id='username']", "demosalesManager");
    await page.fill("input[id='password']", "crmsfa");
    await page.locator(".decorativeSubmit").click();
    await page.waitForTimeout(3000);
    await page.locator("div[id='label'] a").filter({ hasText: 'CRM/SFA' }).click();    // css selector
    await page.locator("div[class='x-panel-header'] a").nth(1).click();               // css selector
    const expected = "Testleaf";
    await page.getByText("Create Lead").click();                                     // playwright selector
    await page.fill("input[id=createLeadForm_companyName]", "Nokia");
    await page.fill("input[id=createLeadForm_firstName]", "Anitha");
    await page.fill("input[id=createLeadForm_lastName]", "Jayaraman");
    await page.locator("input[name='submitButton'][value='Create Lead']").click();
    await page.locator("//a[text()='Edit']").click();
    await page.fill("input[id=updateLeadForm_companyName]", expected);
    await page.locator("input[name='submitButton'][value='Update']").click();
    const output =  await page.locator("//span[@id='viewLead_companyName_sp']").innerText();
    console.log(output);
    expect(output).toContain(expected);
})        
