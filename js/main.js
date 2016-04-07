'use strict';

var Constants = require('./lib/constant'),
    ProgressBar = require('./lib/utility/ProgressBar'),
    Modal = require('./lib/utility/Modal'),
    Tooltip = require('./lib/utility/Tooltip'),
    Helpers = require('./lib/utility/Helpers');

// --- ProgressBar example ---
var progressNode = document.getElementById('progress-example');
var progressBar = new ProgressBar(progressNode);
setInterval(function() {
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
modalShowBtn.onclick = function() {
    modal.show();
};

// --- Tooltip example ---
Tooltip.create(document.body);

// test