
/*
	%PLUGINNAME% DroidScript Plugin class.
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
	
} 

