#!/bin/bash


PROJECT_NUMBER=1
REPO="KaneTraylor/Dispute-app"


declare -A ISSUES
ISSUES["Build parser to extract negative items"]="Write parser logic that filters tradelines and returns only negative items (collections, charge-offs, etc)."
ISSUES["Create dispute letter PDF generator"]="Implement PDFKit or Puppeteer logic to generate Metro 2–style dispute letters based on selected negative items."
ISSUES["Create dashboard UI with dummy data"]="Build a React component to display mock credit items and allow users to select which to dispute."
ISSUES["Build letter preview + download UI"]="Enable users to preview the generated letter and download as PDF from frontend."
ISSUES["Connect API to real credit data source"]="Replace mock data in fetchReport API with actual SmartCredit/Experian API integration."
ISSUES["Store dispute records in database"]="Create a Dispute model in Prisma to save submitted disputes, their status, and timestamps."
ISSUES["Integrate AI assistant for letter suggestions"]="Use OpenAI API to assist with generating personalized dispute letter language."
ISSUES["Allow upload of PDF credit reports"]="Build functionality to extract and parse uploaded PDF credit reports as a fallback."


for TITLE in "${!ISSUES[@]}"; do
  BODY="${ISSUES[$TITLE]}"
  echo "Creating issue: $TITLE"
  ISSUE_URL=$(gh issue create --repo "$REPO" --title "$TITLE" --body "$BODY" --json url -q ".url")
  echo "Issue created: $ISSUE_URL"
  
  echo "Adding to project $PROJECT_NUMBER"
  gh project item-add $PROJECT_NUMBER --owner KaneTraylor --url "$ISSUE_URL"
done
