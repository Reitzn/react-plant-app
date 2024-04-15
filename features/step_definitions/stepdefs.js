const { Given, When, Then, Before, AfterAll } = require("@cucumber/cucumber");
const { Builder, By, Key, until } = require("selenium-webdriver");
const { expect } = require("expect");

let driver = new Builder().forBrowser("chrome").build();

Before(() => {
  driver.get("http://localhost:3000");
});

AfterAll(() => {
  if (driver !== null) {
    driver.quit();
  }
});

When("A user visit the home page", () => {
  return driver.get("http://localhost:3000/");
});

Then("They should see the home screen", async () => {
  const header = await driver.findElement(By.xpath("//h1")).getText();
  expect(header).toBe("Your Ultimate Plant Tracker");
});

When("A user clicks the login button", async () => {
  const loginButton = await driver.findElement(By.id("login-button"));
  loginButton.click();
});

Then("They should see the login modal", async () => {
  const header = await driver.findElement(By.id("modal-login-title"));
  expect(header).toBeTruthy();
});

When("A user enters correct login credentials", async () => {
  await driver.findElement(By.name("email")).sendKeys("nick.test@yopmail.com");
  await driver.findElement(By.name("password")).sendKeys("password1");
  await driver.findElement(By.id("modal-login-button")).click();
});

Then("They should be logged in", async () => {
  await driver.manage().setTimeouts({ implicit: 2000 });
  const avatar = await driver.findElement(By.className("MuiAvatar-circular"));
  expect(avatar).toBeTruthy();
});

When("A user navigates to the seed page", async () => {
  await driver.findElement(By.xpath("//button[text()='Seeds']")).click();
});

Then("They should be on the seed page", async () => {
  await driver.findElement(By.xpath("//h1[text()='Seeds']"));
});

When("A user clicks on add seed", async () => {
  await driver.findElement(By.xpath("//button[text()='Add Seed']")).click();
});

Then("They should see the add seed modal", async () => {
  await driver.findElement(By.xpath("//h2[text()='Add Seed']"));
});

When("A user enters new seed information", async () => {
  await driver.findElement(By.name("common_name")).sendKeys("Testing Name");
  await driver
    .findElement(By.name("scientific_name"))
    .sendKeys("Testing Scientific Name");
  await driver.findElement(By.xpath("//button[text()='Make It']")).click();
});

Then("The new seed should be added", async () => {
  await driver.findElement(By.xpath("//th[text()='Testing Name']"));
});
