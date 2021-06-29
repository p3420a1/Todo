import wd from 'wd';
import path from 'path'
import getElement from './helpers/getElement'

jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
const PORT = 4723;

const driver = wd.promiseChainRemote('localhost', PORT);

const configAndroid = {
  platformName: 'Android',
  platformVersion: '11.0',
  deviceName: 'emulator-5554',
  automationName: 'UiAutomator2',
  appActivity: 'com.kynder.MainActivity',
  appPackage: 'com.kynder.staging',
  newCommandTimeout: 0,
  app: '/Users/preeti/Desktop/ReactNative/git/kynder-mobile/kynder/android/app/build/outputs/apk/staging/debug/app-staging-universal-debug.apk',
};

const homedir = os.homedir();
const xcodeDir = `${homedir}/Library/Developer/Xcode`;
const getIOSAppPath = () => {
  const isDirectory = (source) => fs.lstatSync(source).isDirectory();
  const getDirectories = (source) =>
    fs
      .readdirSync(source)
      .map((name) => path.join(source, name))
      .filter(isDirectory);

  const appDir = getDirectories(`${xcodeDir}/DerivedData`).find(
    (dir) => dir.indexOf('kynder') !== -1,
  );

  return `${appDir}/Build/Products/Staging.Debug-iphonesimulator/Kynder Staging.app`;
};
const configIos = {
  platformName: 'iOS',
  platformVersion: '14.5',
  deviceName: 'iPhone 12',
  app: getIOSAppPath(),
  automationName: 'XCUITest',
  newCommandTimeout: 0,
};

beforeAll(async () => {
  await driver.init(configAndroid);
})

afterAll(async () => {
  await driver.sleep(5000);
  await driver.quit();
});

test('Todo flow', async () => {
  const todoButton = await getElement(driver, 'AddTodoButton', 20000);
  const todolabel = await getElement(driver, 'TodoLabel', 2000)
  await todolabel.sendKeys("Test todo from Appium");
  await todoButton.click();
})
