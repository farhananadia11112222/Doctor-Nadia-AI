# Doctor AI starter

This is a starter project for a Bengali/English educational chatbot.

## Files
- `index.html` — website UI
- `api/chat.js` — server-side Gemini API endpoint
- `package.json` — dependencies

## Deploy on Vercel
1. Upload all files/folders in this project to the root of your GitHub repository.
2. Import that GitHub repository in Vercel.
3. In Vercel, open **Project → Settings → Environment Variables**.
4. Add `GEMINI_API_KEY` as the name and paste your Gemini API key as the value. Do not put the key in any source file or public GitHub repository.
5. Redeploy after saving the environment variable.

## Important
- API access and hosting may have usage limits or charges; check current plans and quotas.
- This is an educational demo, not a medical device. Validate medical outputs before real use.
- Before public launch, add rate limiting/abuse prevention, monitoring, a privacy policy, and suitable safeguards. Do not collect patient-identifying information.
