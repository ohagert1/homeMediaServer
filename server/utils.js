const adminCheck = (req, res, next) => {
  if (req.session.isAdmin) return true
  return false
}

const loginCheck = (req, _, next) => {
  if (!req.user || !req.user.isApproved) {
    let err = new Error('Fuck off')
    err.status = 403
    throw err
  } else {
    next()
  }
}

module.exports = {
  adminCheck,
  loginCheck
}
