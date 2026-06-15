export default function ChildSwitcher({ childrenList = [], selectedChildId, onSelectChild, compact = false }) {
  return (
    <section className={`child-switcher${compact ? " compact" : ""}`} aria-label="Switch child">
      <div className="child-switcher-head">
        <div>
          <p className="mini-eyebrow">Viewing child</p>
          <p className="serif child-switcher-title">Your children</p>
        </div>
        <span className="tag tag-sky">{childrenList.length} profiles</span>
      </div>

      {childrenList.length === 0 ? (
        <div className="empty-state compact align-left">
          <p className="serif">No child profile</p>
          <span>The school admin has not added a child profile yet.</span>
        </div>
      ) : (
        <div className="child-tabs" role="tablist" aria-label="Children">
          {childrenList.map(child => {
            const active = selectedChildId === child.id;
            return (
              <button
                key={child.id}
                type="button"
                role="tab"
                aria-selected={active}
                className={`child-tab${active ? " active" : ""}`}
                onClick={() => onSelectChild(child.id)}
              >
                <span className="child-tab-avatar" style={{background: child.accent || "#FDE8D8"}} aria-hidden="true">{child.avatar || child.shortName?.slice(0, 1) || "S"}</span>
                <span className="child-tab-copy">
                  <span className="child-tab-name">{child.shortName || child.name}</span>
                  <span className="child-tab-meta">{child.className || "No class"}</span>
                </span>
                {active && <span className="child-tab-dot" aria-hidden="true" />}
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
}
