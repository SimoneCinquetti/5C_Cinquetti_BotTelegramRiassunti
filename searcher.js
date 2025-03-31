function linkSearcher(listOfWords,key){
    let research = new RegExp(("\\bhttps?:\/\/[^\\s]*_REQUEST_[^\\s]*").replace("_REQUEST_",key),"gi")
    let list= listOfWords.match(research)
    return list;
}

module.exports = { linkSearcher }