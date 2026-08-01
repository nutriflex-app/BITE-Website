---
title: "AI Food Photos Can't See the Butter"
description: "A new NIDDK study found photo-tracking apps underestimate calories by up to 345 per meal, mostly because fat is nearly invisible in a photograph. What that means for anyone trusting a number an AI gives them."
pubDate: 2026-08-01
author: "Michael"
heroImage: "https://d8j0ntlcm91z4.cloudfront.net/user_3ElLNwQpO0GqKZ9IN6sdAl7YP6i/hf_20260801_151307_f0db3008-b9ab-48d3-88a1-70714e5dc621.png"
heroImageAlt: "A phone photographing a plated meal, with butter, oil and dressing drawn as faint outlines the camera cannot see"
tags: ["The Nutrient", "AI & nutrition", "Food tracking accuracy"]
---

On July 26th, researchers at NUTRITION 2026 stood up and said the quiet part out loud: the calorie estimate your photo-tracking app gives you is probably wrong, and it's wrong in a specific, predictable direction. A team affiliated with NIDDK cooked 102 meals in a metabolic kitchen (the closest thing nutrition science has to a lab-grade scale for food) and ran photos of each one through four popular apps, including some a lot of you reading this have on your phone. Every app underestimated. Calories came in 250 to 345 low on average. Fat was low by roughly 30 grams.

Thirty grams of fat is not a rounding error. That's about three tablespoons of olive oil, or the difference between a "light" chicken breast and a thigh with the skin left on, or the last of the dressing that got tossed into the salad and photographed as if it wasn't there.

Here's why it happens: fat hides. Cooking oil disappears once it's absorbed into a pan sear. Butter melts into rice. The fat in a cut of meat is marbled through it, not sitting on top where a camera, or a model trained on camera images, can register it. Protein and carbs leave visual tells: portion size, color, shape. Fat mostly doesn't. So a model estimating what's on your plate from a single photo isn't just making an educated guess, it's making a guess that's structurally biased toward missing the densest calorie source on the table, every time.

I want to sit with that for a second instead of rushing to defend the category I work in. This isn't a "some apps are sloppy, ours is different" story. It's a real, physical limit of the input. A photo is a 2D projection of a 3D plate, and no amount of better prompting fixes the fact that the information genuinely isn't in the pixels. You can improve a model's guess. You cannot make it see through a chicken thigh.

So what do you actually do with that, whether you're building one of these tools or trying to hit a number with one?

The honest answer is you stop treating the AI estimate as the finish line and start treating it as a first draft that needs a better source to check it. That's a boring, unsexy answer, which is usually a sign it's the right one. Packaged foods carry real nutrition labels; a barcode scan should always beat a photo guess when one is available. Recipes with known ingredient lists can be computed properly instead of eyeballed. And for the genuinely ambiguous plate, a food-tracking tool should say so rather than presenting a confident-looking number with no caveat. "Roughly 650, could be higher, this dish has fat we can't see" is more useful, not less, than "647" that's quietly off by a third.

The uncomfortable part for the whole category, us included, is that "roughly, with a caveat" is a worse demo than a clean confident number. It's also the truth, and I'd rather ship the true thing.

None of this makes photo logging useless. Directionally, most people learn a lot just from the act of pointing a camera at their food and getting any number back at all; for a lot of what people actually need, awareness beats precision. But precision starts to matter again the moment someone is managing a medical condition, chasing a specific deficit, or on a GLP-1 where appetite and intake are both shifting fast. Those are exactly the users who deserve to know the number in front of them comes with an asterisk, and why.

Fat is invisible in a photo. The least any of us building these tools can do is stop pretending it isn't.

## BITE of the Week: A Dial for the Part the Camera Got Wrong

