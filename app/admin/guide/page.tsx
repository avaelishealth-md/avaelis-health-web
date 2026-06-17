export const dynamic = "force-static";

export default function GuidePage() {
  return (
    <div className="adm-wrap adm-guide">
      <div className="adm-page-head">
        <div>
          <h1>Your blogging guide</h1>
          <p className="sub">Everything you need to write and publish on your AvaElis site. No tech knowledge required.</p>
        </div>
        <a className="adm-btn ghost" href="/" target="_blank" rel="noopener">View site ↗</a>
      </div>

      <p className="adm-help">
        <b>The 10-second version:</b> use the <b>Content Engine</b> to draft an article from your notes, it arrives here as a draft, you add a cover image and press <b>Publish</b>. Nothing goes live until you do.
      </p>

      <div className="adm-card guide-body">
        <h2>1. How to log in</h2>
        <ol>
          <li>Go to <code>avaelishealth.com.au/admin</code></li>
          <li>Enter your email: <b>drdannycai@gmail.com</b></li>
          <li>Press <b>Send magic link</b>.</li>
          <li>Open the email and click the login link. You are in. There is no password, you get a fresh link each time, so bookmark the page.</li>
        </ol>

        <h2>2. The Studio at a glance</h2>
        <p>Across the top: <b>Posts</b> (all your articles), <b>New post</b>, <b>View site ↗</b> (opens your live website), and <b>Sign out</b>. Each post shows a thumbnail, its status (Draft or Published) and its audience.</p>
        <p className="guide-note"><b>Public vs Clinician.</b> <b>Public</b> posts appear on your Writing page for everyone. <b>Clinician</b> posts stay hidden and only open through a direct link you share, which is handy for technical summaries aimed at other doctors.</p>

        <h2>3. The easy way: the Content Engine</h2>
        <p>The Content Engine is your AI drafting assistant. Give it rough material, your notes, a talk transcript, or a document, and it writes a polished, referenced article in your voice, checks it against advertising rules, and sends it here as a draft.</p>
        <ol>
          <li>Open the engine (ask Jason for your link the first time).</li>
          <li><b>New submission:</b> paste your notes or upload a document, choose <b>AvaElis Health</b>, pick the audience, and submit.</li>
          <li><b>Compliance check:</b> it flags anything that breaks Australian advertising rules (the words &ldquo;miracle&rdquo; or &ldquo;cure&rdquo;, naming a prescription medicine, patient testimonials). Soften each one as prompted.</li>
          <li><b>References:</b> it finds real medical studies. Tick about four strong ones.</li>
          <li><b>Generate:</b> choose <b>Blog</b> and <b>Standard (about 1,500 words)</b>.</li>
          <li><b>Review:</b> read it, tweak anything, clear any final flags.</li>
          <li><b>Approve and deliver:</b> it arrives in your Studio as a draft.</li>
        </ol>

        <h2>4. The hands-on way: write it yourself</h2>
        <p>Click <b>New post</b>, add a <b>Title</b>, and write the <b>Body</b>. The toolbar gives you headings, bold, lists, links, images and tables, like a word processor. Then add an <b>Excerpt</b> (the one-line summary shown on your Writing page), a <b>Cover image</b>, the <b>Audience</b>, and optional <b>Tags</b> and <b>SEO</b>. Use <b>Save draft</b> as you go.</p>

        <h2>5. Publishing, the last step for any post</h2>
        <ol>
          <li>Open the post and check the cover image, excerpt and audience.</li>
          <li>Press <b>Preview</b> to see exactly how it will look.</li>
          <li>Press <b>Publish</b>. It is live on your Writing page within moments.</li>
        </ol>
        <p className="guide-note">To change a live post, open it, edit, and Publish again. To take one down, press <b>Unpublish</b> and it returns to draft, nothing is lost.</p>

        <h2>6. Five habits for great posts</h2>
        <ul>
          <li><b>Always Preview before you Publish.</b></li>
          <li><b>No em dashes.</b> They read as &ldquo;AI wrote this&rdquo;. Use a comma or a full stop instead. The engine sometimes adds them, so a quick read-through catches them.</li>
          <li><b>Glance at the references</b> before publishing. They are real studies, but a 30-second check that each one is right is worth it.</li>
          <li><b>Never name a prescription medicine or promise a &ldquo;cure&rdquo;.</b> The compliance check guards this, but keep it in mind for anything you type yourself.</li>
          <li><b>Use landscape cover photos.</b> They crop best on the Writing page.</li>
        </ul>

        <h2>7. If something goes wrong</h2>
        <ul>
          <li>No login email: check your spam folder, then request another link.</li>
          <li>A post is not showing on the Writing page: check its audience is <b>Public</b> and its status is <b>Published</b>.</li>
          <li>Anything else: message Jason.</li>
        </ul>
      </div>
    </div>
  );
}
