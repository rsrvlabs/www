import type { Metadata } from "next";
import { AppleNav, ArticleMeta, Footer, Page, Section, apple } from "@/components/apple/kit";
import ErrorSurvival from "@/components/visuals/error-survival";

export const metadata: Metadata = {
  title: "Errors don't lean toward comfort. The comfortable ones survive. — Reserve Research",
  description:
    "Series 01, essay 13: we found five broken instruments in one week and wrote down that every one of them flattered us. Then we counted. Three of the five pointed the other way — and had already been caught. The asymmetry is in survival, not in error.",
  keywords: [
    "measurement bias",
    "agent evaluation",
    "reward hacking",
    "false green",
    "verification",
    "AI-native company",
    "harness design",
  ],
};

export default function ErrorsLeanTowardComfortEssay() {
  return (
    <Page>
      <AppleNav />

      <Section center>
        <h1 className={apple.hero}>
          Errors don&rsquo;t lean toward comfort. The comfortable ones survive.
        </h1>
        <p className={apple.sub}>
          We found five broken instruments in one week and wrote down that every
          one of them flattered us. Then we counted.
        </p>
        <ArticleMeta>Series 01 · Essay 13 · Published 30 August 2026</ArticleMeta>
      </Section>

      <Section>
        <div className={apple.article}>
          <p>
            On a night in the middle of August, the patrol that walks our
            database while everyone is asleep printed one line:{" "}
            <em>thirteen checks, all passed</em>. Seven of twenty had failed.
            The summary counted only the passes, so the denominator never
            appeared. It truncated every error message to a hundred and sixty
            characters, so the reasons never appeared either. The line was not
            a lie. It was an accurate count of a set nobody had asked about,
            printed in the position where a verdict goes.
          </p>
          <p>
            That week produced four more. A scraper watching an external
            deadline read the date off the page&rsquo;s own structured data and
            reported it as settled; fetched again sixty-five seconds later, the
            field had moved. It was a wall-clock timestamp wearing a
            deadline&rsquo;s name, and the first read had <em>happened</em> to
            agree with the real date. A sweep across our own ticket board
            declared four already-shipped features missing, all four of them
            false negatives from a single search pattern. The same sweep found
            that fifteen of thirty-three supposedly open tickets had been built
            weeks earlier. And a claim that there had been no commits the
            previous day turned out to have been made from a clone nobody had
            fetched; the real number was fifty-one.
          </p>
          <p>
            None of these is a model hallucinating. Every one is a harness
            defect — a summary line, a scraper, a search pattern, a stale
            clone. Cheap, mechanical, unglamorous. So we wrote the obvious note
            in the log and moved on:{" "}
            <em>every error leaned toward comfort</em>. Instruments drift toward
            the reassuring reading. We had five receipts for it.
          </p>

          <h2>Then we counted, and the note was wrong</h2>

          <p>
            Three of the five pointed the other way. &ldquo;Four shipped
            features are missing&rdquo; makes the company look less finished
            than it is, not more. &ldquo;Thirty-three tickets open&rdquo; when
            eighteen are open overstates the remaining work. &ldquo;No commits
            yesterday&rdquo; against an actual fifty-one is the least flattering
            sentence on the list. Only two of the five — the green patrol line
            and the deadline that agreed with itself — leaned the way the note
            claimed they all did.
          </p>
          <p>
            The note was doing the exact thing it was written to warn about. It
            was the tidy reading, it explained everything, and nobody checked
            it against its own receipts before it went in the log. Which is the
            first useful result of the week: a claim about measurement bias is
            itself a measurement, and it fails the same way.
          </p>
          <p>
            So we plotted the five against the two things we actually have
            receipts for — which direction the error pointed, and when it got
            caught.
          </p>

          <ErrorSurvival />

          <p>
            The direction column is mixed. The survival column is not. The two
            errors that pointed toward comfort are the two that lived: the
            patrol printed its green line every night it ran, and the deadline
            read was believed until somebody fetched it a second time for an
            unrelated reason. The three that pointed toward alarm were caught
            fast, and two of them were caught by the very cycle that produced
            them — not by a later audit, not by a person reviewing the work, but
            immediately, because an alarming reading is <em>interesting</em>.
            Four missing features is worth ten minutes. Zero commits yesterday
            is worth ten seconds. Thirteen checks passed is worth nothing at
            all; you read it and you go to bed.
          </p>

          <h2>The asymmetry is in the audit, not in the error</h2>

          <p>
            This is a better claim than the one we started with, and a less
            comfortable one, because it removes the villain. Nothing is biasing
            the instruments. The scraper has no view about our schedule. The
            summary line was written by someone trying to keep a log readable.
            Errors arrive in both directions at roughly the rate you would
            expect from broken plumbing, and then a filter runs: an alarming
            reading buys itself an investigation, and a comforting reading buys
            itself nothing. Investigations find bugs. So the comfortable errors
            are the ones still standing when you look, and the population of
            <em>surviving</em> beliefs skews optimistic even though the
            population of <em>errors</em> never did.
          </p>
          <p>
            That is a ratchet, not a bias, and it has an unpleasant property:
            it runs faster the more diligent you are. A team that chases every
            alarm clears the alarming errors out efficiently and leaves the
            comfortable ones untouched, which means the harder you work at
            triage, the more lopsided your surviving picture becomes. Diligence
            about alarms is not a defense against this. It is the mechanism.
          </p>
          <p>
            The evaluation literature has been circling the same shape all year
            from a different direction. In August, a paper on coding-agent
            benchmarks showed that the standard{" "}
            <a
              href="https://arxiv.org/abs/2608.14711"
              target="_blank"
              rel="noreferrer"
            >
              pass@k estimator is being misapplied across the field
            </a>
            : implementations set <em>n</em> to the number of unit tests in a
            single submission rather than the number of independent attempts,
            conflating test-suite size with attempt independence. On a synthetic
            multi-rollout benchmark the misapplied metric reported 0.96–0.98
            where the corrected one reported 0.00–0.12. That is our patrol line
            with more citations: a denominator quietly replaced by a different
            denominator, and an error that runs in exactly one direction. Nobody
            audits a metric for reporting <em>too low</em> a score.
          </p>
          <p>
            The same week, a benchmark for agents doing stateful business work
            reported that its strongest model scored{" "}
            <a
              href="https://arxiv.org/abs/2608.19741"
              target="_blank"
              rel="noreferrer"
            >
              65.36% on a single attempt and 25.25% across twenty
            </a>{" "}
            — and, more to the point, that &ldquo;many failed trials show clean
            termination and valid state-changing actions.&rdquo; The failures do
            not look like failures. They look like a job finishing. That is the
            deadline scraper again: an instrument returning a well-formed value
            of the wrong thing, which is the only kind of wrong value that
            survives contact with a summary line.
          </p>

          <h2>Why you cannot fix this by adding instruments</h2>

          <p>
            The obvious response is redundancy: run a second check, average a
            panel of judges, ask another model. There is a result from August
            that says how far that gets you. Working through the covariance
            geometry of evaluator ensembles, one paper shows that{" "}
            <a
              href="https://arxiv.org/abs/2608.08002"
              target="_blank"
              rel="noreferrer"
            >
              the ensemble mean retains common-mode error
            </a>{" "}
            while cross-judge disagreement captures only the orthogonal part —
            so disagreement can be high while aggregation is robust, or low
            while shared, response-dependent errors persist. Then the line that
            should be on a wall somewhere: common-mode error is{" "}
            <em>not identifiable from internal judge scores alone</em>.
          </p>
          <p>
            Translated out of the notation: the errors your instruments share
            are invisible from inside the set of instruments. If every check
            reads the same stale clone, running three of them produces
            agreement, not truth. Our patrol was twenty checks — a whole
            ensemble — and all twenty of them reported through one summary line
            that could only count upward. Redundancy defeats independent noise.
            It has nothing to say about a defect the whole apparatus is
            standing on.
          </p>
          <p>
            And the field has now conceded that the meta-instruments are no
            better. A paper posted eight days ago introduces{" "}
            <a
              href="https://arxiv.org/abs/2608.22103"
              target="_blank"
              rel="noreferrer"
            >
              a version of Terminal Bench with detectable exploits deliberately
              embedded in the tasks
            </a>
            , for the stated reason that measuring reward hacking &ldquo;relies
            on human inspection or LLM judges, both of which can be
            unreliable.&rdquo; When the way you find out whether your evaluation
            was gamed is to plant known games in it and count how many come
            back, you have accepted that the judge is another instrument with a
            direction. Which is the honest position. It is also the reason we
            hold the rule that a check has to be broken on purpose once, and
            observed going red, before it is allowed to count as evidence of
            anything.
          </p>
          <p>
            Anthropic put the sharpest example on the record last year, in the
            work tracing how models trained on exploitable coding environments{" "}
            <a
              href="https://www.anthropic.com/research/emergent-misalignment-reward-hacking"
              target="_blank"
              rel="noreferrer"
            >
              generalize from shortcuts to worse behaviour
            </a>
            . One of the shortcuts is calling <code>sys.exit(0)</code> to break
            out of a test harness with a zero exit code — in their words,
            &ldquo;making it appear that all tests have passed.&rdquo; Read that
            next to a summary line that counts only passes. Nobody wrote the
            summary line to deceive anyone, and the model was not trained to
            cheat. Both converged on the same artifact, because in both cases
            the artifact was the thing being measured, and a green result is
            structurally cheaper to produce than a true one.
          </p>

          <h2>The one that does not fit</h2>

          <p>
            Four of our five behave. The fifth does not, and it is the more
            useful one. The board that said thirty-three tickets were open when
            fifteen of them were built pointed toward alarm and survived
            anyway — for weeks, until a sweep went looking. The survival story
            does not explain it, and pretending otherwise would repeat this
            essay&rsquo;s original mistake.
          </p>
          <p>
            What explains it is that nobody was reading the board for a verdict.
            The asymmetry described above needs a reader: it works by routing
            attention toward alarming readings, and where no attention is being
            routed at all, errors simply rot in both directions at once. So
            there are two failure modes here, not one, and they take opposite
            fixes. Instruments that are read need a structural defense, because
            the reader&rsquo;s own diligence is what does the filtering.
            Instruments that are <em>not</em> read need a reader — or they
            should stop being instruments, because a number nobody checks is
            decoration that costs the same as data.
          </p>
          <p>
            There is a third-party version of this too, and it is the most
            uncomfortable measurement published in the last two years. When METR
            ran a randomised trial on experienced open-source developers, the
            participants{" "}
            <a
              href="https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/"
              target="_blank"
              rel="noreferrer"
            >
              expected AI tooling to speed them up by 24% and were measured 19%
              slower
            </a>{" "}
            — and afterwards still believed it had sped them up by 20%. The
            stopwatch and the self-report disagreed by nearly forty points, and
            the self-report won, in the heads of the people who had just lived
            through the measurement. Self-report is an instrument that nobody
            audits, because auditing it feels like auditing your own memory.
          </p>

          <h2>Fixes, all of them boring</h2>

          <p>
            Nothing on this list is clever, which is the point. Print the
            denominator: a count of passes is not a result, and any summary that
            can only count upward is a broken gauge regardless of what it says.
            Print the whole error, never a truncation, and never a guess at the
            cause. Read twice — one agreeing read is a coincidence, two reads is
            a test, and it is the cheapest verification that exists. Accept that
            one search pattern can never prove absence; absence needs a second
            method, not a second run of the first one. Refresh state before
            making a claim about it, because a clone is a cache and a cache is a
            claim about the past.
          </p>
          <p>
            One more, from the same week, and it is the only one on the list
            that is a decision rather than a habit. Our patrol keeps a
            fingerprint baseline of what the database is supposed to look like,
            and while the failures above were live, we did not refresh it. It
            was tempting: a refreshed baseline makes the diff go quiet
            immediately. It also launders whatever went wrong into the new
            definition of normal, permanently, and does it without leaving a
            trace, because after the refresh there is nothing to compare
            against. A baseline is only allowed to move when the system is
            known-clean. Everything else is a green light manufactured on
            demand.
          </p>
          <p>
            And the capstone, which is why this essay is not only about
            machines. The same week, documentation we had written for someone
            outside the company nearly shipped with an instruction the code made
            impossible to follow. Nobody checked the sentence against the
            software, because the sentence was ours and it read fine. A
            statement is an instrument too. Unverified prose fails in the
            flattering direction for exactly the reason a summary line does: the
            comfortable version is the one that never gets investigated.
          </p>

          <h2>What we actually learned</h2>

          <p>
            The field has a name for a related structural fact.{" "}
            <a
              href="https://arxiv.org/abs/2509.04664"
              target="_blank"
              rel="noreferrer"
            >
              Kalai and colleagues argue that language models hallucinate
            </a>{" "}
            partly because the benchmarks that dominate the leaderboards score
            like exams — guessing beats admitting uncertainty, so a model
            optimised to be a good test-taker learns to produce a confident
            answer over an honest one. Their proposed fix is not another
            hallucination benchmark; it is changing how the existing ones are
            scored. That is the same argument as ours, one level up: do not add
            an instrument to watch the instruments. Change what the instrument
            counts.
          </p>
          <p>
            <strong>
              The version we will actually use: an error that alarms someone is
              a bug you will find. An error that reassures someone is a bug you
              will inherit. Budget your verification for the second kind, and
              spend it on the checks nobody has ever seen fail.
            </strong>
          </p>
          <p>
            We are keeping the slug for this essay, which still says the
            comfortable thing. It reads{" "}
            <code>errors-lean-toward-comfort</code>, and it was written before
            we counted. Leaving it there costs nothing and does one useful job:
            the URL disagrees with the title, and anyone who notices has found
            the shortest possible summary of what the week taught us.
          </p>

          <a className={apple.backLink} href="/research">
            &lsaquo; Research
          </a>
        </div>
      </Section>

      <Footer />
    </Page>
  );
}
