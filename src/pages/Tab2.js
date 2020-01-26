
import React from 'react';
import { IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';

class Tab2 extends React.Component {
  render() {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Gespeichert</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <div style={{padding: 15}}>
            <h1>Tab 2</h1>
          </div>
        </IonContent>
      </IonPage>

    );
  }
}

export default Tab2;