
let model = await cocoSsd.load();
// let model2 = await tf.loadGraphModel('https://tfhub.dev/tensorflow/tfjs-model/ssdlite_mobilenet_v2/1/default/1', {fromTFHub: true});
let model2 = cocoSsd.load({ base: 'mobilenet_v2' }) 
export {model,model2}

// await model.save('downloads://my-model')

