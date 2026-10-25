import type { ReactNode } from "react";
type RevealProps={children:ReactNode;className?:string;delay?:number;amount?:number};
export function Reveal({children,className}:RevealProps){return <div className={className}>{children}</div>;}
