const commonSetup = {
  repo: process.env.BITBUCKET_GIT_SSH_ORIGIN,
  path: '/var/www/react',
  user: 'ubuntu'
};

const commonEnv = {
  NODE_ENV: 'production',
  WORDPRESS_ADMIN_PASSWORD: 'replace_me',
  WORDPRESS_ADMIN_USER: 'replace_me',
  WORDPRESS_PATH: '/var/www/wordpress',
  WORDPRESS_PLUGIN_FILE: `${commonSetup.path}/current/plugins.json`,
  WORDPRESS_THEME: 'gsandf-react',
  WORDPRESS_TITLE: JSON.stringify('replace_me'),
  WORDPRESS_VERSION: 'latest'
};

module.exports = {
  apps: [
    {
      name: 'react-renderer',
      script: 'yarn start:prod',
      log_date_format: 'YYYY-MM-DDTHH:mm:ss.SSS'
    }
  ],

  deploy: {
    develop: {
      ...commonSetup,
      host: process.env.DEVELOP_HOST,
      'post-deploy': '.deployment/hooks/post-deploy.sh develop',
      'post-setup': '.deployment/hooks/post-setup.sh develop',
      'pre-deploy-local': '.deployment/hooks/pre-deploy-local.sh develop',
      'pre-setup': '.deployment/hooks/pre-setup.sh develop',
      ref: 'origin/develop',
      env: {
        ...commonEnv,
        MYSQL_DATABASE: 'replace_me',
        MYSQL_HOST: 'replace_me',
        MYSQL_PASSWORD: 'replace_me',
        MYSQL_USER: 'replace_me',
        WORDPRESS_URL: 'https://dev.replace_me.com'
      }
    },

    staging: {
      ...commonSetup,
      host: process.env.STAGING_HOST,
      'post-deploy': '.deployment/hooks/post-deploy.sh staging',
      'post-setup': '.deployment/hooks/post-setup.sh staging',
      'pre-deploy-local': '.deployment/hooks/pre-deploy-local.sh staging',
      'pre-setup': '.deployment/hooks/pre-setup.sh staging',
      ref: 'origin/staging',
      env: {
        ...commonEnv,
        MYSQL_DATABASE: 'replace_me',
        MYSQL_HOST: 'replace_me',
        MYSQL_PASSWORD: 'replace_me',
        MYSQL_USER: 'replace_me',
        WORDPRESS_URL: 'https://stage.replace_me.com'
      }
    },

    production: {
      ...commonSetup,
      host: process.env.PRODUCTION_HOST,
      'post-deploy': '.deployment/hooks/post-deploy.sh production',
      'post-setup': '.deployment/hooks/post-setup.sh production',
      'pre-deploy-local': '.deployment/hooks/pre-deploy-local.sh production',
      'pre-setup': '.deployment/hooks/pre-setup.sh production',
      ref: 'origin/master',
      env: {
        ...commonEnv,
        MYSQL_DATABASE: 'replace_me',
        MYSQL_HOST: 'replace_me',
        MYSQL_PASSWORD: 'replace_me',
        MYSQL_USER: 'replace_me',
        WORDPRESS_URL: 'https://replace_me.com'
      }
    }
  }
};
