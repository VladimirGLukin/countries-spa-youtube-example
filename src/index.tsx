import React from 'react';
import * as ReactDOM from 'react-dom';

import { DeviceThemeProvider } from '@salutejs/plasma-ui/components/Device';
import { SSRProvider } from '@salutejs/plasma-ui/components/SSRProvider';

import { GlobalStyle } from './GlobalStyle';
import { App } from './App';


// import { useCharacterTheme } from '../utils/character';
// import { usePlatform } from '../utils/platform';

// const { platform, isSberbox, isPortal } = usePlatform(router);
// const CharacterTheme = useCharacterTheme();

// const detectDeviceCallback = () => {
//     switch (platform) {
//         case 'mobile':
//             return 'mobile';
//         case 'portal':
//             return 'sberPortal';
//         case 'sberbox':
//         default:
//             return 'sberBox';
//     }
// };

// /*eslint-disable @typescript-eslint/no-var-requires */

ReactDOM.render(
//    <DeviceThemeProvider detectDeviceCallback={detectDeviceCallback}>
// eslint-disable-next-line
    <React.StrictMode>
        <DeviceThemeProvider detectDeviceCallback={() => 'sberBox'}>
            <SSRProvider>
                <App />
                <GlobalStyle />
            </SSRProvider>
        </DeviceThemeProvider>
    </React.StrictMode>,
    document.getElementById('root'),
);