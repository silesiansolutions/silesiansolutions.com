#!/usr/bin/env bash
set -o errexit
set -o nounset

BASE_URL="https://silesiansolutions.com"
STATIC_PAGES=("oferta" "realizacje" "o-nas" "blog" "kontakt")
POSTS_DIR="../../../content/articles/"
TMP_DIR="$(pwd)/tmp"
TMP_FILE="$TMP_DIR/bing.json"

start_time=$(date +%s.%3N)

log_error() {
  echo "Error: $1"
  exit 1
}

# Create a temporary working directory
create_tmp_directory() {
  if [ ! -d "$TMP_DIR" ]; then
    echo "Creating temporary working directory: $TMP_DIR"
    mkdir "$TMP_DIR" || log_error "Failed to create directory $TMP_DIR"
  fi
}

# Construct submission payload
construct_submission_payload() {
  local json_content="{\"siteUrl\": \"$BASE_URL\", \"urlList\": [\"$BASE_URL/\","

  for page in "${STATIC_PAGES[@]}"; do
    json_content+="\"$BASE_URL/$page/\","
  done

  # Add blog articles
  if [ -d "$POSTS_DIR" ]; then
    POSTS=("$POSTS_DIR"*/)
    for ((i = 0; i < ${#POSTS[@]}; i++)); do
      POST_DIR="${POSTS[i]}"
      POST_NAME=$(basename "$POST_DIR")
      POST_SLUG="${POST_NAME:12}"
      json_content+="\"$BASE_URL/blog/$POST_SLUG/\","
    done
  fi

  # Add offer pages from interests.json
  INTERESTS_FILE="../../../content/sections/interests/interests.json"
  if [ -f "$INTERESTS_FILE" ]; then
    # Extract slugs from interests.json using grep and sed
    OFFER_SLUGS=$(grep -o '"slug": "[^"]*"' "$INTERESTS_FILE" | sed 's/"slug": "\([^"]*\)"/\1/')
    for slug in $OFFER_SLUGS; do
      json_content+="\"$BASE_URL/oferta/$slug/\","
    done
  fi

  # Add project pages from projects.json
  PROJECTS_FILE="../../../content/sections/projects/projects.json"
  if [ -f "$PROJECTS_FILE" ]; then
    # Extract slugs from projects.json using grep and sed
    PROJECT_SLUGS=$(grep -o '"slug": "[^"]*"' "$PROJECTS_FILE" | sed 's/"slug": "\([^"]*\)"/\1/')
    for slug in $PROJECT_SLUGS; do
      json_content+="\"$BASE_URL/realizacje/$slug/\","
    done
  fi

  if [ -z "$json_content" ]; then
    log_error "JSON content is empty."
  fi

  json_content="${json_content%,}]}"

  echo "Constructed JSON Body:"
  echo "$json_content" | jq '.' >"$TMP_FILE" || log_error "Failed writing to $TMP_FILE"
  cat "$TMP_FILE"
  echo
}

# Check if Bing API key is set
check_api_key() {
  if [ -z "${BING_API_KEY:-}" ]; then
    log_error "BING_API_KEY is not set or is empty. Please set the API key and run the script again."
  fi
}

# Submit URLs to Bing search engine
submit_to_search_engine() {
  local bing_api_url="https://ssl.bing.com/webmaster/api.svc/json/SubmitUrlbatch?apikey=${BING_API_KEY}"

  echo "Submitting to Bing via URL Submission API..."
  response=$(curl -s -w "%{http_code}" "$bing_api_url" \
    -H "Content-Type: application/json; charset=utf-8" \
    -d "@$TMP_FILE" || log_error "Failed submitting to Bing API.")

  http_code=${response: -3}
  body=${response::-3}

  echo "HTTP Response Code: $http_code"
  echo "API Response Body:"
  echo "$body" | jq '.'
  echo
}

# Main execution
create_tmp_directory

cd "$TMP_DIR" || log_error "Failed to change to temporary directory $TMP_DIR"

check_api_key
construct_submission_payload
submit_to_search_engine

end_time=$(date +%s.%3N)
duration=$(echo "scale=0; ($end_time - $start_time) * 1000 / 1" | bc)
echo "---------------------------------"
echo "Script completed in $duration milliseconds."
