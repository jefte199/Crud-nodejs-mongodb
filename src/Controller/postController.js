require('dotenv').config()
const { users } = require("../model/UsersModel");
const { products } = require("../model/ProductsModel");
const { Telegraf } = require('telegraf')
const { Markup } = require('telegraf')

const bot = new Telegraf(process.env.TOKEN_BOT_TELEGRAM)

const url = process.env.URL;
module.exports = {
  async post(req, res) {
    const {
      //      chatId,
      post,
      //      Id_message,
    } = req.body;

    const checkPost = post.toLowerCase().includes("🚨");

    const inlineKeyboard = Markup.inlineKeyboard(
      [
        Markup.button.url(
          `Acessar oferta ➡️`,
          `${url}`
        ),
      ],
      { columns: 1 }
    );

    if (checkPost) {
      const prod = await users.find();

      prod.map(async item => {
        const get_user = item.token_bot;
        await bot.telegram.sendMessage(get_user, `Encontramos uma super oferta📢`)
        await bot.telegram.sendMessage(get_user, `${post.split("🔗")[0]}`, inlineKeyboard)
      });
    } else {
      const get_products = await products.find();

      get_products.map(async item => {
        const get_product = item.product;
        const res = post.toLowerCase().includes(get_product);

        if (res) {
          const get_tokens = await products.findOne({ product: get_product });
          get_tokens.token_bot.map(async item => {
            await bot.telegram.sendMessage(item.token, `🫡 Encontramos uma oferta para ${get_product.toUpperCase()}: \n\n${post.split("🔗")[0]}`, inlineKeyboard)
          });
        }
      });
    }

    res.status(200).json({ msg: "OK", data: "Alerta enviado para todos os membros" })
  },
  async list(req, res) {
    const {
      token_user,
    } = req.body;

    const find_user = await users.findOne({ token_bot: token_user });

    const arrayProduct = find_user.product;
    if (arrayProduct.length > 0) {
      for (let i = 0; i < (arrayProduct.length) - 1; i++) {
        await bot.telegram.sendMessage(token_user, `${arrayProduct[i].product.replace(/(^\w{1})|(\s+\w{1})/g, letra => letra.toUpperCase())} ✅`)
      }

      await bot.telegram.sendMessage(token_user, "" + arrayProduct[(arrayProduct.length) - 1].product.replace(/(^\w{1})|(\s+\w{1})/g, letra => letra.toUpperCase()) + "✅")
    }
    res.status(200).json("OK")
  },
}
