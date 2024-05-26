import type { SupabaseClient } from '@supabase/supabase-js';
import { format } from 'date-fns';

import { plaidClient } from '@/lib/plaid/client';
import type { Database, Json } from '@/lib/supabase/supabase_types';
import type { Transaction } from '@/lib/supabase/types';

export default async function syncTransactions(
  userId: string,
  supabase: SupabaseClient<Database>,
  months = 1,
  start: string = format(
    new Date(Date.now() - 1000 * 60 * 60 * 24 * 30 * months).toISOString(),
    'yyyy-MM-dd',
  ),
  end: string = format(new Date().toISOString(), 'yyyy-MM-dd'),
) {
  try {
    const { data: transactions, error: transactionsError } = await supabase
      .from('transactions')
      .select('*')
      .eq('user_id', userId);

    if (transactionsError) {
      console.error(transactionsError);
      throw new Error('Error fetching transactions');
    }

    if (
      !transactions.length ||
      new Date(transactions.pop()?.updated_at ?? 0) <
        new Date(Date.now() - 1000 * 60 * 60)
    ) {
      const { data: accessToken, error: accessTokenError } = await supabase
        .from('user_tokens')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (accessTokenError ?? !accessToken?.token) {
        console.error(accessTokenError);
        throw new Error('No access token found');
      }

      const { data } = await plaidClient.transactionsGet({
        access_token: accessToken.token,
        start_date: start,
        end_date: end,
      });

      const cleanedData = data.transactions.map(
        (transactionJson): Transaction => ({
          id: transactionJson.transaction_id, // Use the provided transaction ID
          user_id: userId, // This should be added manually or fetched from context
          account_id: transactionJson.account_id,
          amount: -Number(transactionJson.amount),
          authorized_date: transactionJson.authorized_date
            ? new Date(transactionJson.authorized_date).toISOString()
            : null,
          authorized_datetime: transactionJson.authorized_datetime
            ? new Date(transactionJson.authorized_datetime).toISOString()
            : null,
          check_number: transactionJson.check_number ?? null,
          counterparties: transactionJson.counterparties
            ? transactionJson.counterparties.map(
                (counterparty) => counterparty.name,
              )
            : null,
          date: new Date(transactionJson.date).toISOString(),
          datetime: transactionJson.datetime
            ? new Date(transactionJson.datetime).toISOString()
            : null,
          iso_currency_code: transactionJson.iso_currency_code,
          location: (transactionJson.location as unknown as Json) ?? null,
          logo_url: transactionJson.logo_url ?? null,
          merchant_entity_id: transactionJson.merchant_entity_id ?? null,
          merchant_name: transactionJson.merchant_name ?? null,
          name: transactionJson.name,
          payment_channel: transactionJson.payment_channel,
          payment_meta:
            (transactionJson.payment_meta as unknown as Json) ?? null,
          pending: transactionJson.pending,
          pending_transaction_id: transactionJson.pending_transaction_id,
          personal_finance_category:
            (transactionJson.personal_finance_category as Json) ?? null,
          personal_finance_category_icon_url:
            transactionJson.personal_finance_category_icon_url ?? null,
          transaction_code: transactionJson.transaction_code,
          unofficial_currency_code: transactionJson.unofficial_currency_code,
          website: transactionJson.website ?? null,
          created_at: new Date().toISOString(), // Set to the current timestamp
          updated_at: new Date().toISOString(), // Set to the current tim
        }),
      );

      const { error } = await supabase.from('transactions').upsert(cleanedData);

      if (error) {
        console.error(error);
        throw new Error('Error upserting transactions');
      }

      return {
        data: cleanedData,
        error: false,
      };
    }
    return { data: transactions, error: false };
  } catch (error) {
    console.error(error);
    return { data: [], error };
  }
}
