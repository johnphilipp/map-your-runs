import { Fragment } from "react";
import Link from "next/link";
import { Popover, Transition } from "@headlessui/react";
import clsx from "clsx";
import { Container } from "../utils/Container";
import { Logo } from "../utils/Logo";
import { NavLink } from "../utils/NavLink";

function MobileNavLink({ href, children }) {
  return (
    <Popover.Button as={Link} href={href} className="block w-full p-2">
      {children}
    </Popover.Button>
  );
}

function MobileNavIcon({ open }) {
  return (
    <svg
      aria-hidden="true"
      className="h-3.5 w-3.5 overflow-visible stroke-slate-700"
      fill="none"
      strokeWidth={2}
      strokeLinecap="round"
    >
      <path
        d="M0 1H14M0 7H14M0 13H14"
        className={clsx(
          "origin-center transition",
          open && "scale-90 opacity-0"
        )}
      />
      <path
        d="M2 2L12 12M12 2L2 12"
        className={clsx(
          "origin-center transition",
          !open && "scale-90 opacity-0"
        )}
      />
    </svg>
  );
}

function MobileNavigation() {
  return (
    <Popover>
      <Popover.Button
        className="relative z-10 flex h-8 w-8 items-center justify-center [&:not(:focus-visible)]:focus:outline-none"
        aria-label="Toggle Navigation"
      >
        {({ open }) => <MobileNavIcon open={open} />}
      </Popover.Button>
      <Transition.Root>
        <Transition.Child
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="duration-150 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Popover.Overlay className="fixed inset-0 bg-slate-300/50" />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            as="div"
            className="absolute inset-x-0 top-full mt-4 flex origin-top flex-col rounded-2xl bg-white p-4 text-lg tracking-tight text-slate-900 shadow-xl ring-1 ring-slate-900/5"
          >
            <MobileNavLink href="/dashboard">Dashboard</MobileNavLink>
            <MobileNavLink href="/heatmap">Heatmap</MobileNavLink>
            <MobileNavLink href="/collage">Collage</MobileNavLink>
          </Popover.Panel>
        </Transition.Child>
      </Transition.Root>
    </Popover>
  );
}

export function Header() {
  return (
    <header className="py-10">
      <Container>
        <nav className="relative z-50 flex justify-between">
          <div className="flex items-center md:gap-x-12">
            <div className="flex items-center gap-2">
              <Link href="/" aria-label="Home">
                <Logo className="-mt-4 h-12 w-auto drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)]" />
              </Link>
              <a
                href="/"
                className="-mt-2 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)] font-extrabold text-transparent text-3xl bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-600"
              >
                MapYourRuns
              </a>
            </div>
            <div className="hidden md:flex md:gap-x-6">
              <NavLink href="/dashboard">Dashboard</NavLink>
              <NavLink href="/heatmap">Heatmap</NavLink>
              <NavLink href="/collage">Collage</NavLink>
            </div>
          </div>
          <div className="-mr-1 md:hidden">
            <MobileNavigation />
          </div>
        </nav>
        <hr className="mt-4" />
      </Container>
    </header>
  );
}
