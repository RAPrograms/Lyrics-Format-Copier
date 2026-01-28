# Variables
LIB_FILE := platform_lib.js
SRC_DIR := platforms
DEST_DIR := .dist

# Map source files to destination files
TARGETS := $(patsubst $(SRC_DIR)/%.js,$(DEST_DIR)/$(SRC_DIR)/%.js,$(wildcard $(SRC_DIR)/*.js))

.PHONY: all clean prep

# Default target
# We call 'clean' and 'prep' first to ensure a fresh start
all: clean prep $(TARGETS)
	@cp -r ui $(DEST_DIR)/ui
	@cp manifest.json $(DEST_DIR)/manifest.json
	@cp icon.svg $(DEST_DIR)/icon.svg
	@echo "Build complete. Check the '$(DEST_DIR)' folder."

# Ensures the directory exists after cleaning
prep:
	@mkdir -p $(DEST_DIR)

# Rule to create the distribution JS files
$(DEST_DIR)/$(SRC_DIR)/%.js: $(SRC_DIR)/%.js $(LIB_FILE)
	@mkdir -p $(dir $@)
	@echo "Merging $(LIB_FILE) + $< -> $@"
	@{ cat $<; printf "\n\n"; cat $(LIB_FILE); } > $@

# Cleanup
clean:
	@echo "Cleaning $(DEST_DIR)..."
	@rm -rf $(DEST_DIR)