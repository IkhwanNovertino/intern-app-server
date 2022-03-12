module.exports = {
  index: async (req, res) => {
    try {
      res.render('view_bidang', { title: "Ikhwan" })
    } catch (err) {
      console.log(err);
    }
  }
}