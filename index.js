
/**
 * Module dependencies.
 */

var Grammar = require('grammarjs-grammar');
var grammar = new Grammar('markup');
var expression = grammar.expression;
var slice = [].slice;

/**
 * Expose `grammar`.
 */

module.exports = grammar;

/**
 * Start.
 */

expression('markup')
  .match(':tag.begin', passthrough);

/**
 * Tag.
 */

expression('tag')
  .match(':tag.begin', ':tag?', ':tag.end', ':ws', passthrough);

/**
 * Open tag.
 */

expression('tag.begin')
  .match(
    ':tag.punctuation.bracket.begin', 
    ':ws', 
    ':tag.name', 
    ':ws', 
    ':tag.punctuation.bracket.end', 
    passthrough
  );

expression('tag.punctuation.bracket.begin')
  .match('<', value);

expression('tag.punctuation.bracket.end')
  .match('>', value);

expression('tag.punctuation.bracket.close.begin')
  .match('</', value);

expression('tag.punctuation.bracket.close.end')
  .match('/>', value);

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
    passthrough
  );

/**
 * Attribute name.
 */

expression('tag.attribute.name')
  .match(/[\w:-]+/, value);

/**
 * Attribute value.
 */

expression('tag.attribute.value')
  .match(':string.quote.double', ':tag.attribute.value.expression', ':string.quote.double', passthrough)
  .match(':string.quote.single', ':tag.attribute.value.expression', ':string.quote.single', passthrough)
  .match(':tag.attribute.value.expression', passthrough);

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

// /**
//  * Attribute expression.
//  */

expression('tag.attribute.value.expression')
  .match(/[^<"'>]+/, value);

// /**
//  * Close tag.
//  */

expression('tag.end')
  .match(
    ':tag.punctuation.bracket.close.begin', 
    ':ws', 
    ':tag.name', 
    ':ws', 
    ':tag.punctuation.bracket.close.end', 
    passthrough
  );

// /**
//  * Self-closing tag.
//  */

// expression('inline-tag')
//   .match('<', ':ws', ':attr-name', ':ws', '/', ':ws', '>');

// /**
//  * Text element.
//  */

// expression('text')
//   .match(/[^<>]+/, function($1){
//     return token('text', $1);
//   });

// /**
//  * Comment.
//  */

// expression('comment')
//   //.match('<!--', /[\w\W]*/, '-->', function($1, $2, $3){
//   // requires lookahead
//   .match('<!--', /[a-z\s]*/, '-->', function($1, $2, $3){
//     return token('comment', $1 + $2 + $3);
//   });

// /**
//  * Cdata.
//  */

// expression('cdata')
//   .match(/<!\[CDATA\[[\w\W]*?]]>/i, value);

// /**
//  * HTML entity.
//  */

// expression('entity')
//   .match(/\&#?[\da-z]{1,8};/i, value);

// expression('equal')
//   .match('=', function(val){
//     return token('operator', val);
//   });

// /**
//  * Whitespace.
//  */

expression('ws')
  .match(/[\s]*/, value);

function Token(type, content) {
  this.type = type;
  this.content = content;
}

function token(type, val) {
  //return [ type, val ];
  return new Token(type, val);
}

function value(val) {
  return token(this.expression.name, val);
}

function passthrough() {
  return token(this.expression.name, slice.call(arguments));
}

// function values() {
//   // for each
//   return token(this.expression.name, val);
// }

// function args() {
//   var x = Array.prototype.slice.call(arguments);
//   var r = [];
//   for (var i = 0, n = x.length; i < n; i++) {
//     r = r.concat(x[i]);
//   }
//   return r;
// }

// function attr($1, $2, $3) {
//   return [
//     token('punctuation', $1),
//     $2,
//     token('punctuation', $3),
//   ];
// }

function log() {
  console.log('log', arguments)
}
// expression('meta.tag.sgml.doctype.html')
//   .match(':ws', /[a-z]+/, value);

// expression('meta.tag.block.any.html')
//   .match(
//     ':punctuation.definition.tag.html',
//     ':entity.name.tag.block.any.html',
//     ':punctuation.definition.tag.end.html',
//     value
//   );

// // address|blockquote|dd|div|section|article|aside|header|footer|nav|menu|dl|dt|fieldset|form|frame|frameset|h1|h2|h3|h4|h5|h6|iframe|noframes|object|ol|p|ul|applet|center|dir|hr|pre
// expression('entity.name.tag.block.any.html')
//   .match()

// expression('meta.tag.any.html')
//   .match(':')

// expression('entity.name.tag.html')
//   .match(/[a-zA-Z0-9:-]+/, value);

// expression('entity.other.attribute-name.html')
//   .match(/(?<=[^=])\b([a-zA-Z0-9:-]+)/)

// expression('string.quoted.double.html')
//   .match(
//     ':punctuation.definition.string.begin.html',
//     ':entities',
//     ':punctuation.definition.string.end.html')

// /**
//  * Top of HTML file.
//  */

// expression('prolog')
//   .match(/<\?.+?\?>/);

// /**
//  * Doctype.
//  */

// expression('meta.tag.sgml.html')
//   .match(
//     ':punctuation.definition.tag.html.open.first',
//     ':entity.name.tag.doctype.html',
//     ':meta.tag.sgml.doctype.html',
//     ':punctuation.definition.tag.html.close',
//     value
//   );

// expression('entity.name.tag.doctype.html')
//   .match('doctype', value)
//   .match('DOCTYPE', value);

// expression('punctuation.definition.tag.html.open.first')
//   .match('<!', value);
// expression(':entities')
//   .match(':constant.character.entity.html')

// expression('constant.character.entity.html')
//   .match(':punctuation.definition.entity.html')

// expression('tag-stuff')
//   .match(':tag-id-attribute', value)
//   .match(':entity.other.attribute-name.html', value) //.match(':tag-generic-attribute', value)
  
//   '#tag-generic-attribute'
//   'string.quoted.double.html', '#string-double-quoted'
//   '#string-single-quoted'
//   '#embedded-code'
//   '#unquoted-attribute'

// /**
//  * Doctype tag name.
//  */

// expression('doctype-name')
//   .match('doctype', value)
//   .match('DOCTYPE', value);
