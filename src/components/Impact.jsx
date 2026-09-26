export default function Impact({ items }) {
  return (
    <section className="impact" aria-label="Selected results">
      <div className="container">
        <ul className="impact-grid">
          {items.map((item) => (
            <li key={item.label}>
              <span className="impact-value">{item.value}</span>
              <span className="impact-label">{item.label}</span>
              <span className="impact-context">{item.context}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
