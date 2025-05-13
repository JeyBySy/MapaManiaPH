const ignoreCharProvinceName = (text:string)=>{
    return text.replace(/_/g, " ").toString()
}
const maskProvinceName = (text:string,maskChar = '?')=>{
    return text.replace(/[A-Za-z_]/gi, maskChar)
    
}

export {
    ignoreCharProvinceName,
    maskProvinceName
}