"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className={"nav" + (open ? " open" : "")}>
      <div className="wrap nav-in">
        <Link className="brand" href="/" onClick={close}>
          <span className="em">AE</span>
          <span>
            AvaElis Health<span className="sub">Longevity Clinic</span>
          </span>
        </Link>
        <nav className="lk">
          <Link href="/#services" onClick={close}>Services</Link>
          <Link href="/#approach" onClick={close}>The Science</Link>
          <Link href="/#index" onClick={close}>Evidence</Link>
          <Link href="/about" onClick={close}>Dr. Danny</Link>
          <Link href="/podcast" onClick={close}>Podcast</Link>
          <Link href="/writing" onClick={close}>Writing</Link>
          <Link href="/#enquire" className="navbook" onClick={close}>
            Book a consultation
          </Link>
        </nav>
        <button
          className="navtoggle"
          type="button"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          ☰
        </button>
        <Link href="/#enquire" className="nbtn" onClick={close}>
          Book a consultation
        </Link>
      </div>
    </header>
  );
}
