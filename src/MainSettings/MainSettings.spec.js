import { siteSettingsAccounts as accounts } from '@stories/fixtures/accounts';
import { teamSite } from '@stories/fixtures/sites';
import { render, screen, success } from '@test/helpers';
import { fromJS } from 'immutable';
import React from 'react';

import MainSettings from './MainSettings';

describe('SiteSettings/MainSettings', () => {
  it('should allow transferring sites non linked to self-hosted Git', () => {
    const account = accounts.last();
    const site = teamSite.merge({
      account_slug: account.get('slug'),
      account_name: account.get('name'),
    });
    render(
      <MainSettings
        site={site}
        account={account}
        accounts={accounts}
        onSave={success('onSave')}
      />
    );

    expect(
      screen.getByRole('button', { name: 'Transfer site. Open menu' })
    ).toBeInTheDocument();
  });

  it('should not allow transferring sites linked to self-hosted Github', () => {
    const account = accounts.last();
    const site = teamSite.merge({
      account_slug: account.get('slug'),
      account_name: account.get('name'),
      build_settings: fromJS({ provider: 'github_enterprise' }),
    });
    render(
      <MainSettings
        site={site}
        account={accounts.last()}
        onSave={success('onSave')}
      />
    );

    expect(
      screen.getByRole('button', {
        name: 'Transfer site',
      })
    ).toBeInTheDocument();
  });

  it('should not allow transferring sites linked to self-hosted Gitlab', () => {
    const account = accounts.last();
    const site = teamSite.merge({
      account_slug: account.get('slug'),
      account_name: account.get('name'),
      build_settings: fromJS({ provider: 'gitlab_self_hosted' }),
    });
    render(
      <MainSettings
        site={site}
        account={accounts.last()}
        onSave={success('onSave')}
      />
    );

    expect(
      screen.getByRole('button', {
        name: 'Transfer site',
      })
    ).toBeInTheDocument();
  });
});
