$(document).ready(function(){

var sourceText = '';
var sourceDoc;

function handleFileUpload(evt) {
  var files = evt.target.files; // FileList object
  for (var i = 0, f; f = files[i]; i++) {
    if (!f.type.match('text.*')) {
      continue;
    }
    var reader = new FileReader();
    reader.onload = (function(theFile) {
      return function(e) {
        document.getElementById('source-text').innerHTML = e.target.result;
      };
    })(f);
    reader.onloadend = function () {
      fileUploaded();
    };
    reader.readAsText(f);
  }
}

function refreshSource() {
  sourceText = document.getElementById('source-text').innerHTML;
  sourceDoc = nlp(sourceText);
}

function fileUploaded() {
  console.log('source text is uploaded');
}

function erase(eraseWords) {
  refreshSource();

  eraseWordsArr = eraseWords.split(",").map(item => item.trim());

  let result = sourceDoc;
  let emptyStr = '';

  for (let i = 0; i < eraseWordsArr.length; i++) {
    emptyStr = '';
    for (let j = 0; j < eraseWordsArr[i].length; j++) {
      emptyStr += '<span class="blackout">&nbsp;</span>';
      console.log('currently replacing: ' + eraseWordsArr[i]);
    }
    result.replace(eraseWordsArr[i], emptyStr);
  }
  // result.verbs().addClass('verb');

  document.getElementById('result-text').innerHTML = result.text();
}

function reset() {
  refreshSource();
  document.getElementById('result-text').innerHTML = sourceText;
  console.log('resetted');
}

$("#btn-erase").click(function(){
  erase(document.getElementById('erase-text').value);
});
$("#btn-reset").click(function(){
  reset();
});
$("#btn-upload").change(function(evt){
  handleFileUpload(evt);
});


});
