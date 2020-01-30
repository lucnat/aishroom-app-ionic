
import React from 'react';
import * as Ion from '@ionic/react';

import Predictions from './Predictions';
import classes from '../data/classes';

class ResultPage extends React.Component {

  // props: predictions, imageURL

  state = {
    ...this.props
  }

	render() {
    const routerState = this.state.location && this.state.location.state;
    const predictions = routerState && routerState.predictions;

		return (
      <Ion.IonPage>
        <Ion.IonHeader>
          <Ion.IonToolbar>
            <Ion.IonButtons slot="start" color="primary">
              <Ion.IonBackButton text="zurück" defaultHref="/classify" />
            </Ion.IonButtons>
            <Ion.IonTitle>Resultat</Ion.IonTitle>
          </Ion.IonToolbar>
        </Ion.IonHeader>
        <Ion.IonContent>
          <img src={routerState && routerState.imageURL} />
          <Predictions predictions={predictions} history={this.props.history} />
          <br />
          <Ion.IonButton color="light" expand="block" onClick={() => {alert('Todo')}}>
            Zu meinem Feldbuch hinzufügen
          </Ion.IonButton>
          <br />
       </Ion.IonContent>
      </Ion.IonPage>
		);
	}

}

export default ResultPage