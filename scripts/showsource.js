var button = document.createElement('div');
button.classList.add('source');
var source = document.createElement('h3');
source.innerHTML = 'source';
button.appendChild(source);
document.body.appendChild(button);

button.addEventListener('click', function () {
    viewSource();
})

function viewSource(){
    var source = "<html>\r";
    source += document.getElementsByTagName('html')[0].innerHTML;
    source += "</html>";
    source = source.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    source = "<pre>"+source+"</pre>";
    sourceWindow = window.open('','Source of page','height=800,width=800,scrollbars=1,resizable=1');
    sourceWindow.document.write(source);
    sourceWindow.document.close(); 
    if(window.focus) sourceWindow.focus();
} 