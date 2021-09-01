var train = true;
function setup(){
    createCanvas(500, 500);
    background(0);

    //var m1 = new Matrix(1, 2);  // aq eu digo a quantidade de linhas, colunas
    //var m2 = new Matrix(2, 1);

    //console.log(m1.data,m2.data);
    //console.log(Matrix.multiply(m1, m2).data);

    /*
    let A = new Matrix(2, 1);
    let B = new Matrix(2, 1);
    A.randomize();
    B.randomize();

    A.print();
    B.print();

    let C = Matrix.subtract(A, B);
    C.print();
    */

    nn = new RedeNeural(2, 3, 1);
    //var arr = [1, 2];
    //nn.train(arr, [0, 1]);

    dataset = {
        inputs:
            [[1, 1],
            [1, 0],
            [0, 1],
            [0, 0]],
        outputs:
            [[0],
            [1],
            [1],
            [0]]
    }
}
//      ^^^^^^^^^^
// quando dou entrada [1, 1] tem que sair [0]
//         ,,       [1, 0]    ,,  [1]
// [0, 1]  ->  [1]
// [0, 0] -> [0]

function draw(){
    if (train) {
        for (var i = 0; i < 10000; i++) {  // 10000 interações a cada seg, 10000 treinos
            var index = floor(random(4));  // treina randomicamente
            nn.train(dataset.inputs[index], dataset.outputs[index]);  // vai pegar o index e dizer a entrada
            // e saida esperada                    ^^   que são parametros do train()
        }
        if (nn.predict([0, 0])[0] < 0.04 && nn.predict([1, 0])[0] > 0.98) {
            // a entrada 0, 0 que é pra dar 0, tá menor que 0.04, e o 1,0 que é pra dar 1, tiver maior que 0.98
            train = false;
            // para de treinar
            console.log("terminou");
        }
    }
}

// no matriz vamos criar todas as operações matriciais que precisamos
// e no rede neural a gente chama elas, e organizar
// no sketch vamos chamar a rede neural, assim temos um controle e um flow mais rápido