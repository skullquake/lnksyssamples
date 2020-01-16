var editor = ace.edit("editor");                   // the editor object
var editorDiv = document.getElementById("editor");     // its container
var doc = editor.getSession().getDocument();  // a reference to the doc

editor.on("change", function() {
    var lineHeight = editor.renderer.lineHeight;
    editorDiv.style.height = lineHeight * doc.getLength() + "px";
    editor.resize();
});