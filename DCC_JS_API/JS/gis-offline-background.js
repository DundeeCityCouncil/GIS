"use strict";

require(["dojo/_base/declare", "esri/layers/ArcGISTiledMapServiceLayer", "dojo/query", "dojo/io/script"],
    function (declare, AGSTiled) {
        var bgProps = {
            constructor: function (args) {
                // Load/create indexedDB, fire loaded event when ready. 
                this.indexedDB.open(this.idbOpenCallback, this);

            },
            errorCount: 0,
            // When set to false will halt offline synchronising.
            continue: true,
            placeHolderURL: "//mapsonline.dundeecity.gov.uk/dcc_gis_root/dcc_gis_config/images/loading-512.png",
            offline: {
                // Level to synchronise to. zero indexed. -1 will sync all available in REST service
                levels: -1,
                // Extent to synchronise (optional)
                extent: false,
                lods: []
            },
            // Holds indexeddb and also utility functions to open and upgrade database. 
            indexedDB: {},
            idbOpenCallback: function (db) {
                if (db) {
                    this.indexedDB.db = db;
                    console.log("db loaded" + db.version);
                    this.onDBloaded();
                } else {
                    console.log("idb open but no db");
                }

            },
            onDBloaded: function () {
                // empty extension point for onDBloaded event.    
            },
            onLoadListeners: [],
            /**
             * @param progressElement DOM Node that will be populated with an update progress bar.
             *
             */
            sync: function (options) {

                if (typeof options.levels === 'number') {
                    this.offline.levels = options.levels;
                }
                if (typeof options.extent !== 'undefined') {
                    this.offline.extent = options.extent;
                }

                if (typeof options.progressElement !== 'undefined') {
                    this.processMapServiceInfo(options.progressElement);
                } else {
                    this.processMapServiceInfo();
                }

            },
            _secondsToTime: function (secs, exactFlag) {
                // Converts seconds to nicely formatted time.
                if (secs < 60 && !exactFlag) {
                    if (secs > 30) {
                        return ' < 1 min';
                    } else if (secs > 15) {
                        return ' < 30 seconds';
                    } else {
                        return ' < 15 seconds ';
                    }

                } else {
                    var sec_num = parseInt(secs, 10); // don't forget the second param
                    var hours = Math.floor(sec_num / 3600);
                    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
                    var seconds = sec_num - (hours * 3600) - (minutes * 60);

                    if (hours == 0) {
                        hours = ''
                    };
                    if (hours == 1) {
                        hours += " hour "
                    }
                    if (hours > 1) {
                        hours += " hours "
                    }
                    // Minutes
                    if (minutes >= 1) {
                        if (minutes > 1) {
                            minutes = minutes + ' mins ';
                        } else {
                            minutes = '1 min ';
                        }
                    } else {
                        minutes = '';
                    }

                    // Seconds
                    if (exactFlag) {
                        if (seconds > 1) {
                            seconds = seconds + ' seconds';
                        } else if (seconds == 1) {
                            seconds = "1 second ";
                        } else {
                            seconds = '';
                        }

                    } else {
                        seconds = '';
                    }
                    var time = '&nbsp;' + hours + minutes + seconds;
                    return time;
                }

            },


            _updateStatusText: function () {
                // If exists, updates this.syncStatus.text with a new estimated time remaining
                if (typeof this.syncStatus !== 'undefined') {
                    var secNow = Date.now() / 1000;
                    var secElapsed = secNow - this.syncStatus.startTime;
                    if (this.syncStatus.progressBar.value == this.syncStatus.progressBar.max) {
                        var syncstatimg = document.getElementById('offlineSync_status')
                        if (typeof syncstatimg !== 'undefined') {
                            syncstatimg.src = 'http://mapsonline.dundeecity.gov.uk/dcc_gis_root/dcc_gis_config/images/blue_tick.png';
                        }
                        this.syncStatus.text.innerHTML = this._secondsToTime(secElapsed, true) +
                            ' elapsed';
                    } else if (secElapsed > 0) {
                        var secPerTile = secElapsed / this.syncStatus.progressBar.value;
                        var secToGo = ((this.syncStatus.progressBar.max - this.syncStatus.progressBar.value) * secPerTile);
                        //this.syncStatus.text.innerHTML = "&nbsp;" + (minToGo < 1 ? "< 1 min" : Math.round(minToGo) + " min(s) ") + "  remaining";
                        this.syncStatus.text.innerHTML = this._secondsToTime(secToGo, false) + ' remaining';
                        this.syncStatus.progressBar.title = this.syncStatus.progressBar.value + "/" + this.syncStatus.progressBar.max + '@' + (Math.round(secPerTile * 100) / 100) + " seconds per tile (" + Math.round(secToGo) + "s)";
                    }
                }

            },
            _calculateTileBoundsforLod: function (level) {
                // Calculates first and last tile for initial extent of map service. 
                // TODO - customise offline extent ? 
                // Does not handle non projected co-ordinate systems.
                var initialExtent;
                // Use initial extent to calculate start and end tiles for each level of detail
                if (this.offline.extent) {
                    initialExtent = this.offline.extent;
                } else {
                    initialExtent = this.initialExtent;
                }
                var lod = level;
                var startTile = {};
                this.offline.lods[lod] = {};
                this.offline.lods[lod].start = {};
                startTile.pixelx = (initialExtent.xmin - this.tileInfo.origin.x) / this.tileInfo.lods[lod].resolution;
                startTile.col = Math.floor(startTile.pixelx / this.tileInfo.cols);
                this.offline.lods[lod].start.col = startTile.col;

                startTile.pixely = (this.tileInfo.origin.y - initialExtent.ymax) / this.tileInfo.lods[lod].resolution;
                startTile.row = Math.floor(startTile.pixely / this.tileInfo.rows);
                this.offline.lods[lod].start.row = startTile.row;

                var endTile = {};
                this.offline.lods[lod].end = {};
                endTile.pixelx = (initialExtent.xmax - this.tileInfo.origin.x) / this.tileInfo.lods[lod].resolution;
                endTile.col = Math.floor(endTile.pixelx / this.tileInfo.cols);
                this.offline.lods[lod].end.col = endTile.col;

                endTile.pixely = (this.tileInfo.origin.y - initialExtent.ymin) / this.tileInfo.lods[lod].resolution;
                endTile.row = Math.floor(endTile.pixely / this.tileInfo.rows);
                this.offline.lods[lod].end.row = endTile.row;
                var layerTilesCount = ((endTile.row - startTile.row + 1) * (endTile.col - startTile.col + 1));
                this.offline.totalTiles += layerTilesCount;
                console.log("SYNC : level " + level + " tilecount = " + layerTilesCount)

            },
            saveImage: function (tileObject, listenerNo) {
                if (typeof listenerNo !== 'undefined' && listenerNo >= 0) {
                    dojo.disconnect(this.onLoadListeners[listenerNo]);
                    this.onLoadListeners[listenerNo] = null;
                }

                var _tileObject = tileObject;
                // lod / row / col (for the index)
                if (typeof this.indexedDB.db !== 'undefined') {
                    if (typeof _objectStore === 'undefined' || _objectStore === null) {
                        var _objectStore = this.indexedDB.db.transaction("tile_cache", "readwrite").objectStore("tile_cache");
                    }
                    _tileObject.service = this.url;
                    var that = this;
                    var request = _objectStore.put(_tileObject);

                    request.onsuccess = function () {
                        that.syncStatus.progressBar.value++
                        if (that.syncStatus.progressBar.value % 50 == 0 || that.syncStatus.progressBar.max == that.syncStatus.progressBar.value) {
                            that._updateStatusText();
                        }
                        _tileObject.col++;

                        that._getTileCallback.call(that, _tileObject.level, _tileObject.row, _tileObject.col);
                    };


                } else {

                    console.log("No db available yet - set callback");
                    var t = this;
                    var listenerNo = this.onLoadListeners.length;
                    var listener = dojo.connect(t, "onDBloaded", dojo.hitch(t, "saveImage", _tileObject, listenerNo));
                    this.onLoadListeners.push(listener);

                }



            },

            _downloadTiles: function (level) {
                // Downloads tiles for specified level and saves to indexeddbdbdbdbdb 

                var row = this.offline.lods[level].start.row;
                var col = this.offline.lods[level].start.col;

                this._getTileCallback(level, row, col);
            },
            _getImage: function (url, level, row, col) {
                var t = this;
                var _url = url;
                var tileObject = {
                    level: level,
                    row: row,
                    col: col
                };
                var req = new XMLHttpRequest();
                req.open("GET", url, true);
                req.timeout = 18000;
                req.ontimeout = function () {
                    console.error("Timeout downloading tile : " + _url);
                    t.errorCount++;
                };
                req.overrideMimeType("text/plain; charset=x-user-defined");
                req.responseType = 'arraybuffer'; // Returns byte stream arraybuffer
                req.onreadystatechange = function () {
                    t._getImageCallback(req, tileObject);
                }
                req.send(null);

            },
            _getImageCallback: function (req, tileObject) {

                if (req.readyState === 4 && req.status === 200) {

                    var binary = ''
                    var buffer = req.mozResponseArrayBuffer || req.response
                    var bytes = new Uint8Array(buffer)

                    for (var i = 0; i < bytes.byteLength; i++) {
                        binary += String.fromCharCode(bytes[i])
                    }

                    tileObject.dataURL = "data:image/" + this._TILE_FORMATS[this.tileInfo.format] + ";base64," + window.btoa(binary);
                    this.saveImage(tileObject);

                    // Not used - each image is downloaded from saveimage onsuccess -  _AFTER_ the previous one is saved 
                    // because indexedDB is the bottleneck not network. 
                    //var _col = tileObject.col + 1; 
                    //this._getTileCallback(tileObject.level, tileObject.row, _col);
                } else if (req.readyState === 4 && req.status !== 200) {
                    console.error("SYNC: Error downloading tile - " + tileObject.level + '/' + tileObject.row + '/' + tileObject.col + "," + req.status + ' ' + req.statusText);
                    tileObject.col++;
                    this._getTileCallback(tileObject.level, tileObject.row, tileObject.col);
                }

            },

            _getTileCallback: function (level, row, col) {
                if (col > this.offline.lods[level].end.col) {
                    col = this.offline.lods[level].start.col
                    row++;
                }

                if (row <= this.offline.lods[level].end.row &&
                    this.continue) {
                    // Download tile   
                    var tileInfo = {
                        level: level,
                        row: row,
                        col: col
                    };

                    this._getImage(this.url + "/tile/" + level + "/" + row + "/" + col, level, row, col);

                } else {
                    console.log("SYNC: Tiles downloaded for level " + level + "," + row + "," + col);
                    if (level + 1 === this.offline.lods.length || level === this.offline.levels) {
                        // All tile levels have been called to update. 
                    }
                    if (level + 1 < this.offline.lods.length) {
                        // Call next level. No longer required as run async   
                        this._downloadTiles(level + 1);
                    }
                }


            },

            processMapServiceInfo: function (processElement) {
                // Part of the synchronise method, is split out to be used as the return callback 
                // once the map service information is downloaded from the server
                if (typeof this.tileInfo === 'undefined') {
                    var map = this.getMap(); // Returns null or undefined when layer not in a map
                    if (!map) {
                        // Layer not added to map - get mapservice details manually
                        var t = this;
                        var pe = processElement;
                        var jsonpArgs = {
                            url: this.url,
                            callbackParamName: "callback",
                            content: {
                                f: "json"
                            },
                            load: function (data) {
                                t.tileInfo = data.tileInfo;
                                t.initialExtent = data.initialExtent;
                                t.processMapServiceInfo(pe);
                            },
                            error: function (error) {
                                if (pe) {
                                    pe.innerHTML = "Error retrieving map service information";
                                } else {
                                    console.log('SYNC ERROR :' + error);
                                }
                            }

                        };
                        dojo.io.script.get(jsonpArgs);
                    } else {
                        // Sync after onload event fires.
                        var pe = processElement;
                        dojo.connect(this, 'onLoad', this, function () {
                            this.processMapServiceInfo(pe)
                        });
                    }



                } else {

                    if (processElement) {
                        // Create a progress bar and text.
                        var pBarSpan = document.createElement('span');
                        pBarSpan.style.float = 'left';
                        pBarSpan.style.position = 'absolute';
                        pBarSpan.style.left = '14em';

                        var pBar = document.createElement('progress');

                        pBar.value = 0;
                        pBarSpan.appendChild(pBar);

                        var pText = document.createElement('span');
                        pText.style.fontStyle = 'italics';
                        var pImage = document.createElement('img');
                        pImage.src = 'http://mapsonline.dundeecity.gov.uk/dcc_gis_root/dcc_gis_config/images/circle_loader_sm.gif'
                        pImage.id = 'offlineSync_status';
                        pBarSpan.appendChild(pImage);
                        pText.innerHTML = '&nbsp;downloading..';
                        pBarSpan.appendChild(pText);
                        processElement.appendChild(pBarSpan);
                        processElement.appendChild(document.createTextNode('Maps'));
                        var startSecs = Date.now() / 1000;
                        this.syncStatus = {
                            progressBar: pBar,
                            text: pText,
                            startTime: startSecs
                        };
                    }

                    this.offline.totalTiles = 0;
                    this.offline._downloadedTiles = 0;
                    for (var i = 0; i < this.tileInfo.lods.length; i++) {
                        if (this.offline.levels === -1 || i <= this.offline.levels) {
                            this._calculateTileBoundsforLod(i);
                            //this._downloadTiles(i);
                        }
                    }
                    this._downloadTiles(0);
                    // Metadata updated - now download !
                    console.log("SYNC : " + this.offline.totalTiles + " to synchronise");
                    this.syncStatus.progressBar.max = this.offline.totalTiles;

                }
            },
            getTileUrl: function (level, row, col, cb) {
                if (cb) {
                    console.log("Get tile callback - after db load");
                }

                if (typeof this.MISSING === "undefined") {
                    var loadingCanvas = document.createElement("canvas");
                    loadingCanvas.width = this.tileInfo.width;
                    loadingCanvas.height = this.tileInfo.height;
                    var radius = 70;
                    var ldCtx = loadingCanvas.getContext('2d');
                    ldCtx.font = "bold 12px sans-serif";
                    ldCtx.fillStyle = "#D1CCC6";
                    ldCtx.textAlign = "center";
                    ldCtx.textBaseline = "bottom";
                    ldCtx.fillText("Tile not available offline", loadingCanvas.width / 2, loadingCanvas.height / 2);
                    this.MISSING = loadingCanvas.toDataURL('image/png');
                }
                var tileKey = {
                    service: this.url,
                    level: level,
                    row: row,
                    col: col
                };
                var name = this.id + "_tile_" + tileKey.level + "_" + tileKey.row + "_" + tileKey.col;
                var url = this._url.path + "/tile/" + level + "/" + row + "/" + col;

                if (typeof this.indexedDB.db !== 'undefined') {
                    var objectStore = this.indexedDB.db.transaction("tile_cache", "readonly").objectStore("tile_cache");
                    var keyPath = [this.url, level, row, col];
                    var missingTile = this.MISSING;
                    var layerid = this.id;
                    var request = objectStore.get(keyPath);
                    request.onerror = function (event) {
                        console.debug("Error retrieving tile");
                    };
                    request.onsuccess = function (event) {
                        var img = dojo.query("img.layerTile[src$='tile_" + name + "']");
                        if (img.length > 0) {
                            if (request.result && request.result.dataURL) {
                                img[0].src = request.result.dataURL;
                            } else {
                                img[0].src = missingTile;
                            }
                        } else {
                            console.info("No tile found for : " + "map_layer0_tile_" + tileKey.level + "_" + tileKey.row + "_" + tileKey.col);
                        }
                    };
                } else {
                    // Indexed DB not loaded yet - come back later
                    console.log("Kicking tile request into long grass");
                    var t = this;
                    var listener = dojo.connect(t, "onDBloaded", dojo.hitch(t, "getTileUrl", tileKey.level, tileKey.row, tileKey.col, true));
                    this.onLoadListeners.push(listener);
                }


                return this.placeHolderURL + "#tile_" + name;

            }
        };


        // ++++++++++++ START OF INDEXEDDB BIT



        bgProps.indexedDB.open = function (callback, callBackScope) {
            // callback is optional on success callback handler, which is passed the db object.
            var version = 41;
            var request = indexedDB.open("offline_maps", version);
            console.log("indexedDB.open");
            var errorHandler = function (e) {
                console.log("Database Error : " + e.target.errorCode);
            }

            var _callBackScope = callBackScope;
            request.onupgradeneeded = function (e) {

                console.log("DB Upgrade to version " + version);
                var db = e.currentTarget.result;
                //e.target.transaction.onerror = errorHandler;

                if (db.objectStoreNames.contains("tile_cache")) {
                    db.deleteObjectStore("tile_cache");
                }

                var tile_store = db.createObjectStore("tile_cache", {
                    keyPath: ["service", "level", "row", "col"]
                });
                tile_store.createIndex("mapservice", "service", {
                    unique: false
                });
                tile_store.createIndex("tile", ["service", "level", "row", "col"], {
                    unique: true
                });

                //######## Metadata Object Store ###################
                if (db.objectStoreNames.contains("metadata")) { // Delete delta store and recreate
                    db.deleteObjectStore("metadata");
                }
                if (!db.objectStoreNames.contains('metadata')) { // Metadata definition hasn't changed so only create if necessary. 
                    var db_metadata = db.createObjectStore("metadata", {
                        keyPath: "parameter"
                    });
                }

                // Upgraded, call callback - 
                db_metadata.transaction.oncomplete = function (event) {
                    console.log("Upgrade complete");
                    // request.onsuccess({
                    //   target: {
                    //                            result: request.db
                    //                        }
                    //                    });

                }

            };

            request.onsuccess = function (e) {
                console.log("indexedDB.opened");
                var db = this.result;
                console.log(typeof db + e.currentTarget.result);
                if (typeof callback !== 'undefined' && typeof _callBackScope !== 'undefined') {
                    var cb = dojo.hitch(_callBackScope, callback, db);
                    cb();
                } else if (typeof callback !== 'undefined') {
                    callback(db);
                }
                // TODO Handle DB needing Sync on update.
                // if metadta syncStatus = 'required' alert user they must synchronise their offline db.
            };

            request.onerror = function (e) {

                console.error("Error opening indexed DB  - " + e.target.errorCode);

            };

        };
        // ------------- END OF INDEXEDDB BIT 

        declare("dcc.gis.offline.TiledMapLayer", AGSTiled, bgProps);
    });