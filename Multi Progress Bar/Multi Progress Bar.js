function OnStart() {
    
    lay = app.CreateLayout( "linear", "VCenter,FillXY" );
    app.AddLayout( lay );
    // create multiple progress bar in ONE SCREEN or ONE LAYOUT
    var ty=new ProgressLine(0.8,1000); lay.AddChild(ty);
    var ty2=new ProgressLine(0.8,500); lay.AddChild(ty2);
    var ty3=new ProgressLine(0.8,250); lay.AddChild(ty3);
    var ty4=new ProgressLine(0.8,100); lay.AddChild(ty4);
    
    for (var i=0;i<1000;i++) {
        ty.Update(i);
        ty2.Update(i);
        ty3.Update(i);
        ty4.Update(i);
    }
}


// ********************
// * progress line bar
// ********************
// progress line bar
function ProgressLine(width,totalPos) {
    // ********************
    // * global vars
    // ********************
    var self=this;
    // use as placeholder for other functions
    var lay=app.CreateLayout('linear');
    var thknes=0.005; // progress bar line thickness
    lay.tpos=totalPos || 0; // save total position
    lay.curpct=0; // current percent
    lay.bsiz=0; // current progress bar length
    var wid=width; // bar line width
    // progress line base
    var layF=app.CreateLayout('frame');
    // progress line background color
    var pbb=app.CreateLayout("linear");
    pbb.SetSize(wid,thknes);
    pbb.SetBackColor('#FF345445');
    // progress bar active
    var pb=app.CreateLayout("linear");
    pb.SetSize(0,thknes);
    pb.SetBackColor('#FF3088AA');
    // add to the layout
    layF.AddChild(pbb);
    layF.AddChild(pb);
    lay.AddChild(layF);
    // show percent text
    lay.per=0; // current percent
    lay.ptxt=app.CreateText('0%',wid,-1,"right" );
    lay.AddChild(lay.ptxt);
    // ********************
    // * public methods
    // ********************
    // get and set max position
    lay.GetMaxPos=function() { return lay.tpos; }
    lay.SetMaxPos=function(pos) { lay.tpos=pos; }
    // update the progress bar line
    lay.Update=function(pos) {
        // 100% complete or force close. exit
        if (pos>lay.tpos) return;
        var spct=(pos/lay.tpos*100).toFixed(0);
        if (spct==lay.curpct) return;
        lay.curpct=spct; // save current percent
        lay.bsiz=wid*(spct/100); // compute bar siz
        pb.SetSize(lay.bsiz,thknes);
        if (isNaN(lay.curpct)) lay.curpct=0;
        lay.ptxt.SetText(lay.curpct+'%');
    } // Update(pos)
    
    return lay;
} // ProgressLine(width,totalPos)