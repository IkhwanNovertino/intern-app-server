module.exports = {
  index: async (req, res) => {
    try {
      res.render('view_sertifikat', { title: "Ikhwan" })
    } catch (err) {
      console.log(err);
    }
  }
}