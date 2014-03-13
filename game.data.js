
var Module;
if (typeof Module === 'undefined') Module = eval('(function() { try { return Module || {} } catch(e) { return {} } })()');
if (!Module.expectedDataFileDownloads) {
  Module.expectedDataFileDownloads = 0;
  Module.finishedDataFileDownloads = 0;
}
Module.expectedDataFileDownloads++;
(function() {

    var PACKAGE_PATH;
    if (typeof window === 'object') {
      PACKAGE_PATH = window['encodeURIComponent'](window.location.pathname.toString().substring(0, window.location.pathname.toString().lastIndexOf('/')) + '/');
    } else {
      // worker
      PACKAGE_PATH = encodeURIComponent(location.pathname.toString().substring(0, location.pathname.toString().lastIndexOf('/')) + '/');
    }
    var PACKAGE_NAME = '../chronored/web/game.data';
    var REMOTE_PACKAGE_NAME = (Module['filePackagePrefixURL'] || '') + 'game.data.compress';
    var REMOTE_PACKAGE_SIZE = 259037;
    var PACKAGE_UUID = '54f54afe-1494-4bd3-a459-dac0ddb769ff';
  
    function fetchRemotePackage(packageName, packageSize, callback, errback) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', packageName, true);
      xhr.responseType = 'arraybuffer';
      xhr.onprogress = function(event) {
        var url = packageName;
        var size = packageSize;
        if (event.total) size = event.total;
        if (event.loaded) {
          if (!xhr.addedTotal) {
            xhr.addedTotal = true;
            if (!Module.dataFileDownloads) Module.dataFileDownloads = {};
            Module.dataFileDownloads[url] = {
              loaded: event.loaded,
              total: size
            };
          } else {
            Module.dataFileDownloads[url].loaded = event.loaded;
          }
          var total = 0;
          var loaded = 0;
          var num = 0;
          for (var download in Module.dataFileDownloads) {
          var data = Module.dataFileDownloads[download];
            total += data.total;
            loaded += data.loaded;
            num++;
          }
          total = Math.ceil(total * Module.expectedDataFileDownloads/num);
          if (Module['setStatus']) Module['setStatus']('Downloading data... (' + loaded + '/' + total + ')');
        } else if (!Module.dataFileDownloads) {
          if (Module['setStatus']) Module['setStatus']('Downloading data...');
        }
      };
      xhr.onload = function(event) {
        var packageData = xhr.response;
        callback(packageData);
      };
      xhr.send(null);
    };

    function handleError(error) {
      console.error('package error:', error);
    };
  
      var fetched = null, fetchedCallback = null;
      fetchRemotePackage(REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE, function(data) {
        if (fetchedCallback) {
          fetchedCallback(data);
          fetchedCallback = null;
        } else {
          fetched = data;
        }
      }, handleError);
    
  function runWithFS() {

function assert(check, msg) {
  if (!check) throw msg + new Error().stack;
}
Module['FS_createPath']('/', 'sounds', true, true);
Module['FS_createPath']('/', 'levels', true, true);
Module['FS_createPath']('/', 'hump', true, true);

    function DataRequest(start, end, crunched, audio) {
      this.start = start;
      this.end = end;
      this.crunched = crunched;
      this.audio = audio;
    }
    DataRequest.prototype = {
      requests: {},
      open: function(mode, name) {
        this.name = name;
        this.requests[name] = this;
        Module['addRunDependency']('fp ' + this.name);
      },
      send: function() {},
      onload: function() {
        var byteArray = this.byteArray.subarray(this.start, this.end);

          this.finish(byteArray);

      },
      finish: function(byteArray) {
        var that = this;
        Module['FS_createPreloadedFile'](this.name, null, byteArray, true, true, function() {
          Module['removeRunDependency']('fp ' + that.name);
        }, function() {
          if (that.audio) {
            Module['removeRunDependency']('fp ' + that.name); // workaround for chromium bug 124926 (still no audio with this, but at least we don't hang)
          } else {
            Module.printErr('Preloading file ' + that.name + ' failed');
          }
        }, false, true); // canOwn this data in the filesystem, it is a slide into the heap that will never change
        this.requests[this.name] = null;
      },
    };
      new DataRequest(0, 40463, 0, 0).open('GET', '/spritesheet.png');
    new DataRequest(40463, 46178, 0, 0).open('GET', '/levels.lua');
    new DataRequest(46178, 96086, 0, 0).open('GET', '/styllo.ttf');
    new DataRequest(96086, 98633, 0, 0).open('GET', '/ending.lua');
    new DataRequest(98633, 101004, 0, 0).open('GET', '/menu.lua');
    new DataRequest(101004, 108050, 0, 0).open('GET', '/game.lua');
    new DataRequest(108050, 111552, 0, 0).open('GET', '/turret.lua');
    new DataRequest(111552, 112231, 0, 0).open('GET', '/hsl.lua');
    new DataRequest(112231, 113673, 0, 0).open('GET', '/main.lua');
    new DataRequest(113673, 123412, 0, 0).open('GET', '/ship.lua');
    new DataRequest(123412, 125278, 0, 0).open('GET', '/content.lua');
    new DataRequest(125278, 132914, 0, 1).open('GET', '/sounds/out1.wav');
    new DataRequest(132914, 139102, 0, 1).open('GET', '/sounds/regen_fuel.wav');
    new DataRequest(139102, 185546, 0, 1).open('GET', '/sounds/next_level.wav');
    new DataRequest(185546, 195218, 0, 1).open('GET', '/sounds/collide1.wav');
    new DataRequest(195218, 201406, 0, 1).open('GET', '/sounds/collide2.wav');
    new DataRequest(201406, 217334, 0, 1).open('GET', '/sounds/collide3.wav');
    new DataRequest(217334, 233474, 0, 1).open('GET', '/sounds/collide4.wav');
    new DataRequest(233474, 474218, 0, 1).open('GET', '/sounds/ending.wav');
    new DataRequest(474218, 516072, 0, 1).open('GET', '/sounds/explode1.wav');
    new DataRequest(516072, 527400, 0, 1).open('GET', '/sounds/fire1.wav');
    new DataRequest(527400, 562694, 0, 1).open('GET', '/sounds/regen_health.wav');
    new DataRequest(562694, 571554, 0, 1).open('GET', '/sounds/littlehurt1.wav');
    new DataRequest(571554, 608406, 0, 1).open('GET', '/sounds/explode2.wav');
    new DataRequest(608406, 614166, 0, 0).open('GET', '/levels/level7.lua');
    new DataRequest(614166, 616712, 0, 0).open('GET', '/levels/level8.lua');
    new DataRequest(616712, 620046, 0, 0).open('GET', '/levels/level3.lua');
    new DataRequest(620046, 622779, 0, 0).open('GET', '/levels/level2.lua');
    new DataRequest(622779, 625405, 0, 0).open('GET', '/levels/level9.lua');
    new DataRequest(625405, 627684, 0, 0).open('GET', '/levels/level1.lua');
    new DataRequest(627684, 630740, 0, 0).open('GET', '/levels/level6.lua');
    new DataRequest(630740, 637380, 0, 0).open('GET', '/levels/level10.lua');
    new DataRequest(637380, 642530, 0, 0).open('GET', '/levels/level5.lua');
    new DataRequest(642530, 643934, 0, 0).open('GET', '/levels/level4.lua');
    new DataRequest(643934, 650178, 0, 0).open('GET', '/hump/timer.lua');
    new DataRequest(650178, 653703, 0, 0).open('GET', '/hump/vector-light.lua');
    new DataRequest(653703, 657091, 0, 0).open('GET', '/hump/camera.lua');
    new DataRequest(657091, 659820, 0, 0).open('GET', '/hump/signal.lua');
    new DataRequest(659820, 662745, 0, 0).open('GET', '/hump/class.lua');
    new DataRequest(662745, 665540, 0, 0).open('GET', '/hump/gamestate.lua');
    new DataRequest(665540, 670782, 0, 0).open('GET', '/hump/vector.lua');

    function processPackageData(arrayBuffer) {
      Module.finishedDataFileDownloads++;
      assert(arrayBuffer, 'Loading data file failed.');
      var byteArray = new Uint8Array(arrayBuffer);
      var curr;
      
      Module["decompress"](byteArray, function(decompressed) {
        byteArray = new Uint8Array(decompressed);
        
      // Reuse the bytearray from the XHR as the source for file reads.
      DataRequest.prototype.byteArray = byteArray;
          DataRequest.prototype.requests["/spritesheet.png"].onload();
          DataRequest.prototype.requests["/levels.lua"].onload();
          DataRequest.prototype.requests["/styllo.ttf"].onload();
          DataRequest.prototype.requests["/ending.lua"].onload();
          DataRequest.prototype.requests["/menu.lua"].onload();
          DataRequest.prototype.requests["/game.lua"].onload();
          DataRequest.prototype.requests["/turret.lua"].onload();
          DataRequest.prototype.requests["/hsl.lua"].onload();
          DataRequest.prototype.requests["/main.lua"].onload();
          DataRequest.prototype.requests["/ship.lua"].onload();
          DataRequest.prototype.requests["/content.lua"].onload();
          DataRequest.prototype.requests["/sounds/out1.wav"].onload();
          DataRequest.prototype.requests["/sounds/regen_fuel.wav"].onload();
          DataRequest.prototype.requests["/sounds/next_level.wav"].onload();
          DataRequest.prototype.requests["/sounds/collide1.wav"].onload();
          DataRequest.prototype.requests["/sounds/collide2.wav"].onload();
          DataRequest.prototype.requests["/sounds/collide3.wav"].onload();
          DataRequest.prototype.requests["/sounds/collide4.wav"].onload();
          DataRequest.prototype.requests["/sounds/ending.wav"].onload();
          DataRequest.prototype.requests["/sounds/explode1.wav"].onload();
          DataRequest.prototype.requests["/sounds/fire1.wav"].onload();
          DataRequest.prototype.requests["/sounds/regen_health.wav"].onload();
          DataRequest.prototype.requests["/sounds/littlehurt1.wav"].onload();
          DataRequest.prototype.requests["/sounds/explode2.wav"].onload();
          DataRequest.prototype.requests["/levels/level7.lua"].onload();
          DataRequest.prototype.requests["/levels/level8.lua"].onload();
          DataRequest.prototype.requests["/levels/level3.lua"].onload();
          DataRequest.prototype.requests["/levels/level2.lua"].onload();
          DataRequest.prototype.requests["/levels/level9.lua"].onload();
          DataRequest.prototype.requests["/levels/level1.lua"].onload();
          DataRequest.prototype.requests["/levels/level6.lua"].onload();
          DataRequest.prototype.requests["/levels/level10.lua"].onload();
          DataRequest.prototype.requests["/levels/level5.lua"].onload();
          DataRequest.prototype.requests["/levels/level4.lua"].onload();
          DataRequest.prototype.requests["/hump/timer.lua"].onload();
          DataRequest.prototype.requests["/hump/vector-light.lua"].onload();
          DataRequest.prototype.requests["/hump/camera.lua"].onload();
          DataRequest.prototype.requests["/hump/signal.lua"].onload();
          DataRequest.prototype.requests["/hump/class.lua"].onload();
          DataRequest.prototype.requests["/hump/gamestate.lua"].onload();
          DataRequest.prototype.requests["/hump/vector.lua"].onload();
          Module['removeRunDependency']('datafile_../chronored/web/game.data');

      });
    
    };
    Module['addRunDependency']('datafile_../chronored/web/game.data');
  
    if (!Module.preloadResults) Module.preloadResults = {};
  
      Module.preloadResults[PACKAGE_NAME] = {fromCache: false};
      if (fetched) {
        processPackageData(fetched);
        fetched = null;
      } else {
        fetchedCallback = processPackageData;
      }
    
  }
  if (Module['calledRun']) {
    runWithFS();
  } else {
    if (!Module['preRun']) Module['preRun'] = [];
    Module["preRun"].push(runWithFS); // FS is not initialized yet, wait for it
  }

})();

