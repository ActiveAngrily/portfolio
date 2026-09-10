"""Build the small static detail pages from the shared portfolio shell."""
from pathlib import Path
import re

root = Path(__file__).parent / "dist"
shell = (root / "index.html").read_text()

pages = {
    "me": (
        "A little about me",
        "Meet Anant Jamuar, an ECE student building agentic AI, clinical tools, and real-time edge systems.",
        '''<img class="portrait" src="/assets/portrait.jpg" alt="Portrait of Anant Jamuar" width="124" height="124"><h1>I like building where the demo usually breaks.</h1><p>I’m Anant, a final-year Electronics and Communication Engineering student at Sir MVIT in Bengaluru.</p><p>I’m drawn to the awkward stretch between a model and the real world: unreliable payloads, slow APIs, blocked pages, and hardware that keeps its own time. That’s where the interesting work tends to hide.</p><section class="detail-section"><h2>side quests these days</h2><div class="side-quests"><span>⌨ Building AI agents</span><span>⚙ Chasing milliseconds at the edge</span><span>✎ Stress-testing model APIs</span></div></section><section class="detail-section"><h2>experience.</h2><h3>AI/ML intern · Svasthiya Technologies</h3><p class="case-note">February to June 2026 · Bengaluru</p><p>I built a Python diagnostic platform for model APIs, then used it to study latency, failure modes, and output consistency across 13 models. The work helped qualify 4 models for the product roadmap and turn error telemetry into fixes with the engineering team.</p></section><section class="detail-section"><h2>education.</h2><h3>B.E. in Electronics and Communication Engineering</h3><p class="case-note">Sir M. Visvesvaraya Institute of Technology · expected August 2027</p><p>I also completed NPTEL’s Mathematical Foundations of Machine Learning course and chair Sir MVIT’s IEEE EMBS student chapter as part of its founding committee.</p></section><section class="detail-section"><h2>the tools on my desk.</h2><p>Python, TypeScript, PyTorch, FastAPI, Next.js, PostgreSQL, Docker, ROS, Playwright, and whichever debugger tells the truth.</p></section><section class="detail-section"><h2>Let’s make something thoughtful.</h2><a class="pill" href="/contact/">say hello</a></section>''',
    ),
    "contact": (
        "Say hello",
        "Get in touch with Anant Jamuar about AI engineering, real-time systems, or an interesting problem.",
        '''<span class="section-label">a conversation starts somewhere</span><h1>Have a strange problem? I’m listening.</h1><p>I’m open to internships, apprenticeships, pre-graduation roles, and small engineering projects where AI has to survive contact with the real world.</p><div class="contact-note"><p><a href="mailto:jamuaranant@gmail.com">jamuaranant@gmail.com</a></p><p><a href="https://www.linkedin.com/in/jamuaranant/" target="_blank" rel="noreferrer">LinkedIn ↗</a> · <a href="https://github.com/ActiveAngrily" target="_blank" rel="noreferrer">GitHub ↗</a></p><p class="case-note">Based in Bengaluru, India.</p></div>''',
    ),
}

