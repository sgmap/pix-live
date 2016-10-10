const pixApiServer = require('../../../server');
const expect = require('chai').expect;
const sinon = require('sinon');
const nock = require('nock');

describe('API Courses', function () {

  let airTableFakeServer;

  before(function (done) {
    nock('https://api.airtable.com').get('/v0/test-base/Tests?view=PIX%20view')
      .times(3)
      .reply(200, {
        "records":[{"id":"recxmmYXTCmpaqHmU","fields":{"Nom":"Développer des documents textuels #01","Description":"Produire des textes et des présentations","Image":[{"id":"attO6wH4Ty47TxayR","url":"https://dl.airtable.com/qiFgajPJQoCJh7cN3251_keyboard-171845_1920.jpg","filename":"keyboard-171845_1920.jpg","size":342248,"type":"image/jpeg","thumbnails":{"small":{"url":"https://dl.airtable.com/ykXV9uzsRAmFGJtfo5cX_small_keyboard-171845_1920.jpg","width":54,"height":36},"large":{"url":"https://dl.airtable.com/9tHCuojZSDOWiNzlykQt_large_keyboard-171845_1920.jpg","width":512,"height":512}}}],"Durée":20,"Épreuves":["recOJjFzL0I6QDvJl","recmt1vM0Dl3X0CIQ","rectkDBolVTyEkoHX","recvaILCv8mtzqB2m","recLrixSqRxL5vJ54","recqxUz6DYwLPVCWh","reco9l7yVkQTscB3A","recADRNFqsgjIG9Zj","rec3mXgYY9E32ShNf","recs1xp2Ik6Akrwsp","rec8FzKzBkjDYiE8c"],"Evaluations":["recGBoQlVhyyi9yD2","recTbcJXlMZs2h0nG","recYkg9RwyQ1Twlvv","recgqaQr8gkYoqqrN","recBQRu1oAo83iU1P","reclTY38P0Wyb3H8r","recfLpWwDZoIE28Yh","recQEnnwY4ir380iC","rec3ZomWzZ8J0vE6l","recuA9EOZ7TyaMlmh","rec1bkFlfJIgvdNfM","rec04fm9tuMrvOnLd","reckwAAkW3NXVLkWY","rece48H5drPcR9MnD","recWDFFhSbW00yKWD","recIltEGTm6Tn0ESZ","recMz15t5BZauTRT2","recewqfVuRi7SCmLb","recmE2eNCUqIR6x43","recdie7EH2vj3SRQE","rec7b3yaxQkJ6AoRb","rec4EfE9LylK1PXzy","recIdi7rMexVlPBlA","recqxxz7C7B6MFeDh","recDZsw0g7pfqfeKN","recS1NZUBEGahPdEW","reccUjJoIDBLji3JW","recd5bDjO1ZPKzP1R","recmBdeJilRyuIz8d","rec3IXiqcdI1fPckb","recs9ZkfgOwlPBOuS","rec22Q00sU46qAFQs","rec6e4abZfRidtBD6","recHy2hpVyZhEPOzG","recFfm4Cgi94qWWVG","recQesMI9L6QUrjl2","rec96RHocSDhN614L","reckOzLpnDYHaUgTd","rec4h03c8sbAJ22hr","recG9DbQfHK1XSocb","recMppP46SCjxys4C","reclNPQe7ufAfvDqC","recp40yGWXdgzRgN8","recFQbs3bWD6MV1yZ","rec9vM7kf1If58JsB","rec3NM15bh9xe8xxd","recZcid5ArSm5UTuG","rec4jCJzvHeqZs8uF","recUYKBuDaUSp99BX","recLRijRp9ZH0VHsv","rec3WNXLmOjf4VKAU","recqWY0RIkJUkj2yx","recLFDxEZfpVIGW3o","recDMsxcQzMkgiezX","recSYvCbsMI4LkwcM","recs2Bq7lTsZqiVRk","recsFsCujODgDqwTz","recQuhIyxXm4wLaqP","recTqIVXONWBW1JLg","reciizuh556mbCl16","recRFh0KWIEaZ9I1v","recBTM9QVakDGZ3oZ","recr5eTIcByRE6JGx","rectzwAnqjL6D7u7R","rechfhW6qtd6Ek6OQ","recuz7gd9JArYGHhn","recTO9Zlyse5ffMXi","recse4Hhq6ELh0YX4","rec4QpSNrtoiAqSJi","recBPg8w6QCEctuk7","recC9uxXwHpkJrRRm","rec2ey70qd2Tiw9RI","recK7nz66ovjOQxfp","rec9KwWrnh3eDHYLA","recAY4qVFD88nM84x","rec6IqBMT53lQ1vDh","recKqSkjL356KwlV9","recRO5Bo8JfokLeoS","recWRKgXTN9T6FaIa","recIMrwOHDjJHZbr5","recMR0Ir5RVg0OaKb","recZ6EOq7KqFLtimr","reczMKAoKk5mcoo7O","reca1ct98WEZr8yqo","rechBwrXe0Bl2I30l","recXXFAgllNBRBlNG","recOnW5G0X3Vfi1Ew","recF7DtSUXGpc9uLd","recOnIQxVTWiVASji","recp7X4o8mNJllS9T","rec0daEX2HLOZU6xA"],"Ordre affichage":1,"Preview":"http://development.pix.beta.gouv.fr/courses/recxmmYXTCmpaqHmU/preview","Nb d'épreuves":11,"Acquis":",,,,,,,,,,","Record ID":"recxmmYXTCmpaqHmU"},"createdTime":"2016-09-29T09:52:54.000Z"},{"id":"rec5duNNrPqbSzQ8o","fields":{"Nom":"A la recherche de l'information #01","Description":"Mener une recherche et une veille d'information ","Image":[{"id":"attmP7vjRHdp5UcQA","url":"https://dl.airtable.com/x5gtLtMTpyJBg9dJov82_keyboard-824317_960_720.jpg","filename":"keyboard-824317_960_720.jpg","size":148211,"type":"image/jpeg","thumbnails":{"small":{"url":"https://dl.airtable.com/76pKNa4RouPdezTljrwf_small_keyboard-824317_960_720.jpg","width":54,"height":36},"large":{"url":"https://dl.airtable.com/MfStFTEsSIKk2nFklxki_large_keyboard-824317_960_720.jpg","width":512,"height":512}}}],"Durée":13,"Épreuves":["recphb0Gowk6hcXdp","recB9k5U9GUCSVTuP","rectN26toxkJmt9S4","recj0g7zZF5LTxij5","recFxCIKMhdRF6C0d","recT0Ks2EDgoDgEKc","recwWzTquPlvIl4So","recUcM3s9DFvpnFqj","recge9Mkog1drln4i","recdTpx4c0kPPDTtf"],"Evaluations":["reclJHuXvs1UQjw1c","recgT60A3TEqp8Q7F","reccwpCs7t6KUGHEB","recnTXxftUysPZFRl","recrT9sftyeavVNXG","recUISjvYRch1WZsS","recpQcx99WGNj3Q2P","rectKA9qrlFicTOjf","recbGyMiac3dfuZ9F","recmR1uGLKW5uATVP","recWiyycNsOxxEVoE","rect0K2LoxngIlqMk","rectJBO0iqRClSoRL","recqoT1KnxgabFjNC","reccXDJRDMz2UY8eE","rec7j0VOralfC4oNj","reckEyZtLnn8Z0OSM","rec7KPXKTcI4om2dl","recvgk4ZJxxaMUnQa","rec8hoyO5ml1l3LWx","recmGMWCf0guOW3T7","recoLLBLkbLfHVaIf","reczn3TrXKAoH54eF","recH0RGcRR1d5NP6K","rec8PI7WjwSqhqzrQ","recQKiPgYKnrD65qT","rec48dTP4ZodzCjRt","recYMaOQYh8VlwEpn","rec3aX2hlD5RdSnLw","rech8abH335HTnI40","recshOHqJYQOadmAk","recWz1RPq6CMtSojp","rec9hXc8S51SkE2aT","recoEkb4g2ucn5QwD","recaYrCk9hELTElvF","recaoNTqJ5tjp2EM0","recgOzzRynBbveHey","recFuk0BgsD2eRCp3","reciwREecJIyi9Isz","recqFOuJ0GhYbYkWT","recAndnJGaU78pcwZ","rec1uqM2cKO11KBrt","recHk5A8GHQG50nNK","recZduKi8dsulkOKE","recBx3wNrAthAmnpo","recXOAfXtmX115UY4","recbQeGItVku2Stcj","recJIX8UzTA197Jnz","recMy3VluPN7f4bie","recM9VQoB8fw8k2oa","recsxA4PATDLXcWjJ","recAqcXSYmR4LYYGW","recUJ6kb28cjCoJBJ","recmaeFtV1OXyXOpF","rechF4DDtGEUI7364","recfg8MuOo0ZmXn7p","rec5JHrR3mOjTQj2d","rec3X7z0v1WwCamS9","recihbcmi2X80Yl3E","recGo7cSBg7PVXMwl","recz2xG9Ig8TtgvjX","recC8Y8TLK2wYoTwK","rectGCBGW3wSGXNZ1","recRJYJjAUsrWrAEb","recpSnpoNRBtmEvwo","recctm9su9eCkxO9b","recNMaezcU7T74Q3y","recF7QUbdxv9lG1qQ","rec8ZqCkK2netFaBy","recD6RlSXscYQrlPM","reconynAlJHfTQtyJ","rec8DdH2ndVfirQ0P","rec9MG5F8txWPPkVX","recorThWYk9Hsgx8P","recj9ddQtklabemtC","recNSBwxNsy9ssVAU","recZHTVMCNOwDkUiq","recvSbKuLnS4WzENe","recfMRQOfrURiGgDN","recn0BObqnubExMVB","recF9ikLiPxHKMnpg","recxbI4kxb9F9UYId","recewhSrxSJozbP1g","recKro40H1x0w73ya","recx4f1a6fT9xxVFP","recctouupNPK0LXNy","recgb91JaXmVci7hs","reclt5a0UH8xGlfkE","recUdo1xBaUgO7OcD","recIgxPenfEe5XJNQ","reczFpML7mCPOs176","recaoEh4qjH0uPPVK","recVTAUS7fPUZcmKY","recfz5b8e8IGeDsH9","recuMV8voTai4Rh1h","recBDk89dVmLQogGf","recJHqJQs3clfNqPp","recliKnc8Y3C0ydxw","recExh3zWmBuoOVeC","recq47bxefnsr3viy","recvFL1VogyJGNlnp","recADoBWKRtLD3DRC","recu4C5s7TnJgxhgD","recPkfM4BBqfahkUv","recgiObvJr5NhtGbF","recXLRuR8vkTSk33S","recBN1IbVUzOY2hSP","recwUMlEpLcgWyWQ0","rec0BBSsKu5hQun6f","rec04j9LXkVvRn9mf","rec2bfcHHoczbqses","rechp0TNOQl1x6GjZ","recqcVTEBVTblPRY7","recxrqs1Sd3u9cwiE","rec5dpZg3l3BstIIm","recALhrV04hqxu40j","rec72sb3Rnp5J37Z1","reckT0HU4FsUmScFv","recHuT4Yt4tV6hPLe","recHPWkM9MRumsmZy","recxRkGM255gko5O1","recrBw2MnKpWTxzW8","recJbVBS7cLVr7r4c","rec7gtay7rVjQCHwW","rec3t07jnV3kH5dMK","recYUEQbsT8rsnWM1","recv0sbnmfrRR2qeP","rec71zHHUdO8WPCH7","recp0FFonGA2jKdWp","recH12RWzDiAUDn7Z","recmtxUWKcsmpRDZl","rec7AytRuUyzr5auL","recRdWKkSFI7pEGUP","recoHE3AMYCWzecQ7","rec2SUAIWJD1Bwh1u","reckoFiZarzfRqxxO","reccXEAaizEhWwSxv","rec0Q2XpPuDQmCRpq","recgkabfyeJqzyPKN","recsiRj6hZT5GOzmP","rec2vCd2VgoVokPBb","recs7evu9ic8hmWcG","recyDCnrTDBtVyDbb","recRAIeLJ43Z0XGyl","recNIRsAuElIPZJIx","recip3bDMkrc8C1lr","recMLP3ar9Hf6sTRK","recY2w6voOHWVMBBC","recDnu2yDTDdim5d5","recsbmnhAOQaXQYgx","recVu9MYpW1HVA2Dg","recL9PoOlnomAJ4XM","recHUcaOYRwLctI7M","recDvJFOD8tJOUkAH","recF9l3LxKoFZiAWL","recn3boKVH1svnfmP","recTuGGr7O4Rv4Zr6","rec75yWJZWVzEcF2d","rec0mk4ahchnrXlV3","recAE2wWJDwWRaLPn","recPzohMNWMKojA1A","rec40ZabAHzNna21i","recEARmauzACgu0vd","rec9n31SyqN001sym","recjG1znuBevXXFaE","recydluCFTdzIjmRR","recgtAUyskMBv8rNq","recVGYEFfpar3UHwY","recTMI4XHxuhWStym","recGIDTng3TnkdKST","recZEiakbDOTP7YRz","recQQmvwx18NPDqyi","recJvQXDR1wXFHyn3","recTiXlwfYbaGYEZc","recvcp3WopRA5IPAo","recy4Gh3JQi2qKU2s","recgVcZiO35xMrx6n","recGNm4L2SOumxzcp","recceWyahw8qKiEgf","recV3UNMYxdtCtUk6","recLpsjELuWxlipoZ","recpRXhjCxhIa0pXf","recqdjASvDZDkDv1b","recYlj1vX4JJrRBZn","recXcq5Wcv9eSl9bZ","rechEr502yLgd4UsQ","reclTp8MHm9iP6ev4","recol54uWvtGWyAzr","recXTSyjz2J8fde4g","recw1swJ1sMXfJEl9","recBjxlicTTpL5Zyi","rectkDgbUbMjopnq2","recNQv6m4ktg3y96w","reczGKSzJeEEUoGDh","recLBCKUTe3qbOTV9","recaKnAO70315u0LI","recyHN2kdKcUDkftZ","reczzUno0tXFhkSUu","rectVcgJ7VxkajXWp","recTWsv79el5Kevbx","recrwqhJHX0xcAcHP","rec6O5fBX9jGaYevV","recMH1XyVVwW7dL8v","rec0JhMKXOkM889ib","recbtbR8JUXOHKEi7","recH2oAqM0vItG05Y","recARxnIF4Xp1FIsR","recvvakzr6TOTUkBK","recGAOZ6AkouPP4hN","recmgaggJZ9MWaqmr","recabfOczJJOGx1gQ","recq9zghpBW9H26eR","recpmzhQvaUsYXIoi","rectr13rQbIfROkfw","recYcOxa3ow1yBLIQ"],"Ordre affichage":2,"Preview":"http://development.pix.beta.gouv.fr/courses/rec5duNNrPqbSzQ8o/preview","Nb d'épreuves":10,"Acquis":"#ordonnancement,#source,#rechercheInfo,#moteur,#wikipedia,#syntaxe,#sponsor,#rechercheInfo,#cult1.1,#rechercheInfo","Record ID":"rec5duNNrPqbSzQ8o"},"createdTime":"2016-08-09T15:17:53.000Z"},{"id":"recgCojOs6ykwak43","fields":{"Nom":"DataMaster #01","Description":"Appliquer des traitements à des données pour les analyser et les interpréter","Image":[{"id":"attCnnTGEqcYmTAxb","url":"https://dl.airtable.com/ftPfFCB9SAGUWtymtGK7_data-1188512_960_720.jpg","filename":"data-1188512_960_720.jpg","size":314671,"type":"image/jpeg","thumbnails":{"small":{"url":"https://dl.airtable.com/FY0MYilS6ixrZgezvP5w_small_data-1188512_960_720.jpg","width":53,"height":36},"large":{"url":"https://dl.airtable.com/y5hrmjE6QHiOBmgPOGxw_large_data-1188512_960_720.jpg","width":512,"height":512}}}],"Durée":10,"Épreuves":["recGFFQkMSbvYrzLW","recKeg1Ra0BWu3MYz","recoblJdIoh2KtKTr","recgPPjKpxqAMaAeX","recfWAcyZCsLg3yrb"],"Evaluations":["rec4Sj9GAcARxNrS3","recNfoClDcQrG25xF","rect3rLfeo9iOXRGI","recYpiCt16OUyXoRF","recQSdC6LoUG2RtPb","recRVyhjEoPwHMkOz","recEKSWNwCveMYyj0","recUHTn7lR6oQVbZM","recYIS3R3uv0W2BHY","recxznU21XpR98tir","reczxBuApLh5SBofo","recPH0hyXiwDfCeje","recTeamyOdPyHAUVY","recfrH6GQJpf3swEI","rechKvGqUwUuSrajR","recd3op8ux6vMBKzl","reculz3r7sCIdS07U","recQFJ0T34Kw7ej4o","recZTL6mp6h4D3a1O","recA3kjmi5EmJ2UI7","recLUA4kifg6POCRb","recp1rv90sWGemrnR","recIz6R1Hdw3mZWFN","rec8SuAJRKnbRLeWx","rec9lAo9YufTal3tm","recVSvSTJL2keCiuh","recYyn010vzWNqEhs","recxTUnq5i0cSPuOq","rectxqsRl62cX67Nx","recJ2vGxhW9OERNFA","rec90VkBR7dSFxRoy","recIiOUkVllRMfaju","recDJpW8LADvKd3z8","rec7tmhIXFEGEah12","recRu1TmqRzVRMHhF","recGjRpSQRnOvwhof","recLxz96YmNpJNJfK","recehs8zm5r2AvSbd","recBrGFpi0JlK1vi4","recbEG2DHRVrDIZzq","recrF0ym1D2MDUgEV","recX7d8UUC6cyWM3k","recesf0664B4fytAI","recieYuXCbzGa0F2v","recEaU8Mal47FPMo9","recmdCk3plMwQsBTS","recyp5XjmosymnXHy","recYRCISjWHZjVr9v","recEoiGYJNHGj2t0k","recre54cjkXODsAya","recJC5wH9O0tcbDHM","reci5ttpmmAUVHgtH","rec7F5Z3Hhm0JlIDo","recMKFtwvyUUxvIVg","recGH2cvWBokyKx6u","recgmDxowvtcKIZAR","rec3BYcwtolUyyPbv","recNvHvwp4DoZD5J8","recP2EropJ1QkkfqH","recBJOrQrGODQ0za5","rec98bYfSTOJPOQv5","rec3dfMlhsU9zwVl7","rec32C9NomNSLBKvC","reccyyvoN2vpVIFlP","rec0vzpHlycCB7uDH","rech10xShCx6Jjto1","recdx76Ni0jPGhtlA","reca1NtGbZRvGQBz9","recrVVOFxG25B1dS1","recLQGqcCyF5IFSWZ","rec5hN3aGdHHGmNj6","reczFhLiLXoJvIyjv","recEseAwKF453DfFx","recp0j9imqjtdur83","recvBdTryqjZPnsyX","recMgbvgaSoCPgzL9","reczFIfRPQkiNoaF6","recjS16lSgXJTBsQ5","recD8oowq31tqJHdI","recRBmkGFQZr7NuEg","recuHEH8UkjRyCD4l","reccXduOPNFXgCnfu","rec4zfDnNeIpcy5z8","recra9cXjLEIQfqR8","recDJtcpmrKwFj6t4","recZvPFHYGd6Qp7jh","recMqLyFP57SCL3zR","recMxegQDcaDLGjwg","recbS5b1chTjQ2IoU","recBupo06Bn23DV0b","recCuimPQMgPfUrMg","rectWOXVxa7JZGPIt","recYiXgf7yw496RZB","recUfV6GVn1qbyW3q"],"Ordre affichage":3,"Preview":"http://development.pix.beta.gouv.fr/courses/recgCojOs6ykwak43/preview","Nb d'épreuves":5,"Acquis":"#formuleSimple,#formuleSimple,#filtreDonnées,#triDonnées,#formuleSimple,#formuleSimple,#cult1.3,#filtreDonnées","Record ID":"recgCojOs6ykwak43"},"createdTime":"2016-08-09T15:17:53.000Z"},{"id":"recqBFUffy0sCq6ah","fields":{"Nom":"Les données, je gère ! #01","Description":"Stocker et organiser des données pour les retrouver, les conserver et en faciliter l'accès et la gestion","Image":[{"id":"attxTZfS3sudxk0ZY","url":"https://dl.airtable.com/L8AQwmIURNu79XmKFoPO_storage-1209059_960_720.jpg","filename":"storage-1209059_960_720.jpg","size":151346,"type":"image/jpeg","thumbnails":{"small":{"url":"https://dl.airtable.com/DYXi59nTGO6uRy2uWjsB_small_storage-1209059_960_720.jpg","width":66,"height":36},"large":{"url":"https://dl.airtable.com/BylOvTjrROGr9B5BZer5_large_storage-1209059_960_720.jpg","width":512,"height":512}}}],"Durée":10,"Épreuves":["recopA530N2rlxYLt","recb35pFRQyyXzZUM","recttWm9LAfDeqcxk","rec9M8rp0Y8uDWzKQ","recCIGio3ASSocMXx","rec5WobQ3QkC07jt4","recyNr3bZvwZNY3Is"],"Evaluations":["recgEQyko6sywuToG","recK6dcRcAjLUsEoX","rech6dIHKqKIQGrta","recjmyFWOAFDyYDZe","recsz19rMvD234YI0","rec54ayuQU3wPW2Ge","recnbwEEm5GBGCzp3","recclILAwVUjRQiJD","recpEqKRLatAvnFue","recqi8SZmogzaWiHa","recNqyMNRhYZ0YPPI","recXZv3uMW5n2sy1J","recwQCl2EZRGf9QQn","rec4LOOWXGwJt0gpj","recrY5x4jKYLf79zD","recIzL5dUIRmNmA3m","recra0N3mFWUx7YAW","recl7aCtMDnIUyZhB","recwXbiT0ObNfcVOT","recCGVMLsrrfDmF6g","rec0fAV5tE8TZDRfX","recjG4RlDy9V7osRv","rec7QdLAtzzj7ZzLV","rec0ygryPrFrnVUWk","recRICpZxjKb7z4Yh","rec24ocesUh9KIUXy","recAUjJuiar24eVu1","rechiwM6YV1sbaeKq","reco5nPXpLJ3LFgm3","recGRCYHskZVs0KUo","recQQb0vqxey2WbkJ","recsgl7iqRSPvqUcB","recFb9Uw5GJCesYl1","recTMQiabE2jbeKmt","rec5wkwzLsPspCajd","recnUpBWfGuQ50H71","recLhHKCegNqqcKHE","recnG6azDyuygaJYI","recigi4cGoYa9RMbt","rec5u3vPAnjRAwyqP","recfhDCMA6jgJCbSw","rec37oOdrYBRIrTs8","rectkHt3au2Krqta9","rec661w1pHHHkqlQk","rec3nBfYLl2OAYXJ5","recQZBfzYJi2HpeJS","recs3h0osy3VZ7kx1","recPTVkYTuASyjFqG","rec8fgi8cLsSYC7Ok","rec9ytG2PQHqKhk6r","recbVf5RlgjkcIRkW","rec0T052Gav9pyobJ","rect4uIrvyepChEMR","recD6nEVLcR98uqvt","recL4r4id4mRMHoD7","recT9g70BjYSEIJ2e","recjCA3dMrDqAz9wD","recOzNEEdmMIBCIqM","recrwD7xjBFOsjY58","rec5RUx28fC6im6BW","recxFFyDLeSbgdlQe","rec0aWRUgriS393cD","recElh2NUQjrPz1wM","rec80be6h2A3z1i6W","recBljOT1ATWyUKua","rec08vR8nEatSR70b","recmyjczYgYjZ8aJ3","reclLgK7oMLUSslpZ","reclinS95JJHhYhhl","recCrZMlVX7tWTPqV","recTevOXxXPT9qneh","recrZJX2sbiZs0Qab","recqltUl0b3BAgY2N","rec7QuaFA9AHVkR6C","recbESDAQYydHJIwR","rec8qiuZJNM2XEsbX","recNyhxWkMvWx8Pnd","rec3MjskBoRNHFpEq","recxh1tRAnESMlbNW","recqp4BQ1m5kmbYdr","recxG4AChENbaKNHe","recZyGK8gNmCgS3lT","rec3iokSHl4D9N42V","recBzsbYGN7O7xI9z","recHw2T7pWZni4KeH","rec3pzF8fgWiaVYek","recGvophl5KggVMjb","rec2jonihaoJZi3GE","recVfh8yoTLJ2DcI3","recZDufPcIYGizwCH","recBw3zvRR4HxjSJo","recvIUmrHtbda5Wt4","rec4ILZfwblRwbKMY","recFxLm3WOjMINGMA","recK8iZapLMWpw3XS","recsQYMzxBp3FZ5b8","rec52FbVrybeGpWx5","recqvbLfcIhyPeUyI","recjU0Q4uUiThPcw9","rec2NtRVzFb98OtJl","recIaavTTR2Ph6dyc","recMXP1Eoe9TvQqip","recUHsF9CYbeKDXx9","recljVg9EjSD0E9uP"],"Ordre affichage":4,"Preview":"http://development.pix.beta.gouv.fr/courses/recqBFUffy0sCq6ah/preview","Nb d'épreuves":7,"Acquis":"#format,#cult1.2,#stockage,#rechercheFichier,#arborescence,#stockage,#format","Record ID":"recqBFUffy0sCq6ah"},"createdTime":"2016-08-09T15:17:53.000Z"},{"id":"recURdA2VWp4TD30H","fields":{"Nom":"France Strategy Experimental Challenge","Description":"Un test regroupant des idées d'épreuves nouvelles","Image":[{"id":"attrzRWonj376U0og","url":"https://dl.airtable.com/JVqXboM4THi4s4LphLZa_challenger-space-shuttle-1102029_960_720.jpg","filename":"challenger-space-shuttle-1102029_960_720.jpg","size":131700,"type":"image/jpeg","thumbnails":{"small":{"url":"https://dl.airtable.com/OHAjeOADRf2hVKWeegU8_small_challenger-space-shuttle-1102029_960_720.jpg","width":63,"height":36},"large":{"url":"https://dl.airtable.com/QsEqgtSSRx206FbApxFr_large_challenger-space-shuttle-1102029_960_720.jpg","width":512,"height":512}}}],"Épreuves":["recin0ZPtJyNNrBoy","recyRNeHrvhUBgunU","recr6dEmRR24Y4DqO","recceHsyX1AnV3kdW","recCI6TqfMF8isLhp","recNrZgtDdxDJUyGc"],"Evaluations":["reckW7tQ0EHXz4eaP","recRGOdD8edzrAvyk","reciZrXh0eI3X0ydp","recd0X9TYzqSodAAC","recsspGZxnSHXx4rw","recTWZV3fL0hMlL63","recKLZBibPJyrJGMh","recNzxRu9o0uMlFTx","recVlpY2jysiAlgWt","recu3aSHinz41MykL","recywluLTW2fCWbqN","reciELxfnmfIZdyA5","recjYwKEnrQk2XHog","recITluwBI8uNj5pz","recsLaqhMtJDSGkkV","recx54PUE1NqLbDCv","recFRPIJhz4xxUOBe","recy9WaeYp65xoCj1","recwUqO6Od9LNZVpu","recL0XiYxnUDJKteL","reciOFoYVNZu7CjYv","rec2noljrgeSRdqG0"],"Ordre affichage":5,"Preview":"http://development.pix.beta.gouv.fr/courses/recURdA2VWp4TD30H/preview","Nb d'épreuves":6,"Acquis":",,,,,#wikipedia","Record ID":"recURdA2VWp4TD30H"},"createdTime":"2016-10-02T19:49:53.000Z"}]}
      );
    done();
  });

  after(function (done) {
    nock.cleanAll();
    pixApiServer.stop(done);
  });

  describe('GET /api/courses', function (done) {

    const options = { method: "GET", url: "/api/courses" };

    it("should return 200 HTTP status code", function (done) {
      pixApiServer.injectThen(options).then((response) => {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });

    it("should return application/json", function (done) {
      pixApiServer.injectThen(options).then((response) => {
        const contentType = response.headers['content-type'];
        expect(contentType).to.contain('application/json');
        done();
      });
    });

    it("should return all the courses from the tests referential", function (done) {
      pixApiServer.injectThen(options).then((response) => {
        const courses = response.result.courses;
        expect(courses.length).to.equal(5);
        done();
      });
    });
  });

  describe('GET /api/courses/:course_id', function (done) {
    // TODO
  });

});
