const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

module.exports = (phase) => {
    const isLocalhost = phase === PHASE_DEVELOPMENT_SERVER
    const tzoffset = new Date().getTimezoneOffset() * 60000
    const localISOTime = new Date(Date.now() - tzoffset)
      .toISOString()
      .slice(0, -1)

    const env = {
      dateBuild: localISOTime,
      apiUrl: (() => {
        if (isLocalhost)
          return 'http://localhost:3002/api'
        return 'http://localhost:3002/api'
      })(),
    }
  
  
    const publicRuntimeConfig = {
        API_URL: env.apiUrl
    }
   
    return {
      env,
      publicRuntimeConfig,
      // redirects
    }
  }