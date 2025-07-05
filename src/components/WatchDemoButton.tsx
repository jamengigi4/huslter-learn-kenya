
import React from 'react';
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

const WatchDemoButton = () => {
  const openYouTubeVideo = () => {
    window.open('https://youtu.be/Mbs9vKkcqVM?si=w0qpLa_BYWZbSZse', '_blank');
  };

  return (
    <Button 
      variant="outline" 
      size="xl" 
      className="bg-white/10 border-white/30 text-white hover:bg-white/20"
      onClick={openYouTubeVideo}
    >
      <Play className="mr-2 h-5 w-5" />
      Watch Demo
    </Button>
  );
};

export default WatchDemoButton;
