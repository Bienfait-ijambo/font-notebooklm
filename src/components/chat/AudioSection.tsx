import { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Music2,
  X,
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store";
import { closeAudioCard } from "@/store/rightPanelSlice";
import { truncateTitle } from "@/util/truncateTitle";

interface AudioSectionProps {
  audioUrl: string;
  title?: string;
}

const AudioSection = ({ audioUrl, title }: AudioSectionProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { audioCard } = useSelector((state: RootState) => state.rightPanel);

  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // 🔁 Play / Pause toggle
  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.warn("Play failed:", err));
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;


    // Pause any playing audio
    audio.pause();
    audio.currentTime = 0;
    setProgress(0);
    setDuration(0);
    setIsPlaying(false);

    // Reload the new source
    audio.load();


    const handleTimeUpdate = () => {
      setProgress(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 0);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
    };

    // set volume once
    audio.volume = volume;

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    // cleanup
    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [audioUrl, title]); // 👈 empty deps so it attaches once
  useEffect(() => {
    const interval = setInterval(() => {
      if (audioRef.current) setProgress(audioRef.current.currentTime);
    }, 500);
    return () => clearInterval(interval);
  }, []);


  // ⏩ Seek manually
  const handleSeek = (value: number[]) => {
    const audio = audioRef.current;
    if (!audio) return;
    const newTime = value[0];
    audio.currentTime = newTime;
    setProgress(newTime);
  };

  // 🔊 Volume control
  const toggleMute = () => {
    const newVol = volume > 0 ? 0 : 0.8;
    setVolume(newVol);
    if (audioRef.current) audioRef.current.volume = newVol;
  };

  if (!audioCard?.show) return null;

  return (
    <div className="bg-slate-50 border rounded-md p-4 mt-6 shadow-sm animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <Music2 className="text-blue-500" />
          <div className="flex flex-col">
            <span className="font-semibold text-gray-800 text-sm">
              {truncateTitle(title, 30) || "Now Playing"}
            </span>
            <span className="text-xs text-gray-500">Audio Overview</span>
          </div>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => dispatch(closeAudioCard())}
          className="p-1"
        >
          <X size={16} />
        </Button>
      </div>

      {/* Audio Element */}
      <audio ref={audioRef} src={audioUrl} preload="auto" />


      {/* Controls */}
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

        <Button variant="ghost" size="icon" onClick={toggleMute}>
          {volume > 0 ? <Volume2 /> : <VolumeX />}
        </Button>
      </div>

      {/* Time Info */}
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>{formatTime(progress)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
};

// 🕒 Format seconds into mm:ss
function formatTime(time: number) {
  if (isNaN(time)) return "0:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${seconds}`;
}




export default AudioSection;
