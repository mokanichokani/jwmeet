import { CallControls, CallingState, SpeakerLayout, StreamCall, StreamVideo, StreamVideoClient, useCall, useCallStateHooks, User } from '@stream-io/video-react-sdk';
import {  StreamTheme ,  ParticipantView, StreamVideoParticipant} from '@stream-io/video-react-sdk';
const apiKey = 'mmhfdzb5evj2';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiQmliX0ZvcnR1bmEiLCJpc3MiOiJodHRwczovL3Byb250by5nZXRzdHJlYW0uaW8iLCJzdWIiOiJ1c2VyL0JpYl9Gb3J0dW5hIiwiaWF0IjoxNzIzOTg1Nzg2LCJleHAiOjE3MjQ1OTA1OTF9.wo7vbv-I5oyuYTr4mK2gsi3Kk5oEODG3CiMjdBOsnss';
const userId = 'Bib_Fortuna';
const callId = 'xnaHHpatNX5T';

const user: User = {
  id: userId,
  name: 'Oliver',
  image: 'https://getstream.io/random_svg/?id=oliver&name=Oliver',
};

const client = new StreamVideoClient({ apiKey, user, token });
const call = client.call('default', callId);
call.join({ create: true });

export default function App() {
  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <MyUILayout />
      </StreamCall>
    </StreamVideo>
  );
}

export const MyUILayout = () => {
  const {
    useCallCallingState
    // ... other hooks
  } = useCallStateHooks();

  const callingState = useCallCallingState();

  if (callingState !== CallingState.JOINED) {
    return <div>Loading...</div>;
  }

  return (
    <StreamTheme>
      <SpeakerLayout participantsBarPosition='bottom'/>
      <CallControls/>
    </StreamTheme>
  );
};


export const MyParticipantList = (props: { participants: StreamVideoParticipant[] }) => {
  const { participants } = props;
  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: '8px' }}>
      {participants.map((participant) => (
        <ParticipantView participant={participant} key={participant.sessionId} />
      ))}
    </div>
  );
};


export const MyFloatingLocalParticipant = (props: { participant?: StreamVideoParticipant }) => {
  const { participant } = props;
  return (
    <div
      style={{
        position: 'absolute',
        top: '15px',
        left: '15px',
        width: '240px',
        height: '135px',
        boxShadow: 'rgba(0, 0, 0, 0.1) 0px 0px 10px 3px',
        borderRadius: '12px',
      }}
    >
      {participant && <ParticipantView muteAudio participant={participant} />}
    </div>
  );
};