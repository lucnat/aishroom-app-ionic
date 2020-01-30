
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

          <iframe src="https://en.wikipedia.org/wiki/Special:Random" title="Random Wikipedia Article" width="100%" height="300" style={{border: 0}}>
            <p>Your browser does not support iframes.</p>
          </iframe>

          </div>
        </IonContent>
      </IonPage>

    );
  }
}

export default Tab2;