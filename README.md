# AsadLilla Portfolio

A responsive static portfolio for **Asad Mehmood**, ready for GitHub Pages and the custom domain **asadlilla.me**.

## 1. Personalize the links

Open `js/config.js` and replace:

- `YOUR_EMAIL@example.com`
- `YOUR_GITHUB_USERNAME`
- `YOUR_LINKEDIN_USERNAME`
- the Roblox game URL

This is the only file you must edit before publishing.

## 2. Preview on your computer

Open `index.html` directly, or use VS Code's **Live Server** extension.

## 3. Upload to GitHub

Create a public GitHub repository, place all files in the repository root, then run:

```bash
git init
git add .
git commit -m "Create portfolio website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
git push -u origin main
```

## 4. Enable GitHub Pages

Go to:

`Repository → Settings → Pages`

Choose:

- Source: **Deploy from a branch**
- Branch: **main**
- Folder: **/(root)**

The included `CNAME` file already contains `asadlilla.me`.

## 5. Namecheap DNS records

In Namecheap:

`Domain List → Manage → Advanced DNS`

Add these GitHub Pages records:

| Type | Host | Value |
|---|---|---|
| A Record | @ | 185.199.108.153 |
| A Record | @ | 185.199.109.153 |
| A Record | @ | 185.199.110.153 |
| A Record | @ | 185.199.111.153 |
| CNAME Record | www | YOUR_USERNAME.github.io |

Remove conflicting parking or URL redirect records for `@` and `www`.

After DNS verification completes in GitHub Pages, turn on **Enforce HTTPS**.

## 6. Replace the artwork later

The files in `assets/images/` are custom placeholders. Replace them with real project screenshots using the same filenames, or update the paths in the HTML.

## Files

- `index.html` — main portfolio
- `projects.html` — detailed project summaries
- `resume.html` — web résumé with Print/Save PDF button
- `css/style.css` — all styling and responsive layouts
- `js/config.js` — contact and profile links
- `js/main.js` — theme, mobile menu, reveal effects, dynamic links
- `CNAME` — custom GitHub Pages domain
