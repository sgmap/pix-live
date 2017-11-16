import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | Certification Banner', function() {

  setupComponentTest('certification-banner', {
    integration: true
  });

  context('On component rendering', function() {
    const user = { id: 5, firstName: 'shi', lastName: 'fu' };

    it('should render component container', function() {
      // when
      this.render(hbs`{{certification-banner}}`);

      // then
      expect(this.$()).to.have.lengthOf(1);
    });

    it('should render component with a div:certification-banner__user-fullname', function() {
      // when
      this.set('user', user);
      this.render(hbs`{{certification-banner user=user}}`);

      // then
      expect(this.$('.certification-banner__container .certification-banner__user-fullname')).to.have.lengthOf(1);
      expect(this.$('.certification-banner__container .certification-banner__user-fullname').text().trim()).to.equal(`${user.firstName} ${user.lastName}`);
    });

    it('should render component with a div:certification-banner__user-id', function() {
      // when
      this.set('user', user);
      this.render(hbs`{{certification-banner user=user}}`);

      // then
      expect(this.$('.certification-banner__container .certification-banner__user-id')).to.have.lengthOf(1);
      expect(this.$('.certification-banner__container .certification-banner__user-id').text().trim()).to.equal(`#${user.id}`);
    });

  });
});
