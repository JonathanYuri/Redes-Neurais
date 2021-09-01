class Matrix{
    constructor(rows, cols){  // linhas e colunas
        this.rows = rows;
        this.cols = cols;

        this.data = [];  //array para armazenar
        // vamos ter que armazenar um array dentro de outro array [[]] <- não é possivel em javascript
        for(let i = 0; i < rows; i++){
            let arr = []   // criar um array
            for(let j = 0; j < cols; j++){
                arr.push(0) // gerar numero randomico de 0 a 10 e floor arrendonda pra baixo
            }
            // adiciona o array pequeno ^^ para o array maior
            this.data.push(arr);
        }
    }

    static arrayToMatrix(arr){
        let matrix = new Matrix(arr.length, 1)    // vai ser a matriz coluna das entradas
        
        matrix.map((elem, i, j) => {
            return arr[i];
        })

        return matrix;
    }

    static MatrixToArray(obj){
        let arr = [];
        obj.map((elm, i, j) => {
            arr.push(elm);
        })

        return arr;
    }


    print(){
        console.table(this.data);
    }


    randomize(){
        this.map((elm, i, j) => {
            return Math.random() * 2 - 1;
            //return Math.floor(Math.random()* 10);
        });
    }

    map(func){
        // reescreve o Array.prototype
        // sobrescreve o data anterior vv

        this.data = this.data.map((arr, i) => {

            // console.log(arr); vai mostrar os arrays da matrix
            // o i é a coluna que esse array está

            return arr.map((num, j) => {  // quero a posição onde ele está tambem o 'j'
                // console.log(i, j); mostra as indexs

                return func(num, i, j);      // para cada número do array ele faz isso << (pensa como se fosse um for)
                // primeiro eu peguei e mapiei a coluna e dentro da coluna eu mapeio cada numero
            })
        })

        // só quero o elemento por agora, só que o elemento da nossa matriz é um array

        return this;
    }

    static map(A, func){
        // vai fazer a mesma coisa, mas assim podemos criar uma função genérica para botar funções
        let matrix = new Matrix(A.rows, A.cols);
        matrix.data = A.data.map((arr, i) => {
            return arr.map((num, j) => {
                return func(num, i, j);
            })
        })

        // só quero o elemento por agora, só que o elemento da nossa matriz é um array

        return matrix;
    }

    // operações para essa classe
    // m.add, Matrix.add(),   estaticos quando lida com dois objetos

    static transpose(A){
        var matrix = new Matrix(A.cols, A.rows);
        matrix.map((num, i, j) =>{
            return A.data[j][i];
        })
        return matrix;
    }


    // Operações Estáticas Matrix X Escalar

    static escalar_multiply(A, escalar){
        var matrix = new Matrix(A.rows, A.cols);
        matrix.map((num, i, j) =>{ 
            return A.data[i][j] * escalar;
        });
        return matrix;
    }


    // Operações Estáticas Matriz X Matriz

    static hadamard(A, B){
        var matrix = new Matrix(A.rows, A.cols);
        matrix.map((num, i, j) =>{
            return A.data[i][j] * B.data[i][j]
        });
        return matrix;
    }

    static add(A, B){
        var matrix = new Matrix(A.rows, A.cols);  // adição tem que ter a e b mesma dimensões, então tanto faz ser A, B
        // etc
        //console.log(A.data);
        //console.log(B.data);
        matrix.map((num, i, j) =>{     // vai aplicar essa função no map
            return A.data[i][j] + B.data[i][j]
        });
        //console.log(matrix);
        // tem q colocar valores dentro dessa matrix, mas antes precisamos mapear cada elemento e colocar
        return matrix;
    }

    static subtract(A, B){
        var matrix = new Matrix(A.rows, A.cols);

        matrix.map((num, i, j) =>{
            return A.data[i][j] - B.data[i][j]
        });
        return matrix;
    }

    static multiply(A, B){
        var matrix = new Matrix(A.rows, B.cols);

        matrix.map((num, i, j) =>{
            let sum = 0;
            for(let k = 0; k < A.cols; k++){
                let elm1 = A.data[i][k];
                let elm2 = B.data[k][j];
                sum += elm1 * elm2;
            }
            return sum;
        })

        return matrix;
    }
}