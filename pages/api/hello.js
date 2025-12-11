// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res.status(200).json({
    message: 'Hello from xdrive-sandbox API!',
    timestamp: new Date().toISOString(),
    locale: req.query.locale || 'en',
    environment: process.env.NODE_ENV || 'development'
  })
}
