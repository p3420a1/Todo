// import wd from 'wd';
// import path from 'path'
// import getElement from './helpers/getElement'

// jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
// const PORT = 4723;

// const config = {
//     platformName: 'Android',
//     platformVersion: '11.0',
//     deviceName: 'emulator-5554',
//     automationName: 'UiAutomator2',
//     app: path.join(__dirname,'../../android/app/build/outputs/apk/debug/app-debug.apk'),
// }

// const driver = wd.promiseChainRemote('localhost', PORT);

// beforeAll(async () => {
//     await driver.init(config);
// })

// test('Todo flow', async () => {
//     const todoButton = await getElement(driver, 'AddTodoButton', 20000);
//     const todolabel = await getElement(driver, 'TodoLabel', 2000)
//     await todolabel.sendKeys("Test todo from Appium");
//     await todoButton.click();
// })



import wd from 'wd';
import path from 'path';
// import os from 'os';
// import fs from 'fs';
// import RegisterFlow from './scenarios/register.appium.spec';
// import LoginFlow from './scenarios/login.appium.spec';
// import {e2eAndroidConfig, e2eiOSConfig} from './AppiumConfig';
import getElement from './helpers/getElement';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 6000;
const PORT = 4723;

// let config = process.env.TESTING_OS === 'android' ? e2eiOSConfig : e2eAndroidConfig;
// let platform = process.env.TESTING_OS || 'android';
// const driver = process.env.BROWSERSTACK_APP_URL
//   ? wd.promiseChainRemote('http://hub-cloud.browserstack.com/wd/hub')
//   : wd.promiseChainRemote('localhost', PORT);

// let config = e2eAndroidConfig;
// let platform = 'android';
// const driver = wd.promiseChainRemote('localhost', PORT);

const config = {
  platformName: 'Android',
  platformVersion: '11.0',
  deviceName: 'emulator-5554',
  automationName: 'UiAutomator2',
  appActivity: 'com.kynder.MainActivity',
  appPackage: 'com.kynder.staging',
  newCommandTimeout: 0,
  app: '/Users/preeti/Desktop/ReactNative/git/kynder-mobile/kynder/android/app/build/outputs/apk/staging/debug/app-staging-universal-debug.apk',
};

// const homedir = os.homedir();
// const xcodeDir = `${homedir}/Library/Developer/Xcode`;
// const getIOSAppPath = () => {
//   const isDirectory = (source) => fs.lstatSync(source).isDirectory();
//   const getDirectories = (source) =>
//     fs
//       .readdirSync(source)
//       .map((name) => path.join(source, name))
//       .filter(isDirectory);

//   const appDir = getDirectories(`${xcodeDir}/DerivedData`).find(
//     (dir) => dir.indexOf('kynder') !== -1,
//   );

//   return `${appDir}/Build/Products/Staging.Debug-iphonesimulator/Kynder Staging.app`;
// };
// const config = {
//   platformName: 'iOS',
//   platformVersion: '14.5',
//   deviceName: 'iPhone 12',
//   app: getIOSAppPath(),
//   automationName: 'XCUITest',
//   newCommandTimeout: 0,
// };

const driver = wd.promiseChainRemote('localhost', PORT);
console.log('------------DRIVER ASSIGNED----------' + JSON.stringify(driver));

beforeAll(async () => {
  console.log('-----------DRIVER INITIATION BEGIN ---------');
  await driver.init(config);
//   console.log('-----------DRIVER INITIATED ---------' + JSON.stringify(driver));
});

// afterAll(async () => {
//   console.log('-----------DRIVER RELEASING ---------');
//   await driver.sleep(5000);
//   await driver.quit();
// });

test('Login flow', async () => {
  console.log('------------Login Flow initiated----------');
  const loginbtn = await getElement(driver, 'login', 200);
  console.log('-------login button loaded---------' + JSON.stringify(loginbtn));
  const id = await getElement(driver, 'loginid', 200);
  console.log('-------email field loaded---------' + JSON.stringify(id));
  const pswd = await getElement(driver, 'loginpswd', 200);
  console.log('-------pswd field loaded---------' + JSON.stringify(pswd));
  const registerbtn = await getElement(driver, 'register', 200);
  console.log(
    '-------register button loaded---------' + JSON.stringify(registerbtn),
  );
  await id.sendKeys('preeti.10oct@gmail.com');
  await pswd.sendKeys('preetip3');
  await loginbtn.click();
  await loginbtn.click();
  console.log('------------Login Flow completed----------');
});
