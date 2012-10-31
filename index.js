// forked from jsdo.it_team's "Web Creator's Contest Q the 2nd【vol.3】エントリー用コード" http://jsdo.it/jsdo.it_team/xa9f
window.addEventListener("load", function(inst){
  var instX = 13;
  var instY = 12;
  var sensitivity = 19;
  $("#quick_select").change(function(){
    var quick_select = $("#quick_select").val();
      console.log(quick_select);
      switch (quick_select){
        case '0':
          instX = 13;
          $("#inst_list_x").val("13");
          instY = 12;
          $("#inst_list_y").val("12");
        break;
        case '1':
          instX = 7;
          $("#inst_list_x").val("7");
          instY = 8;
          $("#inst_list_y").val("8");
        break;
        case '2':
          instX = 15;
          $("#inst_list_x").val("15");
          instY = 14;
          $("#inst_list_y").val("14");
        break;
        case '3':
          instX = 17;
          $("#inst_list_x").val("17");
          instY = 0;
          $("#inst_list_y").val("0");
        break;
        case '4':
          instX = 11;
          $("#inst_list_x").val("11");
          instY = 10;
          $("#inst_list_y").val("10");
        break;
        case '5':
          instX = 5;
          $("#inst_list_x").val("5");
          instY = 6;
          $("#inst_list_y").val("6");
        break;
        case 'f':
          instX = 9;
          $("#inst_list_x").val("9");
          instY = 4;
          $("#inst_list_y").val("4");
        break;
        case 'h':
          instX = 2;
           $("#inst_list_x").val("2");
          instY = 4;
           $("#inst_list_y").val("4");
        break;
     }
  });

  $("#inst_list_x").change(function(){
    instX = $("#inst_list_x").val();
  });
  $("#inst_list_y").change(function(){
    instY = $("#inst_list_y").val();
  });
  $("#sensitivity").change(function(){
    sensitivity = $("#sensitivity").val();
  });    
  $("#reset_sensitivity").click(function(e){
    e.preventDefault();
    sensitivity = 19;
    $("#sensitivity").val("19");
  });

  var context = new webkitAudioContext();
  var bufferLoader = new BufferLoader(context,['http://jsrun.it/assets/j/L/R/i/jLRih.mp3',
    'http://jsrun.it/assets/a/6/9/z/a69zA.mp3',
    'http://jsrun.it/assets/k/a/l/E/kalEz.mp3',
    'http://jsrun.it/assets/4/G/G/0/4GG0T.mp3',
    'http://jsrun.it/assets/r/t/W/n/rtWnw.mp3',
    'http://jsrun.it/assets/g/K/M/D/gKMDr.mp3',
    'http://jsrun.it/assets/s/l/6/K/sl6KA.mp3',
    'http://jsrun.it/assets/n/t/T/j/ntTjd.mp3',
    'http://jsrun.it/assets/v/d/L/B/vdLBp.mp3',
    'http://jsrun.it/assets/l/k/Q/2/lkQ2r.mp3',
    'http://jsrun.it/assets/3/y/z/Q/3yzQf.mp3',
    'http://jsrun.it/assets/f/T/y/j/fTyjR.mp3',
    'http://jsrun.it/assets/m/s/z/x/mszx8.mp3',
    'http://jsrun.it/assets/f/t/R/q/ftRqz.mp3',
    'http://jsrun.it/assets/A/u/7/5/Au75T.mp3',
    'http://jsrun.it/assets/e/S/P/X/eSPXQ.mp3',
    'http://jsrun.it/assets/p/M/Y/Z/pMYZx.mp3',
    'http://jsrun.it/assets/6/z/Z/3/6zZ3V.mp3'], function(){});
  var gainNode = context.createGainNode();
  var volume = 1;
  window.addEventListener('devicemotion', function(event) {
	if( ! event.accelerationIncludingGravity ) { return; }
	  var gy = event.accelerationIncludingGravity.y;
	  var gx = event.accelerationIncludingGravity.x;
	    if( Math.abs(gy) > sensitivity ) {
          if(instY == '-1'){ return; }
          var source = context.createBufferSource();
          source.buffer = bufferLoader.bufferList[instY];
          source.connect(gainNode);
          gainNode.gain.value = volume.valueAsNumber;
          gainNode.connect(context.destination);
          source.connect(context.destination);
          source.noteOn(0);
        }
	    if( Math.abs(gx) > sensitivity ) {
          if(instX == '-1'){ return; }
          var source = context.createBufferSource();
          source.buffer = bufferLoader.bufferList[instX];
          source.connect(gainNode);
          gainNode.gain.value = volume.valueAsNumber;
          gainNode.connect(context.destination);
          source.connect(context.destination);
          source.noteOn(0);
        }
    }, true);
  bufferLoader.load();
}, true);

function BufferLoader(context, urlList, callback) {
    this.context = context;
    this.urlList = urlList;
    this.onload = callback;
    this.bufferList = new Array();
    this.loadCount = 0;
}

BufferLoader.prototype.loadBuffer = function(url, index) {
    // Load buffer asynchronously
    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.responseType = "arraybuffer";

    var loader = this;

    request.onload = function() {
        var buffer;
        try {
            buffer = loader.context.createBuffer(request.response, false);
        } catch(e) {
            alert('error decoding file data: ' + url);
        }

        try {
            loader.bufferList[index] = buffer;
            if (++loader.loadCount == loader.urlList.length)
                loader.onload(loader.bufferList);
        } catch(e) {
            alert('BufferLoader: callback problem');
        }
    }

    request.onerror = function() {
        alert('BufferLoader: XHR error');        
    }

    request.send();
}

BufferLoader.prototype.load = function() {
    for (var i = 0; i < this.urlList.length; ++i)
        this.loadBuffer(this.urlList[i], i);
}
    
    