const { expect } = require('../../../../test-helper');
const serializer = require('../../../../../lib/infrastructure/serializers/airtable/competence-serializer');
const Area = require('../../../../../lib/domain/models/Area');

describe('Unit | Serializer | competence-serializer', function() {

  describe('#Deserialize', () => {

    context('Success deserialization', () => {
      const airtableCompetencesRecord = {
        id: 'recsvLDFHShyfDXXXXX',
        fields: {
          'Référence': '1.1 Mener une recherche d\'information',
          'Titre': 'Mener une recherche d\'information',
          'Sous-domaine': '1.1',
          'Domaine': ['recvoGdo0z0z0pXWZ'],
          'Epreuves': ['recsvLz0W2ShyfD00', 'recsvLz0W2ShyfD01'],
          'Tests': ['Test de positionnement 1.1'],
          'Tests Record ID': ['recAY0W7x9urA11OLZJJ'],
          'Acquis': ['@url2', '@url5', '@utiliserserv6', '@rechinfo1', '@eval1', '@publi3', '@modèleEco1'],
          'Domaine Titre': [ 'Information et données' ],
          'Domaine Code': [ '1' ]
        }
      };

      const airtableCompetencesRecordWithNoCourseIdAssociated = {
        id: 'recsvLDFHShyfDXXXXX',
        fields: {
          'Référence': '1.1 Mener une recherche d\'information',
          'Titre': 'Mener une recherche d\'information',
          'Sous-domaine': '1.1',
          'Domaine': ['recvoGdo0z0z0pXWZ'],
          'Epreuves': ['recsvLz0W2ShyfD00', 'recsvLz0W2ShyfD01'],
          'Acquis': ['@url2', '@url5', '@utiliserserv6', '@rechinfo1', '@eval1', '@publi3', '@modèleEco1']
        }
      };

      it('should get a new competence Model object', () => {
        // when
        const competences = serializer.deserialize(airtableCompetencesRecord);

        // then
        expect(competences.id).to.equal(airtableCompetencesRecord.id);
        expect(competences.name).to.equal(airtableCompetencesRecord.fields['Titre']);
        expect(competences.index).to.equal(airtableCompetencesRecord.fields['Sous-domaine']);
        expect(competences.courseId).to.equal(airtableCompetencesRecord.fields['Tests Record ID'][0]);
        expect(competences.Epreuves).to.not.exist;
        expect(competences.reference).to.equal(airtableCompetencesRecord.fields['Référence']);
        expect(competences.skills).to.deep.equal(airtableCompetencesRecord.fields['Acquis']);
      });

      it('should return a Competence model with an Area', () => {
        // when
        const competences = serializer.deserialize(airtableCompetencesRecord);

        // then
        expect(competences.area).to.be.an.instanceOf(Area);
        expect(competences.area.id).to.equal('recvoGdo0z0z0pXWZ');
        expect(competences.area.title).to.equal('Information et données');
        expect(competences.area.code).to.equal('1');
      });

      it('should get a new competence Model even if there is no course associated', () => {
        // when
        const competences = serializer.deserialize(airtableCompetencesRecordWithNoCourseIdAssociated);

        // then
        expect(competences.id).to.equal(airtableCompetencesRecordWithNoCourseIdAssociated.id);
        expect(competences.name).to.equal(airtableCompetencesRecordWithNoCourseIdAssociated.fields['Titre']);
        expect(competences.index).to.equal(airtableCompetencesRecordWithNoCourseIdAssociated.fields['Sous-domaine']);
        expect(competences.courseId).to.equal('');
        expect(competences.Epreuves).to.not.exist;
        expect(competences.reference).to.equal(airtableCompetencesRecordWithNoCourseIdAssociated.fields['Référence']);
        expect(competences.skills).to.deep.equal(airtableCompetencesRecordWithNoCourseIdAssociated.fields['Acquis']);
      });
    });

  });
});
