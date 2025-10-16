import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Music2, X, } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store";
import { closeAudioCard } from "@/store/rightPanelSlice";

interface AudioSectionProps {
  audioUrl: string; // URL of the audio file
  title?: string;
}

const AudioSection = ({ audioUrl, title }: AudioSectionProps) => {



  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Handle play/pause toggle
  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Update progress
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => setProgress(audio.currentTime);
    const setAudioDuration = () => setDuration(audio.duration);

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", setAudioDuration);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", setAudioDuration);
    };
  }, []);

  // Seek through the track
  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
      setProgress(value[0]);
    }
  };

  // Volume control
  const handleVolume = (value: number[]) => {
    const vol = value[0];
    setVolume(vol);
    if (audioRef.current) audioRef.current.volume = vol;
  };

  return (

    <div className="bg-slate-50 border rounded-md p-4 mt-6 shadow-sm animate-fadeIn">
       {/* Header with close button */}

  <div className="flex items-center justify-between mb-3">
    <div className="flex items-center gap-3">
      <Music2 className="text-blue-500" />
      <div className="flex flex-col">
        <span className="font-semibold text-gray-800 text-sm">
          {title || "Now Playing"}
        </span>
        <span className="text-xs text-gray-500">Audio Overview</span>
      </div>
    </div>

    {/* Close button */}
    <Button
      variant="ghost"
      size="icon"
      onClick={() =>dispatch(closeAudioCard())} // handle hide in parent
      className="p-1"
    >
      <X size={16} />
    </Button>
  </div>
      <audio ref={audioRef} src={audioUrl} preload="metadata" />

      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="icon"
          onClick={togglePlay}
          className="rounded-full border-gray-300"
        >
          {isPlaying ? <Pause /> : <Play />}
        </Button>

        <div className="flex-1">
          <Slider
            value={[progress]}
            max={duration || 1}
            step={0.1}
            onValueChange={handleSeek}
          />
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setVolume(volume > 0 ? 0 : 0.8)}
        >
          {volume > 0 ? <Volume2 /> : <VolumeX />}
        </Button>
      </div>

      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>{formatTime(progress)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
};

function formatTime(time: number) {
  if (isNaN(time)) return "0:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${seconds}`;
}

export default AudioSection;
