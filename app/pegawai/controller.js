module.exports = {
  index: async (req, res) => {
    try {
      res.render('view_pegawai', { title: "Ikhwan" })
    } catch (err) {
      console.log(err);
    }
  }
}