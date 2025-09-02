# FastForm

**A form builder that doesn't suck.**

Stop wrestling with Google Forms' garbage UX. FastForm gives you Notion-style editing with zero learning curve.

## What it does

- **Build forms fast** - Use `/` to add questions, just like Notion
- **Multi-step forms** - Page breaks that actually work
- **Share instantly** - Get a public URL, done
- **Collect responses** - View submissions in real-time

## Why it exists

Google Forms is from 2008. The UX is terrible. You can't make multi-step forms without hacks. The editor feels like Microsoft Word from 1995.

We built FastForm because we got tired of explaining to clients why their forms look like shit.

## How it works

1. Open FastForm
2. Type `/` to add questions
3. Hit Save
4. Share the link
5. Responses flow in

That's it. No 47-step setup wizard. No "upgrade to Pro for basic features."

## Tech

- **Frontend**: Next.js 15, BlockNote editor, ShadCN/UI
- **Backend**: Express, Supabase
- **Auth**: Clerk (because rolling your own auth is stupid)

## Demo

Try it: [fastform.dev](https://fastform.dev) *(shipping MVP in 48 hours)*

## Install

```bash
git clone https://github.com/yourusername/fastform
cd fastform

# Frontend
cd frontend && npm install && npm run dev

# Backend  
cd backend && npm install && npm run dev
```

Set your env vars (Clerk, Supabase) and you're good.

## Status

**Shipping MVP this week.** Currently fixing the last few bugs.

- [x] Form builder works
- [x] Form player works  
- [x] Multi-step forms
- [ ] Response collection (99% done)
- [ ] Form management dashboard
- [ ] Proper mobile support

## Why not just use X?

- **Typeform** - Expensive, slow, over-engineered
- **Google Forms** - Ugly, limited, feels ancient  
- **Airtable Forms** - Overkill for simple forms
- **JotForm** - Cluttered UI, nickel-and-dimes you

FastForm is fast, clean, and gets out of your way.

## Contributing

Found a bug? Open an issue.
Want a feature? Build it and send a PR.
Want to complain? Use Twitter.

## License

MIT. Do whatever you want with it.

---

*Built by [@alvin](https://twitter.com/e3he0) because you shouldnt pay $1000 to build beautiful forms.*