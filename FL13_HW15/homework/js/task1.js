function assign(target,...source){
    for (let i = 0; i < source.length; i++){
        let keys = Object.keys(source[i]);
        for (let j = 0; j < keys.length; j++){
            Object.defineProperty(target,keys[j],Object.getOwnPropertyDescriptor(source[i],keys[j]))
        }
    }
    return target;
}