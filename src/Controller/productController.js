const { products } = require("../model/ProductsModel");

module.exports = {
  async index(_req, res) {
    const prod = await products.find();

    res.status(200).json({ msg: "OK", data: prod })
  },
  async show(req, res) {
    const { product } = req.params
    try {
      const prod = await products.findOne({ product: product });

      res.json({ msg: "OK", data: prod || "Produto não encontrado" })
    } catch (error) {
      res.status(500).json({ msg: "ERRO", data: error.message })
    }
  },
  async delete(req, res) {
    const {
      product,
      token_bot,
    } = req.params;

//    await products.deleteOne({ _id: "633e1cc62e4e1862eedfdaec" });
    try {
      const old_prod = await products.findOne({ product: product });
      if (old_prod.token_bot.length > 1) {
        let dataUpdate = {};
        let array_prod = old_prod.token_bot
        const new_array = array_prod.filter(item => item.token != token_bot)
        dataUpdate = {
          token_bot: new_array,
        }

        await products.updateMany({ product: product }, dataUpdate, { new: true })
      } else {
        await products.deleteOne({ product: product });
      }
      res.json({ msg: "OK", data: `user ${token_bot} deletado` })
    } catch (error) {
      res.status(500).json({ msg: "ERRO", data: error.message })
    }
  },
  async store(req, res) {
    const {
      product,
      token_bot,
    } = req.body;

    try {
      const old_prod = await products.findOne({ product: product });
      if (old_prod) {
        let array_prod = old_prod.token_bot
        array_prod.push({ token: `${token_bot}` })

        const prodDataUpdate = {
          product: product,
          token_bot: array_prod,
        }
        await products.updateMany({ product: product }, prodDataUpdate, { new: true })

      } else {
        const prodDataCreate = {
          product: product,
          token_bot: { token: `${token_bot}` },
        }
        await products.create(prodDataCreate)
      }

      res.json({ msg: "OK", data: `${product} adicionado` })
    } catch (error) {
      res.status(500).json({ msg: "ERRO", data: error.message })
    }
  },
}