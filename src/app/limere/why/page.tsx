import type { Metadata } from "next";
import Link from "next/link";
import { AppleNav, Section } from "@/components/apple/kit";
import s from "@/components/apple/apple.module.css";

export const metadata: Metadata = {
  title: "Why Limere matters: the case in six steps",
  description:
    "Half of adults say they are lonely. We spend less than half the time with friends that we did twenty years ago. Online dating became the default and left people worn out. The case for assisting real-world social life. Every claim here is sourced.",
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
        <rect x="0" y="74" width={w(bValue) * 4} height="16" rx="8" fill="#c00000" />
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
      <p className={s.chartTitle}>Signals that pass between people in the same room, and whether a screen carries them</p>
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
        Peer-reviewed findings; citations in the footer. The pattern is structural. These
        signals do not survive the trip online. Better video does not bring them back.
      </p>
    </div>
  );
}

function DerivationMap() {
  const rows: [string, string, string, string][] = [
    [
      "Ties form from repeated encounters, and today none of them convert",
      "Festinger et al., 1950 \u00b7 ATUS, 2024",
      "The encounters vanish unrecorded",
      "Crossed paths",
    ],
    [
      "When both people are interested, both hold back and misread the other\u2019s silence",
      "Vorauer & Ratner, 1996",
      "No one can signal openness",
      "Rooms that show who is open",
    ],
    [
      "People mispredict rejection and liking; a week of scaffolded practice corrects it",
      "Epley 2014 \u00b7 Boothby 2018 \u00b7 Sandstrom 2022",
      "No scaffold at the moment it counts",
      "The navigator: openers and nudges",
    ],
    [
      "Attraction is predicted by physiological synchrony, not by visible behaviour",
      "Prochazkova et al., 2022",
      "The deciding signals are invisible",
      "The signal: sensing, on the roadmap",
    ],
  ];
  return (
    <div className={s.deriv} role="table" aria-label="From evidence to product features">
      <span className={s.derivHead}>The finding</span>
      <span aria-hidden="true" />
      <span className={s.derivHead}>The gap it exposes</span>
      <span aria-hidden="true" />
      <span className={s.derivHead}>The feature it demands</span>
      {rows.map(([finding, cite, gap, feature]) => (
        <span key={feature} style={{ display: "contents" }}>
          <span className={s.derivCell}>
            {finding}
            <span className={s.derivCite}>{cite}</span>
          </span>
          <span className={s.derivTo}>&rarr;</span>
          <span className={s.derivCell}>{gap}</span>
          <span className={s.derivTo}>&rarr;</span>
          <span className={`${s.derivCell} ${s.derivFeature}`}>{feature}</span>
        </span>
      ))}
    </div>
  );
}

