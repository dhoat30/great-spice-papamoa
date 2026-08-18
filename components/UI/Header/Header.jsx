"use client";

import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import Container from "@mui/material/Container";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import MenuIcon from "../Icons/MenuIcon";
import { headerLinks } from "@/utils/headerLinks";

const desktopLinks = headerLinks.filter((item) => !item.isItLogo);
const logoLink = headerLinks.find((item) => item.isItLogo) || {
  url: "/",
  label: "Home",
};
const logoIndex = headerLinks.findIndex((item) => item.isItLogo);
const desktopLeftLinks = desktopLinks.slice(0, Math.max(0, logoIndex));
const desktopRightLinks = desktopLinks.slice(Math.max(0, logoIndex));

const hasActiveChild = (item, pathname) =>
  item.subLinks?.some((subLink) => subLink.url === pathname) || false;

const isExternalTarget = (target) => target === "_blank";

function HeaderLink({ item, pathname, mobile = false, onNavigate, onToggle, open }) {
  const active = pathname === item.url || hasActiveChild(item, pathname);

  if (mobile && item.subLinks?.length) {
    return (
      <li className={`mobile-item ${open ? "open" : ""}`}>
        <button
          type="button"
          className={`mobile-trigger ${active ? "active" : ""}`}
          onClick={() => onToggle(item.label)}
          aria-expanded={open}
        >
          <span>{item.label}</span>
          <KeyboardArrowDownRoundedIcon className="arrow" />
        </button>
        <ul className="mobile-submenu">
          {item.subLinks.map((subLink) => (
            <li key={subLink.url}>
              <Link
                href={subLink.url}
                target={subLink.target}
                className={pathname === subLink.url ? "active" : ""}
                onClick={onNavigate}
              >
                {subLink.label}
              </Link>
            </li>
          ))}
          {item.url !== "#" && (
            <li>
              <Link
                href={item.url}
                target={item.target}
                className={pathname === item.url ? "active" : ""}
                onClick={onNavigate}
              >
                View All
              </Link>
            </li>
          )}
        </ul>
      </li>
    );
  }

  return (
    <li className={`nav-item ${item.subLinks?.length ? "has-submenu" : ""}`}>
      <Link
        href={item.url}
        target={item.target}
        className={`nav-link ${active ? "active" : ""}`}
        onClick={mobile ? onNavigate : undefined}
      >
        <span>{item.label}</span>
        {item.subLinks?.length ? (
          <KeyboardArrowDownRoundedIcon className="arrow" />
        ) : null}
      </Link>
      {item.subLinks?.length ? (
        <ul className={`submenu ${mobile ? "mobile-submenu" : ""}`}>
          {item.subLinks.map((subLink) => (
            <li key={subLink.url}>
              <Link
                href={subLink.url}
                target={subLink.target}
                className={pathname === subLink.url ? "active" : ""}
                onClick={mobile ? onNavigate : undefined}
              >
                {subLink.label}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </li>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState("");
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    let frameId = 0;

    const handleScroll = () => {
      if (frameId) return;

      frameId = window.requestAnimationFrame(() => {
        setScrollPosition(window.scrollY);
        frameId = 0;
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setExpandedMenu("");
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return undefined;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [mobileOpen]);

  const headerPinned = scrollPosition >= 120;

  return (
    <Shell className={headerPinned ? "pinned" : ""}>
      <Container maxWidth="xl" className="header-container">
        <div className="desktop-header">
          <nav aria-label="Primary navigation" className="desktop-nav">
            <ul className="nav-cluster nav-cluster-left">
              {desktopLeftLinks.map((item) => (
                <HeaderLink key={item.label} item={item} pathname={pathname} />
              ))}
            </ul>

            <Link href={logoLink.url} className="logo-link" aria-label="Great Spice home">
              <Image
                src="/logo.png"
                width={96}
                height={37}
                alt={`${process.env.name} Logo`}
                priority
              />
            </Link>

            <ul className="nav-cluster nav-cluster-right">
              {desktopRightLinks.map((item) => (
                <HeaderLink key={item.label} item={item} pathname={pathname} />
              ))}
            </ul>
          </nav>
        </div>

        <div className="mobile-header">
          <button
            type="button"
            className="icon-button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={mobileOpen}
          >
            <MenuIcon />
          </button>
          <Link href={logoLink.url} className="logo-link" aria-label="Great Spice home">
            <Image
              src="/logo.png"
              width={72}
              height={33}
              alt={`${process.env.name} Logo`}
              priority
            />
          </Link>
          <Link
            href="/reservation"
            target="_blank"
            className="reservation-link"
            aria-label="Make reservation"
          >
            Reserve
          </Link>
        </div>
      </Container>

      <div
        className={`mobile-overlay ${mobileOpen ? "visible" : ""}`}
        onClick={() => setMobileOpen(false)}
        aria-hidden={!mobileOpen}
      />

      <aside className={`mobile-panel ${mobileOpen ? "open" : ""}`} aria-hidden={!mobileOpen}>
        <div className="mobile-panel-header">
          <Link href={logoLink.url} className="logo-link" aria-label="Great Spice home">
            <Image
              src="/logo.png"
              width={84}
              height={32}
              alt={`${process.env.name} Logo`}
            />
          </Link>
          <button
            type="button"
            className="icon-button"
            onClick={() => setMobileOpen(false)}
            aria-label="Close navigation menu"
          >
            <CloseIcon />
          </button>
        </div>

        <nav aria-label="Mobile navigation" className="mobile-nav">
          <ul>
            {desktopLinks.map((item) => (
              <HeaderLink
                key={item.label}
                item={item}
                pathname={pathname}
                mobile
                open={expandedMenu === item.label}
                onToggle={(label) =>
                  setExpandedMenu((current) => (current === label ? "" : label))
                }
                onNavigate={() => setMobileOpen(false)}
              />
            ))}
          </ul>
        </nav>

        <div className="mobile-cta">
          <Link
            href="/reservation"
            target="_blank"
            className="mobile-primary-link"
            onClick={() => setMobileOpen(false)}
          >
            Make Reservation
          </Link>
          <Link
            href="https://www.ordermeal.co.nz/great-spice-papamoa-east"
            target="_blank"
            className="mobile-secondary-link"
            onClick={() => setMobileOpen(false)}
          >
            Order Online
          </Link>
        </div>
      </aside>
    </Shell>
  );
}

const Shell = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1200;
  transition:
    background 0.24s ease,
    box-shadow 0.24s ease,
    backdrop-filter 0.24s ease;
  background: transparent;

  &.pinned {
    background: rgba(8, 18, 48, 0.92);
    backdrop-filter: blur(12px);
    box-shadow: 0 10px 30px rgba(5, 10, 25, 0.24);
  }

  .header-container {
    position: relative;
  }

  .desktop-header {
    display: none;
  }

  .mobile-header {
    min-height: 72px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }

  .desktop-nav {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    gap: 24px;
    min-height: 84px;
  }

  .nav-cluster {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
    gap: 4px;
    min-width: 0;
  }

  .nav-cluster-right {
    justify-content: flex-end;
  }

  .logo-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .nav-item {
    position: relative;
    list-style: none;
  }

  .nav-link {
    min-height: 48px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    padding: 12px 16px;
    color: var(--dark-on-surface);
    transition: color 0.2s ease;
  }

  .nav-link span {
    color: inherit;
  }

  .nav-link:hover,
  .nav-link:focus-visible,
  .nav-link.active {
    color: var(--dark-primary);
  }

  .nav-link .arrow {
    transition: transform 0.2s ease;
  }

  .nav-item.has-submenu:hover > .nav-link .arrow,
  .nav-item.has-submenu:focus-within > .nav-link .arrow {
    transform: rotate(180deg);
  }

  .submenu {
    position: absolute;
    top: calc(100% + 8px);
    left: 0;
    min-width: 260px;
    margin: 0;
    padding: 10px 0;
    list-style: none;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba(13, 23, 58, 0.98);
    box-shadow: 0 18px 40px rgba(0, 0, 0, 0.28);
    opacity: 0;
    visibility: hidden;
    transform: translateY(8px);
    transition:
      opacity 0.18s ease,
      transform 0.18s ease,
      visibility 0.18s ease;
    pointer-events: none;
  }

  .submenu a {
    display: block;
    padding: 10px 16px;
    color: rgba(255, 255, 255, 0.84);
  }

  .submenu a:hover,
  .submenu a:focus-visible,
  .submenu a.active {
    color: white;
    background: rgba(255, 255, 255, 0.06);
  }

  .nav-item.has-submenu:hover > .submenu,
  .nav-item.has-submenu:focus-within > .submenu {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
    pointer-events: auto;
  }

  .icon-button {
    width: 44px;
    height: 44px;
    border: 0;
    border-radius: 999px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    color: var(--dark-on-surface);
    cursor: pointer;
  }

  .icon-button svg {
    width: 22px;
    height: 22px;
  }

  .icon-button svg path {
    fill: currentColor;
  }

  .reservation-link {
    min-height: 40px;
    padding: 0 14px;
    border: 1px solid rgba(255, 255, 255, 0.18);
    border-radius: 999px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: var(--dark-on-surface);
    font-size: 0.9rem;
  }

  .mobile-overlay {
    position: fixed;
    inset: 0;
    background: rgba(5, 10, 25, 0.55);
    opacity: 0;
    visibility: hidden;
    transition:
      opacity 0.2s ease,
      visibility 0.2s ease;
  }

  .mobile-overlay.visible {
    opacity: 1;
    visibility: visible;
  }

  .mobile-panel {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: min(360px, 88vw);
    padding: 20px 18px 24px;
    background: var(--dark-surface-container-high);
    transform: translateX(-100%);
    transition: transform 0.22s ease;
    display: flex;
    flex-direction: column;
    gap: 20px;
    overflow-y: auto;
  }

  .mobile-panel.open {
    transform: translateX(0);
  }

  .mobile-panel-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }

  .mobile-nav ul,
  .mobile-submenu {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .mobile-item {
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }

  .mobile-trigger,
  .mobile-nav a {
    width: 100%;
    min-height: 52px;
    padding: 14px 4px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    background: transparent;
    border: 0;
    color: white;
    text-align: left;
    cursor: pointer;
    font: inherit;
  }

  .mobile-trigger.active,
  .mobile-nav a.active {
    color: var(--dark-primary);
  }

  .mobile-trigger .arrow {
    transition: transform 0.2s ease;
  }

  .mobile-item.open .mobile-trigger .arrow {
    transform: rotate(180deg);
  }

  .mobile-submenu {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.2s ease;
  }

  .mobile-item.open .mobile-submenu {
    max-height: 320px;
  }

  .mobile-submenu a {
    min-height: 44px;
    padding: 10px 4px 10px 20px;
    color: rgba(255, 255, 255, 0.76);
  }

  .mobile-cta {
    margin-top: auto;
    display: grid;
    gap: 12px;
  }

  .mobile-primary-link,
  .mobile-secondary-link {
    min-height: 48px;
    padding: 0 16px;
    border-radius: 14px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .mobile-primary-link {
    background: var(--dark-primary);
    color: var(--dark-on-primary);
  }

  .mobile-secondary-link {
    border: 1px solid rgba(255, 255, 255, 0.16);
    color: white;
  }

  @media (min-width: 1200px) {
    .desktop-header {
      display: block;
    }

    .mobile-header,
    .mobile-overlay,
    .mobile-panel {
      display: none;
    }
  }
`;
