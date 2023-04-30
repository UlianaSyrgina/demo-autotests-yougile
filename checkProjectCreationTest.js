
const puppeteer = require('puppeteer');
const steps = require('./common/steps/steps');

(async function () {
    console.log('Browser launch');
    const browser = await puppeteer.launch({ headless: false });

    console.log('Create a new browser tab');
    const page = await browser.newPage();

    console.log('Follow the link');
    await page.goto('https://ru.yougile.com/team/settings-account');

    await steps.loginWithGoogleStep(page, browser);
    await steps.clickMyCompanyButtonStep(page);
    await steps.clickAddProjectButtonStep(page);
    await steps.fillProjectNameStep(page);
    await steps.clickCreateProjectButtonStep(page);
    await steps.clickProjectActionsButtonStep(page);

    page.on('dialog', async dialog => {
        await dialog.accept();
    })

    await steps.clickSpecificButtonInActionsGroupStep('Удалить', page);
    await page.evaluate(() => {
        return new Promise(r => setTimeout(r, 500));
    });
    console.log('Close browser');
    await browser.close();
})()