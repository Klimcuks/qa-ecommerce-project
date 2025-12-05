const { Builder, By, until } = require("selenium-webdriver");

async function addToBasket() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    await driver.get("https://qatest-dev.indvp.com/");
    await driver.manage().window().maximize();

    console.log("homepage loaded");

    // 1. click "Bed & Bath" category
    let bedAndBath = await driver.wait(
      until.elementLocated(
        By.xpath(
          "//figcaption[contains(text(),'Bed & Bath')]/ancestor::div[@role='button']"
        )
      ),
      10000
    );
    await driver.executeScript("arguments[0].click();", bedAndBath);
    console.log("Bed & Bath clicked");

    // 2. click the product
    let productLink = await driver.wait(
      until.elementLocated(
        By.xpath("//a[contains(.,'Andar Mouth Blown Glass Perfume Bottles')]")
      ),
      15000
    );

    await driver.executeScript(
      "arguments[0].scrollIntoView(true);",
      productLink
    );
    await driver.sleep(500);
    await driver.executeScript("arguments[0].click();", productLink);
    console.log("product opened");

    // Step 3: click "ADD TO BASKET"
    let addBtn = await driver.wait(
      until.elementLocated(
        By.xpath(
          "//button[contains(@class, 'AddToCart')]//span[normalize-space(text())='Add to basket']"
        )
      ),
      10000
    );
    await driver.executeScript("arguments[0].scrollIntoView(true);", addBtn);
    await driver.sleep(500);
    await driver.executeScript("arguments[0].click();", addBtn);
    console.log("ADD TO BASKET clicked");

    // Step 4 – open mini-cart, click "VIEW CART", land on full cart page

    // 4.1 click the mini-cart icon
    let miniCartBtn = await driver.wait(
      until.elementLocated(By.css('button[aria-label="Minicart"]')),
      10000
    );
    await driver.executeScript("arguments[0].click();", miniCartBtn);
    console.log("mini-cart icon clicked");

    // 4.2 wait for the drawer to appear
    await driver.wait(
      until.elementLocated(By.css("div.CartOverlay-Actions")),
      10000
    );
    console.log("mini-cart drawer opened");

    // 4.3 click "VIEW CART" button
    let viewCartBtn = await driver.findElement(
      By.xpath(
        "//div[contains(@class,'CartOverlay-Actions')]//a[contains(@class,'CartOverlay-CartButton')]"
      )
    );
    await driver.executeScript("arguments[0].click();", viewCartBtn);
    console.log('"VIEW CART" clicked');

    // 4.4 Verify landing on the full cart page
    await driver.wait(until.urlContains("/cart"), 10000);
    console.log("add to basket test passed");

    await driver
      .takeScreenshot()
      .then((data) =>
        require("fs").writeFileSync(
          "add-to-basket-FULL-SUCCESS.png",
          data,
          "base64"
        )
      );
  } catch (error) {
    console.error("test failed:", error.message);
    await driver
      .takeScreenshot()
      .then((data) =>
        require("fs").writeFileSync("add-to-basket-ERROR.png", data, "base64")
      );
  } finally {
    await driver.sleep(3000);
    await driver.quit();
  }
}

addToBasket();
