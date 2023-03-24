 const Logout = (req, res) => {
    res.clearCookie("cookieToken")
    
    res.redirect("/")
  }
module.exports.Logout = Logout;
//   app.get("/logout",