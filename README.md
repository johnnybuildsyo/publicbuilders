# PUBLICBUILDERS

A directory of who is who in #buildinpublic. Indie hackers, startup founders and ambitious makers.

----

## TODO

1. Get initial list of builders ✅
2. Add pictures ✅
3. Add application form ✅
4. Add link to build log ✅
5. Add google analytics ✅
6. Add privacy policy and terms of use ✅
7. Add feedback form
8. Add favorite button with google event tracking and local storage
9. Profile view
10. Set up API that pulls stats
11. Show a list of projects
12. Show a list of posts
13. Show a list of repos
14. Show random button
15. Use AI to analyze Bing Search API and provide insights
16. Automated Newsletter

----

## BUILD LOG
[Generate Commit Stats](https://gist.github.com/johnnybuildsyo/16a77a2f20970cc054a07b53b7f900f1)

Watch me [iterate with ChatGPT](https://chatgpt.com/share/672e9d92-5d28-8009-a2b2-d218036d322a)

--

**2024-11-10**  
📄 Updated [About Page](https://publicbuilders.org/about)
🔗 Added links to [Build Log](https://github.com/johnnybuildsyo/publicbuilders/blob/main/README.md)
💬 Added Contact link pointing to [Github Discussions](https://github.com/johnnybuildsyo/publicbuilders/discussions)
📈 Added Google Analytics
⏫ ??

--

**2024-11-09**  
👍 Add admin approval page (local env only)
👮 Added backend for admin submission review
⏫ Files changed: 29, Lines added: 773, Lines deleted: 381

--

**2024-11-08**  
😸 Setup Github commit flow for join requests  
👮 Refactored typings to infer from zod  
🎉 First successful form submission
⏫ Files changed: 178, Lines added: 19836, Lines deleted: 3100

[Public Builders Join Request Form Submissions Data](https://github.com/johnnybuildsyo/publicbuilders/tree/main/data/submissions)

--

**2024-11-07**  
🪪 Added ReCAPTCHA to join form  
🤚 UI Improvements builder join request form  
😩 Signed up to new X account after mystery lockout  
🔁 Made CLI tool to generate commit stats + added Build Log to README   
⏫ Files changed: 24, Lines added: 1895, Lines deleted: 203

[git-daily-summary.sh](https://gist.github.com/johnnybuildsyo/16a77a2f20970cc054a07b53b7f900f1)  
[x/johnnybuilds_](https://x.com/johnnybuilds_)

--

**2024-11-06**  
🪪 Added missing builder data  
😩 Been locked out of my X account for 2 days  
🔁 Used ChatGPT to normalize tagging in my json data  
🤚 Added UI for the builder join request form  
⏫ Files changed: 13, Lines added: 860, Lines deleted: 1035  

[chatgpt.com/share/..](https://chatgpt.com/share/672c1f20-db90-8009-af3b-3d5a81d35aae)

--

**2024-11-05**
🛠️ Grinding on creating initial list of builders  
👤 Improved CLI command to auto batch upload missing profile images to my S3  
🔍 Added sorting and searching  
⏫ Files changed: 11, Lines added: 1197, Lines deleted: 390  

--

**2024-11-04**
🤘 Went from empty project directory to initial prototype.  
🛠️ Creating initial list of builders  
👤 Made script for uploading profile images  
🚫 Tried/failed to find social media data solution  
⏫ Files changed: 12, Lines added: 2498, Lines deleted: 269

--

**2024-11-03**  
🚀 Bought [publicbuilders.org](https://publicbuilders.org) 
🚀 Generated a [prototype on v0](https://v0.dev/chat/wQ2wK1qyHMB?b=b_bbroDnKtltd)  
🦋 Deployed, shared on [Bluesky](https://bsky.app/profile/johnnybuilds.bsky.social/post/3la3eqi7lun2c)  
😎 Updated [JohnnyBuilds.com](https://johnnybuilds.com) project status  
⏫ Files changed: 86, Lines added: 12129, Lines deleted: 697


----

Build log generator command:

```
git log --since="1 month ago" --date=short --pretty=format:"%cd" --shortstat | \
awk '
    /^20[0-9]{2}-[0-9]{2}-[0-9]{2}/ { 
        date=$1 
    } 
    /files changed/ { 
        files[date]+=$1; inserted[date]+=$4; deleted[date]+=$6 
    } 
    END { 
        for (d in files) 
            printf "%s - Files changed: %s, Lines added: %s, Lines deleted: %s\n", d, files[d], inserted[d], deleted[d] 
    }
' | sort
```