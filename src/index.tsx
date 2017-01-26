import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { EmailBox } from './EmailBox/EmailBox';

ReactDOM.render(
    <EmailBox domainId="1" domainName="example.com"/>,
    document.getElementById('root')
);
