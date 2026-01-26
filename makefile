# Variables
LIB_FILE := platform_lib.js
SRC_DIR := platforms
DEST_DIR := .dist

$(rm -rf ./.dist)

# Map source files to destination files
TARGETS := $(patsubst $(SRC_DIR)/%.js,$(DEST_DIR)/$(SRC_DIR)/%.js,$(wildcard $(SRC_DIR)/*.js))

.PHONY: all clean

# Default target
all: $(TARGETS)
	@mkdir -p $(DEST_DIR)
	cp -r ui $(DEST_DIR)/ui
	cp manifest.json $(DEST_DIR)/manifest.json
	cp icon.svg $(DEST_DIR)/icon.svg
	@echo "Build complete. Check the '$(DEST_DIR)' folder."

# Rule to create the distribution JS files
$(DEST_DIR)/$(SRC_DIR)/%.js: $(SRC_DIR)/%.js $(LIB_FILE)
	@mkdir -p $(dir $@)
	@echo "Merging $(LIB_FILE) + $< -> $@"
	@{ cat $(LIB_FILE); printf "\n\n"; cat $<; } > $@

# Cleanup
clean:
	rm -rf $(DEST_DIR)
