class NeuralNetwork{

    constructor(a,b,c,d){

    if (a instanceof tf.Sequential){
       this.model = a;
       this.input_nodes = b;
       this.hidden_nodes = c;
       this.output_nodes = d;

    }else{
        this.input_nodes = a;
        this.hidden_nodes = b;
        this.output_nodes = c;
        this.model = this.createModel();
    }
    
    }

    dispose(){
        this.model.dispose();
    }

    createModel(){
        //return tf.tidy(() => {
        const model = tf.sequential();
        const hidden = tf.layers.dense({
            units: this.hidden_nodes,
            inputShape: [this.input_nodes],
            activation: 'sigmoid' 

        });

        model.add(hidden);

        const output = tf.layers.dense({
            units: this.output_nodes,
            activation: 'softmax'
        });
        model.add(output);
        return model;
        //this.model.compile({});
    //});
    }

    predict(arr){
        return tf.tidy(() => {
        const xs = tf.tensor2d([arr]);
        const ys = this.model.predict(xs);
        //xs.dispose();
        const outputs = ys.dataSync();
        //ys.dispose();
        //console.log(outputs)
        return outputs;
        });
    }


    copy(){
        return tf.tidy(() => {
        const modelCopy = this.createModel();
        const weights = this.model.getWeights();
        const weightsCopy = [];
        for (let i=0;i<weights.length;i++){
            weightsCopy[i] = weights[i].clone();
        }
        modelCopy.setWeights(weightsCopy);
        return new NeuralNetwork(modelCopy,
            this.input_nodes,
            this.hidden_nodes,
            this.output_nodes);
        });
    }

    mutate(rate){
        tf.tidy(() =>{
            const weights = this.model.getWeights();
            const newWeights = []
            for (let i=0;i<weights.length;i++){
                let tensor = weights[i];
                let shape = weights[i].shape;
                let values = tensor.dataSync().slice();
                for(let j=0;j < values.length;j++){
                    if(random(1) < rate){
                        let w = values[j];
                        values[j] = w + randomGaussian();
                    }
                }
                let newtensor = tf.tensor(values,shape);
                newWeights[i] = newtensor;
            }
        });

        }
    
}