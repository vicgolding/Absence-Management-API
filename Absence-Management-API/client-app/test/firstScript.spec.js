import {By, Builder, Browser} from 'selenium-webdriver';

let driver;
try {
    driver = await new Builder().forBrowser(Browser.CHROME).build();
    await driver.get('http://localhost:3000/');
    await driver.manage().setTimeouts({implicit: 5000});
    let employeeNameField = await driver.findElement(By.name("employeeName"));
    let submitButton = await driver.findElement(By.id("submit-button"));
    let startDateField = await driver.findElement(By.name("startDate"));
    let endDateField = await driver.findElement(By.name("endDate"));
    await employeeNameField.sendKeys("Arthur Morgan");
    await driver.manage().setTimeouts({implicit: 5000});
    await startDateField.sendKeys("01-01-2026");
    await driver.manage().setTimeouts({implicit: 5000});
    await endDateField.sendKeys("02-01-2026");
    await driver.manage().setTimeouts({implicit: 5000});
    await submitButton.click();
    await driver.manage().setTimeouts({implicit: 7500});
} catch (error) {
    console.error(error);
} finally {
    await driver.quit();
}