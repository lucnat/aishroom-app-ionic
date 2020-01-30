
import * as Ion from '@ionic/react';
import * as Icons from 'ionicons/icons';
import React from 'react';
import { Plugins, CameraResultType } from '@capacitor/core';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import Classifier from './Classifier'

const { Camera } = Plugins;

const dummy = true;   // we are testing


export default class ClassifyPage extends React.Component{

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
    if(this.state.imageURL && !this.state.imageClassified) return (
      <div style={{textAlign: 'center'}}>
        <Ion.IonButton fill="solid" expand="block" color="primary" onClick={() => {
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
      pathname: '/classify/result',
      state: {
        predictions: predictions,
        imageURL: this.state.imageURL
      }
    })

  }

  renderDummyLoad() {
    if(dummy) return (
      <div>
        <br />
        <a href="#" onClick={(e) => {
          e.preventDefault();
          this.dummyLoadPicture();
        }}>
          ..oder laden
        </a>
      </div>
    );
  }

  renderToolbar() {
    return (
        <Ion.IonToolbar color="secondary">
          <Ion.IonTitle>Classify</Ion.IonTitle>
        </Ion.IonToolbar>
      
    );
  }

  render() {
    return (
      <Ion.IonPage>
        <Ion.IonHeader>{this.renderToolbar()}</Ion.IonHeader>
        <Ion.IonContent> 
          <div style={{padding: 15}}>
            <Classifier ref={this.classifier} onFinished={this.onFinishedClassifying.bind(this)} />
            <div style={{textAlign: 'center'}}>
              <Ion.IonButton fill="solid" expand="block" color="primary" onClick={() => {this.takePicture()}}>
                Bild wählen
              </Ion.IonButton>
              {this.renderDummyLoad()}
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