export default function WhyLimePage() {
  return (
    <main className={s.page}>
      <AppleNav />

      <Section center>
          <p className={s.eyebrow}>Limere · The case</p>
          <h1 className={s.h2}>Six steps, one missing product.</h1>
          <p className={s.bodyCenter}>
            The first five steps are documented findings. The sixth is what they add up to.
          </p>
      </Section>

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
            Time with friends has fallen by more than half in twenty years. But people
            did not stop being around people. We still
            commute, work, queue, and show up at events, surrounded by strangers for
            hours a day.
          </p>
          <p className={s.bodyCenter}>
            And repetition is exactly where relationships come from. In the classic
            housing study, people became friends with whoever they happened to pass most
            often (Festinger et al., 1950). Proximity is the raw material of connection.
            Modern life still supplies it every day.
          </p>
          <p className={s.bodyCenter}>
            So the problem is conversion, not attendance. Hundreds of encounters a week,
            and almost none of them turn into anything.
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
            Tonight, a single person who wants to meet someone will stand in a room full
            of people, read nothing, go home, and open an app on the couch. The room lost
            to the couch. Not because the room had less to offer, but because the couch
            was legible.
          </p>
          <p className={s.bodyCenter}>
            This failure has been measured. Across six studies, people who wanted to make a
            first move explained their own stillness as fear of rejection, then read the
            other person&rsquo;s identical stillness as lack of interest (Vorauer &amp;
            Ratner, 1996). Two interested people, both waiting, each sure the answer is no.
          </p>
          <p className={s.bodyCenter}>
            The trade came with a bill. By 2024, 78% of dating-app users report burnout,
            and the top reason they name is the inability to find a good connection. The
            apps delivered legibility. They never delivered the connection.
          </p>
          <BarPair
            title="The trade that failed"
            aLabel="Dating-app users reporting burnout (2024, U.S.)" aValue={78}
            bLabel="Users naming ‘can’t find a good connection’ as the top cause" bValue={40}
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
            heart rates aligning, skin conductance rising and falling together (Prochazkova
            et al., 2022). An independent 2024 study went further: inducing synchrony
            raised romantic attraction (Cohen et al., 2024).
          </p>
          <p className={s.bodyCenter}>
            Attraction runs on signals people cannot see, cannot fake, and cannot type.
            No profile field carries them.
          </p>
          <SignalTable />
      </Section>

      {/* Step 5 */}
      <Section center tinted>
          <p className={s.eyebrow}>Step 5</p>
          <h2 className={s.h2}>The barriers are beliefs. Beliefs respond to help.</h2>
          <p className={s.bodyCenter}>
            Commuters told to talk to strangers predicted it would be unpleasant. It was
            the opposite: they enjoyed the ride more (Epley &amp; Schroeder, 2014). After
            real conversations, people reliably underestimate how much the other person
            liked them (Boothby et al., 2018). People are not bad at connection. They
            misjudge it in both directions, so rooms full of willing people stay quiet.
          </p>
          <p className={s.bodyCenter}>
            And this is fixable. One week of guided practice at approaching strangers made
            people less afraid of rejection and more confident in conversation, and the
            effect held after the study ended (Sandstrom et al., 2022, n = 286). Nobody
            needs a new personality. They need a scaffold.
          </p>
      </Section>

      {/* Step 6 */}
      <Section center>
          <p className={s.eyebrow}>Step 6</p>
          <h2 className={s.h2}>The evidence writes the product.</h2>
          <p className={s.bodyCenter}>
            Every feature below traces back to a finding above. The list came out of the
            evidence, not out of a whiteboard.
          </p>
          <DerivationMap />
          <p className={s.bodyCenter} style={{ marginTop: "1.6rem" }}>
            The first three rows already exist. Crossed paths, rooms that show who is
            open, and the navigator all run in the app today. The fourth row is the
            roadmap, and we did not invent the method. The 2022 study measured attraction
            with glasses and wearables at three levels: the environment, the pair, and
            the person. Until now these signals have only ever been measured in a lab.
            Limere grows into the instrument that measures them where life actually happens.
          </p>
          <p className={s.bodyCenter}>
            Other apps tried to make rooms legible, and they died. They broadcast guesses about
            strangers, with no consent and no density. Legibility without consent is
            surveillance. Ours is opt-in, room by room, and built for venues where thirty
            people are enough.
          </p>
          <p className={s.bodyCenter}>
            Wearables are mainstream now. AI assistants are finally good enough to help
            in the moment, and their cost falls tenfold a year, so we build for where
            prices are going, not where they are. Fatigue with the old default has never
            been higher. The chain was always there. Only now can a product act on it.
          </p>
          <div className={s.linkRow}>
            <Link className={s.link} href="/limere">
              See Limere &rsaquo;
            </Link>
          </div>
      </Section>

      {/* The market */}
      <Section center tinted>
          <p className={s.eyebrow}>The market</p>
          <h2 className={s.h2}>The money is in a shrinking category.<br />The instrument is in a booming one.</h2>
          <p className={s.bodyCenter}>
            Dating apps took in about six billion dollars in 2025, from over 350 million
            users. And the incumbents are shrinking anyway. In 2025 Match Group lost 5% of
            its payers, Bumble&rsquo;s revenue fell 10%, and Tinder&rsquo;s fell 4%. The
            money keeps coming in. The satisfaction keeps going down. A category this big,
            running on a broken input, is not a dead market. It is an opening.
          </p>
          <p className={s.bodyCenter}>
            Meanwhile the instrument layer is growing fast. Wearables were an $87 billion
            market in 2025, forecast past $230 billion by 2034. Shipments hit 538 million
            in 2024. Smart rings are growing near 30% a year. Oura has sold more than five
            million rings and said it expected a billion dollars in sales in 2025. Whoop
            crossed a ten-billion-dollar valuation in 2026. By 2020, almost one in three
            American adults already wore one. The hardware that reads the body went
            mainstream. Nobody points it at the room. Social chemistry is still the largest
            unmeasured signal in daily life.
          </p>
          <BarPair
            title="Two markets, one gap"
            aLabel="Dating apps, global revenue (2025)" aValue={6.1}
            bLabel="Wearables, global revenue (2025)" bValue={86.8}
            max={100} unit="B"
            source="Business of Apps, 2026; Fortune Business Insights, 2025"
            href="https://www.fortunebusinessinsights.com/wearable-technology-market-106000"
          />
          <p className={s.bodyCenter} style={{ marginTop: "1.4rem" }}>
            The arithmetic is small and concrete. Nearly half of U.S. adults under 30 are single.
            More than half of that age group has ever used a dating site or app. Category
            payers already spend about twenty dollars a month, by Match&rsquo;s own 2025
            average. Our
            first market is the burned-out majority of those users: people who still want
            to meet someone, and already wear the device that could help.
          </p>
      </Section>

      {/* Sources */}
      <Section center>
          <p className={s.eyebrow}>Sources</p>
          <div style={{ maxWidth: "40rem", margin: "0 auto", textAlign: "left" }}>
            {[
              "Boothby, E. J., Cooney, G., Sandstrom, G. M., & Clark, M. S. (2018). The liking gap in conversations: Do people like us more than we think? Psychological Science, 29(11), 1742\u20131756. https://doi.org/10.1177/0956797618783714",
              "Cohen, M., Abargil, M., Ahissar, M., & Atzil, S. (2024). Social and nonsocial synchrony are interrelated and romantically attractive. Communications Psychology, 2, Article 57. https://doi.org/10.1038/s44271-024-00109-1",
              "Dimberg, U., Thunberg, M., & Elmehed, K. (2000). Unconscious facial reactions to emotional facial expressions. Psychological Science, 11(1), 86\u201389. https://doi.org/10.1111/1467-9280.00221",
              "Epley, N., & Schroeder, J. (2014). Mistakenly seeking solitude. Journal of Experimental Psychology: General, 143(5), 1980\u20131999. https://doi.org/10.1037/a0037323",
              "Festinger, L., Schachter, S., & Back, K. (1950). Social pressures in informal groups: A study of human factors in housing. Harper & Brothers.",
              "Forbes Health. (2024, May 9). Forbes Health survey: 78% of all users report dating app burnout [OnePoll survey of 1,000 U.S. dating-app users]. Forbes. https://www.forbes.com/health/dating/dating-app-fatigue/",
              "Kraus, M. W. (2017). Voice-only communication enhances empathic accuracy. American Psychologist, 72(7), 644\u2013654. https://doi.org/10.1037/amp0000147",
              "McClain, C., & Gelles-Watnick, R. (2023, February 2). The experiences of U.S. online daters. Pew Research Center. https://www.pewresearch.org/internet/2023/02/02/the-experiences-of-u-s-online-daters/",
              "Pew Research Center. (2023, February 2). Key findings about online dating in the U.S. [53% of U.S. adults under 30 report having ever used a dating site or app]. https://www.pewresearch.org/short-reads/2023/02/02/key-findings-about-online-dating-in-the-u-s/",
              "Office of the U.S. Surgeon General. (2023). Our epidemic of loneliness and isolation: The U.S. Surgeon General\u2019s advisory on the healing effects of social connection and community. U.S. Department of Health and Human Services.",
              "Prochazkova, E., Sjak-Shie, E., Behrens, F., Lindh, D., & Kret, M. E. (2022). Physiological synchrony is associated with attraction in a blind date setting. Nature Human Behaviour, 6(2), 269\u2013278. https://doi.org/10.1038/s41562-021-01197-3",
              "Rosenfeld, M. J., Thomas, R. J., & Hausen, S. (2019). Disintermediating your friends: How online dating in the United States displaces other ways of meeting. Proceedings of the National Academy of Sciences, 116(36), 17753\u201317758. https://doi.org/10.1073/pnas.1908630116",
              "Sandstrom, G. M., Boothby, E. J., & Cooney, G. (2022). Talking to strangers: A week-long intervention reduces psychological barriers to social connection. Journal of Experimental Social Psychology, 102, Article 104356. https://doi.org/10.1016/j.jesp.2022.104356",
              "U.S. Bureau of Labor Statistics. (2003\u20132023). American Time Use Survey [Data set]. Analysis published by The Washington Post (2024).",
              "Vorauer, J. D., & Ratner, R. K. (1996). Who\u2019s going to make the first move? Pluralistic ignorance as an impediment to relationship formation. Journal of Social and Personal Relationships, 13(4), 483\u2013506. https://doi.org/10.1177/0265407596134001",
              "Wedekind, C., Seebeck, T., Bettens, F., & Paepke, A. J. (1995). MHC-dependent mate preferences in humans. Proceedings of the Royal Society of London. Series B: Biological Sciences, 260(1359), 245\u2013249. https://doi.org/10.1098/rspb.1995.0087",
              "Business of Apps. (2026). Dating app revenue and usage statistics. https://www.businessofapps.com/data/dating-app-market/",
              "Match Group. (2026, February 3). Q4 and full year 2025 results [SEC Form 8-K, Ex-99.1 (payers, revenue per payer) and Ex-99.2 (Tinder direct revenue)]. U.S. Securities and Exchange Commission.",
              "Bumble Inc. (2026, March 11). Fourth quarter and full year 2025 results [Press release].",
              "Fortune Business Insights. (2025). Wearable technology market. https://www.fortunebusinessinsights.com/wearable-technology-market-106000",
              "Fortune Business Insights. (2025). Smart ring market. https://www.fortunebusinessinsights.com/smart-ring-market-111418",
              "International Data Corporation. (2024, December 16). Worldwide Quarterly Wearable Device Tracker [Press release; 538 million units shipped in 2024].",
              "National Heart, Lung, and Blood Institute. (2023, June 15). Study reveals wearable device trends among U.S. adults [analysis of HINTS 2019–2020 data]. National Institutes of Health.",
              "Pew Research Center. (2023, February 8). For Valentine\u2019s Day, 5 facts about single Americans.",
              "CNBC. (2025, October 14). Oura raises about $900 million at an $11 billion valuation; TechCrunch. (2026, March 31). Whoop raises $575M Series G at a $10.1B valuation.",
            ].map((ref) => (
              <p key={ref.slice(0, 30)} className={s.chartSource}
                 style={{ margin: "0 0 0.55rem", paddingLeft: "1.4rem", textIndent: "-1.4rem" }}>
                {ref}
              </p>
            ))}
          </div>
      </Section>

      <footer className={`${s.footer} ${s.center}`}>
        <Link href="/limere" style={{ color: "inherit" }}>Limere</Link> ·{" "}
        <Link href="/" style={{ color: "inherit" }}>Reserve</Link> ·{" "}
        <Link href="/legal/terms" style={{ color: "inherit" }}>Terms</Link> ·{" "}
        <Link href="/legal/privacy" style={{ color: "inherit" }}>Privacy</Link>
      </footer>
    </main>
  );
}
