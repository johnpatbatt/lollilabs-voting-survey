import dotenv from "dotenv";
const Router = require("koa-router");
const productModel = require("../models/Product");
dotenv.config();
const SHOPIFY_ACCESS_TOKEN = process.env.SHOPIFY_ACCESS_TOKEN;
const router = new Router({
  prefix: "/product",
});
// update adminURL
const adminURL =
  "https://lollilabs.myshopify.com/admin/api/2021-07/graphql.json";

function register(app) {
  // product save router
  router.post("/save", async (ctx) => {
    const products = ctx.request.body.products;
    const query = `
      query getProducts($ids: [ID!]!) {
        nodes(ids: $ids) {
          ... on Product {
            title
            handle
            descriptionHtml
            id
            images(first: 1) {
              edges {
                node {
                  originalSrc
                  altText
                }
              }
            }
            variants(first: 1) {
              edges {
                node {
                  price
                  id
                }
              }
            }
            metafield1: metafield(namespace: "survey", key: "voting_description") {
              value
            }
            metafield2: metafield(namespace: "survey", key: "voting_gallery") {
              value
            }
            metafield3: metafield(namespace: "survey", key: "voting_featured_img") {
              value
            }
          }
        }
      }
    `;
    const variables = { ids: products };

    console.log(JSON.stringify(variables));

    const productData = await fetch(adminURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": SHOPIFY_ACCESS_TOKEN,
      },
      body: JSON.stringify({
        query,
        variables: variables,
      }),
    }).then((result) => {
      return result.json();
    });

    console.log("productData", productData);

    const productsFromQuery = productData.data.nodes.map((product) => ({
      id: product.id,
      title: product.title,
      handle: product.handle,
      price: product.variants.edges[0].node.price,
      description: product.metafield1.value,
      gallery: product.metafield2.value,
      featuredImage: product.metafield3.value,
    }));

    const removeValIndex = [];

    for (let index = 0; index < productsFromQuery.length; index++) {
      const productData = productsFromQuery[index];

      const productModelCount = await productModel.countDocuments({
        id: productData.id,
      });

      if (productModelCount > 0) {
        console.log("product already exist");
        removeValIndex.push(index);
      } else {
        console.log("product no exist");
      }
    }

    for (let index = removeValIndex.length - 1; index >= 0; index--) {
      productsFromQuery.splice(removeValIndex[index], 1);
    }

    const insertedProducts = await productModel.insertMany(productsFromQuery);
    if (insertedProducts.length > 0) {
      ctx.body = { success: true, insertedProducts: insertedProducts };
    } else {
      ctx.body = { success: false };
    }
  });

  // product get router
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
