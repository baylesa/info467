'use strict';

module.exports = {
    'getDocumentHeight': function() {
        var body = document.body,
            html = document.documentElement;
        return Math.max(body.scrollHeight,
                              body.offsetHeight, 
                              html.clientHeight, 
                              html.scrollHeight, 
                              html.offsetHeight);
    },
    'isDOMNode': function(node) {
        return !(!node ||
            !(node instanceof HTMLElement) || 
            !((typeof node === 'object') &&
            (node.nodeType === 1) && 
            (typeof node.style === 'object') &&
            (typeof node.ownerDocument === 'object')));
    },
    'wrapAll': function(node) {
        // wraps all children nodes of the passed node
        var wrap = document.createElement('div');
        wrap.classList.add('wrap-all');
        
        // append all children of node to wrap
        while (node.firstChild) {
            wrap.appendChild(node.firstChild);
        }

        // remove all children from node
        this.removeAllChildren(node);
        
        // insert wrap
        node.appendChild(wrap);

        return wrap;
    },
    'unwrapAll': function(node) {
        // find the wrap
        var wrap = node.querySelector('.wrap-all');
        
        // remove all from the wrap and place into passed node
        while (wrap.firstChild) {
            node.appendChild(wrap.removeChild(wrap.firstChild));
        }

        // remove the empty wrap from the passed node
        node.removeChild(wrap);
    },
    'removeAllChildren': function(node) {
        var removedChildren = [];
        // remove all children of node
        while (node.firstChild) {
            node.removeChild(node.firstChild);
        }
        return removedChildren;
    },
    'lorenIpsum': function() {
        return 'Lorem ipsum dolor sit amet, ad oportere recteque qui, ' + 
            'natum tempor consetetur ne vis, suscipit electram an pro.' + 
            ' Ornatus ceteros deterruisset sed ei. Sumo solet et vix, ' +
            'mei omnes saepe repudiandae ex. Quod sanctus cu qui, per ' +
            'no vitae nonumes dissentiunt. Facer platonem at est, duo ' +
            'alterum accumsan ex, id vix delectus maluisset intellegam' +
            '. Id reque epicuri theophrastus nam, ne usu eripuit deser' + 
            'uisse adipiscing. Mea ex modo quaestio concludaturque, ve' +
            'l te virtute indoctum. Quo id eius melius recusabo, sea a' +
            'ffert ponderum eu. Natum causae pericula et sea, ea graec' +
            'o complectitur sed. No qui autem fabellas, eum eros iuvaret mediocrem id.';
    }
};