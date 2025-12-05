const { Builder, By, until } = require("selenium-webdriver");

async function sortByPriceLowToHigh() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    await driver.get("https://qatest-dev.indvp.com/");
    await driver.manage().window().maximize();
    console.log("homepage loaded");

    // 1. click "NEW IN" category
    let newIn = await driver.findElement(
      By.xpath("//figcaption[normalize-space()='New In']/ancestor::a[1]"),
      10000
    );
    await driver.executeScript("arguments[0].click();", newIn);
    console.log('"NEW IN" category opened');

    // 2. open sort dropdown
    let sortButton = await driver.wait(
      until.elementLocated(
        By.css('div[role="button"][aria-expanded="false"].Field-SelectWrapper')
      ),
      10000
    );
    await driver.executeScript(
      "arguments[0].scrollIntoView(true);",
      sortButton
    );
    await driver.sleep(500);
    await driver.executeScript("arguments[0].click();", sortButton);
    console.log("sort dropdown opened");

    // Step 3 – click "price: low to high"
    let lowToHigh = await driver.wait(
      until.elementLocated(By.id("oASC price")),
      8000
    );

    await driver.executeScript("arguments[0].click();", lowToHigh);
    console.log("sort test passed");

    await driver
      .takeScreenshot()
      .then((data) =>
        require("fs").writeFileSync(
          "sort-low-to-high-SUCCESS.png",
          data,
          "base64"
        )
      );
  } catch (error) {
    console.error("sort test failed:", error.message);
    await driver
      .takeScreenshot()
      .then((data) =>
        require("fs").writeFileSync(
          "sort-low-to-high-ERROR.png",
          data,
          "base64"
        )
      );
  } finally {
    await driver.sleep(3000);
    await driver.quit();
  }
}

sortByPriceLowToHigh();
