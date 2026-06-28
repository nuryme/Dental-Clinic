// Vercel serves files in /api as serverless functions. The vercel.json rewrite
// funnels every /api/* request here; this just re-exports the Express app.
// (server/index.js strips the /api prefix so its routes still match.)
module.exports = require('../server/index.js')
