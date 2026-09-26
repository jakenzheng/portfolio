# Jake Zheng portfolio

This is a dependency-free static site. No install or build step is required.

## Preview locally

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Publish from GitHub

1. Push this folder to a GitHub repository.
2. Open the repository's **Settings → Pages**.
3. Under **Build and deployment**, select **Deploy from a branch**.
4. Select the `main` branch and `/(root)`, then save.

GitHub Pages will serve `index.html` directly and redeploy after each push.
