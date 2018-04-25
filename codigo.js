const COLOR_WAIT = "#42c2f4";
const COLOR_OK = "#1f7f39";
const COLOR_ERROR = "#c43131";
const openUrl = function(url) {
    window.open(url, "controlled");
}
const setMessage = function(message, color) {
    mensaje.innerHTML = message;
    document.body.style.backgroundColor = color;
    document.title = "::" + message;
};

var active = false;
const startListener = function() {
    if (active)
	return;
    active = true;
    const wsConn = new WebSocket('ws://' + window.location.hostname + ':20000');
    wsConn.onopen = function() {
	setMessage("Active", COLOR_OK);
    }
    wsConn.onclose = function() {
	setMessage("Disconn.", COLOR_ERROR);
	active = false;
    }
    wsConn.onerror = function() {
	setMessage("ERROR", COLOR_ERROR);
    }
    wsConn.onmessage = function(message) {
	try {
	    var datos = JSON.parse(message.data);
	    var url = datos.url;
	    openUrl(url);
	} catch(e) {
	    setMessage("MSG ERROR", COLOR_ERROR);
	}
    }
}
document.body.addEventListener("touchend", function() {
    if (!active)
	setMessage("Clicked", COLOR_WAIT);
    startListener();
    openUrl("https://www.google.com.mx");
});
setMessage("Ready", COLOR_WAIT);
