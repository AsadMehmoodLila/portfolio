"""Refresh non-secret provenance and audit evidence for the approved avatar revision."""
import hashlib
import json
from pathlib import Path

root = Path(__file__).resolve().parents[1]
job = json.loads((root / 'design/meshy/avatar/job.json').read_text())
geometry_prompt = job['stages'][0]['settings']['prompt']
texture_prompt = job['stages'][1]['settings']['texture_prompt']
avatar_origin = ('Original Meshy character; approved geometry, texture, rig and Hip Hop Dance 591, '
                 '38 credits; Blender local optimization/render. Previous sculpture 20, total 58/100. '
                 'No stock/reference input. Plan-dependent rights. Job: design/meshy/avatar/job.json.')
game_origin = ('Actual Escape Tsunami with Dragons thumbnail from official Roblox APIs; creator '
               'AsadMehmoodLilla. Source metadata design/roblox-source.json. Game currency in artwork '
               'is not a financial claim. Platform/third-party rights are not independently verified.')
for asset, provenance, prompt in [
    ('public/media/avatar-poster.webp', avatar_origin, geometry_prompt + '\nTexture: ' + texture_prompt),
    ('public/media/avatar-dance.glb', avatar_origin, geometry_prompt + '\nTexture: ' + texture_prompt),
    ('public/media/roblox-game.webp', game_origin, 'Retrieved original owner-linked game artwork; no image generation.'),
    ('public/media/roblox-game.png', game_origin, 'Retrieved original owner-linked game artwork; no image generation.'),
]:
    (root / (asset + '.json')).write_text(json.dumps({
        'provenance': provenance, 'prompt': prompt,
        'generated': 'avatar' in asset, 'date': '2026-10-07',
    }, indent=2) + '\n')

prior = {a['path']: a['provenance'] for a in json.loads((root / 'audit/asset-inventory.json').read_text())}
inventory = []
for path in sorted((root / 'public').rglob('*')):
    if not path.is_file() or path.suffix.lower() not in {'.png', '.jpg', '.jpeg', '.webp', '.svg', '.glb'}:
        continue
    relative = path.relative_to(root).as_posix()
    provenance = ('Simple Icons SVG, upstream CC0 license assets/licenses/simple-icons-CC0.md. '
                  'Source https://github.com/simple-icons/simple-icons/blob/develop/icons/' + path.name + '. '
                  'Trademark rights remain with owners; tool identification, not endorsement.') if relative.startswith('public/icons/tools/') else avatar_origin if path.name.startswith('avatar-') else game_origin if path.name.startswith('roblox-game') else prior.get(relative, 'Existing owner-supplied repository asset; rights not independently verified.')
    inventory.append({'path': relative, 'bytes': path.stat().st_size,
                      'sha256': hashlib.sha256(path.read_bytes()).hexdigest(), 'provenance': provenance})
(root / 'audit/asset-inventory.json').write_text(json.dumps(inventory, indent=2) + '\n')

# /get_results clears on read; retain the confirmed final execution metadata.
(root / 'design/figma-revision-result.json').write_text(json.dumps({
    'status': 'success', 'probe': 'portfolio-roblox-revision',
    'mutatedNodeIds': ['82:283', '82:304'],
    'createdNodeIds': [f'85:{i}' for i in range(329, 408)],
    'source': 'Final execution result retrieved from http://localhost:5000/get_results; submission-only processing response excluded.',
    'sourceJob': 'design/figma-revision-job.js',
}, indent=2) + '\n')

