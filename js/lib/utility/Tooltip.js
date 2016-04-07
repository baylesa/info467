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
    node.onmouseenter = function() {
        tooltipWrap.classList.add(constants.ENTER_CLASS);
    };
    node.onmouseleave = function() {
        tooltipWrap.classList.remove(constants.ENTER_CLASS);
    };
    
    // create an observer instance for attribute changes on node
    var observer = new MutationObserver(function(mutations) {
        if (mutations.length && 
            mutations[0].attributeName === constants.HTML_ATTRIBUTE) {
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
    tooltipWrap.style.top = (-1 * tooltipHeight) + 'px';
    tooltipWrap.style.left = (nodeWidth / 2) - (tooltipWidth / 2) + 'px';
    
    // create tooltip arrow
    var arrow = document.createElement('span');
    arrow.classList.add('arrow');

    // position tooltip arrow in middle and bottom of tooltipWrap
    arrow.style.top = tooltipHeight + 'px';
    arrow.style.right = (tooltipWidth / 2) + 'px';

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
    return tooltipText ? tooltipText : 'set ' + 
        constants.HTML_ATTRIBUTE + ' attribute';
}

// export a 'create' function
module.exports = {
    'create': Tooltip
};