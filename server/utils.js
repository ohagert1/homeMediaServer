const adminCheck = (req, res, next) => {
  if (req.session.isAdmin) return true
  return false
}

const loginCheck = (req, res, next) => {
  //for testing:
  return false
  // if (req.session.isLoggedIn) return true
  // return false
}

module.exports = {
  adminCheck,
  loginCheck
}
