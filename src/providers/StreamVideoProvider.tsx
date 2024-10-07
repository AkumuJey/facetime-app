"use client";

import { StreamVideo, StreamVideoClient } from "@stream-io/video-react-sdk";
import { useState, ReactNode, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { tokenProvider } from "@/actions/stream.actions";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY!;

const StreamVideoProvider = ({ children }: { children: ReactNode }) => {
  const [videoClient, setVideoClient] = useState<StreamVideoClient>();

  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (!isLoaded || !user || !apiKey) return;
    if (!tokenProvider) return;
    const client = new StreamVideoClient({
      apiKey,
      user: {
        id: user?.id,
        name: user?.primaryEmailAddress?.emailAddress,
        image: user?.imageUrl,
      },
      tokenProvider, //👉🏻 pending creation
    });

    setVideoClient(client);
  }, [user, isLoaded]);

  if (!videoClient) return null;

  return <StreamVideo client={videoClient}>{children}</StreamVideo>;
};

export default StreamVideoProvider;
