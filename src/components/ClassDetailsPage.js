
import React from 'react';
import * as Ion from '@ionic/react';
import * as Icons from 'ionicons/icons';
import classes from '../data/classes';

export default class ClassDetailsPage extends React.Component {

  state = {
    ...this.props
  }

  renderToolbar() {
    const label = this.state.location && this.state.location.state && this.state.location.state.label;
    return (
      <Ion.IonToolbar>
        <Ion.IonButtons slot="start">
          <Ion.IonBackButton text="zurück" defaultHref="/classify/result" />
        </Ion.IonButtons>
        <Ion.IonTitle>{label}</Ion.IonTitle>
      </Ion.IonToolbar>
    );
  }

  getUrl(label) {
    console.log(classes);
    const filtered = classes.filter(c => (c.label.toLowerCase() == label.toLowerCase()));
    console.log(filtered);

    return filtered[0].url;
  }

  render() {
    const routerState = this.state.location && this.state.location.state;
    const label = routerState && routerState.label
    return (
      <Ion.IonPage>
        <Ion.IonHeader> {this.renderToolbar()} </Ion.IonHeader>
        <Ion.IonContent>
          <iframe src={this.getUrl(label)} width="100%" height="100%" style={{border: 0}}>
            <p>Your browser does not support iframes.</p>
          </iframe>
        </Ion.IonContent>
      </Ion.IonPage>
    );
  }

}
