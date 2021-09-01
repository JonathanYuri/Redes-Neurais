function sigmoid(x){
    return 1/(1 + Math.exp(-x));  // e^-x
}

function dsigmoid(x){
    return x * (1 - x);
}

class RedeNeural{
    constructor(i_nodes, h_nodes, o_nodes)
    {
        // numero de neuronios no input, hidden and output
        this.i_nodes = i_nodes;
        this.h_nodes = h_nodes;
        this.o_nodes = o_nodes;

        this.bias_ih = new Matrix(this.h_nodes, 1);  // bias do input para a hidden
        this.bias_ih.randomize();
        this.bias_ho = new Matrix(this.o_nodes, 1);  // bias da hidden para a output
        this.bias_ho.randomize();

        //this.bias_ih.print();
        //this.bias_ho.print();

        this.weights_ih = new Matrix(this.h_nodes, this.i_nodes);
        this.weights_ih.randomize();
        this.weights_ho = new Matrix(this.o_nodes, this.h_nodes);
        this.weights_ho.randomize();

        this.learning_rate = 0.1;

        //this.weights_ih.print();
        //this.weights_ho.print();
        // inicia-se tudo de maneira randomica
    }
    
    train(arr, target){


        // Feed Forward

        // (INPUT -> HIDDEN)

        let input = Matrix.arrayToMatrix(arr);
        let hidden = Matrix.multiply(this.weights_ih, input);
        hidden = Matrix.add(hidden, this.bias_ih);

        // antes de usar a função de ativação precisamos mapear novamente os elementos
        hidden.map(sigmoid);

        // (HIDDEN -> OUTPUT)

        let output = Matrix.multiply(this.weights_ho, hidden);
        output = Matrix.add(output, this.bias_ho);
        output.map(sigmoid);


        // Back Propagation

        
        // (OUTPUT -> HIDDEN)

        let expected = Matrix.arrayToMatrix(target);  // esperado (resposta correta)
        let output_error = Matrix.subtract(expected, output);  // resposta correta - recebido (E) // erros da saida
        // derivada da saida = derivada da sigmoid
        // d(Sigmoid) = Output * (1 - Output)
        let d_output = Matrix.map(output, dsigmoid);
        let hidden_T = Matrix.transpose(hidden);

        let gradient = Matrix.hadamard(d_output, output_error);
        gradient = Matrix.escalar_multiply(gradient, this.learning_rate);

        // Adjust Bias O->H
        this.bias_ho = Matrix.add(this.bias_ho, gradient);  // ERRO + bias
        // Adjust Weights O->H

        let weights_ho_deltas = Matrix.multiply(gradient, hidden_T);
        //weights_ho_deltas.print()
        //this.weights_ho.print()
        this.weights_ho = Matrix.add(this.weights_ho, weights_ho_deltas);
        //this.weights_ho.print()


        // (HIDDEN -> INPUT)

        let weights_ho_T = Matrix.transpose(this.weights_ho);
        let hidden_error = Matrix.multiply(weights_ho_T, output_error);
        // pesos da oculta transposta X erros da saida (caderno)

        let d_hidden = Matrix.map(hidden, dsigmoid);
        let input_T = Matrix.transpose(input);  // entradas transposta

        let gradient_H = Matrix.hadamard(d_hidden, hidden_error);
        gradient_H = Matrix.escalar_multiply(gradient_H, this.learning_rate);

        // Adjust Bias I->H
        this.bias_ih = Matrix.add(this.bias_ih, gradient_H);  // ERRO + bias
        // Adjust Weights I->H

        let weights_ih_deltas = Matrix.multiply(gradient_H, input_T);
        //weights_ih_deltas.print();
        //this.weights_ih.print();
        this.weights_ih = Matrix.add(this.weights_ih, weights_ih_deltas);
        //this.weights_ih.print();
    }

    predict(arr){
        let input = Matrix.arrayToMatrix(arr);

        let hidden = Matrix.multiply(this.weights_ih, input);
        hidden = Matrix.add(hidden, this.bias_ih);

        hidden.map(sigmoid);

        // (HIDDEN -> OUTPUT)

        let output = Matrix.multiply(this.weights_ho, hidden);
        output = Matrix.add(output, this.bias_ho);
        output.map(sigmoid);

        output = Matrix.MatrixToArray(output);
        return output;
    }
}
