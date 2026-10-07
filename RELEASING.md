# Releasing

How to cut a new release of the extension. Written for Claude Code; run the steps in order.

Reference release to copy the exact style: `v3.1.1` (commit `909eeba`).

## Facts you need first

- The version lives in **one place**: `package.json` → `"version"`. `manifest.js` reads it from there, so nothing else needs editing.
- `CHANGELOG.md` lists **only user-facing changes**. A dependency-only or internal-refactor commit does not get a changelog line.
- A release = a `Release vX.Y.Z` commit + a pushed `vX.Y.Z` git tag + a GitHub release. The GitHub release has an **empty title**; its body is a single link to the CHANGELOG anchor.
- A versioned **source snapshot** (copy of the project, no build output) is zipped into the parent directory as a backup — this is not the store-upload package.

## Steps

### 1. Decide the version

Check where things stand, then pick the next semver number:

```bash
grep '"version"' package.json          # current version
gh release list -L 5                   # latest published release
git log --oneline "$(git describe --tags --abbrev=0)"..HEAD   # commits since last tag
```

Bump patch for bug fixes, minor for new features. If `package.json` is already ahead of the latest tag, release the next number after `package.json`'s current value.

### 2. Bump `package.json`

Edit `"version"` to the new `X.Y.Z`.

### 3. Update `CHANGELOG.md`

Add a new section at the very top, right under `# Changelog`:

```markdown
## vX.Y.Z (DD.MM.YYYY)

### Bugs

- Short description of the user-facing fix
```

- Date is **today** in `DD.MM.YYYY`.
- Use `### Enhancements` for features, `### Bugs` for fixes (a section can have both).
- One bullet per user-facing change. Skip internal/dependency commits.

### 4. Commit

Stage **only** the two release files — never sweep in stray untracked files (e.g. a `package-lock.json` or `pnpm-workspace.yaml` that shouldn't be there):

```bash
git add package.json CHANGELOG.md
git commit -m "Release vX.Y.Z"
```

### 5. Push and create the GitHub release

```bash
git push origin master
gh release create vX.Y.Z --target master --title "" \
  --notes "Details in the [CHANGELOG](https://github.com/Nitrino/easysubs/blob/master/CHANGELOG.md#<anchor>)"
```

**Anchor** = the CHANGELOG heading, lowercased, with dots and parentheses dropped and spaces turned into hyphens:

- `## v3.1.3 (08.07.2026)` → `v313-08072026`
- `## v3.2.0 (15.01.2027)` → `v320-15012027`

Verify: `gh release view vX.Y.Z`.

### 6. Build and clean the dist

The OpenSubtitles API key of EasySubs goes into the build from `VITE_OPENSUBTITLES_API_KEY` (in `.env`, which isn't
committed). Without it the search skips OpenSubtitles and its files come from the Stremio mirror.

```bash
grep -q VITE_OPENSUBTITLES_API_KEY .env || echo "No OpenSubtitles key in .env"
pnpm build                        # runs tsc --noEmit && vite build
grep '"version"' dist/manifest.json    # confirm it says X.Y.Z
find dist -name .DS_Store -delete
```

If `pnpm build` fails with a workspace error, a stray `pnpm-workspace.yaml` in the project root is the likely cause — move it aside, build, move it back.

### 7. Make the versioned source snapshot + zip

Copy the whole project into the parent dir, excluding build output, VCS, deps, docs, and stray lockfiles (this matches what `v3.1.1` shipped):

```bash
cd /Users/nitrino/develop/easysubs
rsync -a \
  --exclude 'node_modules' --exclude '.git' --exclude 'dist' \
  --exclude '.DS_Store' --exclude 'docs' \
  --exclude 'package-lock.json' --exclude 'pnpm-workspace.yaml' \
  "easysubs-extension/" "easysubs-extension vX.Y.Z/"

zip -r -X -q "easysubs-extension vX.Y.Z.zip" "easysubs-extension vX.Y.Z" -x "*.DS_Store"
```

Sanity check: the snapshot must **not** contain `node_modules`, `.git`, or `dist`, and the zip should be ~1.5M (a multi-MB zip means `docs/` or `node_modules` leaked in).

## Final checklist

- [ ] `package.json` and `CHANGELOG.md` show the new version
- [ ] `Release vX.Y.Z` commit pushed; `HEAD` == `origin/master`
- [ ] `gh release view vX.Y.Z` shows the tag and CHANGELOG link
- [ ] `dist/manifest.json` version matches; no `.DS_Store` in `dist`
- [ ] `../easysubs-extension vX.Y.Z/` snapshot + `.zip` exist and are clean
