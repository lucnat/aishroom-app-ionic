
import React from 'react';
import * as Ion from '@ionic/react';

import Predictions from './Predictions';

class Result extends React.Component {

  // props: predictions, imageURL

	render() {
    const predictions = this.props.location.state.predictions;
		return (
      <Ion.IonPage>
        <Ion.IonHeader>
          <Ion.IonToolbar>
            <Ion.IonButtons slot="start">
              <Ion.IonBackButton defaultHref="/tab1" />
            </Ion.IonButtons>
            <Ion.IonTitle>Resultat</Ion.IonTitle>
          </Ion.IonToolbar>
        </Ion.IonHeader>
        <Ion.IonContent>
          <img src={this.props.location.state.imageURL} />
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

export default Result