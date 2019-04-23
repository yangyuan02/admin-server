import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './css/common.css';
import { Hello } from './js/hello';

ReactDOM.render(<Hello compiler="TypeScript" framework="React" />, document.getElementById('app'));
