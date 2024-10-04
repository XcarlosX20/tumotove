const booelansFilters = [
    'conexionusb',
    'contrapesomotor',
    'frenosABS'
]
export const parseToTrue = function({keywords}) {
   const keywordsArr = Object.keys(keywords)
   keywordsArr.forEach(keyword => {
     if(booelansFilters.indexOf(keyword) !== -1){
        keywords[keyword] = true        
     }
   })
   return keywords
}   