![An app food log with a circular portions dial being turned, beside an unbroken timeline of meal entries with a repaired link](https://d8j0ntlcm91z4.cloudfront.net/user_3ElLNwQpO0GqKZ9IN6sdAl7YP6i/hf_20260801_151317_ff9bb60b-0f9c-4fca-ba4b-1bc26ea8be6d.png)

Since Issue 1 we've shipped 1.3.0 and 1.3.1, and the feature most relevant to everything above is a small one: there's now a portions multiplier in the log editors. The AI gives you an estimate built for one serving. You ate one and a half. Previously that meant re-logging the meal or doing arithmetic in your head, which is exactly the kind of friction that makes people stop correcting the number and just accept whatever the model said. Now you turn a dial. Cheap to build, and it moves more accuracy than any model upgrade we could have shipped in the same week.

The other half of this cycle was less fun. We fixed a set of bugs in the AI trackers where an estimate could come back empty, or a photo scan could hang instead of failing honestly, both of which are worse than a wrong number because you don't even get something to correct. We also merged a batch of fixes for a bug where food history could disappear silently, and gave every one of our backend calls a hard deadline so the app fails fast and tells you, rather than sitting on a spinner. Those last ones are on main now and go out with the next store build, not in 1.3.1, so if you're reading this the week it goes up, you don't have them yet.

There's a pattern to the work I didn't plan and only noticed writing this: nearly all of it is about the app being honest with you when it doesn't know something. That's the same argument as the essay, arrived at from the bug tracker instead of a study.

## Three Quick Bites

![Three news cards showing a lab kitchen scale weighing a meal, a prescription bottle, and a grocery cart](https://d8j0ntlcm91z4.cloudfront.net/user_3ElLNwQpO0GqKZ9IN6sdAl7YP6i/hf_20260801_151309_a40a0f68-80e7-41f1-b3ae-3eee917e4e9e.png)

1. **AI photo food logs miss about a third of the fat.** Researchers cooked 102 meals in a metabolic kitchen and tested four popular photo-tracking apps against the true nutrition values. Every app underestimated calories, by 250 to 345 on average, largely because fat is hard to see in a photo. The findings haven't been peer-reviewed yet but were presented at NUTRITION 2026, the American Society for Nutrition's flagship meeting. [ScienceDaily](https://www.sciencedaily.com/releases/2026/07/260726015237.htm)

2. **DarioHealth launched a full GLP-1 program, prescribing included.** On July 30th, DarioHealth rolled out an integrated GLP-1 offering built with Beluga Health that combines medical evaluation, prescribing, and ongoing clinical oversight with Dario's existing digital coaching platform. It's arriving through direct-to-consumer, health-plan, and employer channels this fall, right as some employers are pulling back GLP-1 coverage. [PR Newswire](http://www.prnewswire.com/news-releases/dario-launches-integrated-glp-1-program-combining-its-digital-chronic-care-platform-with-provider-backed-clinical-care-in-a-single-end-to-end-experience-302837820.html)

3. **GLP-1 use is now reshaping what people put in the cart.** Consumer research presented at the 2026 Chicken Marketing Summit found 27% of respondents said someone in their household is on a GLP-1 medication, more than double the share from two years ago, and it's already changing how people shop for and prepare protein. Worth watching if you're thinking about food logging for a GLP-1 user: their portions and appetite can change week to week. [The National Provisioner](https://www.provisioneronline.com/articles/120975-glp-1-medications-and-ai-reshape-how-consumers-buy-prepare-and-eat-chicken)

## Tool of the Week: OpenNutriTracker

![A phone scanning a barcode with an open food database flowing out of it beside an open padlock](https://d8j0ntlcm91z4.cloudfront.net/user_3ElLNwQpO0GqKZ9IN6sdAl7YP6i/hf_20260801_151314_71fa8550-bb59-44ce-a40c-b07c07c4a8c7.png)

This week's pick is for anyone who read the essay above and wants a tracker that's upfront about where its numbers come from. OpenNutriTracker is a free, open-source, privacy-focused food diary for Android and iOS: barcode scanning, a food diary, custom meal plans, and a database pulled straight from Open Food Facts and USDA FoodData Central, so you can see exactly what it's drawing on. No account required, no ads, GPLv3 licensed. For builders, the source is a good read on how to wire a barcode-first, database-backed logging flow without leaning on an AI guess for foods that already have a real label. [github.com/simonoppowa/OpenNutriTracker](https://github.com/simonoppowa/OpenNutriTracker). Free and open source.

*Thanks for reading. If a caveated number sounds better to you than a confident wrong one, that's the whole idea behind how we're building this. [Mr BITE is free on iOS and Android](/#download).*

*Michael, building Mr BITE*
