const { users } = require("../model/UsersModel");

module.exports = {
  async index(_req, res) {
    const user = await users.find();

    res.status(200).json({ msg: "OK", data: user })
  },
  async show(req, res) {
    const { token_bot } = req.params
    try {
      const find_user = await users.findOne({ token_bot: token_bot });

      res.status(200).json({ msg: "OK", data: find_user || "User não encontrado" })
    } catch (error) {
      res.status(500).status(500).json({ msg: "ERRO", data: error.message })
    }
  },
  async delete(req, res) {
    const {
      token_bot,
      product,
    } = req.params;

    //await users.deleteMany({ token_bot: "1457269966" });
    try {
      const old_user = await users.findOne({ token_bot: token_bot });
      if (old_user.product.length > 1) {
        let dataUpdate = {};
        const new_array = old_user.product.filter(item => item.product != product)
        dataUpdate = {
          product: new_array,
        }

        await users.updateMany({ token_bot: token_bot }, dataUpdate, { new: true })
      } else {
        await users.deleteMany({ token_bot: token_bot })
      }

      res.json({ msg: "OK", data: `${product} deletado` })
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
      const old_user = await users.findOne({ token_bot: token_bot });

      if (old_user) {
        let array_token = old_user.product
        array_token.push({ product: `${product}` })

        const userDataUpdate = {
          token_bot: token_bot,
          product: array_token,
        }
        await users.updateMany({ token_bot: token_bot }, userDataUpdate, { new: true })
      } else {
        const userDataCreate = {
          token_bot: token_bot,
          product: { product: `${product}` },
        }
        await users.create(userDataCreate)
      }

      res.json({ msg: "OK", data: `${product} adicionado` })
    } catch (error) {
      res.status(500).json({ msg: "ERRO", data: error.message })
    }
  },
}