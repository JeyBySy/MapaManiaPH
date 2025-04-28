const formatProvinceName = (text:string)=>{
    return text.replace(/_/g, " ").toString()
}

export default formatProvinceName