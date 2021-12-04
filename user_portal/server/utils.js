function createResult(error,data){
    const result={}
    if(!error){
        result['status']='success'
        result['data']=data
    }
    else{
        result['status']='error'
        result['data']=error
    }

    return result
}

module.exports = {
    createResult: createResult
}