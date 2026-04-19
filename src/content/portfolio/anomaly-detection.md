---
title: "AI Anomaly Narration"
description: "Designed an anomaly detection feature that not only flags data outliers but explains them in plain English — reducing alert fatigue and false positive dismissals."
year: 2023
tags: ["AI", "Alerting", "UX", "Analytics"]
impact: "–70% alert fatigue · +45% anomaly action rate"
featured: false
order: 4
---

## Context

Our platform already detected anomalies. The problem: users were ignoring 80% of alerts because they didn't know if an anomaly was significant, what caused it, or what to do about it.

## What I did

I reframed the problem from "better anomaly detection" to "better anomaly communication." The detection model was already good. The UX wasn't. I shipped a narration layer that combined the statistical signal with relevant context (day of week, segment comparison, historical pattern) into a single human-readable sentence.

## Impact

- **–70% alert fatigue** (dismissal without investigation rate)
- **+45% anomaly action rate** within 48 hours of alert
- Users described alerts as "finally feeling relevant"