cases = [
    (
        "red-letter",
        "A newspaper with 8 minds",
        "How Anant built Red Letter, an autonomous news engine spanning 22 publishers and 8 AI personas.",
        "project · autonomous news",
        "Red Letter follows a story from discovery to a finished, multi-source report without waiting for an editor to move it along.",
        "Independent project · June to July 2026",
        "Multi-agent systems",
        "Red Letter",
        [("Publishers", "22"), ("Entry points", "46"), ("Agent personas", "8"), ("URLs per publisher", "up to 60")],
        "News pages arrive in every shape imaginable. Stories repeat across outlets, important context gets split between sources, and some pages would rather talk to a browser than a scraper.",
        "I split the system into 3 stages: discovery, extraction, and clustering. Playwright and Cheerio collect the reporting, Gemini embeds prose in batches of 90, and a 0.82 cosine threshold groups coverage of the same event. A commander then routes each cluster to 1 of 8 tightly prompted personas, with JSON schemas keeping the handoffs predictable.",
        "The pipeline now serves a live Next.js frontend backed by Appwrite and scheduled through GitHub Actions. The useful lesson was simple: agents behave better when every handoff has a narrow job and a shape it must return.",
        ("visit Red Letter ↗", "https://redletter.cc.cd"),
    ),
    (
        "crucible",
        "Teaching a car to notice trouble",
        "Crucible is Anant's real-time CAN-bus intrusion detector with sub-15ms edge inference.",
        "project · edge ai",
        "Crucible listens to a vehicle’s CAN telemetry and raises a warning when the signals start behaving like an attack.",
        "Research project · November 2025 to January 2026",
        "Real-time anomaly detection",
        "Crucible",
        [("Telemetry signals", "11"), ("Sliding window", "50 timesteps"), ("Inference", "under 15 ms"), ("Risk levels", "3")],
        "A useful detector has a tiny window to react. It also has to separate an actual control injection from the ordinary noise of a moving vehicle.",
        "I trained a temporal convolutional network with 64 to 128 Conv1d channels, then compiled it with TorchScript and Core ML FP16 for constant-time edge inference. A ROS Melodic subscriber watches 11 signals and maps reconstruction error against a 0.3101 MSE baseline into 3 risk levels.",
        "I bridged CARLA on macOS to an x86 Linux Docker container and built an adversarial injection suite for packet spoofing, steering anomalies, and control hijacking. Breaking the detector on purpose made the real-time path much easier to trust.",
        ("view the code ↗", "https://github.com/ActiveAngrily/can-tcn-anomaly"),
    ),
    (
        "curieon",
        "Helping urgent cases move first",
        "Curieon is Anant's in-progress AI-assisted diagnostic platform for severity-ranked clinical triage.",
        "project · clinical ai",
        "Curieon turns incoming clinical data into a severity-ranked queue, so the records needing attention rise first.",
        "In progress · since July 2026",
        "Clinical data triage",
        "Curieon",
        [("API", "FastAPI"), ("Database", "PostgreSQL"), ("Runtime", "Docker"), ("Queue", "severity ranked")],
        "Clinical data rarely arrives as one neat record at a time. Batch traffic, malformed schemas, and new records landing mid-review can make a queue drift away from what is urgent.",
        "I built an asynchronous Python backend for batch evaluation and live database indexing. Validation catches malformed input before it travels downstream, while the triage queue recalculates severity as new records arrive.",
        "The project is still in progress. The current work is about making the data path dependable before adding more intelligence around it.",
        None,
    ),
    (
        "latent-diffusion",
        "Growing synthetic tumours in latent space",
        "Anant's 2-stage latent diffusion pipeline for synthetic brain MRI generation using BraTS 2020 data.",
        "project · medical imaging",
        "This research project uses latent diffusion to generate synthetic brain MRI scans from the BraTS 2020 dataset.",
        "Research project · March to April 2026",
        "Synthetic medical imaging",
        "Latent diffusion pipeline",
        [("Training data", "24,000+ slices"), ("Stages", "2"), ("Compression", "AutoencoderKL"), ("Denoiser", "UNet")],
        "Full-resolution MRI scans are expensive to model directly. The useful structure still needs to survive any compression step, especially around the tumour region.",
        "I trained an AutoencoderKL to compress the scans into a smaller latent space, then trained a UNet diffusion model to generate there. Splitting reconstruction from generation made the experiment easier to train and inspect.",
        "The result is a complete 2-stage PyTorch pipeline for studying synthetic tumour generation. It gave me a practical feel for the gap between a tidy diffusion diagram and the work of preparing 24,000+ medical image slices.",
        ("view the code ↗", "https://github.com/ActiveAngrily/latent-diffusion-tumor-synthesis"),
    ),
]

for slug, title, description, label, intro, project_type, focus, preview, rows, challenge, solution, reflection, link in cases:
    row_html = "".join(f'<div class="preview-row"><span>{a}</span><span>{b}</span></div>' for a, b in rows)
    link_html = f'<a class="pill" href="{link[1]}" target="_blank" rel="noreferrer">{link[0]}</a>' if link else ""
    pages["work/" + slug] = (
        title,
        description,
        f'''<span class="section-label">{label}</span><h1>{title}</h1><p>{intro}</p><dl class="details-grid"><div><dt>Project type</dt><dd>{project_type}</dd></div><div><dt>Focus</dt><dd>{focus}</dd></div></dl>{link_html}<section class="detail-section"><h2>A few useful details.</h2><div class="concept-preview"><div class="preview-bar"><strong>{preview}</strong><span>at a glance</span></div>{row_html}</div></section><section class="detail-section"><span class="section-label">the messy bit</span><h2>The problem had sharp edges.</h2><p>{challenge}</p></section><section class="detail-section"><span class="section-label">how I built it</span><h2>Give each part one clear job.</h2><p>{solution}</p></section><section class="detail-section"><span class="section-label">where it landed</span><h2>What I carried forward.</h2><p>{reflection}</p></section>''',
    )

for path, (title, description, body) in pages.items():
    page = shell.replace("<body>", '<body class="detail">')
    page = re.sub(r"<title>.*?</title>", f"<title>{title} · Anant Jamuar</title>", page)
    page = re.sub(r'<meta name="description" content=".*?">', f'<meta name="description" content="{description}">', page)
    page = re.sub(
        r'<main id="content" tabindex="-1">.*?</main>',
        '<main id="content" tabindex="-1">' + body + '<a class="back-link" href="/">← back to work</a></main>',
        page,
        flags=re.S,
    )
    destination = root / path / "index.html"
    destination.parent.mkdir(parents=True, exist_ok=True)
    destination.write_text(page)

print(f"Generated {len(pages)} detail pages.")
