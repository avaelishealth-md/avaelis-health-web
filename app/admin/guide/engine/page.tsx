export const dynamic = "force-static";

export default function EngineGuidePage() {
  return (
    <div className="adm-wrap adm-guide">
      <div className="adm-page-head">
        <div>
          <h1>Content Engine guide</h1>
          <p className="sub">Turn rough notes into a polished, referenced article, ready to publish.</p>
        </div>
        <a className="adm-btn ghost" href="/" target="_blank" rel="noopener">View site ↗</a>
      </div>

      <div className="guide-switch">
        <a href="/admin/guide">Blogging</a>
        <a className="on" href="/admin/guide/engine">Content Engine</a>
      </div>

      <div className="adm-card guide-body">
        <h2>What it is</h2>
        <p>The Content Engine takes your raw material, notes, a talk transcript, or a document, and writes a polished article <b>in your voice</b>. It checks it against Australian advertising rules, backs it with real medical studies, and sends it to your Studio as a draft. You review and publish.</p>
        <div className="flow">
          <div className="flow-step">Your notes</div>
          <div className="flow-arrow">→</div>
          <div className="flow-step is-engine">Content Engine<small>check · reference · write · review</small></div>
          <div className="flow-arrow">→</div>
          <div className="flow-step">Draft in Studio</div>
          <div className="flow-arrow">→</div>
          <div className="flow-step is-pub">You publish</div>
        </div>

        <h2>The model &amp; the cost</h2>
        <div className="cost-box">
          <div className="cb">
            <div className="lbl">Model</div>
            <div className="val">Claude Sonnet 4.6<small>Anthropic&apos;s model writes and safety-checks every article.</small></div>
          </div>
          <div className="cb">
            <div className="lbl">Cost</div>
            <div className="val">Low, and shown upfront<small>The generate screen shows an estimate before you run it, and a running total as it works. A standard article is inexpensive.</small></div>
          </div>
          <div className="cb">
            <div className="lbl">Your content</div>
            <div className="val">Stays with Claude<small>Processed only by Anthropic, never sent to other AI providers.</small></div>
          </div>
        </div>

        <h2>Step by step</h2>
        <ol className="pipe">
          <li><b>New submission.</b> Paste your notes or upload a document. Choose <b>AvaElis Health</b> and the audience (General public or Health professionals), then submit.</li>
          <li><b>Compliance check.</b> It scans for anything that breaks the rules (the words &ldquo;miracle&rdquo; or &ldquo;cure&rdquo;, prescription-drug names, testimonials) and shows you each one to soften. This runs again automatically before delivery.</li>
          <li><b>References.</b> Add real studies to ground the article (see below).</li>
          <li><b>Generate.</b> Choose <b>Blog</b> and <b>Standard (~1,500 words)</b>. Check the cost estimate, then run it. Takes a minute or two.</li>
          <li><b>Review.</b> Read the draft, edit any wording, clear any final flags.</li>
          <li><b>Approve &amp; deliver.</b> The finished article lands in your Studio as a draft.</li>
        </ol>

        <h2>Using the reference feature</h2>
        <p>Real citations are what make the article credible. After the compliance check, the <b>Credible references</b> panel appears:</p>
        <ol>
          <li>Click <b>Auto-find references</b>, or type your own terms in <b>Find references</b>.</li>
          <li>Set <b>Sort: Most cited</b> so the strongest, most-trusted studies rise to the top. Optionally filter by <b>Meta-analyses / Systematic reviews / RCTs</b> or by date.</li>
          <li>Tick about <b>4 studies that support different points</b> in the article.</li>
          <li>The engine cites exactly those, with working links, and <b>will not invent any</b>. (Still worth a 30-second glance before publishing.)</li>
        </ol>
        <p className="guide-note">The references then appear as a tidy, numbered list at the foot of the article on your site.</p>

        <h2>What you get</h2>
        <p>One submission produces a publish-ready blog draft in your Studio. Open it, add a cover image, set the audience, and Publish, all covered in the <a href="/admin/guide">Blogging guide</a>.</p>
      </div>
    </div>
  );
}
