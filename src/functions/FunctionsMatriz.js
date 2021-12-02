export const calculaRiesgo = (prob, imp) =>{
    var riesgo = 0;
    if(prob === 1 && (imp === 1 || imp === 2))
      riesgo = 1
    if(prob === 2 && imp === 1)
      riesgo = 1

    if(prob === 1 && imp === 3)
      riesgo = 2
    if(prob === 2 && imp === 2)
      riesgo = 2
    if(prob === 3 && (imp === 1 || imp === 2))
      riesgo = 2
    if(prob === 4 && imp === 1)
      riesgo = 2

    if(prob === 1 && (imp === 4 || imp === 5))
      riesgo = 3
    if(prob === 2 && (imp === 3 || imp === 4))
      riesgo = 3
    if(prob === 3 && imp === 3)
      riesgo = 3
    if(prob === 4 && (imp === 2 || imp === 3))
      riesgo = 3
    if(prob === 5 && (imp === 1 || imp === 2))
      riesgo = 3

    if(prob === 2 && imp === 5)
      riesgo = 4
    if(prob === 3 && (imp === 4 || imp === 5))
      riesgo = 4
    if(prob === 4 && imp === 4)
      riesgo = 4
    if(prob === 5 && imp === 3)
      riesgo = 4

    if(prob === 4 && imp === 5)
      riesgo = 5
    if(prob === 5 && (imp === 4 || imp === 5))
      riesgo = 5

    return riesgo
  }