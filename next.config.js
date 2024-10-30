// next.config.js
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
  async rewrites() {
    return [
      {
        source: '/auth/:path*',
        destination: '/modules/auth/pages/:path*',
      },
      {
        source: '/contacts/:path*',
        destination: '/modules/contacts/pages/:path*',
      },
      {
        source: '/dashboard/:path*',
        destination: '/modules/dashboard/pages/:path*',
      },
      {
        source: '/employees/:path*',
        destination: '/modules/employees/pages/:path*',
      },
      {
        source: '/inventory/:path*',
        destination: '/modules/inventory/pages/:path*',
      },
      {
        source: '/projects/:path*',
        destination: '/modules/projects/pages/:path*',
      },
      {
        source: '/purchases/:path*',
        destination: '/modules/purchases/pages/:path*',
      },
      {
        source: '/sales/:path*',
        destination: '/modules/sales/pages/:path*',
      },
      {
        source: '/tpv/:path*',
        destination: '/modules/tpv/pages/:path*',
      },
      {
        source: '/accounting/:path*',
        destination: '/modules/accounting/pages/:path*',
      }
    ];
  },
};
