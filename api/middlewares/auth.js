const { USER_NAME, PASSWORD } = require("../config");


// Autherizing the user
const auth = async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    // Check if the token exists
    try {

        if (USER_NAME !== req.body.username || PASSWORD !== req.body.password) {
            throw new Error("Invalid credentials");
        }       
        next();
    } catch (err) {
        return res.status(403).json({ message: err.message });
    }

};

module.exports = auth;