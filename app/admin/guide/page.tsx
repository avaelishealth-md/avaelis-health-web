export const dynamic = "force-static";

export default function GuidePage() {
  return (
    <div className="adm-wrap adm-guide">
      <div className="adm-page-head">
        <div>
          <h1>Blogging guide</h1>
          <p className="sub">How to write, format and publish a post. No tech knowledge needed.</p>
        </div>
        <a className="adm-btn ghost" href="/" target="_blank" rel="noopener">View site ↗</a>
      </div>

      <div className="guide-switch">
        <a className="on" href="/admin/guide">Blogging</a>
        <a href="/admin/guide/engine">Content Engine</a>
      </div>

      <div className="adm-card guide-body">
        <h2>How a post reaches your site</h2>
        <p>Most posts start in the <b>Content Engine</b>, which writes the article and drops it here as a <b>draft</b>. You review it, then publish. You can also write one from scratch. Either way, <b>nothing goes live until you press Publish.</b></p>
        <div className="flow">
          <div className="flow-step">Your notes<small>or a talk / document</small></div>
          <div className="flow-arrow">→</div>
          <div className="flow-step is-engine">Content Engine<small>writes &amp; references it</small></div>
          <div className="flow-arrow">→</div>
          <div className="flow-step">Draft in Studio<small>arrives automatically</small></div>
          <div className="flow-arrow">→</div>
          <div className="flow-step is-pub">You publish<small>live on your site</small></div>
        </div>
        <p className="guide-note">New to the engine? See the <a href="/admin/guide/engine">Content Engine guide</a>. To write by hand instead, press <b>New post</b> and start typing.</p>

        <h2>The editor toolbar</h2>
        <p>Select some text first, then click a button. Hover any button to see what it does.</p>

        <h3>Headings &amp; text</h3>
        <div className="feat-grid">
          <div className="feat-row"><span className="feat-key">H1 H2 H3</span><span className="d">Section headings (H2 for sections, H3 for sub-points)</span></div>
          <div className="feat-row"><span className="feat-key">P</span><span className="d">Normal paragraph text</span></div>
          <div className="feat-row"><span className="feat-key">B  I  U</span><span className="d">Bold, italic, underline</span></div>
          <div className="feat-row"><span className="feat-key">S  &lt;&gt;</span><span className="d">Strikethrough, inline code</span></div>
        </div>

        <h3>Layout</h3>
        <div className="feat-grid">
          <div className="feat-row"><span className="feat-key">⯇ ≡ ⯈</span><span className="d">Align left, centre, right</span></div>
          <div className="feat-row"><span className="feat-key">• List</span><span className="d">Bulleted list</span></div>
          <div className="feat-row"><span className="feat-key">1. List</span><span className="d">Numbered list</span></div>
          <div className="feat-row"><span className="feat-key">Quote</span><span className="d">Pull-quote / highlighted line</span></div>
          <div className="feat-row"><span className="feat-key">HR</span><span className="d">Divider line between sections</span></div>
          <div className="feat-row"><span className="feat-key">Code</span><span className="d">Code block (rarely needed)</span></div>
        </div>

        <h3>Insert</h3>
        <div className="feat-grid">
          <div className="feat-row"><span className="feat-key">Link</span><span className="d">Turn selected text into a link</span></div>
          <div className="feat-row"><span className="feat-key">Image</span><span className="d">Upload a photo from your computer</span></div>
          <div className="feat-row"><span className="feat-key">Video</span><span className="d">Embed a YouTube video (paste its link)</span></div>
        </div>

        <h3>Tables</h3>
        <div className="feat-grid">
          <div className="feat-row"><span className="feat-key">Table</span><span className="d">Insert a table (starts 3×3 with a header row)</span></div>
          <div className="feat-row"><span className="feat-key">+Col -Col</span><span className="d">Add or remove a column</span></div>
          <div className="feat-row"><span className="feat-key">+Row -Row</span><span className="d">Add or remove a row</span></div>
          <div className="feat-row"><span className="feat-key">Del table</span><span className="d">Remove the whole table</span></div>
        </div>
        <p className="guide-note"><b>Tip:</b> click inside a table first, then the +Col / +Row buttons switch on. Drag a column edge to resize it.</p>

        <h3>Safety net</h3>
        <div className="feat-grid">
          <div className="feat-row"><span className="feat-key">↶  ↷</span><span className="d">Undo / redo</span></div>
          <div className="feat-row"><span className="feat-key">words</span><span className="d">Live word count &amp; read time, bottom of the editor</span></div>
        </div>

        <h2>The fields around the article</h2>
        <ul>
          <li><b>Title</b> &amp; <b>Excerpt</b> — the headline and the one-line summary shown on your Writing page.</li>
          <li><b>Cover image</b> — Upload a landscape photo (it crops best).</li>
          <li><b>Audience</b> — <b>Public</b> shows on your Writing page; <b>Clinician</b> stays unlisted (direct link only).</li>
          <li><b>Tags</b> &amp; <b>SEO</b> — optional; help people find the article on Google.</li>
        </ul>

        <h2>Publishing</h2>
        <ol>
          <li><b>Save draft</b> as you go (nothing is public yet).</li>
          <li><b>Preview</b> to see exactly how it will look.</li>
          <li><b>Publish</b> when you are happy. It is live in moments.</li>
        </ol>
        <p className="guide-note">To change a live post: open it, edit, Publish again. To take one down: <b>Unpublish</b> (it returns to draft). And <b>no em dashes</b> ( — ); a comma or full stop reads more human.</p>
      </div>
    </div>
  );
}
