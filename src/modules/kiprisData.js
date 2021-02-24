const soap = function(date,applicant){
    return new Promise(function(resolve){
        var result = ''
        var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open('POST','http://plus.kipris.or.kr/kiprisplusws/services/PatentAdvancedSearchService?wsdl',true);
        var sr ='<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://plus.kipris.or.kr/xsd" xmlns:xsd1="http://patentbean.services.webservice.plus.kipris.or.kr/xsd">' + 
        '<soapenv:Header>' + 
                '<xsd:userId>7moonil7</xsd:userId>' + 
                '<xsd:userKey>be392622d2a101a7d9f3eef82f0a4d4a6510a12a718b73b7d21488c911d0baaa</xsd:userKey>' + 
        '</soapenv:Header>' + 
           '<soapenv:Body>' + 
                '<xsd:advancedSearch>' + 
                    '<xsd:categorySearchQuery>' + 
                        '<xsd1:agent></xsd1:agent>' + 
                        '<xsd1:applicant>'+applicant+'</xsd1:applicant>' + 
                        '<xsd1:applicationDate></xsd1:applicationDate>' + 
                        '<xsd1:applicationNumber></xsd1:applicationNumber>' + 
                        '<xsd1:astrtCont></xsd1:astrtCont>' + 
                        '<xsd1:claimScope></xsd1:claimScope>' + 
                        '<xsd1:cpcNumber></xsd1:cpcNumber>' + 
                        '<xsd1:internationOpenDate></xsd1:internationOpenDate>' + 
                        '<xsd1:internationOpenNumber></xsd1:internationOpenNumber>' + 
                        '<xsd1:internationalApplicationDate></xsd1:internationalApplicationDate>' + 
                        '<xsd1:internationalApplicationNumber></xsd1:internationalApplicationNumber>' + 
                        '<xsd1:inventionTitle></xsd1:inventionTitle>' + 
                        '<xsd1:inventors></xsd1:inventors>' + 
                        '<xsd1:ipcNumber></xsd1:ipcNumber>' + 
                        '<xsd1:lastvalue></xsd1:lastvalue>' + 
                        '<xsd1:openDate>'+date+'</xsd1:openDate>' + 
                        '<xsd1:openNumber></xsd1:openNumber>' + 
                        '<xsd1:patent>true</xsd1:patent>' + 
                        '<xsd1:priorityApplicationDate></xsd1:priorityApplicationDate>' + 
                        '<xsd1:priorityApplicationNumber></xsd1:priorityApplicationNumber>' + 
                        '<xsd1:publicationDate></xsd1:publicationDate>' + 
                        '<xsd1:publicationNumber></xsd1:publicationNumber>' + 
                        '<xsd1:registerDate></xsd1:registerDate>' + 
                        '<xsd1:registerNumber></xsd1:registerNumber>' + 
                        '<xsd1:rightHoler></xsd1:rightHoler>' + 
                        '<xsd1:utility>true</xsd1:utility>' + 
                        '<xsd1:word></xsd1:word>' + 
                        '</xsd:categorySearchQuery>' + 
                        '<xsd:docsStart></xsd:docsStart>' + 
                        '<xsd:docsCount>60</xsd:docsCount>' + 
                        '<xsd:sortSpec></xsd:sortSpec>' + 
                        '<xsd:descSort></xsd:descSort>' + 
                    '</xsd:categorySearchQuery>' + 
                '</xsd:advancedSearch>'
            '</soapenv:Body>' + 
        '</soapenv:Envelope>' ;

        xmlhttp.setRequestHeader('Content-Type','text/xml; charset = utf-8');
        xmlhttp.send(sr);
        
        xmlhttp.onreadystatechange = function(){
            if(xmlhttp.readyState == 4){
                if(xmlhttp.status == 200){
                    resolve(dataParsing(xmlhttp.responseText))
                }else{
                    resolve("none")
                }
                
            }
        }
    })
}


const dataParsing  = function(data){
    var text = data;
    var firstParsedText = text.replace(/ax2134:/gi,"") //js 에서 replaceAll /target/gi 
    var tagInfo = ["<applicantName>","<applicationDate>","<applicationNumber>","<openDate>","<astrtCont>",
    "<inventionTitle>","<ipcNumber>","<registerStatus>","<bigDrawing>"]; 
    var docs = firstParsedText.split("<advancedSearch");
    var result = []
    for (let i = 1; i < docs.length; i++) { // 1일 검색된 데이터의 개수 
        var target  = { //json 객체로 저장해서 배열에 넣을 것임.
            "applicationName" : '',
            "applicationDate" : '',
            "applicationNumber" : '',
            "openDate" : '',
            "astrtCont" : '',
            "inventionTitle" : '',
            "ipcNumber" : '',
            "registerStatus" : '',
            "bigDrawing" : ''
        }
            //console.log(docs[i])
        for (let j = 0; j < tagInfo.length; j++) { // 추출해야하는 xml tag
            var tagInfoEnd = tagInfo[j].substring(0,1) + "/" + tagInfo[j].substring(1);
            var startIndex = docs[i].indexOf(tagInfo[j])
            var endIndex = docs[i].indexOf(tagInfoEnd)
            var targetTag = docs[i].substring(startIndex,endIndex).replace(tagInfo[j],"");
            switch (tagInfo[j]) {
                case "<applicantName>":
                    target.applicationName = targetTag                    
                break;            
                
                case "<applicationDate>":
                    target.applicationDate = targetTag                                        
                break;            
                
                case "<applicationNumber>":
                    target.applicationNumber = targetTag                            
                break; 

                case "<openDate>":
                    target.openDate = targetTag                      
                break;            

                case "<astrtCont>":
                    target.astrtCont = targetTag                                      
                break;            
    
                case "<inventionTitle>":
                    target.inventionTitle = targetTag                                              
                break;            

                case "<ipcNumber>":
                    target.ipcNumber = targetTag                                       
                break;            
              
                case "<registerStatus>":
                    target.registerStatus = targetTag                                                    
                break;            

                case "<bigDrawing>":
                    target.bigDrawing = targetTag                                                    
                break;            
            }
        }
        result.push(target);
    }
    
    return result;
}

module.exports = soap;
