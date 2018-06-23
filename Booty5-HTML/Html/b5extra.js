
//DS:--- Provide lower latency sound --------------------------------------

b5.Sound.prototype.load = function()
{
    //DS:
    if (b5.app.debug) console.log( "loading sound: " + filename )
    
    var debug = b5.app.debug;
    var snd;
    var that = this;
    var filename = this.location;
    var auto_play = this.auto_play;
    if (b5.app.use_marm)
    {
        snd = new Media("/android_asset/webassets/" + filename);
        if (auto_play)
            this.play();
    }
    else
    {
        if (!b5.Sound.isSupported(filename))
        {
            filename = this.location2;
            if (!b5.Sound.isSupported(filename))
            {
                if (b5.app.debug)
                {
                    console.log("Warning: Unsupported audio formats")
                    b5.app.onResourceLoaded(that, true);
                }
                return;
            }
        }
        if (b5.app.use_web_audio)
        {
            if (!b5.Utils.loadJSON(filename, false, function(data) {
                if (data !== null)
                {
                    b5.Sound.context.decodeAudioData(data, function(buffer) {
                        that.buffer = buffer;
                        b5.app.onResourceLoaded(that, false);
                        if (auto_play)
                            that.play();
                    }, function(e) {console.log(e)});
                }
                }, true))
                b5.app.onResourceLoaded(that, true);
        }
        else
        {
            //DS: snd = new Audio();
            snd = _app.CreateMediaPlayer(); 
            
            if (this.loop)
            {
                snd.SetLooping( true ); 
                
                /*DS:
                if (typeof snd.loop === "boolean") 
                    snd.loop = true;
                else
                {
                    snd.addEventListener('ended', function() {
                        this.currentTime = 0;
                        this.play();
                    }, false);
                }*/
            }
            
            /*DS:snd.onerror = function() {
                snd.onerror = null;
                b5.app.onResourceLoaded(that, true);
            });
            */
            
            //DS:
            if( !this.reuse ) snd.SetOnComplete( function() {
                this.Destroy();
            });
            
            //DS: snd.oncanplaythrough = function() {
            snd.SetOnReady( function() {
                //DS:snd.oncanplaythrough = null;
                b5.app.onResourceLoaded(that, false);
                if (auto_play)
                    //DH:that.play();
                    snd.Play();
            });
            
            //DS: snd.src = filename;
            snd.SetFile( filename );
        }
    }
    this.snd = snd;
};


b5.Sound.prototype.play = function()
{
    if (b5.app.use_web_audio)
    {
    
        if (this.buffer === null)
            return null;
        var context = b5.Sound.context;
        var source = context.createBufferSource();
        var gain = context.createGain();
        source.buffer = this.buffer;
        source.loop = this.loop;
        source.connect(gain);
        gain.connect(context.destination);
        gain.gain.value = 1;
        source.start(0);
        if (this.auto_play)
            this.snd = { source: source, gain: gain };
        return { source: source, gain: gain };
    }

    var snd = null;
    if (this.reuse)
        snd = this.snd;
  
    if (snd === null)
    {
        //DS:
        this.auto_play = true;
        this.load();
        snd = this.snd; 
    }
    else snd.Play( 0 );
    
    /*DS:
    if (snd !== null) {
        snd.play();
    }*/
    return snd;
};

//-------------------------------------------------------------------------

