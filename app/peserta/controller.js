module.exports = {
  index: async (req, res) => {
    try {
      res.render('view_peserta', { title: "Ikhwan" })
    } catch (err) {
      console.log(err);
    }
  }
}