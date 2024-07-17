import React from 'react'
import puppeteer from "puppeteer"

async function scrapeMedium(topic) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(`https://medium.com/search?q=${topic}`, {
    waitUntil: "networkidle2",
  });

  // Ensure the page has loaded and the articles are available
  await page.waitForSelector("article", { timeout: 50000 });

  const articles = await page.evaluate(() => {
    const articleElements = document.querySelectorAll("article");
    const articlesData = [];

    articleElements.forEach((article) => {
      article.style.border = "1px solid red";
      const title = article.querySelector("h2")?.innerText;
      const author =
        article.querySelector(".lx.l p.be.b.ik.z.ee.hl.ef.eg.eh.ei.ej.ek.bj")
          ?.innerText ;
      let date = "";

      // First attempt to get date using the primary selector
      const primaryDateElement = article.querySelector(
        ".nj.nk.nl.nm.nn.no.np.nq.nr.ns.l > span.be.b.ik.z.fd > div.hw.ab.fv.ae > div.ab.q"
      );
      if (primaryDateElement) {
        date = primaryDateElement.innerText.split("\n")[0].trim();
      } else {
        // Fallback method to get date
        const elements = article.getElementsByClassName("be b ik z fd");
        if (elements.length > 0) {
          const dateElement = elements[0].querySelector("span");
          date = dateElement?.innerText.trim();
        }
      }

      const url =
        article.querySelector('div[role="link"]')?.getAttribute("data-href");
      // Get the img src
      const imgSrc =
        article.querySelector('img[width="160"]')?.getAttribute("src") ;

      articlesData.push({ title, author, date, url, imgSrc });
    });

    return articlesData.slice(0, 5);
  });

  // console.log(articles);
  // await page.waitForTimeout(5000);
  await browser.close();
  return articles;
}

async function ScrapeMedium(req,res) {
    if(req.method == "POST"){
      try {
        const input = req.body.input;
        console.log(input);
        const articles = await scrapeMedium(input);
        // console.log("article data", articles);
        return res.status(200).json({ success: "True", articles });
      } catch (err) {
        console.log(err);
        res.status(400).json({success:'Flase'})
      }
    }

  return (
    <div>ScrapeMedium</div>
  )
}

export default ScrapeMedium