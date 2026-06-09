export default function UniversityLogo({ className = "h-10 w-10" }) {
  return (
    <img
      src="/baust-logo.png"
      alt="BAUST Logo"
      className={`${className} shrink-0 object-contain`}
    />
  );
}
