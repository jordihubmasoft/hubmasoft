
module.exports = {
    webpack: (config, { isServer }) => {
      if (isServer) {
        const originalEntry = config.entry;
        config.entry = async () => {
          const entries = await originalEntry();
  
          if (entries['pages/types/UserLogin']) {
            delete entries['pages/types/UserLogin'];
          }
  
          if (entries['pages/types/CommonResponse']) {
            delete entries['pages/types/CommonResponse'];
          }
  
          return entries;
        };
      }
  
      return config;
    },
  };
  