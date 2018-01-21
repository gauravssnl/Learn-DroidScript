
/*
	DroidScript Plugin class.
	(This is where you put your plugin code)
*/

package %PACKAGENAME%;

import android.os.*;
import android.content.*;
import android.util.Log;
import android.graphics.*;
import java.io.*;
import java.lang.reflect.*;

public class %PLUGINNAME%
{
	public static String TAG = "%PLUGINNAME%";	
	public static float VERSION = 1.0f;	
	private Method m_callscript;
	private Object m_parent;

	//Script callbacks.
	private String m_OnMyReply;

	//Contruct plugin.
	public %PLUGINNAME%()
	{
		Log.d( TAG, "Creating plugin object");
	}

	//Initialise plugin.
	public void Init( Context ctx, Object parent )
	{
		try {
			Log.d( TAG, "Initialising plugin object");

			//Save reference to parent (DroidScript).
			m_parent = parent;

			//Use reflection to get 'CallScript' method
			Log.d( TAG, "Getting CallScript method");
			m_callscript = parent.getClass().getMethod( "CallScript", Bundle.class );
		 } 
		 catch (Exception e) {
			   Log.e( TAG, "Failed to Initialise plugin!", e );
		 }
	}

	//Call a function in the user's script.
	private void CallScript( Bundle b )
	{
		try {
			m_callscript.invoke( m_parent, b );
		} 
		catch (Exception e) {
			Log.e( TAG, "Failed to call script function!", e );
		}
	}

	//Handle commands from DroidScript.
	public String CallPlugin( Bundle b )
	{
		//Extract command.
		String cmd = b.getString("cmd");
	
		//Process commands.
		String ret = null;
		try {
			if( cmd.equals("GetVersion") ) 
				return GetVersion( b );
			else if( cmd.equals("MyFunc") ) 
				MyFunc( b );
			else if( cmd.equals("SetOnMyReply") ) 
				SetOnMyReply( b );
			else if( cmd.equals("SaveMyImage") ) 
				SaveMyImage( b );
		} 
		catch (Exception e) {
		   Log.e( TAG, "Plugin command failed!", e);
		}
		return ret;
	}

	//Handle the GetVersion command.
	private String GetVersion( Bundle b )
	{
		Log.d( TAG, "Got GetVersion" );
		return Float.toString( VERSION );
	}
	
	//Handle the 'SetOnMyReply' command.
	private void SetOnMyReply( Bundle b )
	{
		Log.d( TAG, "Got SetOnMyReply" );
		m_OnMyReply = b.getString("p1");
	}

	//Handle the 'MyFunc' command.
	private void MyFunc( Bundle b )
	{
		Log.d( TAG, "Got MyFunc" );

		//Extract params from 'MyFunc' command.
		String txt = b.getString("p1");
		Log.d( TAG, "  txt = " + txt );
		float num = b.getFloat("p2");
		Log.d( TAG, "  num = " + num );
		boolean boo = b.getBoolean("p3");
		Log.d( TAG, "  bool = " + boo );
	
		//If 'OnReply' callback is set.
		if( m_OnMyReply!=null )
		{
			//Fire callback in script.
			b = new Bundle();
			b.putString( "cmd", m_OnMyReply );
			b.putString( "p1", txt + " World!!" );
			b.putFloat( "p2", num+20 );
			b.putBoolean( "p3", !boo );
			CallScript( b );
		}
	}

	//Handle 'SaveImage' command.
	private void SaveMyImage( Bundle b )
	{
		//Get byte array from bundle.
		byte[] byteArray = b.getByteArray("img");

		//Convert image to bitmap.
		Bitmap bmp = BitmapFactory.decodeByteArray( byteArray, 0, byteArray.length );

		//Save image to sdcard.
		String file = "/sdcard/%PLUGINNAME%.jpg";
		Log.d( TAG, "Saving jpeg " + file );
		try {
			FileOutputStream outStream = new FileOutputStream( file );	
			bmp.compress( Bitmap.CompressFormat.JPEG, 95, outStream );
			outStream.close();		
		} 
		catch(Exception e) {
			Log.e( TAG, "SaveMyImage failed", e );
		} 
	}


} 


