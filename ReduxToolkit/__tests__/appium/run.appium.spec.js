import wd from 'wd';
import path from 'path'
import getElement from './helpers/getElement'

jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
const PORT = 4723;

const config = {
    platformName: 'Android',
    platformVersion: '11.0',
    deviceName: 'emulator-5554',
    automationName: 'UiAutomator2',
    app: path.join(__dirname,'../../android/app/build/outputs/apk/debug/app-debug.apk'),
}

const driver = wd.promiseChainRemote('localhost', PORT);

beforeAll(async () => {
    await driver.init(config);
})

test('Todo flow', async () => {
    const todoButton = await getElement(driver, 'AddTodoButton', 20000);
    const todolabel = await getElement(driver, 'TodoLabel', 2000)
    await todolabel.sendKeys("Test todo from Appium");
    await todoButton.click();
})