"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, CloseIcon, MenuIcon } from "@/components/ui/icons";
import { site } from "@/data/site";
import { ThemeToggle } from "@/components/theme-controls";
const items = [{id:"work",label:"Work"},{id:"certificates",label:"Certificates"},{id:"skills",label:"Skills"},{id:"about",label:"About"}];
export function Navigation() {
 const [open,setOpen]=useState(false); const button=useRef<HTMLButtonElement>(null);
 useEffect(()=>{const close=(e:KeyboardEvent)=>{if(e.key==="Escape"&&open){setOpen(false);button.current?.focus();}};window.addEventListener("keydown",close);return()=>window.removeEventListener("keydown",close);},[open]);
 return <header className="site-nav-wrap"><nav className="site-nav" aria-label="Primary navigation">
 <a className="brand" href="#top"><span className="brand-mark" aria-hidden="true">AM</span><span className="brand-name">{site.name}</span></a>
 <div className="nav-links">{items.map(i=><a className="nav-link" href={`#${i.id}`} key={i.id}>{i.label}</a>)}</div>
 <div className="nav-actions"><ThemeToggle /><a className="nav-cta" href={site.github} target="_blank" rel="noopener noreferrer">GitHub <ArrowUpRight /><span className="sr-only"> (opens in a new tab)</span></a></div>
 <button ref={button} type="button" className="menu-button" aria-controls="mobile-navigation" aria-expanded={open} aria-label={open?"Close navigation menu":"Open navigation menu"} onClick={()=>setOpen(!open)}>{open?<CloseIcon />:<MenuIcon />}</button>
 </nav><nav id="mobile-navigation" aria-label="Mobile navigation" className="mobile-nav" hidden={!open}>{items.map(i=><a key={i.id} href={`#${i.id}`} onClick={()=>setOpen(false)}>{i.label}</a>)}</nav></header>;
}
