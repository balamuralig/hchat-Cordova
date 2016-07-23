/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
function CreateFile(FileName) {
// Call Cordava to create file.
/*
window.resolveLocalFileSystemURL = window.resolveLocalFileSystemURL ||
                                   window.webkitResolveLocalFileSystemURL;

var url = 'filesystem:http://example.com/temporary/myfile.png';
window.resolveLocalFileSystemURL(url, function(fileEntry) {
  ...
});
*/

/*
	window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function (directoryEntry) {
		directoryEntry.getFile(FileName, { create: true }, function (fileEntry) {
        }, errorHandler.bind(null, FileName));
    }, errorHandler.bind(null, FileName));
*/
/*
function onInitCreateFs(fs) {

  fs.root.getFile('log.txt', {create: true, exclusive: true}, function(fileEntry) {

    // fileEntry.isFile === true
    // fileEntry.name == 'log.txt'
    // fileEntry.fullPath == '/log.txt'

  }, errorHandler);
}

window.requestFileSystem(window.TEMPORARY, 1024*1024, onInitCreateFs, errorHandler);
*/
   var type = window.TEMPORARY;
   var size = 5*1024*1024;
   window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;
   window.requestFileSystem(type, size, successCallback, errorCallback)

   function successCallback(fs) {
      fs.root.getFile('log.txt', {create: true}, function(fileEntry) {
      //fs.root.getFile('log.txt', {create: true, exclusive: true}, function(fileEntry) {
        console.log("got the file", fileEntry);
		fileEntry.createWriter(function(fileWriter) {
            fileWriter.onwriteend = function(e) {
               console.log("Write completed.");
            };

            fileWriter.onerror = function(e) {
               console.log("Write failed: " + e.toString());
            };

            var blob = new Blob(['Lorem Ipsum'], {type: 'text/plain'});
            fileWriter.write(blob);
         }, errorCallback);

      }, errorCallback);
   }

   function errorCallback(error) {
      console.log("ERROR: " + error.code);
   }
}

/*
//window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function(dir) {
window.resolveLocalFileSystemURL(cordova.file.cacheDirectory, function(dir) {
    console.log("got main dir",dir);
    dir.getFile("log.txt", {create:true}, function(file) {
        console.log("got the file", file);
		file.createWriter(function(fileWriter) {
            fileWriter.onwriteend = function(e) {
               console.log("Write completed.");
            };

            fileWriter.onerror = function(e) {
               console.log("Write failed: " + e.toString());
            };

            var blob = new Blob(['Lorem Ipsum'], {type: 'text/plain'});
            fileWriter.write(blob);
         }, errorCallback);

      }, errorCallback);
	  
	  function errorCallback(error) {
      console.log("ERROR: " + error.code)
   }
});
}
*/
function readFile() {
	window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function(dir) {
    console.log("got main dir",dir);
    dir.getFile("log.txt", {create:false}, function(fileEntry) {
        console.log("got the file", fileEntry);

         fileEntry.file(function(file) {
            var reader = new FileReader();

            reader.onloadend = function(e) {
               console.log("Text is: "+this.result);
            };

            reader.readAsText(file);

         }, errorCallback);

      }, errorCallback);
  
   function errorCallback(error) {
      alert("ERROR: " + error.code)
   }
   });
}

/*
function writeToFile(fileName, data) {
        //data = JSON.stringify(data, null, '\t');
        window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function (directoryEntry) {
            directoryEntry.getFile(fileName, { create: true }, function (fileEntry) {
                fileEntry.createWriter(function (fileWriter) {
                    fileWriter.onwriteend = function (e) {
                        // for real-world usage, you might consider passing a success callback
                        console.log('Write of file "' + fileName + '"" completed.');
                    };

                    fileWriter.onerror = function (e) {
                        // you could hook this up with our global error handler, or pass in an error callback
                        console.log('Write failed: ' + e.toString());
                    };

                    var blob = new Blob([data], { type: 'text/plain' });
                    fileWriter.write(blob);
                }, errorHandler.bind(null, fileName));
            }, errorHandler.bind(null, fileName));
        }, errorHandler.bind(null, fileName));
    }
*/
var errorHandler = function (fileName, e) {  
    var msg = '';

    switch (e.code) {
        case FileError.QUOTA_EXCEEDED_ERR:
            msg = 'Storage quota exceeded';
            break;
        case FileError.NOT_FOUND_ERR:
            msg = 'File not found';
            break;
        case FileError.SECURITY_ERR:
            msg = 'Security error';
            break;
        case FileError.INVALID_MODIFICATION_ERR:
            msg = 'Invalid modification';
            break;
        case FileError.INVALID_STATE_ERR:
            msg = 'Invalid state';
            break;
        default:
            msg = 'Unknown error';
            break;
    };

    console.log('Error (' + fileName + '): ' + msg);
}

