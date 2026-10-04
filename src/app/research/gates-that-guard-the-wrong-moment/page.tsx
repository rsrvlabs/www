import type { Metadata } from "next";
import { AppleNav, ArticleMeta, Footer, Page, Section, apple } from "@/components/apple/kit";
import GateSequence from "@/components/visuals/gate-sequence";

export const metadata: Metadata = {
  title: "Gates that guard the wrong moment — Reserve Research",
  description:
    "Series 01, essay 14: four failures in one week, in a codebase written mostly by agents. Every check was correct on its own and mis-sequenced against the world — a guard that assumes something exists before the thing that creates it has run. The question nobody had on a checklist: what exists at the moment this runs?",
  keywords: [
    "agent-written code",
    "sequencing bugs",
    "guard clauses",
    "Hyrum's Law",
    "clock injection",
    "premortem",
    "AI-native company",
    "harness design",
  ],
};

export default function GatesThatGuardTheWrongMomentEssay() {
  return (
    <Page>
      <AppleNav />

      <Section center>
        <h1 className={apple.hero}>Gates that guard the wrong moment.</h1>
        <p className={apple.sub}>
          Four failures in one week. Every check was correct, and not one of
          them asked what existed at the moment it ran.
        </p>
        <ArticleMeta>Series 01 · Essay 14 · Published 6 September 2026</ArticleMeta>
      </Section>

      <Section>
        <div className={apple.article}>
          <p>
            At one minute past eight on a Friday evening, a tester sent a
            screenshot. Fresh install, brand-new account, and where the app
            should have been there was a sentence:{" "}
            <em>we can&rsquo;t load your profile</em>. He had done nothing
            exotic. He had signed up, which is the one thing every user does
            exactly once, and the door had not opened.
          </p>
          <p>
            Thirty-four minutes later the fix was in production. That number is
            not the interesting part. The interesting part is that by the time
            we got there, it was the fourth time that week we had met the same
            bug wearing a different costume — in a database function, in a
            scheduler, in a log parser, and in a test suite. Four systems, four
            teams of one, no shared code, one shape.
          </p>

          <h2>The gate was correct</h2>

          <p>
            We allow one active device per account. When you log in, the server
            claims the account for the phone in front of it, and the claim takes
            a lock so two devices racing each other cannot both win. To take
            that lock it reads the account&rsquo;s profile row — the record that
            also carries whether the account has been deleted, which is exactly
            the thing a login is supposed to refuse.
          </p>
          <p>
            Read that paragraph as a reviewer and there is nothing to say. The
            lock is right. The deletion check is right. The ordering of the
            locks is right. A brand-new account, though, has no profile row at
            login. The profile is written during onboarding — the screens you
            fill in <em>after</em> you are already signed in. So a new
            user&rsquo;s real sequence is: sign up, log in, then create the
            profile. The lock ran in the middle of that, reached for a row the
            next screen was about to write, found nothing, and did the correct
            thing with nothing. It refused.
          </p>
          <p>
            For every account that had ever exercised this code, the row was
            already there — written weeks or months earlier by an onboarding
            flow nobody re-runs. Existing users logged in all evening without a
            scratch. The wall was only reachable by someone arriving for the
            first time, on that build, which on that evening was a very short
            list. It was not going to stay short.
          </p>

          <GateSequence />

          <p>
            The fix was to make the lock tolerate a missing profile. If a row
            exists, behave exactly as before: take the lock, refuse a deleted
            account. If there is none, skip that one lock and keep the rest of
            the locking order intact. The guard&rsquo;s purpose did not change
            by a word. The only thing that changed is what it does when the
            world has not caught up with it yet — and, as the figure shows, the
            gap is still there afterwards. We did not close it. We stopped
            assuming it away.
          </p>

          <h2>Three more, same week, same shape</h2>

          <p>
            <strong>A promise with no scheduler.</strong> Our privacy policy
            says a deleted account is permanently purged after a grace period.
            The mechanism looked like it existed: a purge function, written
            weeks earlier, idempotent, locked down so only the service role can
            call it. Any review of that function would have passed it, because
            the function is correct. Then, fact-checking the policy sentence by
            sentence against the running system, an agent asked the question
            nobody had asked — <em>who calls it?</em> Grep the repository for a
            schedule pointing at it: nothing. The cruel detail is that its
            sibling, which purges a different class of expiring data, has a
            scheduled job that demonstrably runs every hour. Two functions that
            look identical in the folder, and the whole defect is one missing
            row in a schedule.
          </p>
          <p>
            <strong>An alarm that could not name the culprit.</strong> Our
            nightly test run has a summary step: parse the runner&rsquo;s final
            tally, count the failures, print a sample of failing test names so
            the morning reader knows where to look. The tally regex was written
            against the two-segment line the runner prints when nothing is
            skipped; the runner adds a third segment when something is, and one
            extra character in the middle made the failure count silently vanish
            from the report. Meanwhile the sampler took the last line of the
            failure list as its example, and past a display threshold the last
            line is always the runner&rsquo;s own note about how many it
            omitted — never a test name. The alarm fired faithfully every time
            something broke. It just could not say what.
          </p>
          <p>
            <strong>A test that expired at nine o&rsquo;clock.</strong> At nine
            in the evening, Taipei time, our main branch turned red: seventeen
            failing tests, on every open pull request at once, on a commit that
            had touched only text files in a tooling directory. A pair of widget
            tests described an activity that was &ldquo;happening now&rdquo; by
            giving it a real start and end. The screen under test compares that
            window against the actual clock. While the window was open the
            comparison came out true and the card appeared. Then the window
            closed, exactly as the product intends activities to close, the card
            correctly disappeared, and the tests correctly failed. They were not
            wrong about the product. They were wrong about time — and because
            red tests arrive attached to whatever happened to be open when they
            turned red, the first reading blamed a rebase that had nothing to do
            with it.
          </p>

          <h2>One question, four times</h2>

          <p>
            Line them up and the grammar is identical: code that is correct
            about <em>what</em> it does and wrong about <em>when</em> it runs.
            The login gate runs at login and needs a row written at onboarding.
            The purge is correct at every moment and invoked at none. The parser
            reads a format that was true when it was written. The test asserts a
            world that is true for as long as a fixture&rsquo;s window stays
            open. In every case the guard is right and the ordering between the
            guard and the world it assumes is wrong, and in every case the
            question that finds it is one sentence long: what exists at the
            moment this runs?
          </p>
          <p>
            The alarm is the loosest fit, and it is worth saying so rather than
            filing the edge off. Its &ldquo;moment&rdquo; is a version, not a
            step in a lifecycle — the runner&rsquo;s output changed under a
            parser that had no contract with it. We keep it in the set because
            the question that would have caught it is word-for-word the same
            question, which is the only test of a category we trust.
          </p>

          <h2>Why this class, in this kind of codebase</h2>

          <p>
            Most of the code in these four systems was written by agents, and we
            think that is why this class is over-represented rather than a
            coincidence. Not because agents write worse functions — the four
            functions above are, individually, better than the ones a tired
            human writes at eight in the evening. Because a function does not
            contain its own call order.
          </p>
          <p>
            Everything a reviewer needs to judge that lock correct is inside the
            file: the lock, the row, the deletion check, the refusal. Nothing in
            the file, and nothing in the diff, says which requests reach it, in
            what order, on which account&rsquo;s first day. That knowledge lives
            in a different repository, or in a scheduler&rsquo;s configuration
            table, or in the head of whoever last drew the onboarding flow on a
            whiteboard. Review verifies the artifact. The invocation is
            somewhere else. And the faster you produce correct artifacts — which
            is the entire proposition of building this way — the more of your
            remaining risk migrates out of the functions and into the joints
            between them.
          </p>
          <p>
            There is an older law describing the same pressure from the far
            side.{" "}
            <a href="https://www.hyrumslaw.com/" target="_blank" rel="noreferrer">
              Hyrum&rsquo;s Law
            </a>{" "}
            says that with enough users of an API, all observable behaviours of
            your system will be depended on by somebody, whatever the contract
            promises. The internal version is worse, because the user is your
            own code and the observable behaviour is a property of your own data
            that no contract ever mentioned:{" "}
            <em>every account has a profile row.</em> True of every row in the
            table for months. Never written down, never enforced by a
            constraint, and quietly load-bearing for a login gate.
          </p>

          <p className={apple.pullQuote}>
            &ldquo;What exists at the moment this runs?&rdquo; is not a
            code-review question. It has no answer inside the file.
          </p>

          <p>
            And the remedy for the fourth failure is twenty-one years old.
            Martin Fowler wrote it down in March 2005, under the heading{" "}
            <a
              href="https://martinfowler.com/bliki/ClockWrapper.html"
              target="_blank"
              rel="noreferrer"
            >
              Clock Wrapper
            </a>
            : &ldquo;If you need to get the current date or time in your code,
            don&rsquo;t access the system routines for that data directly. Put
            some form of wrapper around it that allows you to override it.&rdquo;
            A year before that, Michael Feathers had named the general move in{" "}
            <a
              href="https://www.informit.com/articles/article.aspx?p=359417&seqNum=2"
              target="_blank"
              rel="noreferrer"
            >
              <em>Working Effectively with Legacy Code</em>
            </a>{" "}
            — a <em>seam</em> is &ldquo;a place where you can alter behavior in
            your program without editing in that place.&rdquo; What makes our
            version embarrassing is not that the technique was unknown to us. A
            few hundred lines below the broken fixtures, in the same file,
            another test passed its own <code>now</code> function instead of
            reading the system clock, and stayed green all evening. The seam was
            already there. It was not applied to the next case, because the next
            case was written by looking at the requirement rather than at the
            file.
          </p>

          <h2>What we changed, none of it clever</h2>

          <p>
            <strong>A question, added the same day.</strong> Our premortem list
            gains an entry every time a bug closes that no existing question
            would have caught, and the entry ships in the same commit as the
            fix. This one:{" "}
            <em>
              does any gate that runs at login get tested with an account that
              has just signed up and has no profile yet?
            </em>{" "}
            It costs nothing, it is mechanically checkable, and the fact that it
            did not already exist is the real finding of the week. A category of
            bug you have met four times and never written a question for is a
            category you will meet a fifth time.
          </p>
          <p>
            <strong>Red before green, against production.</strong> Before
            changing a line, we wrote a script that reproduced the production
            stack trace verbatim — same call, same account state, same error,
            against the real database, inside a transaction that was rolled
            back. Then the fix, then the same script green. A fix that has only
            ever been observed green is a fix nobody has actually tested; you
            have watched a passing test pass. After deploying, we re-ran the
            failing call as the affected account and got back{" "}
            <code>{"{status: claimed, generation: 2}"}</code> where minutes
            earlier it had raised.
          </p>
          <p>
            <strong>Dry-run the migration in production.</strong> Apply it, read
            the result, roll it back, then apply it for real. It takes seconds,
            and it is the whole distance between believing a migration is safe
            and having watched it be safe on the only database whose opinion
            matters.
          </p>
          <p>
            <strong>Count the blast radius before you deploy, not after.</strong>{" "}
            Fifteen server functions take that same profile lock. Three of them
            run at login, and all three route through the single function we
            were fixing — which is why a small change closed the entire class,
            and why we could say so out loud instead of hoping. The other twelve
            all run after onboarding, where the row is guaranteed. That
            enumeration took a few minutes and it is the difference between a
            hotfix and a gamble.
          </p>

          <h2>The question, and where it belongs</h2>

          <p>
            None of this argues for fewer guards. Every one of the four was
            doing a job worth doing: one device per account, deleted data
            actually deleted, a nightly that tells you what broke, a test that
            asserts what the user sees. The failure was never in the guarding.
            It was that each guard carried an assumption about the state of the
            world at the instant it fires, and nothing in our process was
            responsible for that assumption. It is not in the function. It is
            not in the diff. It is not in the review checklist, because the
            reviewer is reading the artifact and the assumption lives in the
            schedule.
          </p>
          <p>
            So the question moves to authoring time, where it is cheap. When you
            write something that runs at a moment — a gate, a job, a fixture, a
            parser — name the moment, name what it assumes exists at that
            moment, and then find out when that thing is created. Two of the
            four answers here would have been a single grep. Where the answer is
            &ldquo;later, or maybe never,&rdquo; you have two honest options:
            move the guard, or let it tolerate the absence. Refusing on a
            missing precondition is a third option that looks like rigour and is
            actually just the assumption, unexamined, with a friendlier error
            message.
          </p>
          <p>
            <strong>
              A guard that assumes has a shelf life, and the shelf life is
              invisible from inside the file that contains it. Write down what
              each one assumes exists, and when that thing arrives. If those two
              answers are in the wrong order, you have found next week&rsquo;s
              incident a week early.
            </strong>
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
