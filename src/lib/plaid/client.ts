import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid';

import { env } from '@/env';

const configuration = new Configuration({
  basePath:
    env.PLAID_ENV === 'sandbox'
      ? PlaidEnvironments.sandbox
      : PlaidEnvironments.development,
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': env.PLAID_CLIENT_ID,
      'PLAID-SECRET': env.PLAID_API_KEY,
    },
  },
});

const plaidClient = new PlaidApi(configuration);

export { plaidClient };
