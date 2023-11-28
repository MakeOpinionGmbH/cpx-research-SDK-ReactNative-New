import 'react-native-gesture-handler';

import { AppRegistry } from 'react-native';
import App from './demo_app/App';
import { name as appName } from './demo_app/app.json';

AppRegistry.registerComponent(appName, () => App);
