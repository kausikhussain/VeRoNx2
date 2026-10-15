import Link from "next/link";

export function Footer() {
  return (
    <footer>
      <div>
        <div className="wordmark">VeRoN</div>
        <p>Virtual styling studio and modern luxury menswear.</p>
      </div>
      <div>
        <b>Shop</b>
        <Link href="/shop">Shop all</Link>
        <Link href="/new-arrivals">New arrivals</Link>
        <Link href="/look/aw26">Collections</Link>
        <Link href="/sale">Sale</Link>
      </div>
      <div>
        <b>Customer care</b>
        <a>Shipping &amp; returns</a>
        <a>Contact</a>
        <a>Care guide</a>
        <a>Size guide</a>
      </div>
      <div>
        <b>Journal</b>
        <p>Seasonal edits and atelier stories, delivered quietly.</p>
        <div className="email">
          <input placeholder="Your email address" />
          <button aria-label="Subscribe">→</button>
        </div>
      </div>
    </footer>
  );
}
