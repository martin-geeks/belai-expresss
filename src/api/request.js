import Moult from './moult-ui-t.js';

function requestData(data, next, l) {
data.params = data.params || {}; l={};
data.method = data.method.toLowerCase();
data.type = data.type || "text";
if(data.method === "post") {
data.body = new FormData();
if(data.params instanceof FormData) {
data.body = data.params;
} else {
Moult.utilities.entries(data.params, function(param) {
data.body.append(param[0], param[1]);
});
}} else if(data.method === "get") {
data.body = {};
Moult.utilities.entries(data.params, function(param,i) {
data.url += (i === 0 && !/\?/.test(data.url) ? "?" : "&")+param[0]+"="+param[1];
});}
data.xhr = new XMLHttpRequest();
data.xhr.timeout = 150000;
data.xhr.ontimeout = function() {

};
data.xhr.upload.onprogress = data.progress || function() {

};
data.xhr.onerror = function() {

};
data.xhr.onloadend = function(e) {
if(data.stack) {
e.i = data.stack.requests.active.indexOf(data.xhr);
if(e.i+1) {
data.stack.requests.active = data.stack.requests.active.slice(0,e.i).concat(data.stack.requests.active.slice(e.i+1));
}
}
};
data.xhr.onload = function(ret) {
// alert(data.xhr.responseText);
if(data.type === "text") { next(data.xhr.responseText); }
else if(data.type === "json") {
try {
ret = JSON.parse(data.xhr.responseText);
} catch(e) {
ret = { error: true, message: "Invalid response from server" };
}
next(ret);
} else { next(data.response); }
};
data.xhr.open(data.method,data.url);
data.xhr.send(data.body);
if(data.stack) {
data.stack.requests.active.push(data.xhr);
}
}

export default requestData;