import type { CSSProperties } from "react";
import { fighters } from "@/data/fighters";

export function FighterSprite({
  fighter = 0,
  action = "run",
  size = 128,
  moving = true,
}: {
  fighter?: number;
  action?: "run" | "idle" | "attack1" | "attack2" | "portrait";
  size?: number;
  moving?: boolean;
}) {
  const item = fighters[fighter % fighters.length];
  const frames = item.frames[action];
  return (
    <span
      className="fighter-sprite"
      aria-hidden="true"
      data-moving={moving}
      style={
        {
          width: size,
          height: size,
          "--sprite-end": `-${size * frames}px`,
          "--sprite-frames": frames,
        } as CSSProperties
      }
    >
      <img
        src={`/media/fighters/${item.id}-${action}.webp`}
        alt=""
        width={128 * frames}
        height={128}
        style={{ width: size * frames, height: size }}
      />
    </span>
  );
}
