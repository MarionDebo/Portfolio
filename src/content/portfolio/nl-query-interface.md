---
title: "Natural Language to Insight"
description: "Shipped an LLM-powered query interface on top of a multi-tenant analytics platform, reducing time-to-insight by 60% for non-technical users."
year: 2024
tags: ["AI", "LLM", "Analytics", "B2B SaaS"]
impact: "–60% time-to-insight · NPS +18pts"
featured: true
order: 1
---

## Context

Business intelligence tools are powerful — but only for the 5% of users who know SQL. The other 95% either rely on analyst queues or make decisions without data. We set out to fix that.

## The problem

Our analytics platform had a 3-week average time-to-first-insight for new enterprise clients. Analysts were bottlenecked, dashboards were stale by the time they were built, and non-technical stakeholders had learned to route around the data team entirely.

## What I did

I led discovery across 40 user interviews across 6 enterprise accounts, mapping the exact moments where users gave up and why. The core insight: users didn't need a better interface for SQL — they needed to express intent in plain language and get a trustworthy answer back.

I defined the product spec for an LLM-powered query interface that:
- Accepted natural language questions ("Show me churn by segment last quarter")
- Translated them to SQL via our semantic layer (Cube.js)
- Surfaced the result alongside the generated query and its confidence score
- Allowed one-click corrections when the interpretation was wrong

I owned the evaluation framework — we ran 800+ test queries across 12 schemas before GA, and defined the trust threshold that determined when to show the result vs. ask for clarification.

## Impact

- **–60%** time-to-insight for non-technical users
- **NPS +18 points** on the analytics module post-launch
- **3× increase** in daily active users on dashboards within 60 days
- Reduced analyst queue depth by 40% in pilot accounts
