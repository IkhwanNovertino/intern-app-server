module.exports = {
  index: async (req, res) => {
    try {
      res.render('index', { title: "Ikhwan" })
    } catch (err) {
      console.log(err);
    }
  }
}