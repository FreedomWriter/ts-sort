import { siteSettingsAccounts as accounts } from '@stories/fixtures/accounts';
import { teamSite, teamSiteWithSubdomain } from '@stories/fixtures/sites';
import { storiesOf, success } from '@stories/helpers';
import { fromJS } from 'immutable';
import React from 'react';

import MainSettings from './MainSettings';

storiesOf('SiteSettings/MainSettings', module)
  .add('with owner permissions', () => {
    const account = accounts.last();
    return (
      <MainSettings
        site={teamSite.merge({
          account_slug: account.get('slug'),
          account_name: account.get('name'),
        })}
        account={account}
        accounts={accounts}
        onSave={success('onSave')}
      />
    );
  })
  .add('with collaborator permissions', () => {
    const account = accounts.first();
    return (
      <MainSettings
        site={teamSite.merge({
          account_slug: account.get('slug'),
          account_name: account.get('name'),
        })}
        account={account}
        accounts={accounts}
        onSave={success('onSave')}
      />
    );
  })
  .add('with readonly permissions (Billing admin)', () => {
    const account = accounts.get(1);
    return (
      <MainSettings
        site={teamSite.merge({
          account_slug: account.get('slug'),
          account_name: account.get('name'),
        })}
        account={account}
        accounts={accounts}
        onSave={success('onSave')}
      />
    );
  })
  .add('with an account subdomain', () => {
    const account = accounts.get(1);
    return (
      <MainSettings
        site={teamSiteWithSubdomain.merge({
          account_slug: account.get('slug'),
          account_name: account.get('name'),
        })}
        account={account}
        accounts={accounts}
        onSave={success('onSave')}
      />
    );
  })
  .add('with self-hosted Git', () => {
    const account = accounts.last();
    return (
      <MainSettings
        site={teamSite.merge({
          account_slug: account.get('slug'),
          account_name: account.get('name'),
          build_settings: fromJS({ provider: 'github_enterprise' }),
        })}
        account={accounts.last()}
        onSave={success('onSave')}
      />
    );
  });
