
import * as Ion from '@ionic/react';
import { book, build, colorFill, grid } from 'ionicons/icons';
import React from 'react';
import { Plugins, CameraResultType } from '@capacitor/core';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import Classifier from './Classifier'
import Predictions from './Predictions'

const { Camera } = Plugins;

const dummy = true;   // we are testing


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

  dummyLoadPicture() {
      this.setState({
        imageURL: 'https://upload.wikimedia.org/wikipedia/commons/b/b0/Boletus_edulis_EtgHollande_041031_091.jpg',
        isClassifying: false,
        imageClassified: false
      });
  }

  async takePicture() {

    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri
    });
    var imageUrl = image.webPath;
    console.log(image);
    this.setState({
      imageURL: imageUrl,
      isClassifying: false,
      imageClassified: false
    });
  }

  renderImage() {
    return (
      <div style={{textAlign: 'center'}}>
        {this.state.imageURL ? <img width="250" crossOrigin={Ion.isPlatform('desktop') ? 'anonymous' : null} id="image" src={this.state.imageURL}/> : null}
      </div>
    );
  }

  renderClassifyButton() {
    if(this.state.imageURL && !this.state.imageClassified && !this.state.isClassifying) return (
      <div style={{textAlign: 'center'}}>
        <Ion.IonButton mode="ios" size="large" color="light" onClick={() => {
            this.setState({isClassifying: true});
            setTimeout(() => {
              this.classifier.current.classifyImage(this.state.imageURL, dummy);
            }, 1000)
          }}>
            Klassifizieren
        </Ion.IonButton>
      </div>
    );
  }

  onFinishedClassifying(predictions) {
    this.setState({
      isClassifying: false,
      imageClassified: true
    });

    this.props.history.push({
      pathname: '/tab1/result',
      state: {
        predictions: predictions,
        imageURL: this.state.imageURL
      }
    })

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
          <div>
            <Classifier ref={this.classifier} onFinished={this.onFinishedClassifying.bind(this)} />
            <div style={{textAlign: 'center'}}>
              <Ion.IonButton mode="ios" size="large" color="light" onClick={() => {this.takePicture()}}>
                🍄 Bild wählenn
              </Ion.IonButton> <br /><br />
              <a href="#" onClick={(e) => {
                e.preventDefault();
                this.dummyLoadPicture();
              }}>
                ..oder laden
              </a>
            </div>
            <br />
            {this.renderImage()}
            <br />
            {this.renderClassifyButton()}
            <Ion.IonLoading isOpen={this.state.isClassifying} />
          </div>
        </Ion.IonContent>
      </Ion.IonPage>
    );
  }
}
