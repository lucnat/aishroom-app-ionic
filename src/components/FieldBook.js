
import React from 'react';
import * as Ion from '@ionic/react';
import * as Icons from 'ionicons/icons';

export default class FieldBook extends React.Component {

  renderToolbar() {
    return (
      <Ion.IonToolbar>
        <Ion.IonButtons slot="start">
          <Ion.IonMenuButton />
        </Ion.IonButtons>
        <Ion.IonTitle>Feldbuch</Ion.IonTitle>
      </Ion.IonToolbar>
    );
  }

  render() {
    return (
      <Ion.IonPage>
        <Ion.IonHeader> {this.renderToolbar()} </Ion.IonHeader>
        <Ion.IonContent>
          <div style={{padding: 15}}>
            <p>Work in progress..</p>
          </div>
        </Ion.IonContent>
      </Ion.IonPage>
    );
  }
  
}
