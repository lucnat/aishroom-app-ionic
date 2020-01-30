
import React from 'react';
import * as Ion from '@ionic/react';

import Predictions from './Predictions';


class ResultPage extends React.Component {

  // props: predictions, imageURL

	render() {
    const routerState = this.props.location && this.props.location.state;
    const predictions = routerState && routerState.predictions;
		return (
      <Ion.IonPage>
        <Ion.IonHeader>
          <Ion.IonToolbar>
            <Ion.IonButtons slot="start">
              <Ion.IonBackButton text="zurück" defaultHref="/classify" />
            </Ion.IonButtons>
            <Ion.IonTitle>Resultat</Ion.IonTitle>
          </Ion.IonToolbar>
        </Ion.IonHeader>
        <Ion.IonContent>
          <img src={routerState && routerState.imageURL} />
          <Predictions predictions={predictions} />
          <br />
          <Ion.IonButton color="light" mode="ios" expand="block" onClick={() => {alert('Todo')}}>
            Zu meinem Feldbuch hinzufügen
          </Ion.IonButton>
          <br />
       </Ion.IonContent>
      </Ion.IonPage>
		);
	}

}

export default ResultPage