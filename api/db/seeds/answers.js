'use strict';

const TABLE_NAME = 'answers';

exports.seed = (knex) => {

  return knex(TABLE_NAME).del().then(() => {
    return knex(TABLE_NAME).insert([
      { value:"Num1: '4'\nNum2: '1'\nNum3: '5'\n", result: 'ok', assessmentId: 1, challengeId: 'recLJCLC2oFbCmcxB',elapsedTime: 1, resultDetails: 'Num1: true\nNum2: true\nNum3: true\n' },
      { value:'2', result: 'ok', assessmentId: 1, challengeId: 'rec5SKmTBSaRp8CRB', elapsedTime: 0, resultDetails: 'null' },
      { value:'1,3,5', result: 'ok', assessmentId: 1, challengeId: 'rect5x2sEgF3noNWH', elapsedTime: 0, resultDetails: 'null' },
      { value:'7', result: 'ok', assessmentId: 1, challengeId: 'reci0xf4XS9l4sWjq', elapsedTime: 0, resultDetails: 'null' },
      { value:"num1: '2'\nnum2: '6'\nnum3: '7'\nnum4: '11'\nnum5: '12'\nnum6: '14'\n", result: 'ok', assessmentId: 1, challengeId: 'recQk6B0xxvvorRzr', elapsedTime: 0, resultDetails: 'null' },
      { value:'Alpine', result: 'ok', assessmentId: 1, challengeId: 'recpVHw8Rm3l7y1mS', elapsedTime: 0, resultDetails: 'null' },
      { value:"nb1: '3'\nnb2: '2'\nnb3: '3'\n", result: 'ok', assessmentId: 1, challengeId: 'recukHSP5ieZyB196', elapsedTime: 1, resultDetails: 'nb1: true\nnb2: true\nnb3: true\n' },
      { value:'logiciel1: Android Messages\nlogiciel2: BBM\n', result: 'ok', assessmentId: 1, challengeId: 'recXHnSpERKKgDjzT', elapsedTime: 6, resultDetails: 'null' },
      { value:"marc: '2'\ndeborah: B\n", result: 'ok', assessmentId: 1, challengeId: 'recyz0bzFhouQl4I7', elapsedTime: 1, resultDetails:  'marc: true\ndeborah: true\n' },
      { value:'2,4', result: 'ok', assessmentId: 1, challengeId: 'rec4WY6McleldzobU', elapsedTime: 0, resultDetails: 'null' },
      { value:'serv1: imap.pxmail.fr\nserv2: smtp.pxmail.fr\n', result: 'ok', assessmentId: 1, challengeId: 'rec2zpZMl7nqHUTJV', elapsedTime: 1, resultDetails:  'serv1: true\nserv2: true\n' },
      { value:'3', result: 'ok', assessmentId: 1, challengeId: 'rec6Fqcxir0ukAc9F', elapsedTime: 0, resultDetails: 'null' },
      { value:"Penses-tu que \xe7a l'emb\xeatera ?", result: 'ok', assessmentId: 2, challengeId: 'recd5XFUKpLcIdQsS', elapsedTime: 3, resultDetails: 'null' },
      { value:"retrait: '2'\navant: '9'\napres: '9'\n", result: 'ok', assessmentId: 2, challengeId: 'recbTdMpoiALypx17', elapsedTime: 1, resultDetails:  'retrait: true\navant: true\napres: true\n' },
      { value:'log1: fausse r\xe9ponse\nlog2: fausse r\xe9ponse\n', result: 'ko', assessmentId: 2, challengeId: 'reciznBsSNTdxAARn', elapsedTime: 8, resultDetails: 'null' },
      { value:'55202', result: 'ok', assessmentId: 2, challengeId: 'recH0Yv3EQba7XVKH', elapsedTime: 0, resultDetails: 'null' },
      { value:'fausse r\xe9ponse', result: 'ko', assessmentId: 2, challengeId: 'recwAh4Qa2f9ONk7Z', elapsedTime: 3, resultDetails: 'null' },
      { value:'2', result: 'ok', assessmentId: 2, challengeId: 'reckntfKn9i42r8F4', elapsedTime: 7, resultDetails: 'null' },
      { value:'2', result: 'ok', assessmentId: 2, challengeId: 'rec37LHaLqODpSRYj', elapsedTime: 0, resultDetails: 'null' },
      { value:'1', result: 'ko', assessmentId: 2, challengeId: 'recsDpRNJt50N8PF0', elapsedTime: 7, resultDetails: 'null' },
      { value:'paysage', result: 'ok', assessmentId: 2, challengeId: 'reccgThK8eCE05pTI', elapsedTime: 1, resultDetails: 'null' },
      { value:'fausse r\xe9ponse', result: 'ko', assessmentId: 2, challengeId: 'recivogenvS4BuQSy', elapsedTime: 7, resultDetails: 'null' },
      { value:'Masque', result: 'ok', assessmentId: 2, challengeId: 'recn838PC4uEeQLcW', elapsedTime: 14, resultDetails: 'null' },
      { value:'police: fausse r\xe9ponse\ntaille: fausse r\xe9ponse\nstyle1: fausse r\xe9ponse\n', result: 'ko', assessmentId: 2, challengeId: 'recXZhb4L1RWbOasI', elapsedTime: 1, resultDetails: 'police: false\ntaille: false\nstyle1: false\n' },
      { value:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec feugiat augue magna, .', result: 'ok', assessmentId: 2, challengeId: 'receQkwO1dvjQc2S3', timeout: 29, elapsedTime: 1, resultDetails: 'null' },
      { value:'fausse r\xe9ponse', result: 'ko', assessmentId: 2, challengeId: 'recyvMEodJlnHPnH8', elapsedTime: 7, resultDetails: 'null' },
      { value:'COORDINATION', result: 'ok', assessmentId: 2, challengeId: 'rec43jzTQlRzK3Kpc', elapsedTime: 18, resultDetails: 'null' },
      { value:'fausse r\xe9ponse', result: 'ko', assessmentId: 2, challengeId: 'recPK8vQJiy2tIwLy', timeout: 119, elapsedTime: 2, resultDetails: 'null' },
      { value:'Nullam', result: 'ok', assessmentId: 2, challengeId: 'recPys6hxMPatBfDs', elapsedTime: 24, resultDetails: 'null' },
      { value:'t1: fausse r\xe9ponse\nt2: fausse r\xe9ponse\ncoul1: fausse r\xe9ponse\ncoul2: fausse r\xe9ponse\n', result: 'ko', assessmentId: 2, challengeId: 'rece3Nwf7cansxiOM', elapsedTime: 1, resultDetails: 't1: false\nt2: false\ncoul1: false\ncoul2: false\n' },
      { value:'humain', result: 'ok', assessmentId: 2, challengeId: 'recg81Rl18TtsGAd7', elapsedTime: 0, resultDetails: 'null' },
      { value:'fausse r\xe9ponse', result: 'ko', assessmentId: 2, challengeId: 'rec4oTdn5pxTJNmfw', timeout: 179, elapsedTime: 2, resultDetails: 'null' },
      { value:'http://www.conseil-constitutionnel.fr/', result: 'ok', assessmentId: 3, challengeId: 'recVCY7VTNdBy37Nc', elapsedTime: 0, resultDetails: 'null' },
      { value:'Col du Chasseral', result: 'ok', assessmentId: 3, challengeId: 'recM0Bx1jTUdNGhvC', elapsedTime: 9, resultDetails: 'null' },
      { value:'directeur: Emmanuel Giannesini\nresponsable: Mission de la communication du CNOUS\nhebergeur: V-Technologies\n', result: 'ok', assessmentId: 3, challengeId: 'reccAbZXt0i5NH4cL', elapsedTime: 1, resultDetails: 'directeur: true\nresponsable: true\nhebergeur: true\n' },
      { value:'indexation', result: 'ok', assessmentId: 3, challengeId: 'recig28tbjrFTKhsJ', elapsedTime: 0, resultDetails: 'null' },
      { value:'3,4,5', result: 'ok', assessmentId: 3, challengeId: 'recLt9uwa2dR3IYpi', elapsedTime: 3, resultDetails: 'null' },
      { value:'4,6', result: 'ok', assessmentId: 3, challengeId: 'recy1D1rRaIOwl79Q', elapsedTime: 6, resultDetails: 'null' },
      { value:'1,4,5', result: 'ok', assessmentId: 3, challengeId: 'recjmYaoybPjUHUo0', elapsedTime: 9, resultDetails: 'null' },
      { value:'titre: Les mobilisations de clavier\nauteur: Romain Badouard\n', result: 'ok', assessmentId: 3, challengeId: 'recG8nWow8yP7P3WA', elapsedTime: 1, resultDetails: 'titre: true\nauteur: true\n' },
      { value:'1', result: 'ok', assessmentId: 3, challengeId: 'recTlrPaUOQyGjivM', elapsedTime: 0, resultDetails: 'null' },
      { value:'1', result: 'ok', assessmentId: 3, challengeId: 'reclOHVUuuJwARtoy', elapsedTime: 4, resultDetails: 'null' },
      { value:'station1: colosseo\nstation2: piramide\n', result: 'ok', assessmentId: 3, challengeId: 'reckOn89zf3ptffe9', elapsedTime: 1, resultDetails: 'station1: true\nstation2: true\n' },
      { value:"an: '2006'\ntit: F\xe9d\xe9ration Hospitali\xe8re de France\n", result: 'ok', assessmentId: 3, challengeId: 'recTstqP2DAooIwOk', elapsedTime: 1, resultDetails: 'an: true\ntit: true\n' },
      { value:'ency: Wikip\xe9dia\nsup: Web\ndate: 15/07/2016\n', result: 'ok', assessmentId: 3, challengeId: 'recSHnM9eU9myESIm', elapsedTime: 1, resultDetails: 'ency: true\nsup: true\ndate: true\n' },
      { value:'2', result: 'ok', assessmentId: 4, challengeId: 'rec1JCBKkyxetsctZ', elapsedTime: 0, resultDetails: 'null' },
      { value:'fausse r\xe9ponse', result: 'ko', assessmentId: 4, challengeId: 'recp0ker9ynuL1OTk', elapsedTime: 0, resultDetails: 'null' },
      { value:'La loi du pr\xe9au', result: 'ok', assessmentId: 4, challengeId: 'recat216jF2GS3aJ9', elapsedTime: 3, resultDetails: 'null' },
      { value:'fausse r\xe9ponse', result: 'ko', assessmentId: 4, challengeId: 'rec31i8a7gNo7UHdY', elapsedTime: 6, resultDetails: 'null' },
      { value:'1,5', result: 'ok', assessmentId: 4, challengeId: 'recnTexhDkdHmLwO6', elapsedTime: 0, resultDetails: 'null' },
      { value:'fausse r\xe9ponse', result: 'ko', assessmentId: 4, challengeId: 'recsFyrsOQeQaT4F0', elapsedTime: 0, resultDetails: 'null' },
      { value:'certification', result: 'ok', assessmentId: 4, challengeId: 'recksqd8vZp7GUzFj', elapsedTime: 6, resultDetails: 'null' },
      { value:'fausse r\xe9ponse', result: 'ko', assessmentId: 4, challengeId: 'recqqLlTBmWhimXPP', elapsedTime: 12, resultDetails: 'null' },
      { value:'=B7*C7', result: 'ok', assessmentId: 4, challengeId: 'recYFviSiRlnHsII5', elapsedTime: 18, resultDetails: 'null' },
      { value:'52 573 613', result: 'ok', assessmentId: 4, challengeId: 'rectwPtsNJoI07u0b', elapsedTime: 25, resultDetails: 'null' },
      { value:'4', result: 'ok', assessmentId: 4, challengeId: 'recbI1AsRH6mQfKzx', elapsedTime: 0, resultDetails: 'null' },
      { value:'navigation', result: 'ok', assessmentId: 4, challengeId: 'recVj9mt5GDXCORkd', elapsedTime: 0, resultDetails: 'null' },
      { value:'Melissa', result: 'ok', assessmentId: 4, challengeId: 'recLIs5iBrApaR8Gq', elapsedTime: 11, resultDetails: 'null' },
      { value:'nb1: fausse r\xe9ponse\nnb2: fausse r\xe9ponse\nnb3: fausse r\xe9ponse\nnb4: fausse r\xe9ponse\nnb5: fausse r\xe9ponse\n', result: 'ko', assessmentId: 4, challengeId: 'receT1FE9cfqn6C4V', elapsedTime: 1, resultDetails: 'nb1: false\nnb2: false\nnb3: false\nnb4: false\nnb5: false\n' },
      { value:'=B2*$E$2', result: 'ok', assessmentId: 4, challengeId: 'recnHVJC68sPaPUK9', elapsedTime: 0, resultDetails: 'null' },
      { value:'4', result: 'ok', assessmentId: 4, challengeId: 'rec03awFMgrJbWcZj', elapsedTime: 0, resultDetails: 'null' },
      { value:'GASSENDI', result: 'ok', assessmentId: 4, challengeId: 'recxXjytXZbFAJ5sB', elapsedTime: 1, resultDetails: 'null' },
      { value:'Vend\xe9e', result: 'ok', assessmentId: 4, challengeId: 'recluyiKAqHbv3S2Z', elapsedTime: 12, resultDetails: 'null' },
      { value:'=$B2+C$1', result: 'ok', assessmentId: 4, challengeId: 'recewakymLbJ9cPNm', elapsedTime: 23, resultDetails: 'null' },
      { value:'5', result: 'ok', assessmentId: 4, challengeId: 'recfilYCkOauKA1IF', elapsedTime: 35, resultDetails: 'null' },
      { value:'3', result: 'ok', assessmentId: 5, challengeId: 'rec7PhgZ3yA1fWoOt', elapsedTime: 0, resultDetails: 'null' },
      { value:'sit1: Wifi\nsit4: Wifi\nsit3: 3G/4G\n', result: 'ok', assessmentId: 5, challengeId: 'recvUkL93Un8BPC56', elapsedTime: 1, resultDetails: 'sit1: true\nsit4: true\nsit3: true\n' },
      { value:'2,3', result: 'ok', assessmentId: 5, challengeId: 'reclFhoj5WMynKiwT', elapsedTime: 0, resultDetails: 'null' },
      { value:'g\xe9ranium', result: 'ok', assessmentId: 5, challengeId: 'reczIMi0l3cqX9TYV', elapsedTime: 0, resultDetails: 'null' },
      { value:'1', result: 'ok', assessmentId: 5, challengeId: 'recwsPMIl2YQY5w8H', elapsedTime: 1, resultDetails: 'null' },
      { value:'combustible', result: 'ok', assessmentId: 5, challengeId: 'recmbWOCJIxF606aS', elapsedTime: 0, resultDetails: 'null' },
      { value:'un point d\u2019acc\xe8s', result: 'ok', assessmentId: 5, challengeId: 'recr8ACvFl8A38zBi', elapsedTime: 4, resultDetails: 'null' },
      { value:'clavier: qwerty\nmot: maquereau\n', result: 'ok', assessmentId: 5, challengeId: 'recyjH7LQHMwR6JQ2', elapsedTime: 1, resultDetails: 'clavier: true\nmot: true\n' },
      { value:'2,4', result: 'ok', assessmentId: 5, challengeId: 'rec26CgWEkVkdVFlf', elapsedTime: 0, resultDetails: 'null' },
      { value:'47', result: 'ok', assessmentId: 5, challengeId: 'recoKZI6EN09CzIXr', elapsedTime: 0, resultDetails: 'null' },
      { value:'1,3,5', result: 'ok', assessmentId: 5, challengeId: 'recCPosEpwx3hJH5F', elapsedTime: 0, resultDetails: 'null' },
      { value:'rep1: usb\nrep2: Wifi\nrep3: Ethernet\n', result: 'ok', assessmentId: 5, challengeId: 'recaWBNYVJ2o3E83S', elapsedTime: 1, resultDetails: 'rep1: true\nrep2: true\nrep3: true\n' },
      { value:'3', result: 'ok', assessmentId: 5, challengeId: 'recFcf7HcVFnXHOEy', elapsedTime: 1, resultDetails: 'null' },
      { value:'donn\xe9es en itin\xe9rance', result: 'ok', assessmentId: 5, challengeId: 'rec7Z45UW9rFyyfVn', elapsedTime: 1, resultDetails: 'null' },
      { value:'maman', result: 'ok', assessmentId: 5, challengeId: 'rect9c6ahXsCjNn3e', elapsedTime: 4, resultDetails: 'null' },
      { value:'serv1: imap.pxmail.fr\nserv2: smtp.pxmail.fr\n', result: 'ok', assessmentId: 6, challengeId: 'recUgaNAIuu2ng0wR', elapsedTime: 1, resultDetails: 'serv1: true\nserv2: true\n' },
      { value:'1,2', result: 'ok', assessmentId: 6, challengeId: 'recDEsKGRnH3yt5rG', elapsedTime: 11, resultDetails: 'null' },
      { value:'marc: fausse r\xe9ponse\ndeborah: fausse r\xe9ponse\n', result: 'ko', assessmentId: 6, challengeId: 'recAprCTY1ixJ9ISA', elapsedTime: 1, resultDetails: 'marc: false\ndeborah: false\n' },
      { value:'maman', result: 'ok', assessmentId: 6, challengeId: 'rect9c6ahXsCjNn3e', elapsedTime: 0, resultDetails: 'null' },
      { value:'clavier: qwerty\nmot: ma\xe7ons\n', result: 'ok', assessmentId: 6, challengeId: 'recUuLdYdKOoOh2W2', elapsedTime: 1, resultDetails:  'clavier: true\nmot: true\n' },
      { value:'donn\xe9es en itin\xe9rance', result: 'ok', assessmentId: 6, challengeId: 'rec6qcVEOmD3JNE8v', elapsedTime: 0, resultDetails: 'null' },
      { value:'9', result: 'ok', assessmentId: 6, challengeId: 'rec5WBXcLWAlMZlUI', elapsedTime: 2, resultDetails: 'null' },
      { value:'=$A2*B$1', result: 'ok', assessmentId: 6, challengeId: 'recBYXbGG8m7AYIPs', elapsedTime: 6, resultDetails: 'null' },
      { value:'fausse r\xe9ponse', result: 'ko', assessmentId: 6, challengeId: 'rec1GYIaMxDz1eS51', elapsedTime: 7, resultDetails: 'null' },
      { value:'robot', result: 'ok', assessmentId: 6, challengeId: 'recRVQCpdir9b0x1H', elapsedTime: 20, resultDetails: 'null' },
      { value:'fausse r\xe9ponse', result: 'ko', assessmentId: 6, challengeId: 'recn838PC4uEeQLcW', elapsedTime: 22, resultDetails: 'null' },
      { value:'fausse r\xe9ponse', result: 'ko', assessmentId: 6, challengeId: 'rec5o3fE3scuqxKnx', elapsedTime: 23, resultDetails: 'null' },
      { value:"an: '2001'\ntit: ETABLISSEMENT PUBLIC SEVRES CITE DE LA CERAMIQUE\n", result: 'ok', assessmentId: 6, challengeId: 'rec3CXFJOTMy9dUHu', elapsedTime: 1, resultDetails: 'an: true\ntit: true\n' },
      { value:'station1: gambetta\nstation2: rihour\n', result: 'ok', assessmentId: 6, challengeId: 'rec39bDMnaVw3MyMR', timeout: 600, elapsedTime: 1, resultDetails: 'null' },
      { value:"titre: 'Hi\xe9rarchiser les t\xe2ches, classer les ch\xf4meurs'\nauteur: Jean-Marie Pillon\n", result: 'ok', assessmentId: 6, challengeId: 'recjtrBI01FvZHYfz', elapsedTime: 1, resultDetails: 'titre: true\nauteur: true\n' },

    ]);

  });

};

