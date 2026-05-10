/**
 * S1 — Home page.
 * Source: Pilot Runtime Spec v2 §C.6
 *
 * Lists 5 Gold scenarios as entry tiles.
 * No SOS button. No emotional state selector.
 */

import HomeCardList from "../components/HomeCardList";

export default function HomePage() {
  return (
    <div dir="rtl" className="home-page">
      <header className="home-header">
        <h1 className="home-heading">רגע לפני</h1>
      </header>
      <HomeCardList />
    </div>
  );
}
