export function calculateVisibleRows(scrollTop,rowHeight,containerHeight,dataLength){

const startIndex=Math.floor(scrollTop/rowHeight)

const visibleCount=Math.ceil(containerHeight/rowHeight)

const endIndex=Math.min(startIndex+visibleCount+5,dataLength)

return {startIndex,endIndex}

}