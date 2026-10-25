export function WorkingTools() {
  return (
    <div className="tools-strip" aria-label="Working tools">
      {[
        ["robloxstudio", "Roblox Studio"],
        ["lua", "Luau"],
        ["git", "Git"],
        ["github", "GitHub"],
      ].map(([slug, name]) => (
        <span key={slug}>
          <span
            className="tool-logo"
            aria-hidden
            style={{
              maskImage: `url(/icons/tools/${slug}.svg)`,
              WebkitMaskImage: `url(/icons/tools/${slug}.svg)`,
            }}
          />
          {name}
        </span>
      ))}
    </div>
  );
}
