const { Builder, By, until } = require("selenium-webdriver");

async function loginTest() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    await driver.get("https://qatest-dev.indvp.com/");
    await driver.manage().window().maximize();
    console.log("page loaded");

    // Step 1 – click "Sign in" button
    let signInBtn = await driver.wait(
      until.elementLocated(
        By.xpath(
          "//button[contains(@class,'Header-Button') and .//span[contains(text(),'Sign in')]]"
        )
      ),
      15000
    );

    await driver.executeScript("arguments[0].scrollIntoView(true);", signInBtn);
    await driver.sleep(800);
    await driver.executeScript("arguments[0].click();", signInBtn);
    console.log("sign in button clicked");

    // wait for login overlay to appear
    await driver.wait(until.elementLocated(By.name("email")), 10000);
    console.log("login form appeared");

    // Step 2 – fill credentials
    await driver
      .findElement(By.name("email"))
      .sendKeys("gisit50043@fantastu.com");
    await driver.findElement(By.name("password")).sendKeys("Test123!");
    console.log("credentials entered");

    // Step 3 – click "Sign in" inside the form
    let submitBtn = await driver.findElement(
      By.xpath(
        "//form//button[contains(@class,'Button') and contains(.,'Sign in')]"
      )
    );
    await submitBtn.click();
    console.log("form sign in button clicked");

    // Step 4 – verify successful login
    await driver.wait(
      until.elementLocated(
        By.xpath(
          "//span[text()='My Account'] | //button[contains(.,'My Account')]"
        )
      ),
      10000
    );
    console.log("login test passed");

    // save success screenshot
    await driver
      .takeScreenshot()
      .then((data) =>
        require("fs").writeFileSync("login-success.png", data, "base64")
      );
  } catch (error) {
    console.error("test failed:", error.message);
    await driver
      .takeScreenshot()
      .then((data) =>
        require("fs").writeFileSync("login-error.png", data, "base64")
      );
  } finally {
    await driver.sleep(3000);
    await driver.quit();
  }
}

loginTest();
