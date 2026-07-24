import type { Metadata } from "next";
import Link from "next/link";
import { AppleNav, Section } from "@/components/apple/kit";
import s from "@/components/apple/apple.module.css";

export const metadata: Metadata = {
  title: "Why Lime matters — the case in six steps",
  description:
    "Half of adults say they are lonely. We spend less than half the time with friends that we did twenty years ago. Online dating became the default and left people worn out. The case for assisting real-world social life, with sources.",
};

/* Every number on this page is sourced and linked. House rule: no number
   without a citation. Copy follows the plain-voice rules: short sentences,
   one idea each, no em dashes. */

function BarPair({
  title, aLabel, aValue, bLabel, bValue, max, unit, source, href,
}: {
  title: string; aLabel: string; aValue: number; bLabel: string; bValue: number;
  max: number; unit: string; source: string; href: string;
}) {
  const w = (v: number) => Math.round((v / max) * 100);
  return (
    <div className={s.chartCard}>
      <p className={s.chartTitle}>{title}</p>
      <svg viewBox="0 0 400 96" role="img" aria-label={title} style={{ width: "100%", height: "auto" }}>
        <text x="0" y="16" fontSize="13" fill="#6e6e73">{aLabel}</text>
        <rect x="0" y="24" width={w(aValue) * 4} height="16" rx="8" fill="#0071e3" />
        <text x={w(aValue) * 4 + 8} y="37" fontSize="13" fontWeight="600" fill="#1d1d1f">{aValue}{unit}</text>
        <text x="0" y="66" fontSize="13" fill="#6e6e73">{bLabel}</text>
        <rect x="0" y="74" width={w(bValue) * 4} height="16" rx="8" fill="#b3261e" />
        <text x={w(bValue) * 4 + 8} y="87" fontSize="13" fontWeight="600" fill="#1d1d1f">{bValue}{unit}</text>
      </svg>
      <p className={s.chartSource}>Source: <a href={href} target="_blank" rel="noreferrer">{source}</a></p>
    </div>
  );
}

function HalfDonut({ title, source, href }: { title: string; source: string; href: string }) {
  return (
    <div className={s.chartCard}>
      <p className={s.chartTitle}>{title}</p>
      <svg viewBox="0 0 200 110" role="img" aria-label={title} style={{ width: "60%", height: "auto", display: "block", margin: "0 auto" }}>
        <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="#e8e8ed" strokeWidth="26" strokeLinecap="round" />
        <path d="M 20 100 A 80 80 0 0 1 100 20" fill="none" stroke="#0071e3" strokeWidth="26" strokeLinecap="round" />
        <text x="100" y="86" textAnchor="middle" fontSize="30" fontWeight="700" fill="#1d1d1f">1 in 2</text>
        <text x="100" y="104" textAnchor="middle" fontSize="11" fill="#6e6e73">U.S. adults</text>
      </svg>
      <p className={s.chartSource}>Source: <a href={href} target="_blank" rel="noreferrer">{source}</a></p>
    </div>
  );
}

function SignalTable() {
  const rows: [string, string, string][] = [
    ["Scent (immune-system matching)", "Wedekind 1995, Proc. R. Soc. B", "Absent"],
    ["Micro-expressions, mirrored in 30 ms", "Dimberg 2000, Psychological Science", "Absent"],
    ["Voice, tone and timing", "Kraus 2017, American Psychologist", "Stripped by text"],
    ["Heart-rate and skin-conductance sync", "Prochazkova et al. 2022, Nat. Hum. Behav.", "Absent"],
  ];
  return (
    <div className={s.chartCard}>
      <p className={s.chartTitle}>Signals that decide attraction, and whether a screen carries them</p>
      <table className={s.sigTable}>
        <thead>
          <tr><th>Signal</th><th>Evidence</th><th>On a screen</th></tr>
        </thead>
        <tbody>
          {rows.map(([sig, ev, status]) => (
            <tr key={sig}>
              <td>{sig}</td>
              <td>{ev}</td>
              <td className={s.sigNo}>{status}</td>
            </tr>
          ))}
          <tr>
            <td>All of the above</td>
            <td>Same room, same moment</td>
            <td className={s.sigYes}>Present</td>
          </tr>
        </tbody>
      </table>
      <p className={s.chartSource}>
        Peer-reviewed findings; citations in the footer. The pattern is structural: these
        channels carry zero bandwidth online, at any video quality.
      </p>
    </div>
  );
}

