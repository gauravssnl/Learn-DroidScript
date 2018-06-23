

app.CreatePanel = function() { return new Panel(); } 

function Panel()
{
    _this = this;
    
    //Create hidden full screen background layout.
	this.layBack = app.CreateLayout( "Linear", "Left,FillXY,TouchThrough" );
	this.layBack.SetOnTouch( _Cb(this,"OnTouch" )  );
	
    //Create panel layout.
	this.layPanel = app.CreateLayout( "Linear", "FillY" );
	this.layBack.AddChild( this.layPanel );
	
	//this.layPanel.SetPadding( 0, 0.1, 0, 0 ); 
	//this.layPanel.SetBackColor( "#16000000" );
	this.layPanel.SetBackground( "/res/drawable/drop_right" );
	this.layPanel.SetVisibility( "Hide" );
	
	this.layContent = app.CreateLayout( "Linear", "FillY" );
	//this.layContent.SetMargins( 0,0,0.005,0);
	//this.layContent.SetBackColor( "#ffffff" );
	this.layPanel.AddChild( this.layContent );
	
	//this.id = layPanel.id;
    
    this.layBack.GetLayout = function() { return _this.layContent; }
    
    this.layBack.Slide = function() 
    {
        if( _this.layPanel.GetVisibility()=="Hide" )
            _this.layPanel.Animate( "SlideFromLeft" );
        else
            _this.layPanel.Animate( "SlideToLeft" );
    }
    
    this.OnTouch = function( ev ) 
    {  
        if( _this.layPanel.GetVisibility()=="Show" )
            _this.layPanel.Animate( "SlideToLeft" ); 
    }
    
    return this.layBack;
}

