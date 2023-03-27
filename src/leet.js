var lengthOfLongestSubstring = function(s) {
    if(s == " ")
        return 1

    if(s.length == 1)
        return 1
        
        let strObj = {}
        let longest = ""
        
        for(let j = 0; j < s.length-1; j++){
            let newStr = ""
            strObj = {}
            for(let i = j; i < s.length; i++){
                if(strObj[s[i]] || i == s.length-1){
                    newStr += s[i]
                    if(newStr.length > longest.length){
                        longest = newStr;
                    }
                    break;
                }else{
                    strObj[s[i]] = 1
                    newStr += s[i];
                }
            }
        }
        return longest.length
};