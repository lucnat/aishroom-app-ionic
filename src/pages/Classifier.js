
import React from "react";
import * as Ion from '@ionic/react';
import * as tf from "@tensorflow/tfjs";
// import { fetch } from "@tensorflow/tfjs-react-native";
import * as jpeg from "jpeg-js";

const labels = ["Boletus Badius","Lentinula Edodes","Macrolepiota Procera","Pleurotus Ostreatus","Cantharellus Cibariusa","Coprinus Comatus","Imleria Badia","Amanita Muscaria"]

class Classifier extends React.Component {

  state = {
    isTfReady: false,
    isModelReady: false,
    predictions: null,
    image: null
  };

  async componentDidMount() {
    await tf.ready();
    this.setState({
      isTfReady: true
    });

    // load converted keras model
    // otherwise one would need something like file://
    // see https://www.tensorflow.org/js/guide/save_load
    this.model = await tf.loadLayersModel("https://aishroom-web.lucnat.now.sh/model_8_classes/model.json",false);
    
    this.setState({ isModelReady: true });
  }

  imageToTensor(rawImageData) {
    const TO_UINT8ARRAY = true;
    const { width, height, data } = jpeg.decode(rawImageData, TO_UINT8ARRAY);
    // Drop the alpha channel info for mobilenet
    const buffer = new Uint8Array(width * height * 3);
    let offset = 0; // offset into original data
    for (let i = 0; i < buffer.length; i += 3) {
      buffer[i] = data[offset];
      buffer[i + 1] = data[offset + 1];
      buffer[i + 2] = data[offset + 2];

      offset += 4;
    }

    return tf.tensor3d(buffer, [height, width, 3]);
  }

  classifyImage = async (imageURL) => {
    try {
      console.log('classify begin');
      const imageElement = document.getElementById('image');
      console.log(imageElement);
      const imageTensor = tf.browser.fromPixels(imageElement);
      console.log(imageTensor);
      const image = tf.image
        .resizeNearestNeighbor(imageTensor, [160, 160])
        .toInt()
        .toFloat() //toFloat takes very long
        .expandDims();

      const correctedImage = tf.mul(image,tf.scalar(1/127.5));
      const fromZeroToOne = tf.add(correctedImage,tf.scalar(-1));

      console.log('classify image middle')

      const predictions = await this.model.predict(fromZeroToOne);
      const values = predictions.dataSync();
      const arr = Array.from(values);
      const huanizedPredictions = arr.map((el, index) => {
        let prediction = {};
        const label = labels[index];
        prediction[label] = Math.round(arr[index]*1000)/10;
        return prediction
      });
      this.props.onFinished(huanizedPredictions);
    } catch (error) {
      console.log('classify image error',error);
    }
  };

  render() {
    const { isTfReady, isModelReady } = this.state;

    return (
        <div style={{color: '#ccc'}}>
          <p>Tensorflow ready:  {isTfReady ? 'yes' : "loading..."}, Model ready: {isModelReady ? 'yes' : 'loading...'}</p>
        </div>
    );
  }
}


export default Classifier;
