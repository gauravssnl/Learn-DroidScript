/*
    All net I/O is here.
*/

// API for a result of `execute/format` commands:
// {
//     "success": true/false,
//     "code": "...", // (only for `format`)
//     "stderr": "...", // technical details of a compilation
//     "stdout": "..." // output of a programm
// }

const SUCCESS = 0;
const ERROR = 1 + SUCCESS;
const WARNING = 1 + ERROR;

const PREFIX1 = "https://play.integer32.com";
const PREFIX2 = "https://play.rust-lang.org";
const EXECUTE_POSTFIX = "/execute";
const FORMAT_POSTFIX = "/format";
const GIST_URL = "https://api.github.com/gists";

// Regex for finding new lines
const newLineRegex = /(?:\r\n|\r|\n)/g;

function escapeHTML(unsafe) {// return unsafe;
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;")
        .replace(newLineRegex, '<br>');
};

const exec_request = {
    "channel":   "stable",
    "code":       "",
    "crateType": "bin",
    "mode":      "debug",
    "tests":      false
};

/* API:
const result = {
    "success": true / false,
    "stdout": "out" / "",
    "stderr": "" / "err"
};
*/

const gist_request = {
    "description": "Rust code shared from the playground",
    "public": true,
    "files": {
        "playground.rs": {
            "content": ""
        }
    }
};

function clearResultDiv() {
};

function processRes(err, res, callback) {
    //alert(res);
    if(err) {
        alert(`Error: {res}`);
        return;
    };
    var result = JSON.parse(res);
    // handle application errors from playpen
    if( !result.success ) {
        statusCode = ERROR;
        result = 'Playpen Error: ' + result.stderr;
    } else {
        statusCode = SUCCESS;
        // handle rustc errors/warnings
        // Neeg.d server support to get an accurate version of this.
        if (result.stderr.indexOf("error:") !== -1) {
            statusCode = ERROR;
        } else if (result.stderr.indexOf("warning:") !== -1) {
            statusCode = WARNING;
        };
        result = result.stdout;
    };
    callback(statusCode, result);
}

function execute( program, callback ) {
    var data =  new Object(exec_request);
    data.mode = settings.mode;
    data.channel = settings.channel;
    data.code = program;
    data = JSON.stringify(data);
    app.HttpRequest( "json", settings.host_url, EXECUTE_POSTFIX, data, (err, res) => { processRes(err, res, callback) }, "content-type=application/json;charset=utf-8");
}

// The callback to execute
function handleResult( statusCode, message ) {//alert("result: "+statusCode+message);
    // Dispatch depending on result type
    if (message == null) {
        clearResultDiv();
        //resultDiv.style.backgroundColor = errorColor;
        //resultDiv.innerHTML = errMsg;
    } else if (statusCode === SUCCESS) {
        handleSuccess(message);
    } else if (statusCode === WARNING) {
        handleWarning(message);
    } else {
        handleError(message);
    };
};

// Called on successful program run: display output and playground icon
function handleSuccess( message ) {
    displayOutput(escapeHTML(message), txtSourceBuffer.GetText());
};

// Called when program run results in warning(s)
function handleWarning( message ) {
    handleProblem(message, "warning");
};

// Called when program run results in error(s)
function handleError( message ) {
    handleProblem(message, "error");
};

// Called on unsuccessful program run. Detects and prints problems (either
// warnings or errors) in program output and highlights relevant lines and text
// in the code.
function handleProblem( message, problem ) {
    if( typeof message == "undefined" ) return;
    // Getting list of ranges with problems
    var lines = message.split(newLineRegex);

    // Cleaning up the message: keeps only relevant problem output.
    var cleanMessage = lines.filter(function(line) {
        line = line.trim();
        return !(line.slice(0, 11) == "--> <anon>")
        && !(line.slice(0, 9) == "playpen:")
        && !(line.slice(0, 16) == "error: aborting");
    }).map(function(line) {
        return escapeHTML(line);
    }).filter(function(line) {
        return line != "";
    }).map(function(line) {
        return line.replace(/  /g, '\u00a0\u00a0');
    }).join("<br>");

    // Get all of the row:col in the message.
    var errorLines = lines.filter(function(line) {
        return line.indexOf("--> <anon>") !== -1;
    }).map(function(line) {
        var lineIndex = line.indexOf(":");
        if (!~lineIndex) {
            return line.slice(lineIndex);
        };

        return "";
    }).filter(function(line) {
        return line != "";
    });

    // Setting message
    displayOutput(cleanMessage, txtSourceBuffer.GetText());

    // Highlighting the lines
   // var ranges = parseProblems(errorLines);
   // markers = ranges.map(function(range) {
   //    return editor.getSession().addMarker(range, "ace-" + problem + "-line",
   //     "fullLine", false);
    //});

    // Highlighting the specific text
    //markers = markers.concat(ranges.map(function(range) {
   //     return editor.getSession().addMarker(range, "ace-" + problem + "-text",
    //    "text", false);
   // }));
};

// Parses a problem message returning a list of ranges (row:col, row:col) where
// problems in the code have occured.
function parseProblems( lines ) {
    var ranges = [];
    for (var i in lines) {
        var line = lines[i];
        var parts = line.split(/:\s?|\s+/, 5).slice(1, 5);
        var ip = parts.map(function(p) { return parseInt(p, 10) - 1; });
        console.log("line:", line, parts, ip);
        ranges.push(new Range(ip[0], ip[1], ip[2], ip[3]));
    };

    return ranges;
};

// Display an output message and a link to the Rust playground
function displayOutput( message, program ) {
    var gistUrl = getGist( program );
    bodyScroll.ScrollTo( 0, bodyHeight );
    txtOutputBuffer.SetHtml( message +"<br>============================<br>" + gistUrl + "<br><br><br>");
};

function getGist( program ) {
    var data = new Object(gist_request);
    data.files["playground.rs"].content = program;
    var request = new XMLHttpRequest();
    request.open( "POST", GIST_URL, false );
    request.setRequestHeader( "Content-Type", "application/json" );
    request.onreadystatechange = function() {
        if( request.readyState == 4 ) {
            var json;
            try {
                json = JSON.parse( request.response );
            } catch (e) {
                console.log( "JSON.parse(): " + e );
            };

            if( request.status == 201 ) {
                return json;
            } else if( request.status === 0 ) {
                app.ShowPopup( "Connection failure.\nAre you connected to the Internet?" );
            } else {
                app.ShowPopup( "Something went wrong.\nThe HTTP request produced a response with status code " + request.status + ".");
            };
        } else {
            
        };
    };
    try {
        request.send( json( data ) );
        var res = JSON.parse( request.response );
        res = ( "<br>Permalink to the playground:<br>    " + PREFIX1 + "/?gist=" + res.id
              + "&version=" + settings.version );
        return res;
    } catch (e) {
        app.ShowPopup( e );
        return data.code;
    };
}

function format( source, callback, version, optimize ) {
    send( { code: source }, callback );
}

function send( data, callback ) {
    var data = JSON.stringify(data);
    app.HttpRequest(
        "json",
        settings.host_url,
        FORMAT_POSTFIX,
        data,
        function(err, res) {
            if(err) {
                alert(`Error: {res}`);
                return;
            };
            var res = JSON.parse(res);
            callback(res);
        },
        "content-type=application/json;charset=utf-8");
}