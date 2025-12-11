// Health check API endpoint
export default function handler(req, res) {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'xdrive-sandbox',
    version: '0.1.0',
    uptime: process.uptime()
  })
}
