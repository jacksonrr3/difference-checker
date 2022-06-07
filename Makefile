install:
	npm ci

publish:
	npm publish --dry-run

lint:
	npx eslint .

lint-fix:
	npx eslint . --fix

test:
	npm test

test-watch:
	NODE_OPTIONS=--experimental-vm-modules npx jest --watchAll

test-coverage:
	npm test -- --coverage --coverageProvider=v8
