import dotenv from "dotenv";
const Router = require("koa-router");
const microOneModel = require("../models/MicrositeOne");
dotenv.config();
const router = new Router({
  prefix: "/micrositeone",
});

function register(app) {
  // microsite 1 save router
  router.post("/save", async (ctx) => {
    const products = ctx.request.body.products;
    console.log("microsite one products", products);
    const insertedSurveys = await microOneModel.insertMany(products);

    if (insertedSurveys.length > 0) {
      ctx.body = { success: true, insertedSurveys: insertedSurveys };
    } else {
      ctx.body = { success: false };
    }
  });

  // microsite 1 get router
  router.post("/get", async (ctx) => {
    const products = await productModel.find({});
    ctx.body = { success: true, products: products };
  });

  // product remove router
  router.post("/remove", async (ctx) => {
    const products = ctx.request.body.products;
    const removedProducts = await productModel.deleteMany({
      id: { $in: products },
    });

    if (removedProducts.deletedCount > 0) {
      ctx.body = { success: true, removedProducts: removedProducts };
    } else {
      ctx.body = { success: false };
    }
  });

  // product update router
  router.post("/update", async (ctx) => {
    const products = ctx.request.body.products;

    const productsData = products.map((product) => ({
      handle: product.handle,
      description: product.description,
      score: Math.floor(
        (parseInt(product.score) + parseInt(product.oldScore)) / 2
      ),
    }));

    console.log("productsData", productsData);

    const updatedProducts = [];

    for (let index = 0; index < productsData.length; index++) {
      const tempProduct = await productModel.updateOne(
        {
          handle: productsData[index].handle,
        },
        {
          score: productsData[index].score,
          votingScoreDescription: productsData[index].description,
        }
      );
      updatedProducts.push(tempProduct);
    }

    console.log("updated products", updatedProducts);

    if (updatedProducts.length > 0) {
      ctx.body = { success: true, updatedProducts: updatedProducts };
    } else {
      ctx.body = { success: false };
    }
  });

  app.use(router.routes());
  app.use(router.allowedMethods());
}

module.exports = register;
