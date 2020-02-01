
import React from "react";
import * as tf from "@tensorflow/tfjs";
import * as jpeg from "jpeg-js";
import classes from '../data/classes';

function getDummyPrediction() {
  return [
    {
      label: 'Boletus Badius',
      probability: 84.6
    },
    {
      label: 'Pleurotus Ostreatus',
      probability: 10.2
    },
    {
      label: 'Other',
      probability: 5.2
    }
  ];
}

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
    this.model = await tf.loadGraphModel("https://aishroom-web.lucnat.now.sh/models/1000_classes/model.json",false);
    
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

  classifyImage = async (imageURL, dummy) => {
    if(dummy) {
      this.props.onFinished(getDummyPrediction());
      return;
    }
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
      let values
      if(Array.isArray(predictions)){
        values = predictions[predictions.length-1].dataSync();
      } else {
        values = predictions.dataSync();
      }
      const arr = Array.from(values);
      console.log(arr);
      const huanizedPredictions = arr.map((el, index) => {
        let prediction = {
          label: classes[index],
          probability: Math.round(arr[index]*1000)/10
        };
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
        <div style={{color: '#ccc', textAlign: 'center'}}>
          <p> {isTfReady ? 'Tensorflow ready' : "loading..."}, {isModelReady ? 'Model ready' : 'loading...'}</p>
        </div>
    );
  }
}


export default Classifier;
