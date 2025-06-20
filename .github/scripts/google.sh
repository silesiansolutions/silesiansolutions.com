#!/usr/bin/env bash
set -o errexit
set -o nounset

BASE_URL="https://silesiansolutions.com"
STATIC_PAGES=("oferta" "realizacje" "o-nas" "blog" "kontakt")
POSTS_DIR="../../../content/articles/"
TMP_DIR="$(pwd)/tmp"
TMP_FILE="$TMP_DIR/google.csv"

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

# Download https://github.com/usk81/easyindex-cli
download_easyindex_cli() {
  EASYINDEX_CLI="./easyindex-cli"
  if [ ! -f "$EASYINDEX_CLI" ]; then
    echo "Fetching easyindex-cli binary..."
    curl -s -L "https://github.com/usk81/easyindex-cli/releases/download/v1.0.6/easyindex-cli_1.0.6_linux_amd64.tar.gz" | tar xz || log_error "Failed to download and extract easyindex-cli binary."
    echo
  fi
}

# Copy credentials file
copy_credentials_file() {
  echo "Using the GOOGLE_JSON_KEY_FILE environment variable..."
  if [ -z "${GOOGLE_JSON_KEY_FILE:-}" ]; then
    log_error "GOOGLE_JSON_KEY_FILE is not set or is empty. Exiting."
  fi

  echo "$GOOGLE_JSON_KEY_FILE" >"$TMP_DIR/credentials.json" || log_error "Failed to write to credentials file $TMP_DIR/credentials.json"
}

# Construct submission payload
construct_submission_payload() {
  echo "\"notification_type\",\"url\"" >>"$TMP_FILE"
  echo "\"URL_UPDATED\",\"${BASE_URL}/\"" >>"$TMP_FILE"

  for page in "${STATIC_PAGES[@]}"; do
    echo "\"URL_UPDATED\",\"${BASE_URL}/${page}/\"" >>"$TMP_FILE"
  done

  # Add blog articles
  if [ -d "$POSTS_DIR" ]; then
    POSTS=("$POSTS_DIR"*/)
    for ((i = 0; i < ${#POSTS[@]}; i++)); do
      POST_DIR="${POSTS[i]}"
      POST_NAME=$(basename "$POST_DIR")
      POST_SLUG="${POST_NAME:12}"
      echo "\"URL_UPDATED\",\"${BASE_URL}/blog/${POST_SLUG}/\"" >>"$TMP_FILE"
    done
  fi

  # Add offer pages from interests.json
  INTERESTS_FILE="../../../content/sections/interests/interests.json"
  if [ -f "$INTERESTS_FILE" ]; then
    # Extract slugs from interests.json using grep and sed
    OFFER_SLUGS=$(grep -o '"slug": "[^"]*"' "$INTERESTS_FILE" | sed 's/"slug": "\([^"]*\)"/\1/')
    for slug in $OFFER_SLUGS; do
      echo "\"URL_UPDATED\",\"${BASE_URL}/oferta/${slug}/\"" >>"$TMP_FILE"
    done
  fi

  # Add project pages from projects.json
  PROJECTS_FILE="../../../content/sections/projects/projects.json"
  if [ -f "$PROJECTS_FILE" ]; then
    # Extract slugs from projects.json using grep and sed
    PROJECT_SLUGS=$(grep -o '"slug": "[^"]*"' "$PROJECTS_FILE" | sed 's/"slug": "\([^"]*\)"/\1/')
    for slug in $PROJECT_SLUGS; do
      echo "\"URL_UPDATED\",\"${BASE_URL}/realizacje/${slug}/\"" >>"$TMP_FILE"
    done
  fi

  echo "Constructed CSV file contents:"
  cat "$TMP_FILE"
  echo
}

# Submit URLs to Google search engine
submit_to_search_engine() {
  echo "Submitting to Google via Indexing API..."
  "$EASYINDEX_CLI" google publish --csv "$TMP_FILE" -C "$TMP_DIR/credentials.json" || log_error "An error returned by easyindex-cli. Exiting."
  echo
}

# Main execution
create_tmp_directory

cd "$TMP_DIR" || log_error "Failed to change to temporary directory $TMP_DIR"

download_easyindex_cli
copy_credentials_file
construct_submission_payload
submit_to_search_engine

end_time=$(date +%s.%3N)
duration=$(echo "scale=0; ($end_time - $start_time) * 1000 / 1" | bc)
echo "---------------------------------"
echo "Script completed in $duration milliseconds."
