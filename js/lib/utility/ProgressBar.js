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
    this.setProgress = function(progress) {
        setProgressNodeWidth(progress);
    };

    /**
     * Returns the progress of the progress bar
     * 
     * @return {Number} the progress as a percent
     */
    this.getProgress = function() {
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
