
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';

import { IonReactRouter } from '@ionic/react-router';
import * as Icons from 'ionicons/icons';
import Menu from './components/Menu';
import ClassifyPage from './components/ClassifyPage';
import ResultPage from './components/ResultPage';
import ClassDetailsPage from './components/ClassDetailsPage';
import FieldBook from './components/FieldBook';
import Settings from './components/Settings';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import './theme/style.css';

const App = () => (
  <IonApp>
    <IonReactRouter>

      <IonSplitPane contentId="main">
        <Menu />
        <IonRouterOutlet id="main">
          <Route path="/classify" component={ClassifyPage} exact={true} />
          <Route path="/" render={() => <Redirect to="/classify" />} exact={true} />
          <Route path="/classify/result" component={ResultPage} />
          <Route path="/classify/classdetails" component={ClassDetailsPage} />
          <Route path="/fieldbook" component={FieldBook} />
          <Route path="/settings" component={Settings} />
        </IonRouterOutlet>
      </IonSplitPane>
    </IonReactRouter>
  </IonApp>
);

export default App;
