import React from "react";

const Footer = () => {
  return (
    <footer className="border-t border-neutral-200 py-8 mt-16">
      <div className="max-w-5xl mx-auto px-4 text-center text-sm text-neutral-400">
        © {new Date().getFullYear()} obslog ·{" "}
        <a
          href="https://github.com/mulgko/obslog"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-neutral-600 transition-colors"
        >
          GitHub
        </a>
      </div>
    </footer>
  );
};

export default Footer;
