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
    closeEntity.onclick = function() {
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
    this.show = function() {
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
    this.hide = function() {
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
    this.replaceContent = function(contentNode) {
        // remove all children of modal
        Helpers.removeAllChildren(modal);

        // add the new contentNode as a child of modal
        modal.appendChild(contentNode);
    };
}

module.exports = Modal;