export default function WhyLimePage() {
  return (
    <main className={s.page}>
      <AppleNav />

      <Section center>
          <p className={s.eyebrow}>Lime · The case</p>
          <h1 className={s.h2}>Why this matters, in six steps.</h1>
          <p className={s.bodyCenter}>
            Each step is a documented fact. Together they point at one missing product.
          </p>
      </Section>

      <hr className={s.rule} />

      {/* Step 1 */}
      <Section center tinted>
          <p className={s.eyebrow}>Step 1</p>
          <h2 className={s.h2}>Half the country is lonely.</h2>
          <p className={s.bodyCenter}>
            In 2023 the U.S. Surgeon General declared loneliness an epidemic. About one in
            two American adults reports experiencing it. The advisory puts the health toll
            of poor social connection on par with smoking up to 15 cigarettes a day.
          </p>
          <HalfDonut
            title="U.S. adults reporting loneliness"
            source="U.S. Surgeon General advisory, 2023"
            href="https://pubmed.ncbi.nlm.nih.gov/37792968/"
          />
      </Section>

      {/* Step 2 */}
      <Section center>
          <p className={s.eyebrow}>Step 2</p>
          <h2 className={s.h2}>Your day is full of people.<br />Your life is not.</h2>
          <p className={s.bodyCenter}>
            Time with friends has fallen by more than half in twenty years. But look at
            the number carefully. People did not stop being around people. We still
            commute, work, queue, and show up at events, surrounded by strangers for
            hours a day.
          </p>
          <p className={s.bodyCenter}>
            So the problem is not attendance. It is conversion. Hundreds of encounters a
            week, and almost none of them turn into anything.
          </p>
          <BarPair
            title="Minutes per day spent with friends, U.S. adults"
            aLabel="2003" aValue={60} bLabel="2023" bValue={26} max={70} unit=" min"
            source="American Time Use Survey, via The Washington Post (2024)"
            href="https://www.washingtonpost.com/opinions/interactive/2024/friends-loneliness-solitude-friendships/"
          />
      </Section>

      {/* Step 3 */}
      <Section center tinted>
          <p className={s.eyebrow}>Step 3</p>
          <h2 className={s.h2}>If rooms matter, why did everyone go online?</h2>
          <p className={s.bodyCenter}>
            Because rooms are illegible. In a bar you cannot see who is single, who is
            open, or who would say yes. Apps won by making one thing visible: who is
            available. People did not choose screens over chemistry. They chose legible
            over illegible.
          </p>
          <p className={s.bodyCenter}>
            Then the bill arrived. By 2024, 78% of dating-app users report burnout, and
            the top reason they name is the inability to find a real connection. The
            legibility was real. The connection was not.
          </p>
          <BarPair
            title="The trade that failed"
            aLabel="Dating-app users reporting burnout (2024, U.S.)" aValue={78}
            bLabel="Users naming ‘can’t find a real connection’ as the top cause" bValue={40}
            max={90} unit="%"
            source="Forbes Health / OnePoll survey, 2024"
            href="https://www.forbes.com/health/dating/dating-app-fatigue/"
          />
          <p className={s.chartSource} style={{ maxWidth: "30rem", margin: "0.6rem auto 0" }}>
            Context: meeting online became the most common way U.S. couples form (39% by
            2017, Stanford HCMST), and 46% of users call their experience negative (Pew,
            2023).
          </p>
      </Section>

      {/* Step 4 */}
      <Section center>
          <p className={s.eyebrow}>Step 4</p>
          <h2 className={s.h2}>The screen cannot carry chemistry.</h2>
          <p className={s.bodyCenter}>
            This is the part most people miss. In 2022, researchers put people on real
            blind dates and measured everything. Smiles, laughter, eye contact, and
            mimicry did not predict attraction. What predicted it was invisible: two
            bodies syncing, heartbeat to heartbeat, skin to skin conductance (Nature
            Human Behaviour, 2022; replicated 2024).
          </p>
          <p className={s.bodyCenter}>
            Attraction runs on signals people cannot see, cannot fake, and cannot type.
            No profile field carries them, at any bandwidth.
          </p>
          <SignalTable />
      </Section>

      {/* Step 5 */}
      <Section center>
          <p className={s.eyebrow}>Step 5</p>
          <h2 className={s.h2}>The barriers are beliefs. Beliefs respond to help.</h2>
          <p className={s.bodyCenter}>
            Commuters told to talk to strangers predicted it would be unpleasant. It was
            the opposite: they enjoyed the ride more (Epley &amp; Schroeder, 2014). After
            real conversations, people reliably underestimate how much the other person
            liked them (Boothby et al., 2018). People are not bad at connection. They
            mispredict it, in both directions, so rooms full of willing people stay quiet.
          </p>
          <p className={s.bodyCenter}>
            And this is fixable. One week of guided practice at approaching strangers made
            people less afraid of rejection and more confident in conversation, and the
            effect held after the study ended (Sandstrom et al., 2022, n = 286). Nobody
            needs a new personality. They need a scaffold.
          </p>
      </Section>

      {/* Step 6 */}
      <Section center tinted>
          <p className={s.eyebrow}>Step 6</p>
          <h2 className={s.h2}>The evidence writes the product.</h2>
          <p className={s.bodyCenter}>
            Read the six steps back and three lacks fall out. A lack of signals: rooms do
            not show who is open, which is the exact legibility that pulled everyone
            online (step 3). A lack of knowledge: people mispredict rejection and liking,
            and guided practice corrects it (step 5). And a lack of access to the signals
            that actually decide attraction, because they are physiological and invisible
            (step 4).
          </p>
          <p className={s.bodyCenter}>
            So the product is determined, not guessed. Make presence legible: crossed
            paths, and rooms that show who is open. Scaffold the approach: an assistant
            that lowers the first step, the way the intervention did. And read the body:
            the 2022 study measured attraction with glasses and wearables, at three
            levels, the environment, the pair, the person. That is not our metaphor. That
            is the method. Lime is that instrument, built for everyday life.
          </p>
          <div className={s.linkRow}>
            <Link className={s.link} href="/lime">
              See Lime &rsaquo;
            </Link>
          </div>
      </Section>

      <hr className={s.rule} />

      {/* Sources */}
      <Section center>
          <p className={s.eyebrow}>Sources</p>
          <p className={s.chartSource} style={{ maxWidth: "38rem", margin: "0 auto", textAlign: "left" }}>
            U.S. Surgeon General, Our Epidemic of Loneliness and Isolation (2023) ·
            American Time Use Survey 2003–2023, analysis via The Washington Post (2024) ·
            Rosenfeld, Thomas &amp; Hausen, How Couples Meet and Stay Together, Stanford ·
            Pew Research Center, The Experiences of U.S. Online Daters (Feb 2023) ·
            Wedekind et al., MHC-dependent mate preferences in humans, Proc. R. Soc. B (1995) ·
            Dimberg, Thunberg &amp; Elmehed, Unconscious facial reactions to emotional facial
            expressions, Psychological Science (2000) ·
            Kraus, Voice-only communication enhances empathic accuracy, American
            Psychologist (2017) ·
            Prochazkova et al. and related fNIRS hyperscanning literature on face-to-face
            neural synchrony ·
            Epley &amp; Schroeder, Mistakenly Seeking Solitude, JEP: General (2014) ·
            Boothby et al., The Liking Gap, Psychological Science (2018) ·
            Sandstrom, Boothby &amp; Cooney, Talking to Strangers, J. Exp. Soc. Psychol. (2022) ·
            Prochazkova et al., Physiological synchrony and attraction in a blind date
            setting, Nature Human Behaviour (2022); Communications Psychology (2024) ·
            Forbes Health / OnePoll, Dating App Burnout Survey (2024).
          </p>
      </Section>

      <footer className={`${s.footer} ${s.center}`}>
        <Link href="/lime" style={{ color: "inherit" }}>Lime</Link> ·{" "}
        <Link href="/" style={{ color: "inherit" }}>Reserve</Link>
      </footer>
    </main>
  );
}
