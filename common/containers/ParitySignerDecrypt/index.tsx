import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import translate from 'translations';
import { NewTabLink } from 'components/ui';
import QrSigner from '@parity/qr-signer';
import { isValidETHAddress } from 'libs/validators';
import { ParitySignerWallet } from 'libs/wallet';
import { showNotification, TShowNotification } from 'actions/notifications';
import './index.scss';
import AppStoreBadge from 'assets/images/mobile/app-store-badge.png';
import GooglePlayBadge from 'assets/images/mobile/google-play-badge.png';

interface Props {
  showNotification: TShowNotification;
  onUnlock(param: any): void;
}

class ParitySignerDecrypt extends PureComponent<Props> {
  public render() {
    return (
      <div className="ParitySignerUnlock">
        <div className="ParitySignerUnlock-qr-bounds">
          <QrSigner
            size={300}
            scan={true}
            onScan={this.unlockAddress}
            styles={{ display: 'inline-block' }}
          />
        </div>
        <p>{translate('ADD_PARITY_2')}</p>
        <p>
          <NewTabLink href="https://itunes.apple.com/us/app/parity-signer/id1218174838">
            <img className="ParitySignerUnlock-badge" src={AppStoreBadge} alt="App Store" />
          </NewTabLink>
          <NewTabLink href="https://play.google.com/store/apps/details?id=com.nativesigner">
            <img className="ParitySignerUnlock-badge" src={GooglePlayBadge} alt="Google Play" />
          </NewTabLink>
        </p>
      </div>
    );
  }

  private unlockAddress = (address: string) => {
    if (!isValidETHAddress(address)) {
      this.props.showNotification('danger', 'Not a valid address!');
      return;
    }

    this.props.onUnlock(new ParitySignerWallet(address));
  };
}

export default connect(() => ({}), { showNotification })(ParitySignerDecrypt);