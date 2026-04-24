export function Footer() {
  return (
    <footer className="border-t border-primary/20 pt-8 mt-12">
      <div className="flex flex-col items-center gap-6">
        <div className="flex flex-wrap justify-center gap-6 text-xs font-['JetBrains_Mono']">
          <a
            href={`mailto:${process.env.MY_EMAIL}`}
            className="text-gray-400 hover:text-primary transition-colors"
          >
            email
          </a>

          <a
            href={process.env.MY_GITHUB}
            target="_blank"
            rel="noreferrer"
            className="text-gray-400 hover:text-primary transition-colors"
          >
            github
          </a>

          <a
            href={process.env.MY_TG}
            target="_blank"
            rel="noreferrer"
            className="text-gray-400 hover:text-primary transition-colors"
          >
            telegram
          </a>
        </div>
      </div>
    </footer>
  );
}