audit = root / 'audit/AUDIT.md'
text = audit.read_text(encoding='utf-8-sig')
text = text.replace('The Study Buddy graphic is an illustration, not a form. ', '')
text = text.replace('Removed hotlinked Roblox image; no live social embeds.', 'Replaced the hotlinked Roblox image with a locally served official owner-linked game thumbnail; no live social embeds. The Three.js model and textures are self-hosted. CSP permits same-origin and blob URLs for embedded GLB textures.')
text = text.replace("Meaningful certificate images identify recipient, title and issuer; the decorative sculpture uses empty alt because the page's story is already in text. Illustrative game artwork has an explicit accessible label.", 'Meaningful certificate images identify recipient, title and issuer. The original 3D avatar has an accessible scene description and rotation instructions; its fallback sits in that described figure. Actual game artwork has descriptive alt text.')
old_contrast = 'Two desktop labels required focused review: both are unobscured at 8.00:1, with zero focused axe violations or incomplete checks; see manual-contrast.json. Native-dialog text also required direct inspection because axe flagged underlying page overlap: title and paragraphs measure 13.38:1 and are unobscured in both viewports.'
text = text.replace(old_contrast, 'The new homepage and policy pages have no incomplete checks. Native-dialog text requires direct inspection because axe flags underlying page overlap: title and paragraphs measure 14.94:1 and are unobscured in both viewports; evidence is in browser-results.json. Historical manual contrast records describe the retired dark design and are not current evidence.')
text = text.replace('Native scrolling, reduced-motion preference, no hidden initial factual text, no-JS certificate links, responsive pages and browser zoom permitted.', 'Native scrolling, no hidden initial factual text, no-JS static avatar/certificate links, responsive pages and browser zoom permitted. Actual dance, exact paused frames, keyboard rotation/reset and reduced-motion default stillness until explicit Play were tested. Offscreen/hidden-tab rendering is suspended.')
text = text.replace('Labelled illustrated quiz/emotion data; removed unsupported privacy implication that external AI features stay wholly local.', 'Removed illustrated app panels and sample results; retained concise project descriptions, team attribution, and the disclosure that optional external AI features use external providers.')
text = text.replace('The new sculpture is original prompt-based Meshy output, locally rendered in Blender, credited in the site.', 'The new avatar is original prompt-based Meshy output, locally prepared/rendered in Blender and credited in the site. Actual game artwork was retrieved from official Roblox APIs; source/account matching is recorded.')
text = text.replace('before licensing the sculpture onward.', 'before licensing generated assets onward.')
text = text.replace('The 20-credit job record contains no API key and no temporary signed asset URLs.', 'The Meshy job records contain no API key or temporary signed asset URLs. Total generation spend is 58/100 credits; no retries were submitted.')
evidence_start = text.index('## Evidence and deliverables')
text = text[:evidence_start] + '''## Evidence and deliverables

- Production export: out/; policies: privacy/, terms/, cookies/, refunds/, accessibility/.
- Browser script: scripts/audit-site.mjs; current results: audit/browser-results.json; current desktop/mobile day/night captures: audit/screenshots/. Twenty-eight route/dialog checks have zero violations. Raw native-dialog contrast incompletes have individual measured evidence (14.94:1 day and 15.95:1 night); unresolvedIncomplete is empty. Cookies, browser storage and external runtime requests are zero in the tested build. Actual lighting toggles, in-memory theme continuity across internal links, clean captions and heading punctuation are also tested.
- Avatar: design/meshy/avatar/job.json. Four succeeded paid stages, 38 credits billed; balance 883 to 845. Historical sculpture consumed 20, total 58 of the 100-credit cap. No retries or extra paid work.
- Blender source: design/portfolio-avatar.blend; original downloads: design/meshy/avatar/; current web model: public/media/avatar-dance.glb (1,341,668 bytes); fallback: public/media/avatar-poster.webp. The old sculpture is archived under design/retired-sculpture/ and is not shipped.
- Actual game thumbnail: public/media/roblox-game.webp; source metadata: design/roblox-source.json. Image currency is part of game artwork, not a revenue claim.
- Figma: owned editable portfolio desktop/mobile day frames 82:283 and 82:304 were updated, with night desktop frame 87:408. Confirmed execution: design/figma-atmosphere-result.json. Unrelated Roblox UI was preserved. Tool logos remain editable vectors and text; the avatar image is a discrete content render, not a flattened UI.
- Tool marks: self-hosted Simple Icons SVGs; upstream CC0 license archived. Their trademark rights are not waived and the marks do not imply endorsement.
- This local revision has not been published. The jurisdiction and owner checks above remain open; new artwork does not remove those limits.
'''
audit.write_text(text, encoding='utf-8')
print(f'Refreshed {len(inventory)} asset records, Figma execution and audit findings.')
