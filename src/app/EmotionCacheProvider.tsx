"use client";
import * as React from "react";
import { CacheProvider } from "@emotion/react";
import createEmotionCache from "./createEmotion";

const clientSideEmotionCache = createEmotionCache();

export default function EmotionCacheProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <CacheProvider value={clientSideEmotionCache}>{children}</CacheProvider>;
}
