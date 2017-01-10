import Ember from 'ember';

export default Ember.Component.extend({

  init() {
    this._super(...arguments);
    const showOnly = this.get('showOnly');
    try {
      if (showOnly && Number.isInteger( parseInt(showOnly, 10))) {
        this.set('model', this.get('model').slice(0, parseInt(showOnly, 10)));
      }
    } catch(e) {
      // do nothing
    }
  },

  actions:{
    startTest: function(course_url, course_id) {
      const that = this;

      if (that.isMobile() && !localStorage.getItem('pix-mobile-warning')) {
        localStorage.setItem('pix-mobile-warning', 'true');
        that.set('course_url', course_url);
        that.set('course_id', course_id);
        $('#js-modal-mobile').modal();
      } else {
        that.get('router').transitionTo(course_url, course_id);
      }

      console.log('startTest',course_url, course_id);
    }
  },

  isMobile() {
    return $(window).width() < 767;
  },

  didInsertElement() {
    const that = this;
    Ember.run.scheduleOnce('afterRender', this, function () {
      $('button[data-confirm]').click(function() {
        console.log('confirm !', that.get('course_url'), that.get('course_id'));
        $('#js-modal-mobile').modal('hide');
        that.get('router').transitionTo(that.get('course_url'), that.get('course_id'));

      });
    });
  }

});
