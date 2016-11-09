/* jshint expr:true */
import { expect } from 'chai';
import {
  describe,
  it
} from 'mocha';
import {
  convertToHtml
} from 'pix-live/helpers/convert-to-html';

describe('ConvertToHtmlHelper', function() {
  // Replace this with your real tests.
  it('works', function() {
    let conversion = convertToHtml(['**a bold sentence**']);
    let boldSentence = conversion;
    expect(boldSentence).to.equal('<p><strong>a bold sentence</strong></p>');
  });
});
