import { JitsiMeeting } from "@jitsi/react-sdk";
import React, { useRef, useState, useEffect } from "react";
import { FaceMesh } from "@mediapipe/drawing_utils";

import Webcam from "react-webcam";
import * as cam from "@mediapipe/camera_utils";

import * as Facemesh from "@mediapipe/face_mesh";
import "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl";

const SinauMeet = () => {


  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [jitsiRoom, setJitsiRoom] = useState('');
 


  const handleVideoLoadedData = () => {
    setIsVideoLoaded(true);
  };

  const handleJitsiMeetStatusChanged = (status) => {
    console.log(`Jitsi Meet status changed to: ${status}`);
  };

  const handleJitsiMeetError = (error) => {
    console.log(`Jitsi Meet error: ${error}`);
  };

  const handleJitsiMeetReady = () => {
    console.log('Jitsi Meet is ready');
  };

  const handleJitsiMeetVideoConferenceJoined = (response) => {
    console.log(`Jitsi Meet video conference joined: ${response}`);
  };

  const handleJitsiMeetVideoConferenceLeft = (response) => {
    console.log(`Jitsi Meet video conference left: ${response}`);
  };

  const handleJitsiMeetVideoConferenceJoinedError = (error) => {
    console.log(`Jitsi Meet video conference joined error: ${error}`);
  };



  const apiRef = useRef();

  return (
    <>
    <div>

      <JitsiMeeting
        domain="meet.jit.si"
        roomName="NAMA SESUAI ABSEN"
        configOverwrite={{
          startWithAudioMuted: true,
          disableModeratorIndicator: true,
          startScreenSharing: true,
          enableEmailInStats: false,
          enableLobbyChat: true,
          enableFaceCentering: true,
          enableFaceExpressionsDetection: true,
          enableDisplayFaceExpressions: true,
          enableRTCStats: true,
          aceCenteringThreshold: 10,
          captureInterval: 1000,
        }}
        interfaceConfigOverwrite={{
          DISPLAY_WELCOME_PAGE_CONTENT: true,
          DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
          SHOW_CHROME_EXTENSION_BANNER: false,

          SHOW_JITSI_WATERMARK: false,
          SHOW_POWERED_BY: false,
          SHOW_PROMOTIONAL_CLOSE_PAGE: false,
        }}
        userInfo={{
          displayName: "YOUR_USERNAME",
        }}
        onApiReady={(externalApi) => {
          externalApi.executeCommands("toggleSubtitles");
        }}
        getIFrameRef={(iframeRef) => {
          iframeRef.style.height = "800px";
        }}
        onMeetingStatusChanged={handleJitsiMeetStatusChanged}
        onError={handleJitsiMeetError}
        onReady={handleJitsiMeetReady}
        onVideoConferenceJoined={handleJitsiMeetVideoConferenceJoined}
      >
        <FaceMesh />
      </JitsiMeeting>
    </div>
    </>
  );
};
export default SinauMeet;
