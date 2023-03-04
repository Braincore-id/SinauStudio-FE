import { JitsiMeeting } from "@jitsi/react-sdk";
import React, { useRef, useEffect, useState } from "react";
import Webcam from "react-webcam";
import * as cam from "@mediapipe/camera_utils";
import { FaceMesh } from "@mediapipe/face_mesh";
import * as Facemesh from "@mediapipe/face_mesh";
import "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl";
import db from "./Firebase";
import { doc, updateDoc, setDoc } from "@firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import jwt_decode from "jwt-decode";

const SinauMeet = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  var camera = null;
  const connect = window.drawConnectors;
  const [usingExternalCam, setUsingExternalCam] = useState(false);
  const navigate = useNavigate();
  const [cookies] = useCookies("token");
  const [isLoading, setIsLoading] = useState(false);

  const euclideanDistance = (point1, point2) => {
    const a = point1.x - point2.x;
    const b = point1.y - point2.y;
    const c = Math.sqrt(a * a + b * b);
    return c;
  };

  const checkCloseEye = (distanceLeft, distanceRight) => {
    if (distanceLeft < 0.01 || distanceRight < 0.01) return true;
    return false;
  };

  let scoreSecond = [];

  const JWTDecode = (token) => {
    return jwt_decode(token);
  };

  const getAverage = async () => {
    try {
      const userInfo = JWTDecode(cookies.token);
      const endSession = document.querySelector(".endsession");
      endSession.textContent = `Direct to Home with 5 seconds.`;

      const avg = scoreSecond.reduce((a, b) => a + b, 0) / scoreSecond.length;

      await setDoc(doc(db, "SinauStudio", userInfo.name), {
        id: userInfo.id,
        name: userInfo.name,
      });

      for (let i = 0; i < scoreSecond.length; i++) {
        const docRef = await doc(db, "SinauStudio", userInfo.name);
        const data = {
          [i + 1]: {
            score: scoreSecond[i],
            second: i + 1,
          },
        };
        updateDoc(docRef, data);

        setIsLoading(true);

        setTimeout(() => {
          navigate("/Home");
        }, 5000);
      }
    } catch (e) {
      console.log(e);
    }
  };

  function onResults(results) {
    //Setting height and width of canvas
    canvasRef.current.width = webcamRef.current.video.videoWidth;
    canvasRef.current.height = webcamRef.current.video.videoHeight;

    const canvasElement = canvasRef.current;
    const canvasCtx = canvasElement.getContext("2d");
    canvasCtx.save();

    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    canvasCtx.drawImage(
      results.image,
      0,
      0,
      canvasElement.width,
      canvasElement.height
    );

    //console.log(Facemesh.FACEMESH_FACE_OVAL);

    if (results.multiFaceLandmarks) {
      for (const landmarks of results.multiFaceLandmarks) {
        let arr = [];
        arr.push(landmarks[159].z);
        arr.push(landmarks[145].z);
        arr.push(landmarks[386].z);
        arr.push(landmarks[374].z);

        let studentFocus = true;

        for (let i = 0; i < arr.length; i++) {
          // console.log(arr[i]);
          if (arr[i] < -0.027 || arr[i] > 0.027) {
            studentFocus = false;
          }
        }

        // Get Point on left Eye
        const pointTopLeft = landmarks[159];
        const pointBottomLeft = landmarks[145];
        const distanceLeft = euclideanDistance(pointTopLeft, pointBottomLeft);

        // Get Point on right Eye
        const pointTopRight = landmarks[386];
        const pointBottomRight = landmarks[374];
        const distance_right = euclideanDistance(
          pointTopRight,
          pointBottomRight
        );

        const close_eyes = checkCloseEye(distanceLeft, distance_right);

        if (close_eyes) studentFocus = false;

        if (studentFocus) {
          scoreSecond.push(10);
        } else {
          scoreSecond.push(0);
        }

        connect(canvasCtx, landmarks, Facemesh.FACEMESH_RIGHT_EYE, {
          color: "#30FF30",
          lineWidth: 1,
        });
        connect(canvasCtx, landmarks, Facemesh.FACEMESH_RIGHT_EYEBROW, {
          color: "#30FF30",
          lineWidth: 1,
        });
        connect(canvasCtx, landmarks, Facemesh.FACEMESH_RIGHT_IRIS, {
          color: "#30FF30",
          lineWidth: 1,
        });
        connect(canvasCtx, landmarks, Facemesh.FACEMESH_LEFT_EYE, {
          color: "#30FF30",
          lineWidth: 1,
        });
        connect(canvasCtx, landmarks, Facemesh.FACEMESH_LEFT_EYEBROW, {
          color: "#30FF30",
          lineWidth: 1,
        });
        connect(canvasCtx, landmarks, Facemesh.FACEMESH_LEFT_IRIS, {
          color: "#30FF30",
          lineWidth: 1,
        });
        connect(canvasCtx, landmarks, Facemesh.FACEMESH_FACE_OVAL, {
          color: "#E0E0E0",
          lineWidth: 1,
        });
        connect(canvasCtx, landmarks, Facemesh.FACEMESH_LIPS, {
          color: "#FF3030",
          lineWidth: 1,
        });
      }
    }
  }

  useEffect(() => {
    const faceMesh = new FaceMesh({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
      },
    });

    faceMesh.setOptions({
      maxNumFaces: 1,
      refineLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
      selfieMode: true,
    });

    faceMesh.onResults(onResults);

    if (typeof webcamRef !== "undefined" && webcamRef !== null) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      const videoConstraints = {
        // untuk memakai webcam external
        facingMode: usingExternalCam ? "user" : "environment",
        width: 1280,
        height: 720, // ganti deviceID or URL dengan nilai yang sesuai
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
      camera = new cam.Camera(webcamRef.current.video, {
        video: videoConstraints,
        onFrame: async () => {
          await faceMesh.send({
            image: webcamRef.current.video,
          });
        },
        width: 1280,
        height: 720,
      });
    }
    camera.start();
  }, []);

  return (
    <>
      <div className=" bg-black">
        <JitsiMeeting
          domain="meet.jit.si"
          roomName="Matematika Wajib"
          configOverwrite={{
            startWithAudioMuted: true,
            disableModeratorIndicator: true,
            startScreenSharing: true,
            enableEmailInStats: false,
          }}
          interfaceConfigOverwrite={{
            DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
          }}
          userInfo={{
            displayName: "",
          }}
          onApiReady={(externalApi) => {
            // here you can attach custom event listeners to the Jitsi Meet External API
            // you can also store it locally to execute commands
          }}
          getIFrameRef={(iframeRef) => {
            iframeRef.style.height = "600px";
          }}
        />
        <Webcam
          ref={webcamRef}
          style={{
            position: "absolute",
            marginRight: "auto",
            marginLeft: "auto",
            left: "0",
            right: "0",
            textAlign: "center",
            zIndex: "9",
            width: 640,
            height: 480,
          }}
          hidden
        />
        <canvas
          hidden
          ref={canvasRef}
          style={{
            position: "absolute",
            marginRight: "auto",
            marginLeft: "auto",
            left: "0",
            right: "0",
            textAlign: "center",
            zIndex: "9",
            width: 640,
            height: 480,
          }}
        ></canvas>
        <div className=" flex justify-center mt-5 mb-5">
          <button
            onClick={getAverage}
            type=""
            className="endsession bg-blue-400 p-4 rounded-xl text-white"
          >
            End Session
          </button>
        </div>
        <div className=" flex">
          <h1 className="average text-4xl text-black"></h1>
        </div>
      </div>
    </>
  );
};

export default SinauMeet;
