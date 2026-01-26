"use client";

import React from "react";
import CircularGalleryJs from "./CircularGallery.jsx";

export type CircularGalleryItem = {
  image: string;
  text: string;
  trackId?: string;
  spotifyUrl?: string;
  [key: string]: any;
};

export type CircularGalleryHandle = {
  scrollBy: (steps: number) => void;
  snap: () => void;
  getActiveItem: () => CircularGalleryItem | null;
};

export type CircularGalleryProps = {
  items: CircularGalleryItem[];
  bend?: number;
  textColor?: string;
  borderRadius?: number;
  font?: string;
  scrollSpeed?: number;
  scrollEase?: number;
};

const CircularGallery = React.forwardRef<CircularGalleryHandle, CircularGalleryProps>(
  (props, ref) => {
    // El componente real está en JSX, por eso este "bridge".
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return <CircularGalleryJs {...props} ref={ref} />;
  }
);

CircularGallery.displayName = "CircularGallery";

export default CircularGallery;
