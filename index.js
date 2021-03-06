
/**
 * Module dependencies.
 */

var Token = require('grammarjs-token');
var Grammar = require('grammarjs-grammar');
var grammar = new Grammar('markup');
var expression = grammar.expression;
var value = Token.value;
var passthrough = Token.passthrough;

/**
 * Expose `grammar`.
 */

module.exports = grammar;

/**
 * Start.
 */

expression('markup')
  .match(':tag*', passthrough);

/**
 * Tag.
 */

expression('tag')
  .match(':tag.block', passthrough)
  .match(':tag.inline', passthrough)
  .match(':text', passthrough)
  .match(':comment', passthrough)
  .match(':tag.doctype', passthrough)
  .match(':tag.prolog', passthrough);

/**
 * Block Tag.
 */

expression('tag.block')
  .match(
    ':tag.block.begin',
    ':tag?',
    ':tag.block.end',
    ':ws',
     passthrough);

/**
 * Open tag.
 */

expression('tag.block.begin')
  .match(
    ':tag.punctuation.bracket.begin',
    ':ws',
    ':tag.name',
    ':ws',
    ':tag.attribute*',
    ':ws',
    ':tag.punctuation.bracket.end',
    passthrough);

/**
 * Tag opening bracket.
 */

expression('tag.punctuation.bracket.begin')
  .match('<', value);

/**
 * Tag closing bracket.
 */

expression('tag.punctuation.bracket.end')
  .match('>', value);

/**
 * Block-tag closing bracket.
 */

expression('tag.punctuation.bracket.close.begin')
  .match('</', value);

/**
 * Inline-tag closing bracket.
 */

expression('tag.punctuation.bracket.close.end')
  .match('/>', value)
  .match('>', value);

/**
 * Tag name.
 */

expression('tag.name')
  .match(/[\w:-]+/, value);

/**
 * Tag attribute.
 */

expression('tag.attribute')
  .match(
    ':tag.attribute.name',
    ':ws',
    ':tag.attribute.operator',
    ':ws',
    ':tag.attribute.value',
    ':ws',
    passthrough)
  .match(
    ':tag.attribute.name',
    passthrough);

/**
 * Attribute name.
 */

expression('tag.attribute.name')
  .match(/[\w:-]+/, value);

/**
 * Attribute value.
 */

expression('tag.attribute.value')
  .match(
    ':string.quote.double',
    ':tag.attribute.value.expression',
    ':string.quote.double',
    passthrough)
  .match(
    ':string.quote.single',
    ':tag.attribute.value.expression',
    ':string.quote.single',
    passthrough)
  .match(
    ':tag.attribute.value.expression',
    passthrough);

/**
 * Double quotes.
 */

expression('string.quote.double')
  .match('"', value);

/**
 * Single quote.
 */

expression('string.quote.single')
  .match("'", value);

/**
 * Attribute expression.
 */

expression('tag.attribute.value.expression')
  .match(/[^<"'>]+/, value);

/**
 * Close tag.
 */

expression('tag.block.end')
  .match(
    ':tag.punctuation.bracket.close.begin',
    ':ws',
    ':tag.name',
    ':ws',
    ':tag.punctuation.bracket.end',
    passthrough);

/**
 * Inline tag.
 */

expression('tag.inline')
  .match(
    ':tag.punctuation.bracket.begin',
    ':ws',
    ':tag.name',
    ':ws',
    ':tag.attribute*',
    ':ws',
    ':tag.punctuation.bracket.close.end',
    passthrough);

/**
 * Text element.
 */

expression('text')
  .match(/[^<>]+/, value);

/**
 * Comment.
 */

expression('comment')
  .match(
    ':comment.punctuation.bracket.begin',
    ':comment.content',
    ':comment.punctuation.bracket.end',
    passthrough);
  //.match('<!--', /[\w\W]*/, '-->', function($1, $2, $3){
  // requires lookahead

/**
 * Comment opening bracket.
 */

expression('comment.punctuation.bracket.begin')
  .match('<!--', value);

/**
 * Comment closing bracket.
 */

expression('comment.punctuation.bracket.end')
  .match('-->', value);

/**
 * Comment content.
 */

expression('comment.content')
  .match(/[a-z\s]*/, value);

/**
 * Cdata.
 */

expression('tag.cdata')
  .match(
    ':tag.cdata.begin',
    ':tag.cdata.content',
    ':tag.cdata.end',
    value);

/**
 * CDATA opening tag.
 */

expression('tag.cdata.begin')
  .match('<![CDATA[', value);

/**
 * CDATA content.
 */

expression('tag.cdata.content')
  .match(/[\w\W]*/, value);

/**
 * CDATA closing tag.
 */

expression('tag.cdata.end')
  .match(']]>', value);

/**
 * HTML entity.
 */

expression('string.entity')
  .match('&', /#?/, /[\da-z]{1,8}/, ';', value);

/**
 * Top of HTML file.
 */

expression('tag.prolog')
  .match(
    ':tag.prolog.begin',
    ':tag.prolog.content',
    ':tag.prolog.end',
    value);

/**
 * Prolog start tag.
 */

expression('tag.prolog.begin')
  .match('<?', value);

/**
 * Prolog content.
 */

expression('tag.prolog.content')
  .match(/.+/, value);

/**
 * Prolog end tag.
 */

expression('tag.prolog.end')
  .match('?>', value);

/**
 * Doctype.
 */

expression('tag.doctype')
  .match(
    ':tag.doctype.punctuation.bracket.begin',
    ':tag.doctype.name',
    ':ws',
    ':tag.doctype.content',
    ':tag.punctuation.bracket.end',
    passthrough);

/**
 * Doctype name.
 */

expression('tag.doctype.name')
  .match('doctype', value)
  .match('DOCTYPE', value);

/**
 * Doctype content.
 */

expression('tag.doctype.content')
  .match(/[a-zA-Z]*/, value);

/**
 * Doctype bracket.
 */

expression('tag.doctype.punctuation.bracket.begin')
  .match('<!', value);

/**
 * Operator.
 */

expression('tag.attribute.operator')
  .match('=', value);

/**
 * Whitespace.
 */

expression('ws')
  .match(/[\s]*/, value);