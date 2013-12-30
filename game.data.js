
var Module;
if (typeof Module === 'undefined') Module = eval('(function() { try { return Module || {} } catch(e) { return {} } })()');
if (!Module.expectedDataFileDownloads) {
  Module.expectedDataFileDownloads = 0;
  Module.finishedDataFileDownloads = 0;
}
Module.expectedDataFileDownloads++;
(function() {

    function fetchRemotePackage(packageName, callback, errback) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', packageName, true);
      xhr.responseType = 'arraybuffer';
      xhr.onprogress = function(event) {
        var url = packageName;
        if (event.loaded && event.total) {
          if (!xhr.addedTotal) {
            xhr.addedTotal = true;
            if (!Module.dataFileDownloads) Module.dataFileDownloads = {};
            Module.dataFileDownloads[url] = {
              loaded: event.loaded,
              total: event.total
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
      fetchRemotePackage('game.data.compress', function(data) {
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
      new DataRequest(0, 41681, 0, 0).open('GET', '/spritesheet.png');
    new DataRequest(41681, 47396, 0, 0).open('GET', '/levels.lua');
    new DataRequest(47396, 97304, 0, 0).open('GET', '/styllo.ttf');
    new DataRequest(97304, 99851, 0, 0).open('GET', '/ending.lua');
    new DataRequest(99851, 102255, 0, 0).open('GET', '/menu.lua');
    new DataRequest(102255, 109369, 0, 0).open('GET', '/game.lua');
    new DataRequest(109369, 112914, 0, 0).open('GET', '/turret.lua');
    new DataRequest(112914, 113593, 0, 0).open('GET', '/hsl.lua');
    new DataRequest(113593, 115035, 0, 0).open('GET', '/main.lua');
    new DataRequest(115035, 124829, 0, 0).open('GET', '/ship.lua');
    new DataRequest(124829, 126695, 0, 0).open('GET', '/content.lua');
    new DataRequest(126695, 134331, 0, 1).open('GET', '/sounds/out1.wav');
    new DataRequest(134331, 140519, 0, 1).open('GET', '/sounds/regen_fuel.wav');
    new DataRequest(140519, 186963, 0, 1).open('GET', '/sounds/next_level.wav');
    new DataRequest(186963, 196635, 0, 1).open('GET', '/sounds/collide1.wav');
    new DataRequest(196635, 202823, 0, 1).open('GET', '/sounds/collide2.wav');
    new DataRequest(202823, 218751, 0, 1).open('GET', '/sounds/collide3.wav');
    new DataRequest(218751, 234891, 0, 1).open('GET', '/sounds/collide4.wav');
    new DataRequest(234891, 475635, 0, 1).open('GET', '/sounds/ending.wav');
    new DataRequest(475635, 517489, 0, 1).open('GET', '/sounds/explode1.wav');
    new DataRequest(517489, 528817, 0, 1).open('GET', '/sounds/fire1.wav');
    new DataRequest(528817, 564111, 0, 1).open('GET', '/sounds/regen_health.wav');
    new DataRequest(564111, 572971, 0, 1).open('GET', '/sounds/littlehurt1.wav');
    new DataRequest(572971, 609823, 0, 1).open('GET', '/sounds/explode2.wav');
    new DataRequest(609823, 615577, 0, 0).open('GET', '/levels/level7.lua');
    new DataRequest(615577, 618123, 0, 0).open('GET', '/levels/level8.lua');
    new DataRequest(618123, 621457, 0, 0).open('GET', '/levels/level3.lua');
    new DataRequest(621457, 624169, 0, 0).open('GET', '/levels/level2.lua');
    new DataRequest(624169, 626795, 0, 0).open('GET', '/levels/level9.lua');
    new DataRequest(626795, 629064, 0, 0).open('GET', '/levels/level1.lua');
    new DataRequest(629064, 632120, 0, 0).open('GET', '/levels/level6.lua');
    new DataRequest(632120, 638760, 0, 0).open('GET', '/levels/level10.lua');
    new DataRequest(638760, 643909, 0, 0).open('GET', '/levels/level5.lua');
    new DataRequest(643909, 645312, 0, 0).open('GET', '/levels/level4.lua');
    new DataRequest(645312, 651556, 0, 0).open('GET', '/hump/timer.lua');
    new DataRequest(651556, 655081, 0, 0).open('GET', '/hump/vector-light.lua');
    new DataRequest(655081, 658469, 0, 0).open('GET', '/hump/camera.lua');
    new DataRequest(658469, 661198, 0, 0).open('GET', '/hump/signal.lua');
    new DataRequest(661198, 664123, 0, 0).open('GET', '/hump/class.lua');
    new DataRequest(664123, 666918, 0, 0).open('GET', '/hump/gamestate.lua');
    new DataRequest(666918, 672160, 0, 0).open('GET', '/hump/vector.lua');

    var PACKAGE_PATH;
    if (typeof window === 'object') {
      PACKAGE_PATH = window['encodeURIComponent'](window.location.pathname.toString().substring(0, window.location.pathname.toString().lastIndexOf('/')) + '/');
    } else {
      // worker
      PACKAGE_PATH = encodeURIComponent(location.pathname.toString().substring(0, location.pathname.toString().lastIndexOf('/')) + '/');
    }
    var PACKAGE_NAME = '../chronored/web/game.data';
    var REMOTE_PACKAGE_NAME = 'game.data.compress';
    var PACKAGE_UUID = '99f61a0d-4872-401b-b629-22c4f2fddd1c';
  
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

