(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

module.exports = {
    'TEST': 'constant'
};

},{}],2:[function(require,module,exports){
'use strict';

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

module.exports = {
    'getDocumentHeight': function getDocumentHeight() {
        var body = document.body,
            html = document.documentElement;
        return Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    },
    'isDOMNode': function isDOMNode(node) {
        return !(!node || !(node instanceof HTMLElement) || !((typeof node === 'undefined' ? 'undefined' : _typeof(node)) === 'object' && node.nodeType === 1 && _typeof(node.style) === 'object' && _typeof(node.ownerDocument) === 'object'));
    },
    'wrapAll': function wrapAll(node) {
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
    'unwrapAll': function unwrapAll(node) {
        // find the wrap
        var wrap = node.querySelector('.wrap-all');

        // remove all from the wrap and place into passed node
        while (wrap.firstChild) {
            node.appendChild(wrap.removeChild(wrap.firstChild));
        }

        // remove the empty wrap from the passed node
        node.removeChild(wrap);
    },
    'removeAllChildren': function removeAllChildren(node) {
        var removedChildren = [];
        // remove all children of node
        while (node.firstChild) {
            node.removeChild(node.firstChild);
        }
        return removedChildren;
    },
    'lorenIpsum': function lorenIpsum() {
        return 'Lorem ipsum dolor sit amet, ad oportere recteque qui, ' + 'natum tempor consetetur ne vis, suscipit electram an pro.' + ' Ornatus ceteros deterruisset sed ei. Sumo solet et vix, ' + 'mei omnes saepe repudiandae ex. Quod sanctus cu qui, per ' + 'no vitae nonumes dissentiunt. Facer platonem at est, duo ' + 'alterum accumsan ex, id vix delectus maluisset intellegam' + '. Id reque epicuri theophrastus nam, ne usu eripuit deser' + 'uisse adipiscing. Mea ex modo quaestio concludaturque, ve' + 'l te virtute indoctum. Quo id eius melius recusabo, sea a' + 'ffert ponderum eu. Natum causae pericula et sea, ea graec' + 'o complectitur sed. No qui autem fabellas, eum eros iuvaret mediocrem id.';
    }
};

},{}],3:[function(require,module,exports){
'use strict';

var Helpers = require('./Helpers');

/**
 * Creates a new Modal window containing some content.
 * 
 * Creating a new modal:
 *     var modal = new Modal(modalContentDomNode);
 *
 * Showing the modal:
 *     modal.show();
 *
 * Hiding the modal:
 *     modal.hide();
 *
 * Changing a modal's content:
 *     modal.replaceContent();
 * 
 * @param {HTMLElement} contentNode DOM node containing the content
 *                                  for inside of the Modal
 */
function Modal(contentNode) {
    // passed contentNode must be a DOM node
    if (!Helpers.isDOMNode(contentNode)) {
        throw new Error('Expects DOM contentNode as first argument');
    }

    var that = this;

    // not initially showing
    this.open = false;

    // init UI
    var modalWrap = document.createElement('div'),
        modal = document.createElement('div'),
        closeEntity = document.createElement('span');

    // add classes/content
    modalWrap.classList.add('modal-wrap');
    modal.classList.add('modal');
    closeEntity.innerHTML = '&times;';
    closeEntity.style.float = 'right';
    closeEntity.style.color = '#C4C4C4';
    closeEntity.style.fontSize = '20px';
    closeEntity.style.cursor = 'pointer';
    closeEntity.onclick = function () {
        that.hide();
    };

    // append nodes
    modal.appendChild(closeEntity);
    modal.appendChild(contentNode);
    modalWrap.appendChild(modal);

    // --- public (privileged) functions ---

    /**
     * Shows this Modal window
     */
    this.show = function () {
        if (!this.open) {
            // wrap document.body children
            // add blur class to returned wrap
            Helpers.wrapAll(document.body).classList.add('blur');

            // set position and display modalWrap
            modalWrap.style.top = window.pageYOffset + 'px';
            modalWrap.style.display = 'block';

            // append modalWrap to document.body
            document.body.appendChild(modalWrap);

            // add animation class for modal enter
            modal.classList.add('modal-enter');

            // switch modal state
            this.open = true;
        }
    };

    /**
     * Hides this Modal window
     */
    this.hide = function () {
        if (this.open) {
            // unwrap document.body children
            Helpers.unwrapAll(document.body);

            // remove modalWrap from document.body
            document.body.removeChild(modalWrap);

            // switch modal state
            this.open = false;
        }
    };

    /**
     * Replaces the content inside of this Modal window
     * 
     * @param  {HTMLElement} contentNode DOM node to insert into the modal
     */
    this.replaceContent = function (contentNode) {
        // remove all children of modal
        Helpers.removeAllChildren(modal);

        // add the new contentNode as a child of modal
        modal.appendChild(contentNode);
    };
}

module.exports = Modal;

},{"./Helpers":2}],4:[function(require,module,exports){
'use strict';

var Helpers = require('./Helpers');

/**
 * Creates a new Progress bar with inside of the passed node.
 *
 * Creating a new ProgressBar:
 *     var bar = new ProgressBar();
 *
 * Setting the progress:
 *     bar.setProgress([0..100]);
 *
 * Getting the current progress:
 *     bar.getProgress();
 *
 * @param  {HTMLElement} node DOM node to create progress bar in
 * @param  {Number} initialProgress initial progress to set the progress bar to
 * @return {ProgressBar} an instance of a ProgressBar
 */
function ProgressBar(node, initialProgress) {
    // passed node must be a DOM node
    if (!Helpers.isDOMNode(node)) {
        throw new Error('Expects DOM node as first argument');
    }

    // init UI
    var progressNode = document.createElement('div'),
        progressText = document.createElement('div');
    progressNode.classList.add('progress-node');
    progressText.classList.add('progress-text');
    node.classList.add('loading-progress');
    node.appendChild(progressNode);
    node.appendChild(progressText);
    setProgressNodeWidth(initialProgress);

    // --- public (privileged) functions ---

    /**
     * Sets the progress of the progress bar
     * 
     * @param {Number} progress progress to set progress bar to (0-100)
     */
    this.setProgress = function (progress) {
        setProgressNodeWidth(progress);
    };

    /**
     * Returns the progress of the progress bar
     * 
     * @return {Number} the progress as a percent
     */
    this.getProgress = function () {
        return progressNode.style.width;
    };

    // --- private functions ---

    /**
     * Sets the width style of the progressNode
     * Updates the UI for the progress bar
     * 
     * @param {Number} widthNumber width to set the progressNode to
     *                 if widthNumber < 0, will be set to 0
     *                 if widthNumber > 100, will be set to 100
     */
    function setProgressNodeWidth(widthNumber) {
        // check for negative width or
        // width larger than 100
        if (!widthNumber || widthNumber < 0) {
            widthNumber = 0;
        } else if (widthNumber > 100) {
            widthNumber = 100;
        }

        // set percent for attribute and width
        var percent = widthNumber + '%';
        progressText.textContent = percent;
        progressNode.style.width = percent;
    }
}

module.exports = ProgressBar;

},{"./Helpers":2}],5:[function(require,module,exports){
'use strict';

var Helpers = require('./Helpers');

var constants = {
    'HTML_ATTRIBUTE': 'data-tooltip',
    'WRAP_CLASS': 'tooltip-wrap',
    'ENTER_CLASS': 'tooltip-enter'
};

/**
 * Creates tooltips out of any elements with a class
 * of 'tooltip' and an attribute of 'data-tooltip'
 * that are children of the passed node.
 *
 * The value of the attribute 'data-tooltip'  
 * will be the text used for the tooltip.
 *
 * Creating tooltips out of elements:
 *     Tooltip(node);
 *     
 * @param  {HTMLElement} node DOM node to search in for
 *                            child elements with class 'tooltip'
 */
function Tooltip(node) {
    // passed node must be a DOM node
    if (!Helpers.isDOMNode(node)) {
        throw new Error('Expects DOM node as first argument');
    }

    var tooltips = node.querySelectorAll('.tooltip');

    // for each tooltip element, create a tooltip
    for (var i = 0; i < tooltips.length; i++) {
        createTooltip(tooltips[i]);
    }
}

/**
 * Creates a new tooltip inside of the passed node
 * The tooltip will be displayed on top of and in
 * the middle of the passed node.
 *
 * The passed node's data-tooltip attribute will
 * determine the text used in the tooltip.
 * 
 * @param  {HTMLElement} node DOM node to create the tooltip in
 */
function createTooltip(node) {
    var tooltipText = getTooltipText(node);

    // create tooltip
    var tooltipWrap = document.createElement('span');
    tooltipWrap.classList.add(constants.WRAP_CLASS);
    var tooltipTextNode = document.createTextNode(tooltipText);
    tooltipWrap.appendChild(tooltipTextNode);

    // set mouse event listeners
    node.onmouseenter = function () {
        tooltipWrap.classList.add(constants.ENTER_CLASS);
    };
    node.onmouseleave = function () {
        tooltipWrap.classList.remove(constants.ENTER_CLASS);
    };

    // create an observer instance for attribute changes on node
    var observer = new MutationObserver(function (mutations) {
        if (mutations.length && mutations[0].attributeName === constants.HTML_ATTRIBUTE) {
            // change tooltip text when attribute mutation occurs
            setTooltipText(node, getTooltipText(node));
        }
    });
    observer.observe(node, { attributes: true });

    // append wrap to node
    node.appendChild(tooltipWrap);

    // get computed styles after append into node
    var tooltipStyle = window.getComputedStyle(tooltipWrap);
    var nodeStyle = window.getComputedStyle(node);
    var tooltipHeight = parseInt(tooltipStyle.height);
    var tooltipWidth = parseInt(tooltipStyle.width);
    var nodeWidth = parseInt(nodeStyle.width);

    // position tooltip on top and middle of node
    tooltipWrap.style.top = -1 * tooltipHeight + 'px';
    tooltipWrap.style.left = nodeWidth / 2 - tooltipWidth / 2 + 'px';

    // create tooltip arrow
    var arrow = document.createElement('span');
    arrow.classList.add('arrow');

    // position tooltip arrow in middle and bottom of tooltipWrap
    arrow.style.top = tooltipHeight + 'px';
    arrow.style.right = tooltipWidth / 2 + 'px';

    // append arrow into tooltipWrap
    tooltipWrap.appendChild(arrow);
}

/**
 * Sets the tooltip text associated with the passed node.
 * The passed text will become the value for 
 * the passed node's 'data-tooltip' attribute.
 * 
 * @param {HTMLElement} node DOM node to set the tooltip text for
 * @param {String} text text to be shown in the tooltip
 */
function setTooltipText(node, text) {
    var wrap = node.querySelector('.' + constants.WRAP_CLASS);
    // change just the text node, don't lose the arrow
    wrap.childNodes[0].nodeValue = text;
}

/**
 * Returns the tooltip text associated with the passed node.
 * The returned String will come from the value 
 * of the passed node's 'data-tooltip' attribute.
 * 
 * @param  {HTMLElement} node DOM node to get the tooltip text from
 * @return {String} text String value of the passed node's
 *                       'data-tooltip' attribute
 */
function getTooltipText(node) {
    var tooltipText = node.getAttribute(constants.HTML_ATTRIBUTE);
    return tooltipText ? tooltipText : 'set ' + constants.HTML_ATTRIBUTE + ' attribute';
}

// export a 'create' function
module.exports = {
    'create': Tooltip
};

},{"./Helpers":2}],6:[function(require,module,exports){
'use strict';

var Constants = require('./lib/constant'),
    ProgressBar = require('./lib/utility/ProgressBar'),
    Modal = require('./lib/utility/Modal'),
    Tooltip = require('./lib/utility/Tooltip'),
    Helpers = require('./lib/utility/Helpers');

// --- ProgressBar example ---
var progressNode = document.getElementById('progress-example');
var progressBar = new ProgressBar(progressNode);
setInterval(function () {
    var randomProgress = (Math.random() * 100).toFixed(0);
    progressBar.setProgress(randomProgress);
}, 2000);

// --- Modal example ---
var modalContent = document.createElement('div');
var modalHeader = document.createElement('h2');
var modalPara = document.createElement('p');
modalPara.innerHTML = Helpers.lorenIpsum();
modalHeader.innerHTML = 'Hello, Example Modal!';
modalContent.appendChild(modalHeader);
modalContent.appendChild(modalPara);
var modal = new Modal(modalContent);
var modalShowBtn = document.getElementById('show-modal');
modalShowBtn.onclick = function () {
    modal.show();
};

// --- Tooltip example ---
Tooltip.create(document.body);

// test

},{"./lib/constant":1,"./lib/utility/Helpers":2,"./lib/utility/Modal":3,"./lib/utility/ProgressBar":4,"./lib/utility/Tooltip":5}]},{},[6]);
