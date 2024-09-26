import prisma from "../Db/db.config.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const createUser = async (req, res) => {

    try {
        const { username, email, password } = req.body
        console.log(username, email, password)

        const findEmail = await prisma.userProfile.findUnique({
            where: {
                email: email
            }
        })

        const findUsername = await prisma.userProfile.findUnique({
            where: {
                username: username
            }
        })

        if (findEmail) {
            return res.status(400).json({ message: "Email already exists" })
        }else if (findUsername) {
            return res.status(401).json({ message: "Username already taken" })
        }else if (findEmail && findUsername) {
            return res.status(402).json({ message: "Username and email both are taken" })
        }

        const hashno = 10
        const hashedPass = await bcrypt.hash(password, hashno)

        await prisma.userProfile.create({
            data: {
                username: username,
                email: email,
                password: hashedPass
            }
        })

        const token = jwt.sign({ username: username }, process.env.JWT_KEY, { expiresIn: '1h' })
        return res.status(200).json({ message: "user created", token })

    } catch (error) {
        return res.status(500).json({ message: "Server error" })
    }
}