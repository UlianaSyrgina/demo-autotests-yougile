async function loginWithGoogleStep(page, browser) {

    console.log('Click "googleAccount" button');

    const googleAccountSelector = '.nsm7Bb-HzV7m-LgbsSe-BPrWId';
    await page.waitForSelector(googleAccountSelector, { visible: true });
    await page.click(googleAccountSelector);

    const pageTarget = page.target()
    const newTarget = await browser.waitForTarget(
        (target) => target.opener() === pageTarget
    )

    console.log('Focus to a new authorization tab');

    const googleAuthTabPage = await newTarget.page();

    console.log('Input login');

    await googleAuthTabPage.waitForSelector('#identifierId');
    await googleAuthTabPage.type('#identifierId', '*******@gmail.com', { visible: true });
    await googleAuthTabPage.click('#identifierNext > div > button > div.VfPpkd-RLmnJb');

    console.log('Input password');

    await googleAuthTabPage.waitForSelector('input[type="password"]', { visible: true })
    await googleAuthTabPage.type('input[type="password"]', "*********")
    await googleAuthTabPage.waitForSelector('#passwordNext', { visible: true })
    await googleAuthTabPage.click('#passwordNext')
}


async function clickMyCompanyButtonStep(page) {
    console.log('Click "My company" button');
    const myCompanySelector = '#loggedin-container > div > main-menu > div > div.absolute.w-240.px-8.pt-8.pb-16.top-0.left-0.bottom-0.text-14.flex.flex-col.bg-grey-l100.transition.z-10.border-solid.border-0.border-r-1.border-grey-l60 > div:nth-child(4)';
    await page.waitForSelector(myCompanySelector, { visible: true });
    await page.click(myCompanySelector);
}

async function clickAddProjectButtonStep(page){
    console.log('Click "Add project" button');
    const addProjectSelector = '#loggedin-container > div > div > page-container > div > div > div.scrollbar-container.overflow-auto.top-0.absolute.bottom-0.w-full.pl-32.pr-24.ps > div.flex.flex-col.h-full.w-fit > div > div > div.min-w-664.max-w-1096.rounded-8.bg-grey-l100.shadow-border-1.shadow-grey-l60 > div:nth-child(2) > div.mb-16.flex.flex-row > div:nth-child(1) > div';
    await page.waitForSelector(addProjectSelector, { visible: true });
    await page.click(addProjectSelector);
}

async function fillProjectNameStep(page){
    console.log('Input project name');
    const projectInputSelector = 'body > div:nth-child(23) > div > div.popup__wnd.project-participants__popup__wnd > div.popup__cnt.project-participants__popup__cnt.undefined > div.project-participants__title > input';
    await page.waitForSelector(projectInputSelector, { visible: true });
    await page.type(projectInputSelector, 'Тестовый проект');
}

async function clickCreateProjectButtonStep(page){
    console.log('Click "Create project" button');
    const createProjectSelector = 'body > div:nth-child(23) > div > div.popup__wnd.project-participants__popup__wnd > div.popup__footer.project-participants__popup__footer > div';
    await page.waitForSelector(createProjectSelector, { visible: true });
    await page.click(createProjectSelector);
}

async function clickProjectActionsButtonStep(page){
    console.log('Click "Manage project" button');
    const manageProjectSelector = '#loggedin-container > div > div > page-container > div > div > div.scrollbar-container.overflow-auto.top-0.absolute.bottom-0.w-full.pl-32.pr-24.ps.ps--active-x.ps--active-y > div.flex.flex-col.h-full.w-fit > div > div > div.min-w-664.max-w-1096.rounded-8.bg-grey-l100.shadow-border-1.shadow-grey-l60 > div:nth-child(2) > div:nth-child(2) > div > div:nth-child(1) > div.flex-none.w-full.flex.flex-row.justify-between.items-center > div.flex-none.h-16.w-16.flex.items-center.justify-center > svg';
    await page.waitForSelector(manageProjectSelector, { visible: true });
    await page.click(manageProjectSelector);
}

async function clickSpecificButtonInActionsGroupStep(name, page){
    const elements = await page.$$('.group');
    for (let i = 0; i < elements.length; i++) {
        const text = await (await elements[i].getProperty('textContent')).jsonValue();
        if (text.includes(name)) {
            const deleteButton = await elements[i].$(':last-child');
            await deleteButton.click();
            return;
        }
    }
}

module.exports = {
    loginWithGoogleStep,
    clickMyCompanyButtonStep,
    clickAddProjectButtonStep,
    fillProjectNameStep,
    clickCreateProjectButtonStep,
    clickProjectActionsButtonStep,
    clickSpecificButtonInActionsGroupStep
};