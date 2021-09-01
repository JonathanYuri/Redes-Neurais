# Redes-Neurais

Estou tentando fazer uma rede neural em java script, o "modelo" que estou usando tenho que passar o resultado esperado para rede e a entrada.
Também defino no começo a quantidade de neurônios de cada camada, entrada, oculta e saída, nessa ordem.

A partir desses dados, eu na primeira interação eu simplesmente deixo tudo aleatório (os pesos e o bias(constante)), pois não tenho como saber por enquanto seus valores.
Depois disso eu tenho que criar várias funções para matrizes, pois os pesos são matrizes com quantidade de linhas e colunas definidas pelo número de neurônios em uma determinada camada.

E o treino da rede neural que é o que vai deixar ela "inteligente", vai ser definido passando os valores dos pesos junto dos valores do neurônio somado com os bias, passando de camada em camada,
depois disso eu vejo o que deu errado, e quanto deu errado em cada camada voltando passando os valores para a camada de entrada, atualizando os pesos e os bias
