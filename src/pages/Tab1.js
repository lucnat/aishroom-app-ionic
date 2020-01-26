
import * as Ion from '@ionic/react';
import { book, build, colorFill, grid } from 'ionicons/icons';
import React from 'react';
import { Plugins, CameraResultType } from '@capacitor/core';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import Classifier from './Classifier'
import Predictions from './Predictions'

const { Camera } = Plugins;

export default class Tab1 extends React.Component{

  constructor(props) {
    super(props);
    defineCustomElements(window);
    this.state = {
      imageURL: null,
      isClassifying: false,
      imageClassified: false,
    };

    this.classifier = React.createRef();
  }

  state = {
    photo: null
  }

  async takePicture() {

    if(Ion.isPlatform('desktop')) {
      this.setState({imageURL: 'https://upload.wikimedia.org/wikipedia/commons/c/c2/Amanita_muscaria_%28fly_agaric%29.JPG'});
      return;
    }

    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri
    });
    var imageUrl = image.webPath;
    console.log(image);
    this.setState({
      imageURL: imageUrl
    })
  }

  renderImage() {
    return (
      <div style={{textAlign: 'center'}}>
        {this.state.imageURL ? <img width="160" crossOrigin={Ion.isPlatform('desktop') ? 'anonymous' : null} id="image" src={this.state.imageURL}/> : null}
      </div>
    );
  }

  renderClassifyButton() {
    if(this.state.imageURL && !this.state.imageClassified && !this.state.isClassifying) return (
      <div style={{textAlign: 'center'}}>
        <Ion.IonButton mode="ios" size="large" color="light" onClick={() => {
            this.setState({isClassifying: true});
            setTimeout(() => {
              this.classifier.current.classifyImage(this.state.imageURL);
            }, 1000)
          }}>
            Klassifizieren
        </Ion.IonButton>
      </div>
    );
  }

  onFinishedClassifying(e) {
    this.setState({
      predictions: e,
      isClassifying: false,
      imageClassified: true
    });
  }

  renderPredictions() {
    if(this.state.isClassifying) return (
      <p>Classifying...</p>
    );
    if(this.state.predictions) {
      return <Predictions predictions={this.state.predictions} />
    }
  }

  renderLoading() {
  }

  render() {
    return (
      <Ion.IonPage>
        <Ion.IonHeader>
          <Ion.IonToolbar>
            <Ion.IonTitle>Classify</Ion.IonTitle>
          </Ion.IonToolbar>
        </Ion.IonHeader>
        <Ion.IonContent> 
          <div style={{padding: 15}}>
            <Classifier ref={this.classifier} onFinished={this.onFinishedClassifying.bind(this)} />
            <div style={{paddingTop: 10, textAlign: 'center'}}>
              <Ion.IonButton mode="ios" size="large" color="light" onClick={() => {this.takePicture()}}>
                🍄 Bild wählen
              </Ion.IonButton>
            </div>
            <br />
            {this.renderImage()}
            <br />
            {this.renderClassifyButton()}
            {this.renderPredictions()}
          </div>
        </Ion.IonContent>
      </Ion.IonPage>
    );
  }
}
