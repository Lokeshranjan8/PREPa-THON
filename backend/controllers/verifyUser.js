import bcrypt from "bcrypt"
import prisma from "../Db/db.config.js"
import jwt from "jsonwebtoken"

export const verifyUser = async (req, res) => {

    try {
        const { username, password } = req.body
        const user = await prisma.userProfile.findUnique({
            where: {
                username
            }
        })
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        const validation = await bcrypt.compare(password, user.password)
        if (!validation) {
            return res.status(401).json({ message: "Invalid credentials" })
        }

        const token = jwt.sign({ username: username }, process.env.JWT_KEY, { expiresIn: '1h' })
        return res.status(200).json({ message: "Login successful", token });

    } catch (error) {
        return res.status(500).json({ message: "Server error, Try later" })
    }

}