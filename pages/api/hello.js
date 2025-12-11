// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res.status(200).json({ 
    message: 'Hello from xDrive Sandbox API!',
    timestamp: new Date().toISOString(),
    locale: req.headers['accept-language'] || 'en'
  })
}
