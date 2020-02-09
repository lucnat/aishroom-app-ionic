
import React from 'react';
import * as Ion from '@ionic/react';
import * as Icons from 'ionicons/icons';

export default class Settings extends React.Component {

  state = {
    models: []
  }

  componentDidMount() {
    fetch('/assets/models/models.json')
      .then(response => {
        return response.json()
      })
      .then(data => {
        this.setState({models: data.models});
      })
  }

  renderToolbar() {
    return (
      <Ion.IonToolbar>
        <Ion.IonButtons slot="start">
          <Ion.IonMenuButton />
        </Ion.IonButtons>
        <Ion.IonTitle>iistellige</Ion.IonTitle>
      </Ion.IonToolbar>
    );
  }

  renderModels() {
    return this.state.models.map(m => (
      <Ion.IonCard key={m.name}>
        <Ion.IonCardHeader><h2>{m.name}</h2></Ion.IonCardHeader>
        <Ion.IonCardContent>
          <p>{m.description}</p>
          <Ion.IonButton 
          disabled={Storage.get('currentModel').name == m.name}
          onClick={() => {
            Storage.set('currentModel',m)
            this.forceUpdate();
          }}>
            Aktivieren
        </Ion.IonButton>
        </Ion.IonCardContent>
      </Ion.IonCard>
    ));
  }

  render() {
    return (
      <Ion.IonPage>
        <Ion.IonHeader> {this.renderToolbar()} </Ion.IonHeader>
        <Ion.IonContent>
          <div style={{padding: 15}}>
            <h1> Remote Models </h1>
            <p> Hier kann das Modell zur Klassifikation ausgewählt werden. </p>
            <p> Momentan ausgeählt: <b>{Storage.get('currentModel').name} </b> </p>
            {this.renderModels()}
          </div>
        </Ion.IonContent>
      </Ion.IonPage>
    );
  }
  
}
