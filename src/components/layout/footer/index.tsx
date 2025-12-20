import {
  AiFillLinkedin,
  AiOutlineGithub,
  AiOutlineMail,
  AiOutlineTwitter,
} from "react-icons/ai";

export default function Footer() {
  return (
    <footer className="footer py-6 px-4" id="footer">
      <p className="text-center mb-4">
        Made by{" "}
        <a href="https://moyinadelowo.com" target="_blank" rel="noreferrer">
          Moyinoluwa Adelowo
        </a>
      </p>
      <nav
        className="flex items-center justify-center gap-4 socials"
        aria-labelledby="footer-navigation"
      >
        <a
          href="https://www.linkedin.com/in/moyinoluwa-adelowo/"
          target="_blank"
          rel="noreferrer"
        >
          <AiFillLinkedin className="icons" />
        </a>
        <a
          href="https://twitter.com/MoyinAdelowo"
          target="_blank"
          rel="noreferrer"
        >
          <AiOutlineTwitter className="icons" />
        </a>
        <a
          href="https://github.com/moyinoluwa-10"
          target="_blank"
          rel="noreferrer"
        >
          <AiOutlineGithub className="icons" />
        </a>
        <a
          href="mailto:moyinadelowo@gmail.com"
          target="_blank"
          rel="noreferrer"
        >
          <AiOutlineMail className="icons" />
        </a>
      </nav>
    </footer>
  );
}