function AppendToFile(FileName,payload) {
// Call cordava to append to file.
/*        window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function (directoryEntry) {
            directoryEntry.getFile(FileName, { create: false }, function (fileEntry) {
                fileEntry.createWriter(function (fileWriter) {
                    fileWriter.onwriteend = function (e) {
                        // for real-world usage, you might consider passing a success callback
                        console.log('Write of file "' + FileName + '"" completed.');
                    };

                    fileWriter.onerror = function (e) {
                        // you could hook this up with our global error handler, or pass in an error callback
                        console.log('Write failed: ' + e.toString());
                    };

                    var blob = new Blob([payload], { type: 'text/plain' });
                    fileWriter.write(blob);
                }, errorHandler.bind(null, FileName));
            }, errorHandler.bind(null, FileName));
        }, errorHandler.bind(null, FileName));
*/
/*
function onInitAppendFs(fs) {

  fs.root.getFile('log.txt', {create: false}, function(fileEntry) {

    // Create a FileWriter object for our FileEntry (log.txt).
    fileEntry.createWriter(function(fileWriter) {

      fileWriter.seek(fileWriter.length); // Start write position at EOF.

      // Create a new Blob and write it to log.txt.
      var blob = new Blob([payload], {type: 'text/plain'});

      fileWriter.write(blob);

    }, errorHandler);

  }, errorHandler);

}

window.requestFileSystem(window.TEMPORARY, 1024*1024, onInitAppendFs, errorHandler);
*/
/*
   var type = window.TEMPORARY;
   var size = 5*1024*1024;

   window.requestFileSystem(type, size, successCallback, errorCallback)

   function successCallback(fs) {

      fs.root.getFile('log.txt', {create: true}, function(fileEntry) {

         fileEntry.createWriter(function(fileWriter) {
            fileWriter.onwriteend = function(e) {
               console.log("Write completed.");
            };

            fileWriter.onerror = function(e) {
               console.log("Write failed: " + e.toString());
            };

            var blob = new Blob(['Lorem Ipsum'], {type: 'text/plain'});
            fileWriter.write(blob);
         }, errorCallback);

      }, errorCallback);

   }

   function errorCallback(error) {
      console.log("ERROR: " + error.code)
   }
   */
   
   readFile();
}
	var topicFilter = "/Chat";
	var BOF = "BOF->>>>";
	var FileName = new Uint8Array(32);
	var FileSize = new Uint8Array(4);

	//var FileName = new Uint8Array(32);
	//var FileSize = new Uint8Array(4);
	var FileNameStr = "";
	var FileSizeStr = "";
	var FileSize = 0;
	
function build()
{
	var headerArray = new Uint8Array(44);
	var BOF_ab = str2ab(BOF);
	var BOFarray = new Uint8Array(BOF_ab);
	var FileName_ab = str2ab(FileNameStr);
	FileName = new Uint8Array(FileName_ab);
	//var FileSizearray = new Uint8Array(FileSizeStr.split(""));
	
	for(var i=0; i <44; i++) {
		headerArray[i] = 0;
	}
	
	headerArray.set(BOFarray);
	headerArray.set(FileName,8);
	//FileName.set(FileSizearray,40);
	return headerArray;
}

function Parse(header)
{
	if(header.length == 44) {
		var BOFHeader = header.slice(0,8);
		var BOFStr = ab2str(BOFHeader);
		if( BOF.localeCompare(BOFHeader) != 0)
			return false;
		
		FileNameStr = header.slice(8,40);
		//FileSizeStr = ab2str(header.slice(40,44));
		//FileSize = Number(FileSizeStr);
		console.log("BOF:"+ BOFHeader+ " FileName:"+ FileNameStr + " FileSize:" + FileSize);
		return true;
	}
	return false;
}
	
