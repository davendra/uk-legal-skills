# Legal Evaluation Harness

`legal-eval-corpus.json` defines provider-neutral evaluation cases. Each case names:

- the skill under test
- the sample document
- the expected quality band and risk band
- the legal findings the model output must surface

Run a skill through any agent/provider, save the output as one of:

```text
evaluation/outputs/<case-id>.md
evaluation/outputs/<case-id>.txt
evaluation/outputs/<case-id>.json
```

Then score the suite:

```bash
npm run eval:score
```

The scorer writes `evaluation/reports/latest.json` and fails CI when the suite score or any completed case falls below the configured threshold. Use `--allow-missing` while adding new cases incrementally:

```bash
npm run eval:score -- --allow-missing
```

Thresholds can be tuned without changing the corpus:

```bash
npm run eval:score -- --min-case-score 0.8 --min-suite-score 0.85
```
