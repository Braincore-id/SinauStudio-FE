// Import required modules
import React, { useState, useEffect } from 'react';
import { JitsiMeeting } from '@jitsi/react-sdk';

function SinauMeet(props) {
  const [displayName, setDisplayName] = useState(''); // Display name of the user
  const [roomName, setRoomName] = useState(''); // Room name
  const [password, setPassword] = useState(''); // Password for the room
  const [isMeetingStarted, setIsMeetingStarted] = useState(false); // Check if the meeting has started

  useEffect(() => {
    // Set the display name and room name
    setDisplayName(props.displayName);
    setRoomName(props.roomName);
    setPassword(props.password);
    setIsMeetingStarted(true);
  }, [props.displayName, props.roomName, props.password]);

  const options = {
    roomName: roomName, // Name of the room to join
    displayName: displayName, // Display name of the user
    password: password // Password for the room
  };

  const interfaceConfig = {
    filmStripOnly: false,
    SHOW_WATERMARK_FOR_GUESTS: false,
    DEFAULT_REMOTE_DISPLAY_NAME: 'Guest',
    JITSI_WATERMARK_LINK: 'https://your-link.com',
    SHOW_BRAND_WATERMARK: false,
    TOOLBAR_BUTTONS: [
      'microphone', 'camera', 'closedcaptions', 'desktop', 
      'fullscreen', 'fodeviceselection', 'hangup', 'profile', 
      'chat', 'recording', 'livestreaming', 'etherpad', 'sharedvideo', 
      'settings', 'raisehand', 'videoquality', 'filmstrip', 'invite', 
      'feedback', 'stats', 'shortcuts', 'tileview', 'download', 'help', 
      'mute-everyone', 'e2ee'
    ],
    DISABLE_VIDEO_BACKGROUND: true,
    SHOW_JITSI_WATERMARK: false
  };

  return (
    <div>
      { isMeetingStarted ? (
       <JitsiMeeting
       configOverwrite = {{
           startWithAudioMuted: true,
           hiddenPremeetingButtons: ['microphone']
       }}
       roomName = { 'YOUR_CUSTOM_ROOM_NAME' }
       getIFrameRef = { (iframeRef) => { iframeRef.style.height = '800px';} }
   />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default SinauMeet;