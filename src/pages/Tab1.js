
import * as Ion from '@ionic/react';
import { book, build, colorFill, grid } from 'ionicons/icons';
import React from 'react';
import { Plugins, CameraResultType } from '@capacitor/core';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import Classifier from './Classifier'
import GridLoader from "react-spinners/GridLoader";

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
    if(this.state.imageURL) return (
      <div style={{textAlign: 'center'}}>
        <Ion.IonButton mode="ios" size="large" color="light" onClick={() => {
            this.setState({isClassifying: true});
            this.classifier.current.classifyImage(this.state.imageURL);
          }}>
            Klassifizieren
        </Ion.IonButton>
      </div>
    );
  }

  onFinishedClassifying(e) {
    this.setState({
      predictions: e,
      isClassifying: false
    })
  }

  renderPredictions() {
    if(this.state.isClassifying) return (
      <div>
        <GridLoader
          size={50}
          color={"#ccc"}
        />
      </div>
    );
    if(this.state.predictions) {
      return this.state.predictions.map((p,i) => <p key={i}>{JSON.stringify(p)}</p>)
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
        <Ion.IonContent padding={true}>
          <Classifier ref={this.classifier} onFinished={this.onFinishedClassifying.bind(this)} />
          <div style={{paddingTop: 20, textAlign: 'center'}}>
            <Ion.IonButton mode="ios" size="large" color="light" onClick={() => {this.takePicture()}}>
              Bild wählennn
            </Ion.IonButton>
          </div>
          <br />
          {this.renderImage()}
          <br />
          {this.renderClassifyButton()}
          {this.renderPredictions()}
        </Ion.IonContent>
      </Ion.IonPage>
    );
  }
}
