import authModel from "../model/auth.model.js"
import { createAccessToken, createRefreshToken, verifyRefreshToken } from "../utils/auth.utils.js"
import bcrypt from 'bcrypt'

export const register = async (req, res) => {
    const { name, email, password, confirmPassword } = req.body


    if (password !== confirmPassword) {
        return res.status(400).json({
            message: 'password and confirm password do not match'
        })
    }

    const isAlreadyExists = await authModel.findOne({
        email: email
    })

    if (isAlreadyExists) {
        return res.status(409).json({
            message: 'email already exists',
        })
    }

    const user = await authModel.create({
        name,
        email,
        password: await bcrypt.hash(password, 10),
        confirmPassword: await bcrypt.hash(password, 10)
    })

    const accessToken = createAccessToken(user._id)
    const refreshToken = createRefreshToken(user._id)

    await authModel.findByIdAndUpdate(user._id, {
        refreshToken: refreshToken
    })

    res.cookie('refreshToken', refreshToken, {
         httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
    })

    res.status(201).json({
        message: 'user registered successFully',
        data: {
            user: {
                email: user.email,
                id: user._id,
                name: user.name
            }
        },

        accessToken: accessToken
    })
}

export const login = async (req, res) => {
    const { email, password } = req.body

    const user = await authModel.findOne({
        email: email
    })

    if (!user) {
        return res.status(401).json({
            message: 'wrong credentials'
        })
    }

    const isPasswordCheck = await bcrypt.compare(password, user.password)

    if (!isPasswordCheck) {
        return res.status(401).json({
            message: 'wrong credentials'
        })
    }

    const accessToken = createAccessToken(user._id)
    const refreshToken = createRefreshToken(user._id)

    await authModel.findByIdAndUpdate(user._id, {
        refreshToken: refreshToken
    })

    res.cookie('refreshToken', refreshToken, {
         httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
    })

    res.status(200).json({
        message: 'user login successFully',
        data: {
            user: {
                email: user.email,
                password: user.password,
                id: user._id
            }
        },
        accessToken: accessToken
    })
}

export const refresh = async (req, res) => {
    const token = req.cookies.refreshToken

    if (!token) {
        return res.status(401).json({
            message: 'refresh token is Required'
        })
    }

    try {
        const decode = verifyRefreshToken(token)

        const user = await authModel.findById(decode.id)
        if (user.refreshToken !== token) {
            await authModel.findByIdAndUpdate(user._id, {
                refreshToken: null
            })

            return res.status(400).json({
                message: 'mismatch refresh token'
            })
        }

        const accessToken = createAccessToken(user._id)
        const refreshToken = createRefreshToken(user._id)


        await authModel.findByIdAndUpdate(user._id, {
            refreshToken: refreshToken
        })

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.status(200).json({
            message: 'token refresh successFully',
            data: {
                accessToken: accessToken
            }
        })

    } catch (error) {
        return res.status(401).json({
            message: 'invalid or expire refresh token'
        })
    }
}

export const getMe = async (req, res) => {
    const user = req.user

    res.status(200).json({
        message: 'user fetched SuccessFully',
        data: {
            user: {
                email: user.email,
                id: user.id,
                name: user.password
            }
        }
    })
}

export const logout = async (req, res) => {
    const user = req.user

    await authModel.findByIdAndUpdate(user._id, {
        refreshToken: null
    })
    res.clearCookie('refreshToken')

    return res.status(200).json({
        message: 'user logout successFully',
    })
}