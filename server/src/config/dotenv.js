import dotenv from 'dotenv'

dotenv.config()

const config = {
    mongodb_url : process.env.MONGODB_URL,
    access : process.env.ACCESS,
    refresh : process.env.REFRESH,
    image_kit_private : process.env.IMAGEKIT_PRIVATE,
    image_kit_public : process.env.IMAGEKIT_PUBLIC,
    url_endpoint: process.env.URL_END_POINT
}

export default config 