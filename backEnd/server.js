const express = require("express");
const App = express();
const bodyparser = require("body-parser");
App.use(bodyparser.urlencoded({ extended: true }));
App.use(bodyparser.json());
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");
const serverConfig = require("./config/server.config");
const db = require("./model/index");

db.categories.hasMany(db.products);

const init = () => {
  db.connection.sync({ force: true }).then(() => {
    console.log("tables dropped and recreated");
    insertAdmin();
    insertRole();
    insertCategories();
    insertProducts();
  });
};

const insertAdmin = async () => {
  const admin = [
    {
      admin_name: "Abdulla Khan",
      email: "abdulla@khan",
      password: "abdul@khan",
      userId: 1,
    },
  ];
  await db.admin
    .bulkCreate(admin)
    .then(() => {
      console.log("Admin table is initialized");
    })
    .catch((err) => {
      console.log(`Error ${err} while initializing admin table`);
    });
};

const insertCategories = async () => {
  const categories = [
    {
      category_name: "Appliances",
      description:
        "Appliances are divided into three types: small appliances, major appliances (also known as white goods) and consumer electronics (brown goods).",
    },
    {
      category_name: "Apps & Games",
      description:
        "The various forms of leisure entertainment that involve table games, video games, gambling, and many other such activities.",
    },
    {
      category_name: "Baby",
      description:
        "All related to newborn usually refers to a baby from birth to about 2 months of age. Infants can be considered children anywhere from birth to 1 year old.",
    },
    {
      category_name: "Beauty",
      description:
        "Health and beauty encompasses a variety of products, including fragrances, makeup, hair care and coloring products, sunscreen, toothpaste, and products for bathing, nail care, and shaving.",
    },
    {
      category_name: "Books",
      description:
        "All about the book's content, examples being science fiction, crime, history, memoir, and so on.",
    },
    {
      category_name: "Car & Motorbike",
      description:
        "All about Car & Motorbike products example like it's Accessories and spare-parts.",
    },
    {
      category_name: "Clothing & Accessories",
      description:
        "Most modern formal and semi-formal clothing is in this category (for example, dress shirts and suits) and it's Accessories.",
    },
    {
      category_name: "Computers & Accessories",
      description:
        "All about Computers & Accessories products example like Display, CPU, GPU, RAM, etc.",
    },
    {
      category_name: "Health & Personal Care",
      description:
        "Health & Personal Care includes products as diverse as, diagnosis, treatment, amelioration or cure of disease, illness, cleansing pads, colognes, cotton swabs, cotton pads, deodorant, eye liner, facial tissue, hair clippers etc",
    },
  ];
  await db.categories
    .bulkCreate(categories)
    .then(() => {
      console.log("Categories table is initialized");
    })
    .catch((err) => {
      console.log(`Error ${err} while initializing user table`);
    });
};
const insertProducts = async () => {
  const products = [
    {
      product_name: "Kitchen stoves",
      cost: 2899,
      categoryId: 1,
      description:
        "A kitchen stove, often called simply a stove or a cooker, is a kitchen appliance designed for the purpose of cooking food.",
      cost: 2899,
      categoryId: 1,
    },
    {
      product_name: "daily supplications",
      cost: 0,
      categoryId: 2,
      description:
        "Daily Supplications enables you to read and listen to more than 300 different islamic duaas everyday.",
    },
    {
      product_name: "Baby",
      cost: 299,
      categoryId: 3,
      description:
        "A hair care product that is used for the removal of oils, dirt, skin particles, dandruff, environmental pollutants and other contaminant particles that gradually build up in hair.",
    },
    {
      product_name: "Beauty",
      cost: 289,
      categoryId: 4,
      description:
        "Such objects include landscapes, sunsets, humans and works of art. Beauty, together with art and taste, is the main subject of aesthetics, one of the major branches of philosophy.",
    },
    {
      product_name: "Life",
      cost: 500,
      categoryId: 5,
      description:
        "All about the book's content, examples being science fiction, crime, history, memoir, and so on.",
    },
    {
      product_name: "BMW Motorbike",
      cost: 15999,
      categoryId: 6,
      description:
        "All about Motorbike products example like it's Accessories and spare-parts.",
    },
    {
      product_name: "Vc",
      cost: 2599,
      categoryId: 7,
      description:
        "Most modern formal and semi-formal clothing is in this category (for example, dress shirts and suits) and it's Accessories.",
    },
  ];
  await db.products
    .bulkCreate(products)
    .then(() => {
      console.log("Products table is initialized");
    })
    .catch((err) => {
      console.log(`Error ${err} while initializing user table`);
    });
};

const insertRole = async () => {
  await db.role
    .bulkCreate([
      { id: 1, name: "user" },
      { id: 2, name: "admin" },
    ])
    .then((Roles) => {
      console.log("Role table is initialized");
    })
    .catch((err) => {
      console.log(`Error ${err} while initializing role table`);
    });
};
console.log(1);
require("./router/index")(App);
console.log(2);
require("./router/auth.router")(App);
console.log(3);
require("./router/users.router")(App);
console.log(4);
require("./router/adminRouter")(App);
console.log(5);
require("./router/product.router.js")(App);
console.log(6);
require("./router/category.router.js")(App);
console.log(7);
require("./router/cart.router.js")(App);
console.log(8);

App.listen(serverConfig.PORT, () => {
  console.log(
    `Server is up and running on http://localhost:${serverConfig.PORT}/ecomm/api/v1/`
  );
  init();
});