function ab2str(buf) {
  return String.fromCharCode.apply(null, new Uint8Array(buf));
}

function str2ab(str) {
  var buf = new ArrayBuffer(str.length); // 2 bytes for each char
  var bufView = new Uint8Array(buf);
  for (var i=0, strLen=str.length; i<strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}

//client.connect({onSuccess:onConnect});

// called when the client connects
function onConnect() {
  // Once a connection has been made, make a subscription and send a message.
  console.log("onConnect");
//  var topicFilter = "/File";
  //client.subscribe("/World");
  var subscribeOptions = {
    qos: 1,  // QoS
	invocationContext:{filter: topicFilter}, // Passed to success / failure callback
	//invocationContext:{foo: true}, // Passed to success / failure callback
    onSuccess: subscribeSucceeded,
    onFailure: subscribeFailed,
    timeout: 10
  };
  
  try {
	client.subscribe(topicFilter, subscribeOptions);
  } catch (exception) {
    console.log("Exception creating subscription " +  exception);
    //alert("Subscribe to " + topicFilter + " failed");
  }
  if(topicFilter == "/File") {
  FileNameStr = "Bala.jpg";
  FileSizeStr = "1028";
  //message = new Paho.MQTT.Message("Hello");
  var headerBytes = build();
  message = new Paho.MQTT.Message(headerBytes);
  //message.messageIdentifier = 1234;
  message.destinationName = "/File";
  message.qos = 1;
  //message.retained = true;
  client.send(message);
 } 
 else if(topicFilter == "/Chat") {
  //var msgStr = document.getElementById("ChatBox").value;
  var ChatElement = document.getElementById("ChatBox");
  var msgStr = ChatElement.value;
  message = new Paho.MQTT.Message(msgStr);
  //message.messageIdentifier = 1234;
  message.destinationName = "/Chat";
  message.qos = 1;
  //message.retained = true;
  client.send(message);
 }
}


function doDisconnect() {
 client.disconnect();
}
  
// called when the client loses its connection
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("Connection lost for " + client.clientId +":"+ "errorCode:" + responseObject.errorCode);
  }
}

// called when a message arrives
function onMessageArrived(message) {
  console.log("Message Arrived: " + message.payloadString);
  console.log("Topic:     " + message.destinationName);
  console.log("QoS:       " + message.qos);
  console.log("Retained:  " + message.retained);
  console.log("Message id:  " + message.messageIdentifier);
  // Read Only, set if message might be a duplicate sent from broker
  console.log("Duplicate: " + message.duplicate);
  if(message.destinationName == "/File") {
	//if(message.payloadBytes)
	if(message.payloadString.length == 44) {
		if(Parse(message.payloadString) == true) {
			var NewFileName = FileNameStr + "x";
			//NewFileName = "test.jpg";
			CreateFile("test.jpg");
			return;
		}
	}
	else {
		AppendToFile("test.jpg", message.payloadString);
	}
  }
  else if(message.destinationName == "/Chat") {
	  document.getElementById("ChatHistoryBox").value += message.payloadString;
  }
}

function subscribeSucceeded(result) {
   console.log("Subscribed to " + result.invocationContext.filter);
   // Save topic for the next time the user runs the app
   //localStorage.subTopic = result.invocationContext.filter;
}

function subscribeFailed(result) {
   console.log("Subscribe to " + result.invocationContext.filter + " failed");
}
 
 var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

function doConnect() {
		try {
		// Create a client instance
		//var topicFilter = "/File";
		
		client = new Paho.MQTT.Client("192.168.1.134", Number(15675), "/ws", "clientId-FileTx");
		} catch (exception) {
		console.log("Exception creating client " + exception);
		//alert("Exception creating client");
		}

		client.onConnectionLost = onConnectionLost;
		client.onMessageArrived = onMessageArrived;

		// Connect the client, with a Last-Will-and-Testament
		var lwt = new Paho.MQTT.Message("Disconnected client");
		lwt.destinationName = "/LWT";
		lwt.qos = 1;
		lwt.retained = true;
		// connect the client
		//client.connect({onSuccess:onConnect,useSSL:true});

		client.connect({onSuccess:onConnect,willMessage:lwt});
}

function doChat() {
	topicFilter = "/Chat";
	doConnect();
}

function doFileTransfer() {
	topicFilter = "/File";
	doConnect();
}

