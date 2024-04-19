export const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization
    if (!token) {
        return res.status(401).json({ msg: 'no autorizado' })
    }
    next()
}

