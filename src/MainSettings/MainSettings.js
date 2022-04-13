import { getSiteName } from '@lib/sites';
import Button from '@ui/Button';
import ClipboardButton from '@ui/ClipboardButton';
import Settings from '@ui/Settings';
import Time from '@ui/Time';
import React, { useState } from 'react';

import EditSiteNameModal from '../EditSiteNameModal/EditSiteNameModal';
import SelfHostedTransferButton from '../SelfHostedTransferButton/SelfHostedTransferButton';
import TransferDropdown from '../TransferDropdown';

const MainSettings = (props) => {
  const [showModal, setShowModal] = useState(false);

  const { site, account, onSave } = props;

  const isReadOnlyUser =
    account && !account.getIn(['user_capabilities', 'sites', 'c']);
  const provider = site?.getIn(['build_settings', 'provider']);
  const isSelfHostedGitSite =
    provider === 'github_enterprise' || provider === 'gitlab_self_hosted';

  return (
    <Settings
      title="Site information"
      readOnly={isReadOnlyUser}
      action={
        <>
          <Button level="secondary" onClick={() => setShowModal(true)}>
            Change site name
          </Button>
          {isSelfHostedGitSite ? (
            // @ts-ignore
            <SelfHostedTransferButton siteName={site?.get('name')} />
          ) : (
            <TransferDropdown {...props} label="Transfer site" />
          )}
        </>
      }
    >
      <Settings.Panel>
        <div className="table-body">
          <dl>
            <div>
              <dt>Site name</dt>
              <dd>{getSiteName(site)}</dd>
            </div>
            <div>
              <dt>Owner</dt>
              <dd>{site.get('account_name')}</dd>
            </div>
            <div>
              <dt>API ID</dt>
              <dd>{site.get('id')}</dd>
              <ClipboardButton icon={true} textForClipboard={site.get('id')} />
            </div>
            <div>
              <dt>Created</dt>
              <dd>
                <Time dateTime>{site.get('created_at')}</Time>
              </dd>
            </div>
            <div>
              <dt>Last update</dt>
              <dd>
                <Time dateTime>{site.get('updated_at')}</Time>
              </dd>
            </div>
          </dl>
        </div>
        {/* @ts-ignore */}
        <EditSiteNameModal
          show={showModal}
          site={site}
          onSave={onSave}
          onHide={() => setShowModal(false)}
        />
      </Settings.Panel>
    </Settings>
  );
};

export default MainSettings;
